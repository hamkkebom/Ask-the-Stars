'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface Video {
  id: string;
  title: string;
  description: string | null;
  status: 'DRAFT' | 'REVIEWING' | 'FEEDBACK' | 'APPROVED' | 'PUBLIC';
  r2_url: string | null;
  stream_url: string | null;
  thumbnail: string | null;
  views: number;
  duration: number | null;
  freelancer_id: string;
  project_id: string | null;
  category: string | null;
  created_at: string;
  approved_at: string | null;
}

interface UseVideosOptions {
  status?: Video['status'];
  category?: string;
  freelancerId?: string;
  limit?: number;
}

export function useVideos(options: UseVideosOptions = {}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (options.status) {
        query = query.eq('status', options.status);
      }
      if (options.category) {
        query = query.eq('category', options.category);
      }
      if (options.freelancerId) {
        query = query.eq('freelancer_id', options.freelancerId);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setVideos(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [
    supabase,
    options.status,
    options.category,
    options.freelancerId,
    options.limit,
  ]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, error, refetch: fetchVideos };
}

export function useVideo(id: string) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const fetchVideo = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      setVideo(data);

      // 조회수 증가
      await supabase
        .from('videos')
        .update({ views: (data?.views || 0) + 1 })
        .eq('id', id);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  return { video, loading, error };
}

export function useVideoMutations() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const createVideo = useCallback(
    async (data: Partial<Video>) => {
      setLoading(true);
      try {
        const { data: video, error } = await supabase
          .from('videos')
          .insert(data)
          .select()
          .single();
        if (error) throw error;
        return { video, error: null };
      } catch (err) {
        return { video: null, error: err as Error };
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const updateVideo = useCallback(
    async (id: string, data: Partial<Video>) => {
      setLoading(true);
      try {
        const { data: video, error } = await supabase
          .from('videos')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return { video, error: null };
      } catch (err) {
        return { video: null, error: err as Error };
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const deleteVideo = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const { error } = await supabase.from('videos').delete().eq('id', id);
        if (error) throw error;
        return { error: null };
      } catch (err) {
        return { error: err as Error };
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  return { createVideo, updateVideo, deleteVideo, loading };
}
