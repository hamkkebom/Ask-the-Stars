
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../apps/api/src/app.module';
import { PrismaService } from '../apps/api/src/database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

  console.log('Checking for Stream UIDs...');
  const total = await prisma.videoTechnicalSpec.count();
  const withStream = await prisma.videoTechnicalSpec.count({
    where: { streamUid: { not: null } }
  });

  console.log(`Total TechnicalSpecs: ${total}`);
  console.log(`With StreamUID: ${withStream}`);

  if (withStream > 0) {
      const sample = await prisma.videoTechnicalSpec.findFirst({
          where: { streamUid: { not: null } }
      });
      console.log('Sample StreamUID:', sample.streamUid);
  }

  await app.close();
}

bootstrap();
