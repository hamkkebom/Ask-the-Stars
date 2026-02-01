'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Settings,
  LayoutDashboard,
  Video,
  Upload,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 사용자 역할 타입
type UserRole = 'GUEST' | 'STAR' | 'ADMIN';

interface UserSession {
  isAuthenticated: boolean;
  role: UserRole;
  name?: string;
  avatarUrl?: string;
}

// TODO: 실제 auth hook으로 교체
function useAuth(): UserSession {
  // 임시: 로그인 안됨 상태
  return {
    isAuthenticated: false,
    role: 'GUEST',
  };
}

export function SimpleHeader() {
  const pathname = usePathname();
  const { isAuthenticated, role, name } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // 권한별 메뉴 정의
  const getNavItems = () => {
    const baseItems = [{ label: '영상', href: '/videos', icon: Video }];

    if (role === 'STAR' || role === 'ADMIN') {
      baseItems.push(
        { label: '대시보드', href: '/stars/dashboard', icon: LayoutDashboard },
        { label: '업로드', href: '/stars/upload', icon: Upload },
        { label: '수입', href: '/stars/earnings', icon: Wallet }
      );
    }

    if (role === 'ADMIN') {
      baseItems.push({ label: '관리자', href: '/admin', icon: Settings });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              🌟
            </span>
            <span className="text-lg font-bold text-white">함께봄</span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 우측 액션 */}
          <div className="flex items-center gap-2">
            {/* 검색 */}
            <Link
              href="/search"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </Link>

            {isAuthenticated ? (
              <>
                {/* 알림 */}
                <button
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
                  aria-label="알림"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* 프로필 드롭다운 */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-gray-400 transition-transform hidden sm:block',
                        isProfileOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-white/10">
                          <p className="text-sm font-medium text-white">
                            {name || '사용자'}
                          </p>
                          <p className="text-xs text-gray-500">{role}</p>
                        </div>
                        <Link
                          href="/stars/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          프로필
                        </Link>
                        <Link
                          href="/stars/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          설정
                        </Link>
                        <button
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5"
                          onClick={() => {
                            setIsProfileOpen(false);
                            // TODO: 로그아웃 처리
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          로그아웃
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* 비로그인: 로그인/시작하기 */}
                <Link
                  href="/auth/login"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-orange-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                  시작하기
                </Link>
              </>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all',
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* 모바일 검색 */}
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
              >
                <Search className="w-5 h-5" />
                검색
              </Link>

              {/* 모바일 인증 버튼 */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-white/5 rounded-xl font-medium"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-white font-semibold rounded-xl bg-gradient-to-r from-primary to-orange-500"
                  >
                    시작하기
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
