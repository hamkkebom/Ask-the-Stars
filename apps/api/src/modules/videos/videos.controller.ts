import { Controller, Get, Param, ParseIntPipe, Post, Body, Request } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming Auth Guard exists

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly cloudflareService: CloudflareStreamService,
  ) {}

  @Get()
  async listVideos(): Promise<any[]> {
    return this.videosService.listAllFinalVideos();
  }

  @Get('project/:projectNo')
  async getProjectVideo(@Param('projectNo', ParseIntPipe) projectNo: number): Promise<any> {
    return this.videosService.getVideoByProjectNo(projectNo);
  }

  @Get(':id')
  async getVideoDetails(@Param('id') id: string): Promise<any> {
    return this.videosService.getVideoById(id);
  }

  @Get('channel/:name')
  async getChannelVideos(@Param('name') name: string): Promise<any> {
      return this.videosService.listVideosByChannel(name);
  }

  @Get('database/keys')
  async getAllVideoKeys(): Promise<string[]> {
      const specs = await this.videosService.getAllRegisteredSpecs();
      return specs.map(s => s.r2Key);
  }

  @Post('sync')
  async syncVideos(): Promise<any> {
    return this.videosService.syncWithStorage();
  }

  // @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Post('upload-url')
  async getDirectUploadUrl(@Body() body: { uploadLength: number; metadata?: any }, @Request() req: any): Promise<{ uploadUrl: string }> {
      // Logic:
      // 1. Get User ID from Auth (req.user.id) - Mocking for now if Auth not fully setup in this context
      const userId = req.user?.id || 'system_test_user';

      const url = await this.cloudflareService.getDirectUploadUrl(userId, body.uploadLength, body.metadata);
      return { uploadUrl: url };
  }
}
