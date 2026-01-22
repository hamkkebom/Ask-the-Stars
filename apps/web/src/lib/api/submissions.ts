import { axiosInstance } from './axios';

export interface Submission {
  id: string;
  contestId: string;
  userId: string;
  videoUrl: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  score?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubmissionDto {
  contestId: string;
  videoUrl: string;
  title: string;
  description: string;
}

export const submissionsApi = {
  getMy: async (): Promise<Submission[]> => {
    const response = await axiosInstance.get<Submission[]>('/submissions/my');
    return response.data;
  },

  getByContest: async (contestId: string): Promise<Submission[]> => {
    const response = await axiosInstance.get<Submission[]>(`/submissions/contest/${contestId}`);
    return response.data;
  },

  create: async (data: CreateSubmissionDto): Promise<Submission> => {
    const response = await axiosInstance.post<Submission>('/submissions', data);
    return response.data;
  },

  getById: async (id: string): Promise<Submission> => {
    const response = await axiosInstance.get<Submission>(`/submissions/${id}`);
    return response.data;
  },

  // Admin only
  updateStatus: async (id: string, status: Submission['status'], score?: number): Promise<Submission> => {
    const response = await axiosInstance.patch<Submission>(`/submissions/${id}`, { status, score });
    return response.data;
  },
};
