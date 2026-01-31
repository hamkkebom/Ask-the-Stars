import { createClient } from '@/lib/supabase/client';

export interface Settlement {
  id: string;
  freelancer_id: string;
  type: 'PRIMARY' | 'SECONDARY';
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';
  period_start: string;
  period_end: string;
  paid_at: string | null;
  created_at: string;
  // Joined
  freelancer?: { id: string; name: string };
}

export interface EarningsSummary {
  totalEarnings: number;
  pendingPayments: number;
  paidThisMonth: number;
  projectsCompleted: number;
}

export const earningsApi = {
  // 정산 목록 조회
  listSettlements: async (freelancerId: string, params?: {
    type?: 'PRIMARY' | 'SECONDARY';
    status?: string;
    year?: number;
    month?: number;
  }) => {
    const supabase = createClient();

    let query = supabase
      .from('settlements')
      .select('*')
      .eq('freelancer_id', freelancerId)
      .order('created_at', { ascending: false });

    if (params?.type) {
      query = query.eq('type', params.type);
    }
    if (params?.status) {
      query = query.eq('status', params.status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('listSettlements error:', error);
      return [];
    }

    return data || [];
  },

  // 수익 요약 조회
  getEarningsSummary: async (freelancerId: string): Promise<EarningsSummary> => {
    const supabase = createClient();

    // 전체 수익
    const { data: allSettlements } = await supabase
      .from('settlements')
      .select('amount, status')
      .eq('freelancer_id', freelancerId)
      .eq('status', 'PAID');

    const totalEarnings = (allSettlements || []).reduce((sum, s) => sum + s.amount, 0);

    // 대기 중 정산
    const { data: pendingSettlements } = await supabase
      .from('settlements')
      .select('amount')
      .eq('freelancer_id', freelancerId)
      .eq('status', 'PENDING');

    const pendingPayments = (pendingSettlements || []).reduce((sum, s) => sum + s.amount, 0);

    // 이번 달 지급
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { data: thisMonthSettlements } = await supabase
      .from('settlements')
      .select('amount')
      .eq('freelancer_id', freelancerId)
      .eq('status', 'PAID')
      .gte('paid_at', monthStart);

    const paidThisMonth = (thisMonthSettlements || []).reduce((sum, s) => sum + s.amount, 0);

    // 완료 프로젝트 수
    const { count } = await supabase
      .from('project_assignments')
      .select('id', { count: 'exact' })
      .eq('freelancer_id', freelancerId)
      .eq('status', 'COMPLETED');

    return {
      totalEarnings,
      pendingPayments,
      paidThisMonth,
      projectsCompleted: count || 0,
    };
  },

  // 월별 수익 차트 데이터
  getMonthlyEarnings: async (freelancerId: string, year: number) => {
    const supabase = createClient();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const { data, error } = await supabase
      .from('settlements')
      .select('amount, paid_at')
      .eq('freelancer_id', freelancerId)
      .eq('status', 'PAID')
      .gte('paid_at', startDate)
      .lte('paid_at', endDate);

    if (error) {
      console.error('getMonthlyEarnings error:', error);
      return Array(12).fill(0);
    }

    // 월별 합계 계산
    const monthlyTotals = Array(12).fill(0);
    (data || []).forEach(s => {
      if (s.paid_at) {
        const month = new Date(s.paid_at).getMonth();
        monthlyTotals[month] += s.amount;
      }
    });

    return monthlyTotals;
  },

  // 세금 정보 조회
  getTaxInfo: async (freelancerId: string, year: number) => {
    const supabase = createClient();
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const { data } = await supabase
      .from('settlements')
      .select('amount, type')
      .eq('freelancer_id', freelancerId)
      .eq('status', 'PAID')
      .gte('paid_at', startDate)
      .lte('paid_at', endDate);

    const totalIncome = (data || []).reduce((sum, s) => sum + s.amount, 0);
    const taxRate = 0.033; // 3.3% 원천징수
    const withheldTax = totalIncome * taxRate;

    return {
      year,
      totalIncome,
      withheldTax,
      netIncome: totalIncome - withheldTax,
    };
  },
};
