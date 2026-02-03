import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from '@/lib/api/auth';
import { axiosInstance } from '@/lib/api/axios';
import type { LoginDto, SignupDto, User } from '@/types';

vi.mock('@/lib/api/axios', () => ({
  axiosInstance: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockAxios = () =>
  axiosInstance as unknown as {
    post: ReturnType<typeof vi.fn>;
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };

describe('authApi', () => {
  beforeEach(() => {
    const axios = mockAxios();
    axios.post.mockReset();
    axios.get.mockReset();
    axios.patch.mockReset();
  });

  it('logs in and returns auth response', async () => {
    const axios = mockAxios();
    const payload: LoginDto = { email: 'user@test.com', password: 'pw' };
    axios.post.mockResolvedValue({
      data: { access_token: 'token', expires_in: 3600 },
    });

    const response = await authApi.login(payload);

    expect(axios.post).toHaveBeenCalledWith('/auth/login', payload);
    expect(response.access_token).toBe('token');
  });

  it('signs up and returns auth response', async () => {
    const axios = mockAxios();
    const payload: SignupDto = {
      email: 'new@test.com',
      password: 'pw',
      name: 'New User',
    };
    axios.post.mockResolvedValue({
      data: { access_token: 'token', expires_in: 3600 },
    });

    const response = await authApi.signup(payload);

    expect(axios.post).toHaveBeenCalledWith('/auth/signup', payload);
    expect(response.expires_in).toBe(3600);
  });

  it('fetches current user profile', async () => {
    const axios = mockAxios();
    const user: User = {
      id: 'user-1',
      email: 'profile@test.com',
      name: 'Profile',
      role: 'CLIENT',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-02',
    };
    axios.get.mockResolvedValue({ data: user });

    const response = await authApi.getProfile();

    expect(axios.get).toHaveBeenCalledWith('/users/me');
    expect(response).toEqual(user);
  });

  it('calls password reset endpoints', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValue({ data: { ok: true } });
    axios.patch.mockResolvedValue({ data: { ok: true } });

    await authApi.requestPasswordReset('user@test.com');
    await authApi.resetPassword('token', 'newPass');

    expect(axios.post).toHaveBeenCalledWith('/auth/password-reset/request', {
      email: 'user@test.com',
    });
    expect(axios.patch).toHaveBeenCalledWith('/auth/password-reset/confirm', {
      token: 'token',
      newPassword: 'newPass',
    });
  });

  it('verifies email', async () => {
    const axios = mockAxios();
    axios.post.mockResolvedValue({ data: { ok: true } });

    await authApi.verifyEmail('token');

    expect(axios.post).toHaveBeenCalledWith('/auth/verify-email', {
      token: 'token',
    });
  });
});
