import apiClient from '../axios';
import { SignupDto, LoginDto, User } from '@ask-the-stars/types';

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  // Placeholder for password reset (Phase 8.2 Missing Requirement)
  requestPasswordReset: async (email: string) => {
    // TODO: Implement backend endpoint first
    return apiClient.post('/auth/password-reset/request', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    // TODO: Implement backend endpoint first
    return apiClient.patch('/auth/password-reset/confirm', { token, newPassword });
  },

  verifyEmail: async (token: string) => {
    return apiClient.post('/auth/verify-email', { token });
  }
};
