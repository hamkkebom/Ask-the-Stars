import { axiosInstance } from './axios';

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  deadline?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
  deadline?: string;
  budget?: number;
}

export const projectsApi = {
  create: async (data: CreateProjectDto): Promise<Project> => {
    const response = await axiosInstance.post<Project>('/projects', data);
    return response.data;
  },

  findAll: async (): Promise<Project[]> => {
    const response = await axiosInstance.get<Project[]>('/projects');
    return response.data;
  },

  findOne: async (id: string): Promise<Project> => {
    const response = await axiosInstance.get<Project>(`/projects/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateProjectDto>): Promise<Project> => {
    const response = await axiosInstance.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${id}`);
  },
};
