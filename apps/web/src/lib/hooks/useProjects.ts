'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELLED';
  budget: number | null;
  deadline: string | null;
  client_id: string;
  created_at: string;
}

export interface ProjectAssignment {
  id: string;
  project_id: string;
  freelancer_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  assigned_at: string;
}

interface UseProjectsOptions {
  status?: Project['status'];
  clientId?: string;
  freelancerId?: string;
  limit?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (options.status) {
        query = query.eq('status', options.status);
      }
      if (options.clientId) {
        query = query.eq('client_id', options.clientId);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [supabase, options.status, options.clientId, options.limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error };
}

export function useProjectMutations() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const acceptProject = useCallback(
    async (assignmentId: string) => {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('project_assignments')
          .update({ status: 'ACCEPTED' })
          .eq('id', assignmentId);
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

  const rejectProject = useCallback(
    async (assignmentId: string) => {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('project_assignments')
          .update({ status: 'REJECTED' })
          .eq('id', assignmentId);
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

  return { acceptProject, rejectProject, loading };
}
