import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ accessToken: null, user: null });
    localStorage.removeItem('auth-storage');
  });

  it('sets access token and user', () => {
    const { setAccessToken, setUser } = useAuthStore.getState();

    setAccessToken('token');
    setUser({ id: 'u1', email: 'user@test.com', name: 'User', role: 'ADMIN' });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('token');
    expect(state.user?.name).toBe('User');
  });

  it('checks role and handles missing user', () => {
    const { hasRole, setUser } = useAuthStore.getState();

    expect(hasRole('ADMIN')).toBe(false);

    setUser({ id: 'u2', email: 'star@test.com', name: 'Star', role: 'STAR' });
    expect(hasRole('STAR')).toBe(true);
    expect(hasRole('ADMIN')).toBe(false);
  });

  it('logs out and clears state', () => {
    const { setAccessToken, setUser, logout } = useAuthStore.getState();

    setAccessToken('token');
    setUser({ id: 'u3', email: 'a@test.com', name: 'A', role: 'CLIENT' });
    logout();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.user).toBeNull();
  });
});
