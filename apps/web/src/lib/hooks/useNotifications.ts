import { useState, useEffect, useCallback } from 'react';
import { notificationsApi, Notification } from '@/lib/api/notifications';
import { useAuth } from './useAuth';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // 알림 목록 로드
  const loadNotifications = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [data, count] = await Promise.all([
        notificationsApi.getMy(user.id),
        notificationsApi.getUnreadCount(user.id),
      ]);
      setNotifications(data);
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user, notificationsApi]);

  // 실시간 구독 설정
  useEffect(() => {
    if (!user) return;

    loadNotifications();

    // 실시간 알림 구독
    const realtimeChannel = notificationsApi.subscribeToNotifications(
      user.id,
      (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    );

    setChannel(realtimeChannel);

    return () => {
      if (realtimeChannel) {
        notificationsApi.unsubscribe(realtimeChannel);
      }
    };
  }, [user, loadNotifications, notificationsApi]);

  // 읽음 처리
  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  }, []);

  // 전체 읽음 처리
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      await notificationsApi.markAllAsRead(user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  }, [user]);

  // 알림 삭제
  const deleteNotification = useCallback(
    async (id: string) => {
      try {
        await notificationsApi.delete(id);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        // 삭제된 알림이 읽지 않은 것이었다면 카운트 감소
        const deletedNotification = notifications.find((n) => n.id === id);
        if (deletedNotification && !deletedNotification.is_read) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (error) {
        console.error('Failed to delete notification:', error);
      }
    },
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: loadNotifications,
  };
}
