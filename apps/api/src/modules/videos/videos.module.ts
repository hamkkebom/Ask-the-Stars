import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { DatabaseModule } from '../../database/database.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [DatabaseModule, UploadsModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
