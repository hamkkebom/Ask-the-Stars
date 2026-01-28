import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { CloudflareModule } from '../cloudflare/cloudflare.module';

@Module({
  imports: [CloudflareModule],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
