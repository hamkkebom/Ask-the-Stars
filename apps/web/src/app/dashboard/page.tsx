'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@ask-the-stars/types';
import { StarDashboard } from '@/components/dashboard/star-dashboard';
import { CounselorDashboard } from '@/components/dashboard/counselor-dashboard';
import { Button } from '@ask-the-stars/ui';
import { Loader2 } from 'lucide-react';
import { authApi } from '@/lib/api/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, accessToken, logout, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. If no token, redirect to login
      if (!accessToken) {
        router.push('/auth/login');
        return;
      }

      // 2. If token exists but no user data (e.g. refresh), fetch profile
      if (!user) {
        try {
            const profile = await authApi.getProfile();
            setUser(profile);
        } catch (error) {
            console.error('Failed to fetch profile', error);
            logout(); // Clear invalid token
            router.push('/auth/login');
            return;
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [accessToken, user, router, logout, setUser]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) return null; // Should have redirected

  return (
    <div className="flex min-h-screen flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
            <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2 font-bold" href="/dashboard">
                   별들에게 물어봐
                </a>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{user.name}님</span>
                <Button variant="ghost" size="sm" onClick={() => {
                    logout();
                    router.push('/auth/login');
                }}>
                    로그아웃
                </Button>
            </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {user.role === UserRole.STAR && <StarDashboard user={user} />}
        {user.role === UserRole.COUNSELOR && <CounselorDashboard user={user} />}
        {/* Fallback or Admin view could go here */}
      </main>
    </div>
  );
}
