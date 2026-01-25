
import { axiosInstance } from './axios';

export interface ProjectRequest {
  id: string;
  title: string;
  description: string;
  categories: string[];
  deadline: string;
  estimatedBudget: number | null;
  currentAssignees: number;
  maxAssignees: number;
  status: 'OPEN' | 'FULL' | 'CLOSED';
}

export const projectsApi = {
  // --- Public Board ---
  getProjectRequests: async () => {
    const response = await axiosInstance.get<ProjectRequest[]>('/projects/requests/board');
    return response.data;
  },

  findAll: async () => {
    const response = await axiosInstance.get<ProjectRequest[]>('/projects/requests/board');
    return response.data;
  },

  acceptRequest: async (requestId: string) => {
    const response = await axiosInstance.post(`/projects/requests/${requestId}/accept`);
    return response.data;
  },

  getRequest: async (requestId: string) => {
      const response = await axiosInstance.get<ProjectRequest>(`/projects/requests/${requestId}`);
      return response.data;
  },

  create: async (data: any) => {
    const response = await axiosInstance.post('/projects/requests', data);
    return response.data;
  },

  // --- My Dashboard ---
  getMyAssignments: async () => {
    const response = await axiosInstance.get<any[]>('/projects/my-assignments');
    return response.data;
  },

  // --- Submissions ---
  createSubmission: async (data: { assignmentId: string; streamUid: string; notes?: string }) => {
      const response = await axiosInstance.post('/submissions', data);
      return response.data;
  }
};
