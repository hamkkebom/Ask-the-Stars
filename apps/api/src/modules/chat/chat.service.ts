import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface CreateMessageDto {
  content: string;
  userId: string;
  roomId?: string;
}

export interface MessageDto {
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
}

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // 메시지 생성
  async createMessage(data: CreateMessageDto): Promise<MessageDto> {
    const message = await this.prisma.chatMessage.create({
      data: {
        content: data.content,
        userId: data.userId,
        roomId: data.roomId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
    });

    return {
      id: message.id,
      content: message.content,
      userId: message.userId,
      roomId: message.roomId || undefined,
      createdAt: message.createdAt,
      user: {
        id: message.user.id,
        name: message.user.name,
        avatar: message.user.profileImage || undefined,
      },
    };
  }

  // 방 메시지 목록 조회
  async getRoomMessages(roomId: string, limit = 50): Promise<MessageDto[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: { roomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return messages.map((message) => ({
      id: message.id,
      content: message.content,
      userId: message.userId,
      roomId: message.roomId || undefined,
      createdAt: message.createdAt,
      user: {
        id: message.user.id,
        name: message.user.name,
        avatar: message.user.profileImage || undefined,
      },
    }));
  }

  // 사용자의 방 목록 조회
  async getUserRooms(userId: string): Promise<any[]> {
    const rooms = await this.prisma.chatRoom.findMany({
      where: {
        OR: [
          { creatorId: userId },
          {
            participants: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profileImage: true,
              },
            },
          },
        },
        _count: {
          select: {
            messages: true,
            participants: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return rooms;
  }

  // 채팅방 생성
  async createRoom(data: {
    name: string;
    description?: string;
    creatorId: string;
    isPrivate?: boolean;
  }): Promise<any> {
    const room = await this.prisma.chatRoom.create({
      data: {
        name: data.name,
        description: data.description,
        creatorId: data.creatorId,
        isPrivate: data.isPrivate || false,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    return room;
  }

  // 방 참여
  async joinRoom(roomId: string, userId: string): Promise<void> {
    await this.prisma.chatParticipant.upsert({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
      update: {
        joinedAt: new Date(),
      },
      create: {
        roomId,
        userId,
        joinedAt: new Date(),
      },
    });
  }

  // 방 나가기
  async leaveRoom(roomId: string, userId: string): Promise<void> {
    await this.prisma.chatParticipant.delete({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });
  }
}
