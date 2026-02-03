import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usersApi } from '@/lib/api/users';
import { axiosInstance } from '@/lib/api/axios';
import type { User, UpdateProfileDto } from '@/lib/api/users';

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

describe('usersApi', () => {
  beforeEach(() => {
    const axios = mockAxios();
    axios.get.mockReset();
    axios.patch.mockReset();
  });

  it('gets current user', async () => {
    const axios = mockAxios();
    const user: User = {
      id: 'u1',
      email: 'me@test.com',
      name: 'Me',
      role: 'STAR',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-02',
    };
    axios.get.mockResolvedValue({ data: user });

    const response = await usersApi.getMe();

    expect(axios.get).toHaveBeenCalledWith('/users/me');
    expect(response).toEqual(user);
  });

  it('updates profile', async () => {
    const axios = mockAxios();
    const payload: UpdateProfileDto = { name: 'Updated' };
    const user: User = {
      id: 'u1',
      email: 'me@test.com',
      name: 'Updated',
      role: 'STAR',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-02',
    };
    axios.patch.mockResolvedValue({ data: user });

    const response = await usersApi.updateProfile(payload);

    expect(axios.patch).toHaveBeenCalledWith('/users/me', payload);
    expect(response.name).toBe('Updated');
  });

  it('gets all users and user by id', async () => {
    const axios = mockAxios();
    const users: User[] = [
      {
        id: 'u1',
        email: 'one@test.com',
        name: 'One',
        role: 'ADMIN',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-02',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: users });
    axios.get.mockResolvedValueOnce({ data: users[0] });

    const all = await usersApi.getAll();
    const one = await usersApi.getById('u1');

    expect(axios.get).toHaveBeenNthCalledWith(1, '/users');
    expect(axios.get).toHaveBeenNthCalledWith(2, '/users/u1');
    expect(all).toHaveLength(1);
    expect(one.id).toBe('u1');
  });

  it('updates user role', async () => {
    const axios = mockAxios();
    const user: User = {
      id: 'u1',
      email: 'one@test.com',
      name: 'One',
      role: 'COUNSELOR',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-02',
    };
    axios.patch.mockResolvedValue({ data: user });

    const response = await usersApi.updateRole('u1', 'COUNSELOR');

    expect(axios.patch).toHaveBeenCalledWith('/users/u1/role', {
      role: 'COUNSELOR',
    });
    expect(response.role).toBe('COUNSELOR');
  });
});
