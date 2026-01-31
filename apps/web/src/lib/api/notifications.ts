import { createClient } from '@/lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'FEEDBACK' | 'PROJECT' | 'PAYMENT';
  is_read: boolean;
  link?: string;
  created_at: string;
}

export const notificationsApi = {
  // 내 알림 조회
  getMy: async (userId: string): Promise<Notification[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('getMy notifications error:', error);
      return [];
    }

    return data || [];
  },

  // 읽지 않은 알림만
  getUnread: async (userId: string): Promise<Notification[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getUnread error:', error);
      return [];
    }

    return data || [];
  },

  // 읽음 처리
  markAsRead: async (id: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  },

  // 전체 읽음 처리
  markAllAsRead: async (userId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
  },

  // 읽지 않은 알림 수
  getUnreadCount: async (userId: string): Promise<number> => {
    const supabase = createClient();
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('getUnreadCount error:', error);
      return 0;
    }

    return count || 0;
  },

  // 알림 삭제
  delete: async (id: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // 실시간 구독
  subscribeToNotifications: (
    userId: string,
    onNotification: (notification: Notification) => void
  ): RealtimeChannel => {
    const supabase = createClient();

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onNotification(payload.new as Notification);
        }
      )
      .subscribe();

    return channel;
  },

  // 구독 해제
  unsubscribe: (channel: RealtimeChannel): void => {
    const supabase = createClient();
    supabase.removeChannel(channel);
  },

  // 알림 생성 (서버용, Admin/System)
  create: async (data: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> => {
    const supabase = createClient();
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return notification;
  },
};
