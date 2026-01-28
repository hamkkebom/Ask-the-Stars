import { Controller, Get, Param, ParseIntPipe, Post, Body, Request, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  async listVideos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('category') category?: string,
    @Query('counselor') counselor?: string,
    @Query('creator') creator?: string,
    @Query('sort') sort?: 'latest' | 'popular',
  ): Promise<any> {
    return this.videosService.listAllFinalVideos({
      page: Number(page),
      limit: Number(limit),
      category,
      counselor,
      creator,
      sort
    });
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

  @Get(':id/preview')
  async getVideoPreview(@Param('id') id: string): Promise<{ videoUrl: string }> {
      const videoUrl = await this.videosService.getPresignedUrl(id);
      return { videoUrl };
  }

  @Post(':id/captions')
  async triggerCaptions(@Param('id') id: string) {
      const success = await this.videosService.generateCaptions(id);
      return { success };
  }

  @Put(':id/captions/:language')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCaption(
      @Param('id') id: string,
      @Param('language') language: string,
      @UploadedFile() file: any // Avoid Multer type error
  ) {
      if (!file) {
          throw new Error('File is required');
      }
      const success = await this.videosService.uploadCaption(id, language, file.buffer);
      return { success };
  }

  @Get('search')
  async search(@Query('q') q: string): Promise<any> {
    return this.videosService.search(q);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id') id: string): Promise<any> {
    return this.videosService.getRecommendations(id);
  }

  @Post('import-stream')
  async importFromUrl(@Body() body: { url: string; creator?: string }) {
      // Logic: Call Cloudflare Stream "Copy"
      // TODO: Move this logic to VideosService properly
      // For now calling service directly via cloudflareService on service
      // Better to add method to VideosService: importVideoFromUrl(url, creator)
      // I will add it to VideosService first
      const uid = await this.videosService.importVideoFromR2(body.url, body.creator);
      return { uid };
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
