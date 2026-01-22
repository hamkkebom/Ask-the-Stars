import { axiosInstance } from './axios';

export interface CreateLeadData {
  name: string;
  email: string;
  phone?: string;
  channel?: string;
  interest?: string;
  notes?: string;
}

export const leadsApi = {
  create: async (data: CreateLeadData) => {
    const response = await axiosInstance.post('/leads', data);
    return response.data;
  },
};

// Backward compatibility
export const createLead = leadsApi.create;
