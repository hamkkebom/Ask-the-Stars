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
  updated_at: string;
  // Joined
  client?: { id: string; name: string };
  category?: { id: string; name: string };
}

export interface ProjectAssignment {
  id: string;
  project_id: string;
  freelancer_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED';
  assigned_at: string;
  accepted_at: string | null;
  completed_at: string | null;
  // Joined
  project?: Project;
}

// ProjectRequest is an alias for Project used in project board views
export interface ProjectRequest extends Omit<Project, 'status'> {
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELLED' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  assignments?: ProjectAssignment[];
  // Additional fields used by project board UI
  estimatedBudget?: number;
  categories: string[];
  assignmentType?: 'SINGLE' | 'MULTIPLE';
  currentAssignees?: number;
  maxAssignees?: number;
  createdBy?: { id: string; name: string };
  createdAt: string;
}

export const projectsApi = {
  // 프로젝트 목록 조회
  listProjects: async (params?: {
    status?: string;
    clientId?: string;
    limit?: number;
  }) => {
    const supabase = createClient();

    let query = supabase
      .from('projects')
      .select(`
        *,
        client:users!client_id(id, name),
        category:categories(id, name)
      `)
      .order('created_at', { ascending: false });

    if (params?.status) {
      query = query.eq('status', params.status);
    }
    if (params?.clientId) {
      query = query.eq('client_id', params.clientId);
    }
    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('listProjects error:', error);
      return [];
    }

    return data || [];
  },

  // 프로젝트 생성
  create: async (data: {
    title: string;
    description?: string;
    budget?: number;
    deadline?: string;
    category_id?: string;
  }) => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        title: data.title,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
        category_id: data.category_id,
        client_id: userData.user.id,
        status: 'OPEN',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  // 단일 프로젝트 조회
  getProject: async (id: string): Promise<Project | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:users!client_id(id, name),
        category:categories(id, name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('getProject error:', error);
      return null;
    }

    return data;
  },

  // 단일 프로젝트 요청 조회 (ProjectRequest 형태로 반환)
  getRequest: async (id: string): Promise<ProjectRequest | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:users!client_id(id, name),
        category:categories(id, name),
        assignments:project_assignments(id, freelancer_id, status)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('getRequest error:', error);
      return null;
    }

    // Map to ProjectRequest type
    return {
      ...data,
      categories: data.category ? [data.category.name] : [],
      estimatedBudget: data.budget,
      createdAt: data.created_at,
      createdBy: data.client,
      currentAssignees: data.assignments?.length || 0,
      maxAssignees: 5, // Default value
    } as ProjectRequest;
  },

  // 내 할당된 프로젝트 (프리랜서)
  getMyAssignments: async (freelancerId?: string): Promise<ProjectAssignment[]> => {
    const supabase = createClient();

    // If no freelancerId provided, get from authenticated user
    let userId = freelancerId;
    if (!userId) {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];
      userId = userData.user.id;
    }

    const { data, error } = await supabase
      .from('project_assignments')
      .select(`
        *,
        project:projects(
          *,
          client:users!client_id(id, name)
        ),
        request:projects(id, title, deadline, description)
      `)
      .eq('freelancer_id', userId)
      .order('assigned_at', { ascending: false });

    if (error) {
      console.error('getMyAssignments error:', error);
      return [];
    }

    return data || [];
  },

  // 프로젝트 보드 (OPEN 프로젝트만)
  getProjectBoard: async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:users!client_id(id, name),
        category:categories(id, name)
      `)
      .eq('status', 'OPEN')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getProjectBoard error:', error);
      return [];
    }

    return data || [];
  },

  // 프로젝트 요청 목록 (getProjectBoard의 별칭)
  getProjectRequests: async (): Promise<ProjectRequest[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        client:users!client_id(id, name),
        category:categories(id, name),
        assignments:project_assignments(id, freelancer_id, status)
      `)
      .in('status', ['OPEN', 'IN_PROGRESS', 'REVIEW'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getProjectRequests error:', error);
      return [];
    }

    return (data || []) as ProjectRequest[];
  },

  // 프로젝트 수락
  acceptAssignment: async (assignmentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('project_assignments')
      .update({
        status: 'ACCEPTED',
        accepted_at: new Date().toISOString()
      })
      .eq('id', assignmentId);

    if (error) throw error;
  },

  // 프로젝트 거절
  rejectAssignment: async (assignmentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('project_assignments')
      .update({ status: 'REJECTED' })
      .eq('id', assignmentId);

    if (error) throw error;
  },

  // 제출물 업로드
  submitWork: async (assignmentId: string, videoId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('project_assignments')
      .update({ status: 'SUBMITTED' })
      .eq('id', assignmentId);

    if (error) throw error;
  },

  // 프로젝트 완료 처리
  completeAssignment: async (assignmentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('project_assignments')
      .update({
        status: 'COMPLETED',
        completed_at: new Date().toISOString()
      })
      .eq('id', assignmentId);

    if (error) throw error;
  },

  // 프로젝트 생성 (Admin/Client용)
  createProject: async (data: Partial<Project>) => {
    const supabase = createClient();
    const { data: project, error } = await supabase
      .from('projects')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  // 프로젝트 수정
  updateProject: async (id: string, data: Partial<Project>) => {
    const supabase = createClient();
    const { data: project, error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  // 프리랜서 할당
  assignFreelancer: async (projectId: string, freelancerId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('project_assignments')
      .insert({
        project_id: projectId,
        freelancer_id: freelancerId,
        status: 'PENDING',
        assigned_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 프로젝트 요청 수락 (open-projects page용)
  acceptRequest: async (projectId: string) => {
    // This creates a project assignment for the current user
    // In reality, this should use the authenticated user's ID
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('project_assignments')
      .insert({
        project_id: projectId,
        freelancer_id: userData.user.id,
        status: 'ACCEPTED',
        assigned_at: new Date().toISOString(),
        accepted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 제작 요청 생성 (requests/create 페이지용)
  createRequest: async (data: {
    title: string;
    description?: string;
    categories?: string[];
    deadline?: string;
    estimatedBudget?: number;
    maxAssignees?: number;
    assignmentType?: string;
    targetCounselorId?: string;
  }) => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        title: data.title,
        description: data.description,
        budget: data.estimatedBudget,
        deadline: data.deadline,
        client_id: userData.user.id,
        status: 'OPEN',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  // 제출 생성 (direct-upload 등에서 사용)
  createSubmission: async (data: {
    projectId?: string;
    assignmentId?: string;
    videoUrl?: string;
    streamUid?: string;
    description?: string;
    notes?: string;
  }) => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    // If assignmentId provided, get the project_id from assignment
    let projectId = data.projectId;
    if (!projectId && data.assignmentId) {
      const { data: assignment } = await supabase
        .from('project_assignments')
        .select('project_id')
        .eq('id', data.assignmentId)
        .single();
      projectId = assignment?.project_id;
    }

    const { data: submission, error } = await supabase
      .from('submissions')
      .insert({
        project_id: projectId,
        assignment_id: data.assignmentId,
        freelancer_id: userData.user.id,
        video_url: data.videoUrl || data.streamUid,
        stream_uid: data.streamUid,
        description: data.description || data.notes,
        status: 'PENDING',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return submission;
  },
};
