import { Module, forwardRef } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CloudflareWebhookController } from './webhook.controller';
import { VideoStorageService } from './video-storage.service';
import { VideoQueryService } from './video-query.service';
import { VideoMutationService } from './video-mutation.service';
import { VideoSyncService } from './video-sync.service';
import { DatabaseModule } from '../../database/database.module';
import { UploadsModule } from '../uploads/uploads.module';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { AiModule } from '../ai/ai.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UploadsModule),
    CloudflareModule,
    ConfigModule,
    AiModule,
  ],
  controllers: [VideosController, CloudflareWebhookController],
  providers: [
    VideosService,
    VideoStorageService,
    VideoQueryService,
    VideoMutationService,
    VideoSyncService,
  ],
  exports: [VideosService],
})
export class VideosModule {}
