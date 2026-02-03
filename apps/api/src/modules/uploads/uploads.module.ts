import { Module, forwardRef } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { VideosModule } from '../videos/videos.module';
import { FfprobeModule } from '../ffprobe/ffprobe.module';

@Module({
  imports: [forwardRef(() => VideosModule), FfprobeModule],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
