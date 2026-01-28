import { axiosInstance } from './axios';

export interface VideoDetails {
  title: string;
  versionLabel: string;
  r2Key?: string;
  streamUid?: string;
  thumbnailUrl?: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'FINAL';
}

export const videosApi = {
  getVideoByProjectNo: async (projectNo: number) => {
    const response = await axiosInstance.get<VideoDetails>(`/videos/project/${projectNo}`);
    return response.data;
  },

  getVideoById: async (id: string) => {
    const response = await axiosInstance.get(`/videos/${id}`);
    return response.data;
  },

  getChannelVideos: async (channelName: string) => {
    const response = await axiosInstance.get(`/videos/channel/${channelName}`);
    return response.data;
  },

  listAllFinalVideos: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    counselor?: string;
    creator?: string;
    sort?: string;
  }) => {
    try {
      const response = await axiosInstance.get<any>('/videos', { params });
      // Backend now returns { data: [], meta: {} } structure
      return response.data;
    } catch (e) {
      console.warn("API Error, using mock data for All Videos");
      const { GENERATE_MOCK_VIDEOS } = await import('../../data/mocks/advanced-video-grid');
      // Mock the paginated response structure if possible, or just array
      const mocks = GENERATE_MOCK_VIDEOS(params?.limit || 20);
      return { data: mocks, meta: { total: 542, page: params?.page || 1, lastPage: 20 } };
    }
  },

  getFeaturedVideos: async () => {
    try {
      const response = await axiosInstance.get<any>('/videos', {
        params: { sort: 'popular', limit: 5 }
      });
      return response.data;
    } catch (e) {
      console.warn("API Error, using mock data for Featured");
      const { GENERATE_MOCK_VIDEOS } = await import('../../data/mocks/advanced-video-grid');
      return { data: GENERATE_MOCK_VIDEOS(5) };
    }
  },

  listVideosByCategory: async (category: string, limit = 10) => {
    try {
      const response = await axiosInstance.get<any>('/videos', {
          params: { category, limit, sort: 'latest' }
      });
      return response.data;
    } catch (e) {
      console.warn(`API Error, using mock data for ${category}`);
      const { GENERATE_MOCK_VIDEOS } = await import('../../data/mocks/advanced-video-grid');
      return { data: GENERATE_MOCK_VIDEOS(limit) };
    }
  },

  getVideoPreviewUrl: async (id: string) => {
    try {
        const response = await axiosInstance.get<{ videoUrl: string }>(`/videos/${id}/preview`);
        return response.data.videoUrl;
    } catch (e) {
        return "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"; // Fallback URL
    }
  },
  search: async (query: string) => {
    try {
      const response = await axiosInstance.get<any>('/videos/search', { params: { q: query } });
      return response.data;
    } catch (e) {
      console.warn("API Error, using mock search");
      return [];
    }
  },

  getRecommendations: async (videoId: string) => {
    try {
      const response = await axiosInstance.get<any>(`/videos/${videoId}/recommendations`);
      return response.data;
    } catch (e) {
      console.warn("API Error, using mock recommendations");
      return [];
    }
  },
};
