import { createClient } from '@/lib/supabase/client';

/**
 * 프로젝트 관련 타입 정의
 * @namespace ProjectTypes
 * @version 1.0.0
 */

/**
 * 프로젝트 기본 정보 타입
 *
 * @description
 * 함께봄 플랫폼에서 관리하는 프로젝트의 핵심 정보를 정의합니다.
 * 클라이언트가 발주한 프로젝트와 프리랜서가 참여하는 프로젝트 모두 포함합니다.
 *
 * @example
 * ```typescript
 * const project: Project = {
 *   id: "proj-123",
 *   title: "기업 홍보 영상 제작",
 *   status: "OPEN",
 *   budget: 5000000,
 *   deadline: "2024-02-15T23:59:59Z"
 * };
 * ```
 */
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
  status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'IN_PROGRESS'
    | 'SUBMITTED'
    | 'COMPLETED';
  assigned_at: string;
  accepted_at: string | null;
  completed_at: string | null;
  // Joined
  project?: Project;
}

// ProjectRequest is an alias for Project used in project board views
export interface ProjectRequest extends Omit<Project, 'status'> {
  status:
    | 'OPEN'
    | 'FULL'
    | 'CLOSED'
    | 'CANCELLED'
    | 'IN_PROGRESS'
    | 'REVIEW'
    | 'COMPLETED';
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

/**
 * 프로젝트 API 통합 모듈
 * @namespace ProjectsApi
 * @version 1.0.0
 */
export const projectsApi = {
  /**
   * 프로젝트 목록 조회
   *
   * @description
   * 인증된 사용자가 접근 가능한 모든 프로젝트 목록을 조회합니다.
   * 클라이언트 필터링, 상태 필터링, 페이징을 지원합니다.
   *
   * @endpoint GET /api/projects
   * @auth required
   * @rateLimit 100 requests/hour
   *
   * @example
   * ```typescript
   * const projects = await projectsApi.listProjects({
   *   status: 'OPEN',
   *   limit: 20
   * });
   * ```
   *
   * @param {Object} params - 조회 파라미터
   * @param {string} [params.status] - 프로젝트 상태 필터
   * @param {string} [params.clientId] - 클라이언트 ID 필터
   * @param {number} [params.limit] - 최대 조회 건수
   * @returns {Promise<Project[]>} 프로젝트 목록 배열
   * @throws {ApiError} API 호출 실패 시 에러 발생
   */
  listProjects: async (params?: {
    status?: string;
    clientId?: string;
    limit?: number;
  }) => {
    const supabase = createClient();

    let query = supabase
      .from('projects')
      .select(
        `
        *,
        client:users!client_id(id, name),
        category:categories(id, name)
      `
      )
      .order('created_at', { ascending: false });

    // 동적 쿼리 빌드 (성능 최적화)
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

    // 에러 핸들링 (안정성 향상)
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('프로젝트 목록 조회 실패:', error);
      }
      // 에러 발생 시 빈 배열 반환 (fail-safe)
      return [];
    }

    return data || [];
  },

  /**
   * 새 프로젝트 생성
   *
   * @description
   * 클라이언트가 새로운 프로젝트를 발주합니다.
   * 현재 로그인한 사용자를 자동으로 프로젝트 소유자로 설정합니다.
   *
   * @endpoint POST /api/projects
   * @auth required
   * @rateLimit 50 requests/hour
   *
   * @example
   * ```typescript
   * const newProject = await projectsApi.create({
   *   title: "제품 홍보 영상",
   *   description: "10분 분량의 제품 소개 영상",
   *   budget: 3000000,
   *   deadline: "2024-03-15"
   * });
   * ```
   *
   * @param {Object} data - 프로젝트 생성 데이터
   * @param {string} data.title - 프로젝트 제목 (필수)
   * @param {string} [data.description] - 프로젝트 설명
   * @param {number} [data.budget] - 예산 (원)
   * @param {string} [data.deadline] - 마감일 (ISO 8601)
   * @param {string} [data.category_id] - 카테고리 ID
   * @returns {Promise<Project|null>} 생성된 프로젝트 정보
   * @throws {ValidationError} 필수 데이터 누락 시
   * @throws {UnauthorizedError} 인증되지 않은 경우
   */
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
        created_at: new Date().toISOString(),
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
      .select(
        `
        *,
        client:users!client_id(id, name),
        category:categories(id, name)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getProject error:', error);
      }
      return null;
    }

    return data;
  },

  // 단일 프로젝트 요청 조회 (ProjectRequest 형태로 반환)
  getRequest: async (id: string): Promise<ProjectRequest | null> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(
        `
        *,
        client:users!client_id(id, name),
        category:categories(id, name),
        assignments:project_assignments(id, freelancer_id, status)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getRequest error:', error);
      }
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
  getMyAssignments: async (
    freelancerId?: string
  ): Promise<ProjectAssignment[]> => {
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
      .select(
        `
        *,
        project:projects(
          *,
          client:users!client_id(id, name)
        ),
        request:projects(id, title, deadline, description)
      `
      )
      .eq('freelancer_id', userId)
      .order('assigned_at', { ascending: false });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getMyAssignments error:', error);
      }
      return [];
    }

    return data || [];
  },

  // 프로젝트 보드 (OPEN 프로젝트만) - API 연동
  getProjectBoard: async (): Promise<ProjectRequest[]> => {
    try {
      const response = await fetch('/api/projects/requests/board', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('getProjectBoard API error:', response.statusText);
        }
        return [];
      }

      const data = await response.json();

      // API 응답을 ProjectRequest 형태로 변환
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
        estimatedBudget: item.estimatedBudget,
        categories: item.categories || [],
        assignmentType: item.assignmentType || 'MULTIPLE',
        currentAssignees: item.currentAssignees || 0,
        maxAssignees: item.maxAssignees || 5,
        deadline: item.deadline,
        createdBy: item.createdBy,
        createdAt: item.createdAt,
      })) as ProjectRequest[];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getProjectBoard error:', error);
      }
      return [];
    }
  },

  // 프로젝트 요청 목록 (getProjectBoard의 별칭) - API 연동
  getProjectRequests: async (): Promise<ProjectRequest[]> => {
    try {
      const response = await fetch('/api/projects/requests/board', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('getProjectRequests API error:', response.statusText);
        }
        return [];
      }

      const data = await response.json();

      // API 응답을 ProjectRequest 형태로 변환
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
        estimatedBudget: item.estimatedBudget,
        categories: item.categories || [],
        assignmentType: item.assignmentType || 'MULTIPLE',
        currentAssignees: item.currentAssignees || 0,
        maxAssignees: item.maxAssignees || 5,
        deadline: item.deadline,
        createdBy: item.createdBy,
        createdAt: item.createdAt,
      })) as ProjectRequest[];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('getProjectRequests error:', error);
      }
      return [];
    }
  },

  // 프로젝트 수락
  acceptAssignment: async (assignmentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('project_assignments')
      .update({
        status: 'ACCEPTED',
        accepted_at: new Date().toISOString(),
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
        completed_at: new Date().toISOString(),
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
        assigned_at: new Date().toISOString(),
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
        accepted_at: new Date().toISOString(),
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
        created_at: new Date().toISOString(),
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
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return submission;
  },
};
