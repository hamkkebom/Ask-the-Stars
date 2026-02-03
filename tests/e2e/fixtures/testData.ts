export const mockProjectRequests = [
  {
    id: 'request-1',
    title: 'E2E Test Project',
    description: 'E2E project request for star flow.',
    status: 'OPEN',
    estimatedBudget: 120000,
    categories: ['신년운세'],
    assignmentType: 'MULTIPLE',
    currentAssignees: 1,
    maxAssignees: 3,
    deadline: '2026-02-28T23:59:59Z',
    createdBy: { id: 'admin-1', name: 'Admin Team' },
    createdAt: '2026-02-01T10:00:00Z',
  },
];

export const mockAssignments = [
  {
    id: 'assignment-1',
    requestId: 'request-1',
    status: 'ACCEPTED',
    acceptedAt: '2026-02-02T09:00:00Z',
    request: {
      title: 'E2E Test Project',
      description: 'E2E assignment detail for project.',
      deadline: '2026-02-28T23:59:59Z',
      estimatedBudget: 120000,
      categories: ['신년운세'],
      createdBy: { name: 'Admin Team' },
    },
    submissions: [],
  },
];

export const mockAssignmentDetail = {
  id: 'assignment-1',
  freelancerId: 'star-1',
  status: 'ACCEPTED',
  acceptedAt: '2026-02-02T09:00:00Z',
  request: {
    title: 'E2E Test Project',
    description: 'E2E assignment detail for project.',
    deadline: '2026-02-28T23:59:59Z',
    estimatedBudget: 120000,
    categories: ['신년운세'],
  },
};

export const mockSubmissions: Array<Record<string, unknown>> = [];

export const mockFeedback = [
  {
    id: 'feedback-1',
    projectId: 'proj-1',
    projectTitle: 'E2E Test Project',
    versionTitle: 'Version 1',
    versionId: 'ver-1',
    content: 'Please adjust subtitle position.',
    startTime: 12,
    endTime: 18,
    feedbackType: 'Subtitle',
    priority: 'HIGH',
    status: 'PENDING',
    createdAt: '2026-02-02T10:00:00Z',
    author: { name: 'Feedback Team' },
  },
];

export const mockVideosList = {
  data: [
    {
      id: 'video-1',
      title: 'E2E Featured Video',
      description: 'E2E video description.',
      thumbnail_url: 'https://picsum.photos/seed/e2e1/640/360',
      views: 1200,
      likes: 45,
      category: '신년운세',
      created_at: '2026-01-10T10:00:00Z',
      counselor: { name: '지니' },
      freelancer: { name: '박건우' },
    },
    {
      id: 'video-2',
      title: 'E2E Second Video',
      description: 'Another E2E video.',
      thumbnail_url: 'https://picsum.photos/seed/e2e2/640/360',
      views: 980,
      likes: 30,
      category: '타로',
      created_at: '2026-01-12T10:00:00Z',
      counselor: { name: '다연' },
      freelancer: { name: '김스타' },
    },
  ],
  meta: { total: 2, page: 1, lastPage: 1, has_more: false },
};

export const mockVideoDetail = {
  id: 'video-1',
  project: {
    title: 'E2E Featured Video',
    client: { name: 'E2E Client' },
  },
  created_at: '2026-01-10T10:00:00Z',
  views: 1200,
  likes: 45,
  feedback: 'E2E video detail description.',
  technicalSpec: {
    videoUrl: '/videos/sample.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/e2e-detail/1280/720',
  },
};
