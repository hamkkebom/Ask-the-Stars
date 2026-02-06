import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

interface InterceptorHandler<T> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: Error) => Promise<never>;
}

describe('axiosInstance configuration', () => {
  const createMockAxios = () => {
    const requestHandlers: Array<InterceptorHandler<any>> = [];
    const responseHandlers: Array<InterceptorHandler<any>> = [];

    const mockInstance = {
      defaults: {},
      interceptors: {
        request: {
          use: vi
            .fn()
            .mockImplementation(
              (
                onFulfilled: (value: any) => any,
                onRejected: (error: Error) => Promise<never>
              ) => {
                requestHandlers.push({ onFulfilled, onRejected });
                return requestHandlers.length - 1;
              }
            ),
        },
        response: {
          use: vi
            .fn()
            .mockImplementation(
              (
                onFulfilled: (value: any) => any,
                onRejected: (error: Error) => Promise<never>
              ) => {
                responseHandlers.push({ onFulfilled, onRejected });
                return responseHandlers.length - 1;
              }
            ),
        },
      },
    };

    return { mockInstance, requestHandlers, responseHandlers };
  };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets baseURL with /api/v1 when missing', async () => {
    const { mockInstance } = createMockAxios();
    const create = vi.fn(() => mockInstance);
    vi.doMock('axios', () => ({
      default: { create },
      create,
    }));

    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
    await import('@/lib/api/axios');
    expect(create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:4000/api/v1',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('appends /v1 when /api suffix exists', async () => {
    const { mockInstance } = createMockAxios();
    const create = vi.fn(() => mockInstance);
    vi.doMock('axios', () => ({
      default: { create },
      create,
    }));

    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000/api';
    const module = await import('@/lib/api/axios');

    expect(create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:4000/api/v1',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(module.axiosInstance).toBe(mockInstance);
  });

  it('adds Authorization header from localStorage', async () => {
    const { mockInstance, requestHandlers } = createMockAxios();
    const create = vi.fn(() => mockInstance);
    vi.doMock('axios', () => ({
      default: { create },
      create,
    }));

    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
    await import('@/lib/api/axios');

    localStorage.setItem(
      'auth-storage',
      JSON.stringify({ state: { accessToken: 'token-123' } })
    );

    const config = { headers: {} as Record<string, string> };
    const result = await requestHandlers[0].onFulfilled?.(config);

    expect(result?.headers.Authorization).toBe('Bearer token-123');
  });

  it('clears auth storage and redirects on 401 response', async () => {
    const { mockInstance, responseHandlers } = createMockAxios();
    const create = vi.fn(() => mockInstance);
    vi.doMock('axios', () => ({
      default: { create },
      create,
    }));

    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });

    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';
    await import('@/lib/api/axios');

    localStorage.setItem('auth-storage', 'present');

    const error = { response: { status: 401 } } as unknown as Error;
    await expect(responseHandlers[0].onRejected?.(error)).rejects.toBe(error);

    expect(localStorage.getItem('auth-storage')).toBeNull();
    expect(window.location.href).toBe('/auth/login');
  });
});
