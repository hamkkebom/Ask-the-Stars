'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Search,
  HelpCircle,
  Bell,
  ChevronDown,
  Upload,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

interface StudioHeaderProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  variant: 'stars' | 'admin';
  sidebarCollapsed?: boolean;
}

export function StudioHeader({
  title,
  breadcrumbs = [],
  variant,
  sidebarCollapsed = false,
}: StudioHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: '피드백 도착', desc: '브랜드 영상에 수정 요청', time: '5분 전', unread: true },
    { id: 2, title: '정산 완료', desc: '₩320,000 입금 완료', time: '1시간 전', unread: false },
    { id: 3, title: '새 프로젝트', desc: '기업 홍보 영상 의뢰', time: '3시간 전', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-14 bg-[#0f0f0f] border-b border-[#3f3f3f] z-40 flex items-center justify-between px-4',
        sidebarCollapsed ? 'left-[72px]' : 'left-[240px]',
        'transition-all duration-300'
      )}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href={variant === 'stars' ? '/stars/dashboard' : '/admin'}
          className="text-[#aaa] hover:text-white transition-colors"
        >
          {variant === 'stars' ? 'Stars Studio' : 'Admin'}
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-[#3f3f3f]">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="text-[#aaa] hover:text-white transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white">{crumb.label}</span>
            )}
          </div>
        ))}
        {title && !breadcrumbs.length && (
          <>
            <span className="text-[#3f3f3f]">/</span>
            <span className="text-white">{title}</span>
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-[#121212] border border-[#3f3f3f] rounded-full px-3 py-1.5">
              <Search className="w-4 h-4 text-[#aaa]" />
              <input
                type="text"
                placeholder="검색..."
                className="bg-transparent border-none outline-none text-white text-sm w-48"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-[#272727] rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-[#aaa]" />
            </button>
          )}
        </div>

        {/* Upload Button (Stars only) */}
        {variant === 'stars' && (
          <Link
            href="/stars/upload"
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-medium transition-colors"
          >
            <Upload className="w-4 h-4" />
            업로드
          </Link>
        )}

        {/* Help */}
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
          <HelpCircle className="w-5 h-5 text-[#aaa]" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 hover:bg-[#272727] rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-[#aaa]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#212121] border border-[#3f3f3f] rounded-lg shadow-xl overflow-hidden">
              <div className="p-3 border-b border-[#3f3f3f]">
                <h3 className="text-white font-medium">알림</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-3 hover:bg-[#3f3f3f] cursor-pointer transition-colors border-b border-[#3f3f3f] last:border-0',
                      notification.unread && 'bg-[#272727]'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{notification.title}</p>
                        <p className="text-[#aaa] text-xs truncate">{notification.desc}</p>
                        <p className="text-[#666] text-xs mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 hover:bg-[#272727] rounded-full transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-black">
              K
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#212121] border border-[#3f3f3f] rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-[#3f3f3f]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg font-bold text-black">
                    K
                  </div>
                  <div>
                    <p className="text-white font-medium">김프리랜서</p>
                    <p className="text-[#aaa] text-xs">freelancer@email.com</p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <Link
                  href={variant === 'stars' ? '/stars/profile' : '/admin/settings'}
                  className="flex items-center gap-3 px-4 py-2 text-[#aaa] hover:bg-[#3f3f3f] hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">프로필</span>
                </Link>
                <Link
                  href={variant === 'stars' ? '/stars/settings' : '/admin/settings'}
                  className="flex items-center gap-3 px-4 py-2 text-[#aaa] hover:bg-[#3f3f3f] hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">설정</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-[#aaa] hover:bg-[#3f3f3f] hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">로그아웃</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
