import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole, UserRoleType } from '@/types';
import { safeLocalStorage } from '@/lib/storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRoleType;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  hasRole: (role: UserRoleType) => boolean;
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

      hasRole: (role: UserRoleType) => {
        const currentUser = get().user;
        return currentUser ? currentUser.role === role : false;
      },
    }),
    {
      name: 'auth-storage', // key in localStorage
      storage: createJSONStorage(() => safeLocalStorage), // utilize localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }), // persist token and user
    }
  )
);
