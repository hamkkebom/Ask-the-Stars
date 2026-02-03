import { describe, it, expect, vi, beforeEach } from 'vitest';
import { projectsApi } from '@/lib/api/projects';

const mockSupabase = {
  from: vi.fn(),
  auth: {
    getUser: vi.fn(),
  },
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase,
}));

const createQuery = (result: { data: unknown; error: unknown }) => {
  const query = {
    select: vi.fn(() => query),
    order: vi.fn(() => query),
    eq: vi.fn(() => query),
    limit: vi.fn(() => query),
    insert: vi.fn(() => query),
    update: vi.fn(() => query),
    single: vi.fn(() => query),
    then: (
      onFulfilled?: (value: { data: unknown; error: unknown }) => unknown
    ) => Promise.resolve(result).then(onFulfilled),
  };
  return query;
};

describe('projectsApi', () => {
  beforeEach(() => {
    mockSupabase.from.mockReset();
    mockSupabase.auth.getUser.mockReset();
    vi.restoreAllMocks();
  });

  it('lists projects and applies filters', async () => {
    const query = createQuery({ data: [{ id: 'p1' }], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.listProjects({
      status: 'OPEN',
      clientId: 'c1',
      limit: 2,
    });

    expect(query.eq).toHaveBeenCalledWith('status', 'OPEN');
    expect(query.eq).toHaveBeenCalledWith('client_id', 'c1');
    expect(query.limit).toHaveBeenCalledWith(2);
    expect(response).toEqual([{ id: 'p1' }]);
  });

  it('lists projects without filters', async () => {
    const query = createQuery({ data: [{ id: 'p2' }], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.listProjects();

    expect(query.eq).not.toHaveBeenCalled();
    expect(response).toEqual([{ id: 'p2' }]);
  });

  it('returns empty array on listProjects error', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.listProjects();

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });

  it('creates project for authenticated user', async () => {
    const query = createQuery({ data: { id: 'p1' }, error: null });
    mockSupabase.from.mockReturnValue(query);
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
    });

    const response = await projectsApi.create({ title: 'New Project' });

    expect(mockSupabase.auth.getUser).toHaveBeenCalled();
    expect(response).toEqual({ id: 'p1' });
  });

  it('throws when creating project without user', async () => {
    const query = createQuery({ data: null, error: null });
    mockSupabase.from.mockReturnValue(query);
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

    await expect(projectsApi.create({ title: 'No User' })).rejects.toThrow(
      'User not authenticated'
    );
  });

  it('returns null when getProject fails', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.getProject('p1');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toBeNull();
  });

  it('returns project on success', async () => {
    const query = createQuery({ data: { id: 'p1' }, error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.getProject('p1');

    expect(response).toEqual({ id: 'p1' });
  });

  it('maps project request response', async () => {
    const query = createQuery({
      data: {
        id: 'p2',
        title: 'Request',
        description: 'Desc',
        status: 'OPEN',
        budget: 100,
        created_at: '2025-01-01',
        category: { name: '카테고리' },
        client: { id: 'c1', name: 'Client' },
        assignments: [{ id: 'a1', freelancer_id: 'f1', status: 'PENDING' }],
      },
      error: null,
    });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.getRequest('p2');

    expect(response?.categories).toEqual(['카테고리']);
    expect(response?.estimatedBudget).toBe(100);
    expect(response?.currentAssignees).toBe(1);
  });

  it('returns null when getRequest fails', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.getRequest('p2');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toBeNull();
  });

  it('returns assignments for freelancer', async () => {
    const query = createQuery({ data: [{ id: 'a1' }], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.getMyAssignments('freelancer-1');

    expect(mockSupabase.from).toHaveBeenCalledWith('project_assignments');
    expect(response).toEqual([{ id: 'a1' }]);
  });

  it('returns empty assignments on error', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.getMyAssignments('freelancer-1');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });

  it('uses authenticated user when freelancerId missing', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1' } },
    });
    const query = createQuery({ data: [{ id: 'a2' }], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.getMyAssignments();

    expect(response).toEqual([{ id: 'a2' }]);
  });

  it('returns empty assignments when user not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    const query = createQuery({ data: [], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.getMyAssignments();

    expect(response).toEqual([]);
  });

  it('updates assignment statuses', async () => {
    const query = createQuery({ data: null, error: null });
    mockSupabase.from.mockReturnValue(query);

    await projectsApi.acceptAssignment('a1');
    expect(query.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ACCEPTED' })
    );

    await projectsApi.rejectAssignment('a2');
    expect(query.update).toHaveBeenCalledWith({ status: 'REJECTED' });

    await projectsApi.submitWork('a3', 'v1');
    expect(query.update).toHaveBeenCalledWith({ status: 'SUBMITTED' });

    await projectsApi.completeAssignment('a4');
    expect(query.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'COMPLETED' })
    );
  });

  it('throws on assignment update errors', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    await expect(projectsApi.acceptAssignment('a1')).rejects.toBeInstanceOf(
      Error
    );
  });

  it('creates and updates project records', async () => {
    const createQueryInstance = createQuery({
      data: { id: 'p3' },
      error: null,
    });
    const updateQueryInstance = createQuery({
      data: { id: 'p4' },
      error: null,
    });

    mockSupabase.from
      .mockReturnValueOnce(createQueryInstance)
      .mockReturnValueOnce(updateQueryInstance);

    const created = await projectsApi.createProject({ title: 'Create' });
    const updated = await projectsApi.updateProject('p4', { title: 'Update' });

    expect(created).toEqual({ id: 'p3' });
    expect(updated).toEqual({ id: 'p4' });
  });

  it('assigns freelancer to project', async () => {
    const query = createQuery({ data: { id: 'a5' }, error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.assignFreelancer('p1', 'f1');

    expect(query.insert).toHaveBeenCalledWith(
      expect.objectContaining({ project_id: 'p1', freelancer_id: 'f1' })
    );
    expect(response).toEqual({ id: 'a5' });
  });

  it('accepts request for authenticated user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1' } },
    });
    const query = createQuery({ data: { id: 'a6' }, error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await projectsApi.acceptRequest('p9');

    expect(query.insert).toHaveBeenCalledWith(
      expect.objectContaining({ project_id: 'p9', freelancer_id: 'u1' })
    );
    expect(response).toEqual({ id: 'a6' });
  });

  it('throws when accepting request without user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    const query = createQuery({ data: null, error: null });
    mockSupabase.from.mockReturnValue(query);

    await expect(projectsApi.acceptRequest('p9')).rejects.toThrow(
      'User not authenticated'
    );
  });

  it('creates project request and submission', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1' } },
    });

    const requestQuery = createQuery({ data: { id: 'p10' }, error: null });
    const assignmentQuery = createQuery({
      data: { project_id: 'p10' },
      error: null,
    });
    const submissionQuery = createQuery({ data: { id: 's1' }, error: null });

    mockSupabase.from
      .mockReturnValueOnce(requestQuery)
      .mockReturnValueOnce(assignmentQuery)
      .mockReturnValueOnce(submissionQuery);

    const request = await projectsApi.createRequest({ title: 'Req' });
    const submission = await projectsApi.createSubmission({
      assignmentId: 'a9',
      videoUrl: 'url',
    });

    expect(request).toEqual({ id: 'p10' });
    expect(submission).toEqual({ id: 's1' });
  });

  it('throws when creating request without user', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    const query = createQuery({ data: null, error: null });
    mockSupabase.from.mockReturnValue(query);

    await expect(projectsApi.createRequest({ title: 'Req' })).rejects.toThrow(
      'User not authenticated'
    );
  });

  it('creates submission with projectId without assignment lookup', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'u1' } },
    });
    const submissionQuery = createQuery({ data: { id: 's2' }, error: null });
    mockSupabase.from.mockReturnValue(submissionQuery);

    const submission = await projectsApi.createSubmission({
      projectId: 'p11',
      videoUrl: 'url',
    });

    expect(submission).toEqual({ id: 's2' });
  });

  it('maps project board responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 'p1',
            title: 'Project',
            description: 'Desc',
            status: 'OPEN',
            estimatedBudget: 100,
            categories: ['A'],
            assignmentType: 'SINGLE',
            currentAssignees: 1,
            maxAssignees: 2,
            deadline: '2025-02-01',
            createdBy: { id: 'u1', name: 'User' },
            createdAt: '2025-01-01',
          },
        ]),
    });

    global.fetch = fetchMock as typeof fetch;

    const response = await projectsApi.getProjectBoard();

    expect(fetchMock).toHaveBeenCalled();
    expect(response[0].id).toBe('p1');
    expect(response[0].categories).toEqual(['A']);
  });

  it('returns empty array when project board API fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Server error',
    });
    global.fetch = fetchMock as typeof fetch;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.getProjectBoard();

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });

  it('maps project request list responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 'p1',
            title: 'Project',
            description: 'Desc',
            status: 'OPEN',
            estimatedBudget: 100,
            categories: ['A'],
            assignmentType: 'SINGLE',
            currentAssignees: 1,
            maxAssignees: 2,
            deadline: '2025-02-01',
            createdBy: { id: 'u1', name: 'User' },
            createdAt: '2025-01-01',
          },
        ]),
    });

    global.fetch = fetchMock as typeof fetch;

    const response = await projectsApi.getProjectRequests();

    expect(response[0].id).toBe('p1');
  });

  it('returns empty array when project requests API throws', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('fail'));
    global.fetch = fetchMock as typeof fetch;

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await projectsApi.getProjectRequests();

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });
});
