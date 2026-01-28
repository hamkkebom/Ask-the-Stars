import 'reflect-metadata';
// Initialize Sentry before importing anything else
import { initializeSentry } from './common/sentry';
initializeSentry();

// BigInt serialization fix for NestJS/Express
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import { RedisIoAdapter } from './common/adapters/redis-io.adapter';

async function bootstrap() {

  try {
    console.log('>>> BOOTSTRAP STARTING <<<');
    const app = await NestFactory.create(AppModule);
    console.log('>>> APP CREATED <<<');
    // const configService = app.get(ConfigService);
    // const logger = new Logger('Bootstrap');

    // Redis Socket.io Adapter (Temporarily Disabled for Video Grid Fix)
    // const redisUrl = configService.get('REDIS_URL');
    // if (redisUrl) {
    //   const redisIoAdapter = new RedisIoAdapter(app, configService);
    //   try {
    //     await redisIoAdapter.connectToRedis();
    //     app.useWebSocketAdapter(redisIoAdapter);
    //     logger.log('✅ Redis WebSocket Adapter registered');
    //   } catch (err) {
    //     logger.error(`❌ Failed to connect to Redis: ${(err as any).message}. Falling back to default adapter.`);
    //   }
    // } else {
    //   logger.warn('⚠️ REDIS_URL not found. Skipping Redis adapter registration.');
    // }


    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    // CORS configuration
    const allowedOrigins = process.env.WS_CORS_ORIGIN
      ? process.env.WS_CORS_ORIGIN.split(',').map((origin) => origin.trim())
      : ['http://localhost:3000', 'http://localhost:3001', 'https://www.hamkkebom.com', 'https://hamkkebom.com'];

    app.enableCors({
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(allowed => {
          if (allowed === '*') return true;
          // Exact match or subdomain match if needed
          return allowed === origin;
        });

        if (isAllowed) {
          callback(null, true);
        } else {
          console.warn(`[CORS] Rejected origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Accept,Authorization',
    });

    // API prefix (exclude health check)
    app.setGlobalPrefix('api', {
      exclude: ['health', '/'],
    });

    // Cloud Run uses PORT env variable (default 8080 in production)
    const port = process.env.PORT || 4000;
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 별들에게 물어봐 API is running on: http://localhost:${port}`);
  } catch (err) {
    console.error('❌ FATAL: NestJS bootstrap failed:');
    console.error(err);
    if ((err as any).stack) {
      console.error((err as any).stack);
    }
    process.exit(1);
  }
}


bootstrap();
