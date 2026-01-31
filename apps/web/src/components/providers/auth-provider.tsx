'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (
    email: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
  updatePassword: (
    newPassword: string
  ) => Promise<{ error: AuthError | null; success: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const {
    setAccessToken,
    setUser: setAuthUser,
    logout: storeLogout,
  } = useAuthStore();

  useEffect(() => {
    // 초기 세션 확인
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);

          // Zustand 스토어 동기화
          if (session) {
            setAccessToken(session.access_token);
            setAuthUser({
              id: session.user.id,
              email: session.user.email || '',
              name:
                session.user.user_metadata?.name || session.user.email || '',
              role: session.user.user_metadata?.role || 'STAR',
            });
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // 인증 상태 변화 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Zustand 스토어 업데이트
      if (session) {
        setAccessToken(session.access_token);
        setAuthUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email || '',
          role: session.user.user_metadata?.role || 'STAR',
        });
      } else {
        storeLogout();
      }

      // 백엔드 JWT 토큰 동기화
      if (session?.access_token) {
        try {
          const response = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              supabaseToken: session.access_token,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.jwtToken) {
              setAccessToken(data.jwtToken);
            }
          }
        } catch (error) {
          console.error('JWT sync error:', error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, setAccessToken, setAuthUser, storeLogout]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error, success: false };
      }

      return { error: null, success: !!data.user };
    } catch (error) {
      return {
        error: { message: '로그인 중 오류가 발생했습니다.' } as AuthError,
        success: false,
      };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'STAR', // 기본 역할
          },
        },
      });

      if (error) {
        return { error, success: false };
      }

      return { error: null, success: !!data.user };
    } catch (error) {
      return {
        error: { message: '회원가입 중 오류가 발생했습니다.' } as AuthError,
        success: false,
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      storeLogout();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { error, success: false };
      }

      return { error: null, success: true };
    } catch (error) {
      return {
        error: {
          message: '비밀번호 재설정 이메일 발송 중 오류가 발생했습니다.',
        } as AuthError,
        success: false,
      };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error, success: false };
      }

      return { error: null, success: true };
    } catch (error) {
      return {
        error: {
          message: '비밀번호 업데이트 중 오류가 발생했습니다.',
        } as AuthError,
        success: false,
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 인증 상태 확인 헬퍼
export function useAuthStatus() {
  const { user, loading, session } = useAuth();

  return {
    isAuthenticated: !!user && !!session,
    isLoading: loading,
    user,
    session,
  };
}
