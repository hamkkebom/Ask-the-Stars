
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../apps/api/src/app.module';
import { UploadsService } from '../apps/api/src/modules/uploads/uploads.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const uploadsService = app.get(UploadsService);

  console.log('Listing R2 files...');
  const files = await uploadsService.listFiles();
  console.log('Found files:', files.length);

  if (files.length > 0) {
      console.log('First 20 files:');
      files.slice(0, 20).forEach(f => console.log(f.key));
  } else {
      console.log('No files found.');
  }

  await app.close();
}

bootstrap();
