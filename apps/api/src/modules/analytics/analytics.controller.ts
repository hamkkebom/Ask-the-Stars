import { Controller, Get, Param } from '@nestjs/common';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Uncomment when Auth is ready

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly cloudflareService: CloudflareStreamService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('video/:uid')
  async getVideoAnalytics(@Param('uid') uid: string) {
    return this.cloudflareService.getVideoAnalytics(uid);
  }
}
