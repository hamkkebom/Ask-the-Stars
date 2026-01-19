import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole } from '@ask-the-stars/types';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },

      setUser: (user: User) => {
        set({ user });
      },

      logout: () => {
        set({ accessToken: null, user: null });
        // Optional: Clear any other local storage or cookies if needed
      },

      hasRole: (role: UserRole) => {
        const currentUser = get().user;
        return currentUser ? currentUser.role === role : false;
      },
    }),
    {
      name: 'auth-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage), // utilize localStorage
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user }), // persist token and user
    }
  )
);
