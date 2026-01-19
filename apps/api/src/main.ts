// Initialize Sentry before importing anything else
import { initializeSentry } from './common/sentry';
initializeSentry();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  app.enableCors({
    origin: process.env.WS_CORS_ORIGIN || 'http://localhost:3000',
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
