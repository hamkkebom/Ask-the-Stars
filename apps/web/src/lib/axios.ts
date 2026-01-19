import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Environment variable for API URL
// Fallback to localhost for development if not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If using cookies in the future
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Zustand store (localStorage)
    // We access the valid state even outside of React components via getState()
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 (Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // TODO: Implement Token Refresh Logic here if using Refresh Tokens
      // For MVP, we might just log out the user
      const { logout } = useAuthStore.getState();
      logout();

      // Optional: Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
