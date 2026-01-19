import { axiosInstance } from './axios';

export interface UploadResponse {
  url: string;
  key: string;
}

export const uploadsApi = {
  uploadFile: async (file: File, folder: 'images' | 'videos' = 'images'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    // Note: The backend controller currently determines folder by mimetype,
    // but we can extend it to accept a folder param if needed.
    // For now, we just send the file.

    const { data } = await axiosInstance.post<UploadResponse>('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};
