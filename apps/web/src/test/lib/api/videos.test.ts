import { describe, it, expect, vi, beforeEach } from 'vitest';
import { videosApi } from '@/lib/api/videos';
import { axiosInstance } from '@/lib/api/axios';

vi.mock('@/lib/api/axios', () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

const mockSupabase = {
  from: vi.fn(),
  rpc: vi.fn(),
};

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => mockSupabase,
}));

const mockAxios = () =>
  axiosInstance as unknown as {
    get: ReturnType<typeof vi.fn>;
  };

const createQuery = (result: { data: unknown; error: unknown }) => {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    order: vi.fn(() => query),
    limit: vi.fn(() => query),
    insert: vi.fn(() => query),
    update: vi.fn(() => query),
    delete: vi.fn(() => query),
    single: vi.fn(() => query),
    then: (
      onFulfilled?: (value: { data: unknown; error: unknown }) => unknown
    ) => Promise.resolve(result).then(onFulfilled),
  };
  return query;
};

describe('videosApi', () => {
  beforeEach(() => {
    const axios = mockAxios();
    axios.get.mockReset();
    mockSupabase.from.mockReset();
    mockSupabase.rpc.mockReset();
  });

  it('gets video by id', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: { id: 'v1' } });

    const response = await videosApi.getVideoById('v1');

    expect(axios.get).toHaveBeenCalledWith('/videos/v1');
    expect(response).toEqual({ id: 'v1' });
  });

  it('returns null when getVideoById fails', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.getVideoById('v2');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toBeNull();
  });

  it('lists videos with fallback on error', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.listAllFinalVideos({ page: 1, limit: 5 });

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response.meta.total).toBe(0);
    expect(response.data).toEqual([]);
  });

  it('lists videos with response data', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({
      data: { data: [{ id: 'v1' }], meta: { total: 1 } },
    });

    const response = await videosApi.listAllFinalVideos({ page: 1, limit: 1 });

    expect(response.data).toEqual([{ id: 'v1' }]);
    expect(response.meta.total).toBe(1);
  });

  it('lists videos by category', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: { data: [{ id: 'v1' }] } });

    const response = await videosApi.listVideosByCategory('인기', 3);

    expect(axios.get).toHaveBeenCalledWith('/videos', {
      params: { category: undefined, sort: 'popular', limit: 3 },
    });
    expect(response.data).toEqual([{ id: 'v1' }]);
  });

  it('lists videos for 전체 category', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: { data: [] } });

    const response = await videosApi.listVideosByCategory('전체', 2);

    expect(axios.get).toHaveBeenCalledWith('/videos', {
      params: { category: undefined, sort: 'latest', limit: 2 },
    });
    expect(response.data).toEqual([]);
  });

  it('returns empty list when listVideosByCategory fails', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.listVideosByCategory('광고', 2);

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response.data).toEqual([]);
  });

  it('gets featured videos from backend API', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: { data: [{ id: 'v1' }] } });

    const response = await videosApi.getFeaturedVideos();

    expect(axios.get).toHaveBeenCalledWith('/videos', {
      params: { sort: 'latest', limit: 5 },
    });
    expect(response.data).toEqual([{ id: 'v1' }]);
  });

  it('searches videos with query', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: [{ id: 's1' }] });

    const response = await videosApi.search('query');

    expect(axios.get).toHaveBeenCalledWith('/videos/search', {
      params: { q: 'query' },
    });
    expect(response).toEqual([{ id: 's1' }]);
  });

  it('returns empty array when search fails', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.search('query');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });

  it('returns empty featured videos on error', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.getFeaturedVideos();

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response.data).toEqual([]);
  });

  it('increments views via RPC', async () => {
    mockSupabase.rpc.mockResolvedValue({ error: null });

    await videosApi.incrementViews('v1');

    expect(mockSupabase.rpc).toHaveBeenCalledWith('increment_views', {
      video_id: 'v1',
    });
  });

  it('logs errors when incrementViews fails', async () => {
    mockSupabase.rpc.mockResolvedValue({ error: new Error('fail') });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    await videosApi.incrementViews('v1');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(mockSupabase.rpc).toHaveBeenCalled();
  });

  it('gets preview url from supabase', async () => {
    const query = createQuery({
      data: { stream_url: 'stream', r2_url: null },
      error: null,
    });
    mockSupabase.from.mockReturnValue(query);

    const response = await videosApi.getVideoPreviewUrl('v1');

    expect(response).toBe('stream');
  });

  it('returns r2 preview url when stream url missing', async () => {
    const query = createQuery({
      data: { stream_url: null, r2_url: 'r2' },
      error: null,
    });
    mockSupabase.from.mockReturnValue(query);

    const response = await videosApi.getVideoPreviewUrl('v1');

    expect(response).toBe('r2');
  });

  it('returns null preview url on error', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const response = await videosApi.getVideoPreviewUrl('v1');

    expect(response).toBeNull();
  });

  it('returns recommendations with fallback on error', async () => {
    const axios = mockAxios();
    axios.get.mockRejectedValue(new Error('fail'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.getRecommendations('v1', 2);

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(response).toEqual([]);
  });

  it('returns recommendations on success', async () => {
    const axios = mockAxios();
    axios.get.mockResolvedValue({ data: [{ id: 'r1' }] });

    const response = await videosApi.getRecommendations('v1', 2);

    expect(axios.get).toHaveBeenCalledWith('/videos/v1/recommendations', {
      params: { limit: 2 },
    });
    expect(response).toEqual([{ id: 'r1' }]);
  });

  it('gets my videos from supabase', async () => {
    const query = createQuery({ data: [{ id: 'm1' }], error: null });
    mockSupabase.from.mockReturnValue(query);

    const response = await videosApi.getMyVideos('freelancer-1');

    expect(mockSupabase.from).toHaveBeenCalledWith('videos');
    expect(response).toEqual([{ id: 'm1' }]);
  });

  it('filters my videos by status and handles error', async () => {
    const query = createQuery({ data: null, error: new Error('fail') });
    mockSupabase.from.mockReturnValue(query);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('NODE_ENV', 'development');

    const response = await videosApi.getMyVideos('freelancer-1', 'review');

    vi.unstubAllEnvs();
    consoleSpy.mockRestore();

    expect(query.eq).toHaveBeenCalledWith('status', 'REVIEW');
    expect(response).toEqual([]);
  });

  it('creates, updates, and deletes videos', async () => {
    const createQueryInstance = createQuery({
      data: { id: 'v1' },
      error: null,
    });
    const updateQueryInstance = createQuery({
      data: { id: 'v2' },
      error: null,
    });
    const deleteQueryInstance = createQuery({ data: null, error: null });

    mockSupabase.from
      .mockReturnValueOnce(createQueryInstance)
      .mockReturnValueOnce(updateQueryInstance)
      .mockReturnValueOnce(deleteQueryInstance);

    const created = await videosApi.createVideo({ title: 'New' });
    const updated = await videosApi.updateVideo('v2', { title: 'Updated' });
    await videosApi.deleteVideo('v3');

    expect(created).toEqual({ id: 'v1' });
    expect(updated).toEqual({ id: 'v2' });
    expect(deleteQueryInstance.delete).toHaveBeenCalled();
  });

  it('throws when create or update fails', async () => {
    const createQueryInstance = createQuery({
      data: null,
      error: new Error('fail'),
    });
    const updateQueryInstance = createQuery({
      data: null,
      error: new Error('fail'),
    });

    mockSupabase.from
      .mockReturnValueOnce(createQueryInstance)
      .mockReturnValueOnce(updateQueryInstance);

    await expect(
      videosApi.createVideo({ title: 'Bad' })
    ).rejects.toBeInstanceOf(Error);
    await expect(
      videosApi.updateVideo('v2', { title: 'Bad' })
    ).rejects.toBeInstanceOf(Error);
  });
});
