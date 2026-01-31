import { createClient } from '@/lib/supabase/client';

export interface Feedback {
  id: string;
  video_id: string;
  project_id: string | null;
  author_id: string;
  content: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  created_at: string;
  resolved_at: string | null;
  // Joined
  author?: { id: string; name: string; role: string };
  video?: { id: string; title: string };
  project?: { id: string; title: string };
  responses?: FeedbackResponse[];
}

export interface FeedbackResponse {
  id: string;
  feedback_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: { id: string; name: string };
}

export const feedbackApi = {
  // 피드백 목록 조회 (프리랜서)
  listMyFeedback: async (freelancerId: string, params?: {
    status?: string;
    videoId?: string;
    limit?: number;
  }) => {
    const supabase = createClient();

    // 먼저 프리랜서의 영상 ID들 조회
    const { data: videos } = await supabase
      .from('videos')
      .select('id')
      .eq('freelancer_id', freelancerId);

    const videoIds = (videos || []).map(v => v.id);

    if (videoIds.length === 0) return [];

    let query = supabase
      .from('feedbacks')
      .select(`
        *,
        author:users!author_id(id, name, role),
        video:videos(id, title),
        project:projects(id, title)
      `)
      .in('video_id', videoIds)
      .order('created_at', { ascending: false });

    if (params?.status) {
      query = query.eq('status', params.status);
    }
    if (params?.videoId) {
      query = query.eq('video_id', params.videoId);
    }
    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('listMyFeedback error:', error);
      return [];
    }

    return data || [];
  },

  // 피드백 상세 조회 (응답 포함)
  getFeedback: async (id: string): Promise<Feedback | null> => {
    const supabase = createClient();

    // 피드백 조회
    const { data: feedback, error } = await supabase
      .from('feedbacks')
      .select(`
        *,
        author:users!author_id(id, name, role),
        video:videos(id, title),
        project:projects(id, title)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('getFeedback error:', error);
      return null;
    }

    // 응답 조회
    const { data: responses } = await supabase
      .from('feedback_responses')
      .select(`
        *,
        author:users!author_id(id, name)
      `)
      .eq('feedback_id', id)
      .order('created_at', { ascending: true });

    return { ...feedback, responses: responses || [] };
  },

  // 피드백 응답 추가
  addResponse: async (feedbackId: string, authorId: string, content: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('feedback_responses')
      .insert({
        feedback_id: feedbackId,
        author_id: authorId,
        content,
      })
      .select()
      .single();

    if (error) throw error;

    // 피드백 상태를 IN_PROGRESS로 업데이트
    await supabase
      .from('feedbacks')
      .update({ status: 'IN_PROGRESS' })
      .eq('id', feedbackId)
      .eq('status', 'OPEN');

    return data;
  },

  // 피드백 해결 처리
  resolveFeedback: async (id: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('feedbacks')
      .update({
        status: 'RESOLVED',
        resolved_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  },

  // 피드백 생성 (Admin/Client용)
  createFeedback: async (data: Partial<Feedback>) => {
    const supabase = createClient();

    const { data: feedback, error } = await supabase
      .from('feedbacks')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return feedback;
  },

  // 대기 중인 피드백 수
  getPendingCount: async (freelancerId: string): Promise<number> => {
    const supabase = createClient();

    // 프리랜서의 영상 ID들 조회
    const { data: videos } = await supabase
      .from('videos')
      .select('id')
      .eq('freelancer_id', freelancerId);

    const videoIds = (videos || []).map(v => v.id);

    if (videoIds.length === 0) return 0;

    const { count } = await supabase
      .from('feedbacks')
      .select('id', { count: 'exact' })
      .in('video_id', videoIds)
      .in('status', ['OPEN', 'IN_PROGRESS']);

    return count || 0;
  },
};
