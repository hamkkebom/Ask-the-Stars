import { createClient } from '@/lib/supabase/client';

// ============================================
// 🎬 MOCK DATA FOR TESTING (DB 데이터 연결 전 임시)
// ============================================
const MOCK_VIDEOS: VideoDetails[] = [
  {
    id: 'mock-1',
    title: '감성 뮤직비디오 - 별이 빛나는 밤에',
    description: '인디 아티스트를 위한 감성적인 뮤직비디오입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/mv1/640/360',
    views: 1234,
    likes: 89,
    isAdApproved: true,
    duration: 240,
    freelancer_id: 'mock-freelancer-1',
    project_id: null,
    category: '뮤직비디오',
    created_at: '2024-12-15T10:00:00Z',
    approved_at: '2024-12-16T10:00:00Z',
    freelancer: { id: 'mock-freelancer-1', name: '김스타' },
    counselor: { name: '연화보살' },
  },
  {
    id: 'mock-2',
    title: '브랜드 광고 - 신제품 런칭',
    description: '스타트업 신제품 런칭 광고 영상입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/ad1/640/360',
    views: 890,
    likes: 45,
    isAdApproved: true,
    duration: 30,
    freelancer_id: 'mock-freelancer-2',
    project_id: null,
    category: '광고',
    created_at: '2024-12-10T10:00:00Z',
    approved_at: '2024-12-11T10:00:00Z',
    freelancer: { id: 'mock-freelancer-2', name: '이문' },
    counselor: { name: '무향선생' },
  },
  {
    id: 'mock-3',
    title: '유튜브 채널 오프닝',
    description: '유튜버를 위한 채널 인트로 영상입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/yt1/640/360',
    views: 2100,
    likes: 156,
    isAdApproved: false,
    duration: 15,
    freelancer_id: 'mock-freelancer-1',
    project_id: null,
    category: '유튜브',
    created_at: '2024-12-08T10:00:00Z',
    approved_at: '2024-12-09T10:00:00Z',
    freelancer: { id: 'mock-freelancer-1', name: '김스타' },
    counselor: { name: '해원스님' },
  },
  {
    id: 'mock-4',
    title: '기업 홍보 영상 - 회사 소개',
    description: 'IT 기업 홍보용 영상입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/corp1/640/360',
    views: 567,
    likes: 23,
    isAdApproved: false,
    duration: 180,
    freelancer_id: 'mock-freelancer-3',
    project_id: null,
    category: '기업/홍보',
    created_at: '2024-11-20T10:00:00Z',
    approved_at: '2024-11-21T10:00:00Z',
    freelancer: { id: 'mock-freelancer-3', name: '박달' },
    counselor: { name: '청운도사' },
  },
  {
    id: 'mock-5',
    title: '이벤트 하이라이트 영상',
    description: '컨퍼런스 행사 하이라이트 편집 영상입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/event1/640/360',
    views: 345,
    likes: 12,
    isAdApproved: true,
    duration: 300,
    freelancer_id: 'mock-freelancer-2',
    project_id: null,
    category: '이벤트',
    created_at: '2024-11-15T10:00:00Z',
    approved_at: '2024-11-16T10:00:00Z',
    freelancer: { id: 'mock-freelancer-2', name: '이문' },
    counselor: { name: '명인' },
  },
  {
    id: 'mock-6',
    title: '숏폼 콘텐츠 - 바이럴 영상',
    description: 'SNS 바이럴용 숏폼 콘텐츠입니다.',
    status: 'PUBLIC',
    r2_url: null,
    stream_url: null,
    thumbnail_url: 'https://picsum.photos/seed/short1/640/360',
    views: 5600,
    likes: 420,
    isAdApproved: true,
    duration: 60,
    freelancer_id: 'mock-freelancer-1',
    project_id: null,
    category: '숏폼',
    created_at: '2024-11-10T10:00:00Z',
    approved_at: '2024-11-11T10:00:00Z',
    freelancer: { id: 'mock-freelancer-1', name: '김스타' },
    counselor: { name: '연화보살' },
  },
];

// Set this to false when real DB data is available
const USE_MOCK_DATA = false;

// Supabase-based video API
export interface VideoDetails {
  id: string;
  title: string;
  description: string | null;
  status: 'DRAFT' | 'REVIEWING' | 'FEEDBACK' | 'APPROVED' | 'PUBLIC';
  r2_url: string | null;
  stream_url: string | null;
  thumbnail_url: string | null;
  views: number;
  likes?: number; // 👍 좋아요 수
  isAdApproved?: boolean; // ✓ 광고 승인 여부
  duration: number | null;
  freelancer_id: string;
  project_id: string | null;
  category: string | null;
  created_at: string;
  approved_at: string | null;
  // Joined relations
  freelancer?: { id: string; name: string };
  counselor?: { name: string }; // 상담사 정보
  project?: { id: string; title: string; client?: { name: string } };
}

export const videosApi = {
  // 단일 영상 조회
  getVideoById: async (id: string): Promise<VideoDetails | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getVideoById error:', error);
      }
      return null;
    }
    return data;
  },

  // 공개 영상 목록 (갤러리용)
  listAllFinalVideos: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    counselor?: string;
    creator?: string;
    sort?: string;
  }) => {
    // 🎬 Return mock data for testing
    if (USE_MOCK_DATA) {
      const page = params?.page || 1;
      const limit = params?.limit || 20;
      let filtered = [...MOCK_VIDEOS];

      if (params?.category && params.category !== '전체') {
        filtered = filtered.filter((v) => v.category === params.category);
      }

      if (params?.sort === 'popular') {
        filtered.sort((a, b) => b.views - a.views);
      }

      return {
        data: filtered.slice(0, limit),
        meta: { total: filtered.length, page, lastPage: 1, has_more: false },
      };
    }

    const supabase = createClient();
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('videos')
      .select('*', { count: 'exact' })
      .eq('status', 'PUBLIC');

    if (params?.category && params.category !== '전체') {
      query = query.eq('category', params.category);
    }

    if (params?.sort === 'popular') {
      query = query.order('views', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, count, error } = await query.range(
      offset,
      offset + limit - 1
    );

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('listAllFinalVideos error:', error);
      }
      return {
        data: [],
        meta: { total: 0, page, lastPage: 1, has_more: false },
      };
    }

    const total = count || 0;
    const lastPage = Math.ceil(total / limit);
    const has_more = page < lastPage;

    return { data: data || [], meta: { total, page, lastPage, has_more } };
  },

  // 카테고리별 영상
  listVideosByCategory: async (category: string, limit = 10) => {
    // 🎬 Return mock data for testing
    if (USE_MOCK_DATA) {
      let filtered = [...MOCK_VIDEOS];
      if (category === '인기') {
        filtered.sort((a, b) => b.views - a.views);
      } else if (category !== '전체') {
        filtered = filtered.filter((v) => v.category === category);
      }
      return { data: filtered.slice(0, limit) };
    }

    const supabase = createClient();

    let query = supabase
      .from('videos')
      .select('*')
      .eq('status', 'PUBLIC')
      .order('created_at', { ascending: false })
      .limit(limit);

    // "전체" 또는 "인기"는 특수 처리
    if (category === '인기') {
      query = supabase
        .from('videos')
        .select('*')
        .eq('status', 'PUBLIC')
        .order('views', { ascending: false })
        .limit(limit);
    } else if (category !== '전체') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('listVideosByCategory error:', error);
      }
      return { data: [] };
    }

    return { data: data || [] };
  },

  // 인기 영상
  getFeaturedVideos: async () => {
    // 🎬 Return mock data for testing
    if (USE_MOCK_DATA) {
      return {
        data: [...MOCK_VIDEOS].sort((a, b) => b.views - a.views).slice(0, 5),
      };
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'PUBLIC')
      .order('views', { ascending: false })
      .limit(5);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getFeaturedVideos error:', error);
      }
      return { data: [] };
    }

    return { data: data || [] };
  },

  // 검색
  search: async (query: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'PUBLIC')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('search error:', error);
      }
      return [];
    }

    return data || [];
  },

  // 조회수 증가
  incrementViews: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.rpc('increment_views', { video_id: id });
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('incrementViews error:', error);
      }
    }
  },

  // 프리랜서의 영상 목록
  getMyVideos: async (freelancerId: string, status?: string) => {
    const supabase = createClient();
    let query = supabase
      .from('videos')
      .select('*, project:projects(id, title)')
      .eq('freelancer_id', freelancerId)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status.toUpperCase());
    }

    const { data, error } = await query;

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getMyVideos error:', error);
      }
      return [];
    }

    return data || [];
  },

  // 영상 생성
  createVideo: async (videoData: Partial<VideoDetails>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .insert(videoData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 영상 수정
  updateVideo: async (id: string, videoData: Partial<VideoDetails>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .update(videoData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 영상 삭제
  deleteVideo: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('videos').delete().eq('id', id);

    if (error) throw error;
  },

  // Video preview URL (for animated previews)
  getVideoPreviewUrl: async (id: string): Promise<string | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('stream_url, r2_url')
      .eq('id', id)
      .single();

    if (error) return null;
    return data?.stream_url || data?.r2_url || null;
  },

  // AI 추천 영상 (similarity search)
  getRecommendations: async (videoId: string, limit = 8): Promise<any[]> => {
    const supabase = createClient();

    // First, get the current video's category
    const { data: currentVideo } = await supabase
      .from('videos')
      .select('category, title')
      .eq('id', videoId)
      .single();

    if (!currentVideo) return [];

    // Get similar videos from same category, excluding current video
    let query = supabase
      .from('videos')
      .select('*')
      .eq('status', 'PUBLIC')
      .neq('id', videoId)
      .order('views', { ascending: false })
      .limit(limit);

    if (currentVideo.category) {
      query = query.eq('category', currentVideo.category);
    }

    const { data, error } = await query;

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getRecommendations error:', error);
      }
      return [];
    }

    // Add distance score (mock for now - would use embeddings in production)
    return (data || []).map((video: any, index: number) => ({
      ...video,
      distance: index * 0.1, // Mock distance - lower is better match
    }));
  },
};
