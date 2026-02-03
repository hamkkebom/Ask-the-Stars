import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';
import { useChat, type Message } from '@/hooks/useChat';

const handlers = new Map<string, (payload: unknown) => void>();

const onMock = vi.fn((event: string, cb: (payload: unknown) => void) => {
  handlers.set(event, cb);
  return mockSocket as Socket;
});
const emitMock = vi.fn();
const disconnectMock = vi.fn();

const mockSocket: Pick<Socket, 'on' | 'emit' | 'disconnect'> = {
  on: onMock as unknown as Socket['on'],
  emit: emitMock,
  disconnect: disconnectMock,
};

vi.mock('socket.io-client', () => ({ io: vi.fn() }));
vi.mock('@/store/useAuthStore', () => ({ useAuthStore: vi.fn() }));

const useAuthStoreMock = vi.mocked(useAuthStore);

describe('useChat hook', () => {
  beforeEach(() => {
    handlers.clear();
    vi.mocked(io).mockClear();
    onMock.mockClear();
    emitMock.mockClear();
    disconnectMock.mockClear();
    vi.mocked(io).mockReturnValue(mockSocket as Socket);
  });

  afterEach(() => {
    useAuthStoreMock.mockReset();
  });

  it('does not connect without access token', () => {
    useAuthStoreMock.mockReturnValue({ accessToken: null });

    const { result } = renderHook(() => useChat());

    expect(io).not.toHaveBeenCalled();
    expect(result.current.socket).toBeNull();
    expect(result.current.isConnected).toBe(false);
  });

  it('connects with access token and updates connection state', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });

    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalledTimes(1));
    expect(io).toHaveBeenCalledWith('http://localhost:4000', {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      auth: { token: 'token' },
    });

    act(() => {
      handlers.get('connect')?.(undefined);
    });

    expect(result.current.isConnected).toBe(true);
  });

  it('adds incoming messages to state', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });
    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalled());

    const message: Message = {
      id: 'm1',
      content: 'hello',
      userId: 'u1',
      createdAt: new Date(),
      user: { id: 'u1', name: 'User' },
    };

    act(() => {
      handlers.get('newMessage')?.(message);
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('hello');
  });

  it('handles room messages and typing state', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });
    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalled());

    act(() => {
      result.current.joinRoom('room-1');
    });

    act(() => {
      handlers.get('roomMessages')?.({
        roomId: 'room-1',
        messages: [
          {
            id: 'm1',
            content: 'mine',
            userId: 'me',
            createdAt: new Date(),
            user: { id: 'me', name: 'Me' },
          },
        ],
      });
      handlers.get('userTyping')?.({
        userId: 'u1',
        name: 'User',
        isTyping: true,
      });
    });

    expect(result.current.messages[0].isOwn).toBe(true);
    expect(result.current.isTyping.u1).toBe(true);
  });

  it('updates online users and emits fetch request', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });
    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalled());

    act(() => {
      handlers.get('userOnline')?.({ userId: 'u1', name: 'User' });
      handlers.get('userOffline')?.({ userId: 'u1', name: 'User' });
      handlers.get('onlineUsers')?.([{ userId: 'u2', name: 'User2' }]);
    });

    expect(result.current.onlineUsers).toEqual([
      { userId: 'u2', name: 'User2' },
    ]);

    act(() => {
      result.current.getOnlineUsers();
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('getOnlineUsers');
  });

  it('sends message, emits, and sets optimistic state', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });
    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalled());

    act(() => {
      result.current.sendMessage('hi');
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('sendMessage', {
      content: 'hi',
      roomId: undefined,
    });
    expect(result.current.messages[0].isOwn).toBe(true);
  });

  it('joins and leaves room, resetting messages', async () => {
    useAuthStoreMock.mockReturnValue({ accessToken: 'token' });
    const { result } = renderHook(() => useChat());

    await waitFor(() => expect(io).toHaveBeenCalled());

    act(() => {
      result.current.sendMessage('temp');
      result.current.joinRoom('room-1');
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('joinRoom', {
      roomId: 'room-1',
    });
    expect(result.current.currentRoom).toBe('room-1');
    expect(result.current.messages).toHaveLength(0);

    act(() => {
      result.current.leaveRoom('room-1');
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('leaveRoom', {
      roomId: 'room-1',
    });
    expect(result.current.currentRoom).toBeNull();
  });
});
