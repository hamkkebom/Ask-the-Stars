'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';

export interface Message {
  id: string;
  content: string;
  userId: string;
  roomId?: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  isOwn?: boolean;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  isPrivate: boolean;
  participantCount: number;
  messageCount: number;
}

export interface OnlineUser {
  userId: string;
  name: string;
  avatar?: string;
}

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});
  const [isConnected, setIsConnected] = useState(false);
  const { accessToken } = useAuthStore();
  const connectionRef = useRef<Socket | null>(null);

  // 소켓 연결
  useEffect(() => {
    if (!accessToken) return;

    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000',
      {
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        auth: {
          token: accessToken,
        },
      }
    );

    socketInstance.on('connect', () => {
      console.log('Connected to chat server');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from chat server');
      setIsConnected(false);
    });

    // 메시지 수신
    socketInstance.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, { ...message, isOwn: false }]);
    });

    // 방 메시지 수신
    socketInstance.on(
      'roomMessages',
      ({
        roomId,
        messages: roomMessages,
      }: {
        roomId: string;
        messages: Message[];
      }) => {
        if (roomId === currentRoom) {
          setMessages(
            roomMessages.map((msg) => ({
              ...msg,
              isOwn: msg.userId === socketInstance.data?.user?.id,
            }))
          );
        }
      }
    );

    // 사용자 온라인 상태
    socketInstance.on('userOnline', (user: OnlineUser) => {
      setOnlineUsers((prev) => {
        const filtered = prev.filter((u) => u.userId !== user.userId);
        return [...filtered, user];
      });
    });

    socketInstance.on('userOffline', (user: OnlineUser) => {
      setOnlineUsers((prev) => prev.filter((u) => u.userId !== user.userId));
    });

    socketInstance.on('onlineUsers', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    // 사용자 참여/나감
    socketInstance.on(
      'userJoined',
      (data: { userId: string; name: string; roomId: string }) => {
        if (data.roomId === currentRoom) {
          console.log(`${data.name} joined the room`);
        }
      }
    );

    socketInstance.on(
      'userLeft',
      (data: { userId: string; name: string; roomId: string }) => {
        if (data.roomId === currentRoom) {
          console.log(`${data.name} left the room`);
        }
      }
    );

    // 타이핑 상태
    socketInstance.on(
      'userTyping',
      (data: { userId: string; name: string; isTyping: boolean }) => {
        setIsTyping((prev) => ({
          ...prev,
          [data.userId]: data.isTyping,
        }));
      }
    );

    // 메시지 전송 확인
    socketInstance.on(
      'messageDelivered',
      ({ messageId, timestamp }: { messageId: string; timestamp: Date }) => {
        console.log(`Message ${messageId} delivered at ${timestamp}`);
      }
    );

    // 에러 처리
    socketInstance.on('error', (error: { message: string }) => {
      console.error('Socket error:', error);
    });

    setSocket(socketInstance);
    connectionRef.current = socketInstance;

    return () => {
      socketInstance.disconnect();
      connectionRef.current = null;
    };
  }, [accessToken, currentRoom]);

  // 메시지 전송
  const sendMessage = (content: string, roomId?: string) => {
    if (!socket || !content.trim()) return;

    const message = {
      content: content.trim(),
      roomId,
    };

    // 낙관적 업데이트 (즉시 메시지 표시)
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: message.content,
      userId: socket.data?.user?.id || 'me',
      roomId: message.roomId,
      createdAt: new Date(),
      user: {
        id: socket.data?.user?.id || 'me',
        name: socket.data?.user?.name || 'Me',
        avatar: socket.data?.user?.profileImage,
      },
      isOwn: true,
    };

    setMessages((prev) => [...prev, tempMessage]);
    socket.emit('sendMessage', message);

    // 타이핑 상태 중지
    setTyping(false, roomId);
  };

  // 방 참여
  const joinRoom = (roomId: string) => {
    if (!socket) return;

    socket.emit('joinRoom', { roomId });
    setCurrentRoom(roomId);
    setMessages([]); // 기존 메시지 초기화
  };

  // 방 나가기
  const leaveRoom = (roomId: string) => {
    if (!socket) return;

    socket.emit('leaveRoom', { roomId });
    if (currentRoom === roomId) {
      setCurrentRoom(null);
      setMessages([]);
    }
  };

  // 타이핑 상태 전송
  const setTyping = (isTyping: boolean, roomId?: string) => {
    if (!socket) return;

    socket.emit('typing', {
      roomId: roomId || currentRoom,
      isTyping,
    });
  };

  // 온라인 사용자 목록 요청
  const getOnlineUsers = () => {
    if (!socket) return;
    socket.emit('getOnlineUsers');
  };

  return {
    socket,
    messages,
    rooms,
    currentRoom,
    onlineUsers,
    isTyping,
    isConnected,
    sendMessage,
    joinRoom,
    leaveRoom,
    setTyping,
    getOnlineUsers,
  };
}
