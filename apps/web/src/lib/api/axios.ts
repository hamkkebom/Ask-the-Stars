import axios, { AxiosError } from 'axios';
import { captureError } from '@/lib/sentry';

const API_VERSION = 'v1';

const getBaseUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = rawUrl.replace(/\/$/, '');
  if (url.endsWith('/api')) {
    return `${url}/${API_VERSION}`;
  }
  return `${url}/api/${API_VERSION}`;
};

const API_URL = getBaseUrl();

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage);
          if (state?.accessToken) {
            config.headers.Authorization = `Bearer ${state.accessToken}`;
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Extract error details
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();

    // Log to Sentry with context
    captureError(error as Error, {
      api_error: true,
      status,
      url,
      method,
      response_data: error.response?.data,
    });

    // Handle specific status codes
    if (status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/auth/login';
      }
    } else if (status === 403) {
      console.error('Access forbidden:', url);
    } else if (status === 404) {
      console.error('Resource not found:', url);
    } else if (status && status >= 500) {
      console.error('Server error:', status, url);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', url);
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error - server may be down');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
