import { createClient } from '@/lib/supabase/client';

export interface WorkJournalEntry {
  id: string;
  freelancer_id: string;
  date: string;
  content: string;
  hours_worked: number | null;
  project_id: string | null;
  video_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  project?: { id: string; title: string };
  video?: { id: string; title: string };
}

export const workJournalApi = {
  // 작업일지 목록 조회
  listEntries: async (freelancerId: string, params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) => {
    const supabase = createClient();

    let query = supabase
      .from('work_journal_entries')
      .select(`
        *,
        project:projects(id, title),
        video:videos(id, title)
      `)
      .eq('freelancer_id', freelancerId)
      .order('date', { ascending: false });

    if (params?.startDate) {
      query = query.gte('date', params.startDate);
    }
    if (params?.endDate) {
      query = query.lte('date', params.endDate);
    }
    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('listEntries error:', error);
      return [];
    }

    return data || [];
  },

  // 날짜별 조회
  getByDate: async (freelancerId: string, date: string): Promise<WorkJournalEntry | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('work_journal_entries')
      .select(`
        *,
        project:projects(id, title),
        video:videos(id, title)
      `)
      .eq('freelancer_id', freelancerId)
      .eq('date', date)
      .maybeSingle();

    if (error) {
      console.error('getByDate error:', error);
      return null;
    }

    return data;
  },

  // 주간 작업시간 통계
  getWeeklyStats: async (freelancerId: string, weekStart: string) => {
    const supabase = createClient();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const { data, error } = await supabase
      .from('work_journal_entries')
      .select('date, hours_worked')
      .eq('freelancer_id', freelancerId)
      .gte('date', weekStart)
      .lte('date', weekEnd.toISOString().split('T')[0]);

    if (error) {
      console.error('getWeeklyStats error:', error);
      return { totalHours: 0, entries: 0, dailyHours: {} };
    }

    const totalHours = (data || []).reduce((sum, e) => sum + (e.hours_worked || 0), 0);
    const dailyHours = (data || []).reduce((acc, e) => {
      acc[e.date] = e.hours_worked || 0;
      return acc;
    }, {} as Record<string, number>);

    return { totalHours, entries: data?.length || 0, dailyHours };
  },

  // 작업일지 생성
  createEntry: async (data: Partial<WorkJournalEntry>) => {
    const supabase = createClient();
    const { data: entry, error } = await supabase
      .from('work_journal_entries')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return entry;
  },

  // 작업일지 수정
  updateEntry: async (id: string, data: Partial<WorkJournalEntry>) => {
    const supabase = createClient();
    const { data: entry, error } = await supabase
      .from('work_journal_entries')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return entry;
  },

  // 작업일지 삭제
  deleteEntry: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('work_journal_entries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
