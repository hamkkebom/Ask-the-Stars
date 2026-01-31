import { createClient } from '@/lib/supabase/client';

export interface AdminStats {
  totalVideos: number;
  totalFreelancers: number;
  totalClients: number;
  totalProjects: number;
  pendingReviews: number;
  pendingPayouts: number;
  monthlyRevenue: number;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STAR' | 'CLIENT';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  created_at: string;
  last_login_at: string | null;
  // Additional for freelancers
  grade?: 'INTERN' | 'JUNIOR' | 'SENIOR' | 'MASTER';
  videos_count?: number;
  projects_count?: number;
}

export const adminApi = {
  // 대시보드 통계
  getDashboardStats: async (): Promise<AdminStats> => {
    const supabase = createClient();

    // 전체 영상 수
    const { count: totalVideos } = await supabase
      .from('videos')
      .select('id', { count: 'exact' });

    // 프리랜서 수
    const { count: totalFreelancers } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('role', 'STAR');

    // 클라이언트 수
    const { count: totalClients } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('role', 'CLIENT');

    // 프로젝트 수
    const { count: totalProjects } = await supabase
      .from('projects')
      .select('id', { count: 'exact' });

    // 검토 대기 영상
    const { count: pendingReviews } = await supabase
      .from('videos')
      .select('id', { count: 'exact' })
      .eq('status', 'REVIEWING');

    // 정산 대기
    const { count: pendingPayouts } = await supabase
      .from('settlements')
      .select('id', { count: 'exact' })
      .eq('status', 'PENDING');

    // 이번 달 수익 (지급된 정산 합계)
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { data: monthlySettlements } = await supabase
      .from('settlements')
      .select('amount')
      .eq('status', 'PAID')
      .gte('paid_at', monthStart);

    const monthlyRevenue = (monthlySettlements || []).reduce((sum, s) => sum + s.amount, 0);

    return {
      totalVideos: totalVideos || 0,
      totalFreelancers: totalFreelancers || 0,
      totalClients: totalClients || 0,
      totalProjects: totalProjects || 0,
      pendingReviews: pendingReviews || 0,
      pendingPayouts: pendingPayouts || 0,
      monthlyRevenue,
    };
  },

  // 사용자 목록
  listUsers: async (params?: {
    role?: string;
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) => {
    const supabase = createClient();

    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (params?.role) {
      query = query.eq('role', params.role);
    }
    if (params?.status) {
      query = query.eq('status', params.status);
    }
    if (params?.search) {
      query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%`);
    }
    if (params?.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('listUsers error:', error);
      return { data: [], total: 0 };
    }

    return { data: data || [], total: count || 0 };
  },

  // 사용자 상세
  getUser: async (id: string): Promise<AdminUser | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('getUser error:', error);
      return null;
    }

    return data;
  },

  // 사용자 상태 변경
  updateUserStatus: async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('users')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  },

  // 영상 상태 변경 (승인/거절)
  updateVideoStatus: async (id: string, status: string, feedback?: string) => {
    const supabase = createClient();
    const updateData: Record<string, unknown> = { status };

    if (status === 'APPROVED' || status === 'PUBLIC') {
      updateData.approved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('videos')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    // 피드백이 있으면 피드백 생성
    if (feedback) {
      const { data: video } = await supabase
        .from('videos')
        .select('freelancer_id, project_id')
        .eq('id', id)
        .single();

      if (video) {
        await supabase.from('feedbacks').insert({
          video_id: id,
          project_id: video.project_id,
          author_id: (await supabase.auth.getUser()).data.user?.id,
          content: feedback,
          status: 'OPEN',
          priority: 'MEDIUM',
        });
      }
    }
  },

  // 정산 처리
  processSettlement: async (id: string, action: 'approve' | 'pay' | 'reject') => {
    const supabase = createClient();

    let status = 'PENDING';
    const updateData: Record<string, unknown> = {};

    if (action === 'approve') {
      status = 'PROCESSING';
    } else if (action === 'pay') {
      status = 'PAID';
      updateData.paid_at = new Date().toISOString();
    } else if (action === 'reject') {
      status = 'FAILED';
    }

    updateData.status = status;

    const { error } = await supabase
      .from('settlements')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  },

  // 프로젝트 상태 변경
  updateProjectStatus: async (id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },

  // 최근 활동 로그
  getRecentActivities: async (limit = 20) => {
    const supabase = createClient();

    // 최근 영상 업로드
    const { data: recentVideos } = await supabase
      .from('videos')
      .select('id, title, created_at, freelancer:users!freelancer_id(name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    // 최근 프로젝트
    const { data: recentProjects } = await supabase
      .from('projects')
      .select('id, title, created_at, client:users!client_id(name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    // 활동 병합 및 정렬
    const activities = [
      ...(recentVideos || []).map((v: any) => ({
        type: 'video_upload' as const,
        id: v.id,
        title: v.title,
        actor: v.freelancer?.name || 'Unknown',
        timestamp: v.created_at,
      })),
      ...(recentProjects || []).map((p: any) => ({
        type: 'project_create' as const,
        id: p.id,
        title: p.title,
        actor: p.client?.name || 'Unknown',
        timestamp: p.created_at,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
     .slice(0, limit);

    return activities;
  },
};
