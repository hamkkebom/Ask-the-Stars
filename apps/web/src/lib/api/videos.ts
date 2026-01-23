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

  listAllFinalVideos: async () => {
    const response = await axiosInstance.get<any[]>('/videos');
    return response.data;
  },
};
