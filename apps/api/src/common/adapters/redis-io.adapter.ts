import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor!: ReturnType<typeof createAdapter>;

  constructor(
    appOrHttpServer: any,
    private configService: ConfigService,
  ) {
    super(appOrHttpServer);
  }

  async connectToRedis(): Promise<void> {
    try {
      const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';

      const pubClient = new Redis(redisUrl);

      // Persistent error handler to prevent process crash
      pubClient.on('error', (err) => {
        console.warn('⚠️ Redis PubClient Error:', err.message);
      });

      // Verification for initial connection
      await new Promise((resolve, reject) => {
          pubClient.once('connect', resolve);
          pubClient.once('error', reject);
          setTimeout(() => reject(new Error('Redis connection timeout')), 5000);
      });

      const subClient = pubClient.duplicate();
      subClient.on('error', (err) => {
        console.warn('⚠️ Redis SubClient Error:', err.message);
      });

      this.adapterConstructor = createAdapter(pubClient, subClient);
      console.log('✅ Redis Adapter connected');
    } catch (error) {
      console.error('❌ Redis Adapter connection failed:', (error as any).message);
      throw error; // Re-throw to be caught in main.ts
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
