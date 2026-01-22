import { axiosInstance } from './axios';

export interface Feedback {
  id: string;
  projectId: string;
  content: string;
  timestamp: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackDto {
  projectId: string;
  content: string;
  timestamp: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const feedbackApi = {
  getByProject: async (projectId: string): Promise<Feedback[]> => {
    const response = await axiosInstance.get<Feedback[]>(`/feedback/project/${projectId}`);
    return response.data;
  },

  create: async (data: CreateFeedbackDto): Promise<Feedback> => {
    const response = await axiosInstance.post<Feedback>('/feedback', data);
    return response.data;
  },

  updateStatus: async (id: string, status: Feedback['status']): Promise<Feedback> => {
    const response = await axiosInstance.patch<Feedback>(`/feedback/${id}`, { status });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/feedback/${id}`);
  },
};
