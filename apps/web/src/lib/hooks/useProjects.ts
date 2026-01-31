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
  }, [options.status, options.clientId, options.limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}

export function useMyProjects(freelancerId: string) {
  const [projects, setProjects] = useState<(Project & { assignment: ProjectAssignment })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchMyProjects = async () => {
      setLoading(true);
      try {
        const { data: assignments, error: assignError } = await supabase
          .from('project_assignments')
          .select('*, projects(*)')
          .eq('freelancer_id', freelancerId)
          .in('status', ['ACCEPTED', 'COMPLETED']);

        if (assignError) throw assignError;

        const enriched = (assignments || []).map((a: any) => ({
          ...a.projects,
          assignment: { id: a.id, project_id: a.project_id, freelancer_id: a.freelancer_id, status: a.status, assigned_at: a.assigned_at },
        }));

        setProjects(enriched);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (freelancerId) fetchMyProjects();
  }, [freelancerId]);

  return { projects, loading, error };
}

export function useProjectMutations() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const acceptProject = async (assignmentId: string) => {
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
  };

  const rejectProject = async (assignmentId: string) => {
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
  };

  return { acceptProject, rejectProject, loading };
}
