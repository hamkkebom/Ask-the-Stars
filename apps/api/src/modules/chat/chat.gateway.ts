import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService, MessageDto, CreateMessageDto } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: process.env.WS_CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
  namespace: 'chat',
})
@UseGuards(JwtAuthGuard)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  // 연결된 클라이언트 관리
  private connectedClients: Map<string, Socket> = new Map();
  private userRooms: Map<string, string> = new Map(); // userId -> roomId

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    this.logger.log('Chat Gateway initialized');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // JWT에서 사용자 정보 추출
    const user = client.data.user;
    if (!user) {
      client.disconnect();
      return;
    }

    this.connectedClients.set(user.id, client);

    // 사용자의 방 목록을 조회하고 각 방에 참여
    const rooms = await this.chatService.getUserRooms(user.id);
    rooms.forEach((room) => {
      client.join(room.id);
      this.userRooms.set(user.id, room.id);
    });

    // 온라인 상태 브로드캐스트
    client.broadcast.emit('userOnline', {
      userId: user.id,
      name: user.name,
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    const user = client.data.user;
    if (user) {
      this.connectedClients.delete(user.id);
      this.userRooms.delete(user.id);

      // 오프라인 상태 브로드캐스트
      client.broadcast.emit('userOffline', {
        userId: user.id,
        name: user.name,
      });
    }
  }

  // 특정 방에 참여
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const user = client.data.user;
    if (!user) return;

    try {
      await this.chatService.joinRoom(data.roomId, user.id);
      client.join(data.roomId);
      this.userRooms.set(user.id, data.roomId);

      // 방 참여 알림
      client.to(data.roomId).emit('userJoined', {
        userId: user.id,
        name: user.name,
        roomId: data.roomId,
      });

      // 최근 메시지 전송
      const messages = await this.chatService.getRoomMessages(data.roomId);
      client.emit('roomMessages', {
        roomId: data.roomId,
        messages: messages.reverse(), // 최신 순으로
      });

      this.logger.log(`User ${user.name} joined room ${data.roomId}`);
    } catch (error) {
      client.emit('error', { message: 'Failed to join room' });
    }
  }

  // 방 나가기
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket
  ) {
    const user = client.data.user;
    if (!user) return;

    try {
      await this.chatService.leaveRoom(data.roomId, user.id);
      client.leave(data.roomId);
      this.userRooms.delete(user.id);

      // 방 나감 알림
      client.to(data.roomId).emit('userLeft', {
        userId: user.id,
        name: user.name,
        roomId: data.roomId,
      });

      this.logger.log(`User ${user.name} left room ${data.roomId}`);
    } catch (error) {
      client.emit('error', { message: 'Failed to leave room' });
    }
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    const user = client.data.user;
    if (!user) return;

    try {
      const message = await this.chatService.createMessage({
        content: data.content,
        userId: user.id,
        roomId: data.roomId,
      });

      const targetRoom = data.roomId || 'general';

      // 메시지를 방에 브로드캐스트
      this.server.to(targetRoom).emit('newMessage', {
        ...message,
        isOwn: false, // 클라이언트에서 처리
      });

      // 전송자에게는 메시지 확인 신호
      client.emit('messageDelivered', {
        messageId: message.id,
        timestamp: message.createdAt,
      });

      this.logger.log(`Message sent by ${user.name} in room ${targetRoom}`);
    } catch (error) {
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  // 타이핑 중 상태 알림
  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { roomId: string; isTyping: boolean },
    @ConnectedSocket() client: Socket
  ) {
    const user = client.data.user;
    if (!user) return;

    const targetRoom = data.roomId || 'general';

    client.to(targetRoom).emit('userTyping', {
      userId: user.id,
      name: user.name,
      isTyping: data.isTyping,
    });
  }

  // 온라인 사용자 목록 요청
  @SubscribeMessage('getOnlineUsers')
  handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
    const onlineUsers = Array.from(this.connectedClients.entries()).map(
      ([userId, socket]) => ({
        userId,
        name: socket.data.user?.name,
        avatar: socket.data.user?.profileImage,
      })
    );

    client.emit('onlineUsers', onlineUsers);
  }
}
