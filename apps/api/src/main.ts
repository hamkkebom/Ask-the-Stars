// Initialize Sentry before importing anything else
import { initializeSentry } from './common/sentry';
initializeSentry();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

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
  const corsOrigin = process.env.WS_CORS_ORIGIN
    ? process.env.WS_CORS_ORIGIN.split(',').map(origin => origin.trim())
    : 'http://localhost:3000';

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // API prefix (exclude health check)
  app.setGlobalPrefix('api', {
    exclude: ['health', '/'],
  });

  // Cloud Run uses PORT env variable (default 8080 in production)
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 별들에게 물어봐 API is running on: http://localhost:${port}`);
}

bootstrap();
