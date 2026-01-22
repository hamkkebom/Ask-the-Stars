'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Bell, CheckCircle, AlertCircle, MessageSquare,
  DollarSign, FileText, Settings, Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'message' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'payment', title: '정산 완료', message: '1월 2주차 정산 ₩350,000이 입금되었습니다.', time: '10분 전', read: false, link: '/admin/finance' },
  { id: '2', type: 'message', title: '새 피드백', message: '프로젝트 "신년운세 영상"에 새 피드백이 등록되었습니다.', time: '1시간 전', read: false, link: '/admin/stars/reviews' },
  { id: '3', type: 'warning', title: '마감 임박', message: '프로젝트 3건의 마감이 24시간 이내입니다.', time: '2시간 전', read: false, link: '/admin/tasks' },
  { id: '4', type: 'success', title: '프로젝트 승인', message: '프로젝트 "타로 영상"이 최종 승인되었습니다.', time: '3시간 전', read: true },
  { id: '5', type: 'info', title: '시스템 공지', message: '1월 25일 02:00-04:00 서버 점검이 예정되어 있습니다.', time: '1일 전', read: true },
  { id: '6', type: 'message', title: '새 문의', message: '고객센터에 새 문의가 접수되었습니다.', time: '2일 전', read: true },
];

const typeConfig = {
  info: { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  warning: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  message: { icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  payment: { icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/20' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n =>
    filter === 'all' || !n.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Bell className="w-8 h-8 text-primary" />
            알림
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-sm font-medium">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-400 mt-1">시스템 알림 및 활동 내역</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors"
          >
            모두 읽음 처리
          </button>
          <Link
            href="/admin/settings"
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === 'all' ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            filter === 'unread' ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          읽지 않음 ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification, index) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <m.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className={cn(
                "p-4 transition-all",
                !notification.read && "border-l-4 border-primary"
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
                    <Icon className={cn("w-5 h-5", config.color)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={cn(
                          "font-medium",
                          notification.read ? "text-gray-300" : "text-white"
                        )}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      {notification.link && (
                        <Link
                          href={notification.link}
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-primary hover:underline"
                        >
                          자세히 보기
                        </Link>
                      )}
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          읽음 처리
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-sm text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">알림이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

