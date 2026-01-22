import { axiosInstance } from './axios';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  isRead: boolean;
  createdAt: string;
}

export const notificationsApi = {
  getMy: async (): Promise<Notification[]> => {
    const response = await axiosInstance.get<Notification[]>('/notifications/my');
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await axiosInstance.patch(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.patch('/notifications/read-all');
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const response = await axiosInstance.get<{ count: number }>('/notifications/unread-count');
    return response.data;
  },
};
