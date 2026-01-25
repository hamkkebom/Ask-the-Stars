import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CloudflareWebhookController } from './webhook.controller';
import { DatabaseModule } from '../../database/database.module';
import { UploadsModule } from '../uploads/uploads.module';
import { CloudflareModule } from '../cloudflare/cloudflare.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, UploadsModule, CloudflareModule, ConfigModule],
  controllers: [VideosController, CloudflareWebhookController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
