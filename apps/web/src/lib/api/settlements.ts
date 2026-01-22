import { axiosInstance } from './axios';

export interface Settlement {
  id: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  type: 'PRIMARY' | 'SECONDARY';
  period: string;
  projectCount: number;
  createdAt: string;
  paidAt?: string;
}

export interface SettlementSummary {
  totalEarnings: number;
  pendingAmount: number;
  paidAmount: number;
  settlementCount: number;
}

export const settlementsApi = {
  getMy: async (): Promise<Settlement[]> => {
    const response = await axiosInstance.get<Settlement[]>('/settlements/my');
    return response.data;
  },

  getSummary: async (): Promise<SettlementSummary> => {
    const response = await axiosInstance.get<SettlementSummary>('/settlements/summary');
    return response.data;
  },

  getById: async (id: string): Promise<Settlement> => {
    const response = await axiosInstance.get<Settlement>(`/settlements/${id}`);
    return response.data;
  },

  // Admin only
  process: async (id: string): Promise<Settlement> => {
    const response = await axiosInstance.post<Settlement>(`/settlements/${id}/process`);
    return response.data;
  },
};
