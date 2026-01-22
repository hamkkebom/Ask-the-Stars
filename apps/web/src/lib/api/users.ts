import { axiosInstance } from './axios';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STAR' | 'CLIENT' | 'STUDENT' | 'COUNSELOR';
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}

export const usersApi = {
  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileDto): Promise<User> => {
    const response = await axiosInstance.patch<User>('/users/me', data);
    return response.data;
  },

  // Admin only
  getAll: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },

  updateRole: async (id: string, role: User['role']): Promise<User> => {
    const response = await axiosInstance.patch<User>(`/users/${id}/role`, { role });
    return response.data;
  },
};
