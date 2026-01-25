
import { axiosInstance } from './axios';

export interface Submission {
  id: string;
  projectId?: string;
  assignmentId?: string;
  userId: string;
  videoUrl: string;
  streamUid?: string;
  thumbnailUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION';
  notes?: string;
  createdAt: string;
  version: number;
  signedToken?: string;
  user?: {
      id: string;
      name: string;
      profileImage?: string;
      email?: string;
  };
  assignment?: {
      request: {
          title: string;
      };
  };
  project?: {
      title: string;
  };
}

export interface CreateSubmissionDto {
  assignmentId: string;
  streamUid: string;
  notes?: string;
}

export const submissionsApi = {
  getAll: async (projectId?: string) => {
    const response = await axiosInstance.get<Submission[]>('/submissions', {
      params: { projectId }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<Submission>(`/submissions/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: Submission['status'], notes?: string) => {
    const response = await axiosInstance.patch(`/submissions/${id}`, { status, notes });
    return response.data;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/submissions/${id}`);
  }
};
