'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { Notification } from '@/lib/api/notifications';
import { cn } from '@/lib/utils';

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'SUCCESS':
      return '✅';
    case 'WARNING':
      return '⚠️';
    case 'ERROR':
      return '❌';
    case 'FEEDBACK':
      return '💬';
    case 'PROJECT':
      return '📁';
    case 'PAYMENT':
      return '💰';
    default:
      return '🔔';
  }
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  return date.toLocaleDateString('ko-KR');
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="알림"
      >
        <Bell className="w-5 h-5 text-[#aaa] hover:text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#3f3f3f]">
            <h3 className="text-white font-semibold">알림</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-[#aaa] hover:text-white transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                모두 읽음
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-[#666]">로딩 중...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-[#666]">알림이 없습니다</div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'px-4 py-3 border-b border-[#3f3f3f] last:border-b-0 hover:bg-[#3f3f3f] transition-colors',
                    !notification.is_read && 'bg-blue-500/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm truncate',
                          notification.is_read
                            ? 'text-[#aaa]'
                            : 'text-white font-medium'
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#666] mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-[#555] mt-1">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.is_read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="읽음 처리"
                        >
                          <Check className="w-3.5 h-3.5 text-[#666]" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="삭제"
                      >
                        <X className="w-3.5 h-3.5 text-[#666]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 10 && (
            <div className="px-4 py-2 border-t border-[#3f3f3f]">
              <Link
                href="/notifications"
                className="text-xs text-[#aaa] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                전체 알림 보기 →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
