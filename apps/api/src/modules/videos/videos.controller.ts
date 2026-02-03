import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Request,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming Auth Guard exists

@ApiTags('videos')
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller({ path: 'videos', version: '1' })
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly cloudflareService: CloudflareStreamService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List videos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 25 })
  @ApiQuery({ name: 'category', required: false, example: '브랜딩' })
  @ApiQuery({ name: 'counselor', required: false, example: 'counselor_1' })
  @ApiQuery({ name: 'creator', required: false, example: 'creator_1' })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['latest', 'popular'],
    example: 'latest',
  })
  @ApiResponse({ status: 200, description: 'Video list retrieved' })
  async listVideos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('category') category?: string,
    @Query('counselor') counselor?: string,
    @Query('creator') creator?: string,
    @Query('sort') sort?: 'latest' | 'popular'
  ): Promise<any> {
    return this.videosService.listAllFinalVideos({
      page: Number(page),
      limit: Number(limit),
      category,
      counselor,
      creator,
      sort,
    });
  }

  @Get('project/:projectNo')
  @ApiOperation({ summary: 'Get video by project number' })
  @ApiParam({ name: 'projectNo', example: 1001 })
  @ApiResponse({ status: 200, description: 'Project video retrieved' })
  async getProjectVideo(
    @Param('projectNo', ParseIntPipe) projectNo: number
  ): Promise<any> {
    return this.videosService.getVideoByProjectNo(projectNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get video details' })
  @ApiParam({ name: 'id', example: 'video_123' })
  @ApiResponse({ status: 200, description: 'Video retrieved' })
  async getVideoDetails(@Param('id') id: string): Promise<any> {
    return this.videosService.getVideoById(id);
  }

  @Get('channel/:name')
  @ApiOperation({ summary: 'Get channel videos' })
  @ApiParam({ name: 'name', example: 'creator_1' })
  @ApiResponse({ status: 200, description: 'Channel videos retrieved' })
  async getChannelVideos(@Param('name') name: string): Promise<any> {
    return this.videosService.listVideosByChannel(name);
  }

  @Get(':id/preview')
  @ApiOperation({ summary: 'Get video preview URL' })
  @ApiParam({ name: 'id', example: 'video_123' })
  @ApiResponse({ status: 200, description: 'Preview URL retrieved' })
  async getVideoPreview(
    @Param('id') id: string
  ): Promise<{ videoUrl: string }> {
    const videoUrl = await this.videosService.getPresignedUrl(id);
    return { videoUrl };
  }

  @Post(':id/captions')
  @ApiOperation({ summary: 'Trigger caption generation' })
  @ApiParam({ name: 'id', example: 'video_123' })
  @ApiResponse({ status: 200, description: 'Caption generation started' })
  async triggerCaptions(@Param('id') id: string) {
    const success = await this.videosService.generateCaptions(id);
    return { success };
  }

  @Put(':id/captions/:language')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload caption file' })
  @ApiParam({ name: 'id', example: 'video_123' })
  @ApiParam({ name: 'language', example: 'ko' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Caption uploaded' })
  async uploadCaption(
    @Param('id') id: string,
    @Param('language') language: string,
    @UploadedFile() file: any // Avoid Multer type error
  ) {
    if (!file) {
      throw new Error('File is required');
    }
    const success = await this.videosService.uploadCaption(
      id,
      language,
      file.buffer
    );
    return { success };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search videos' })
  @ApiQuery({ name: 'q', required: true, example: '브랜딩' })
  @ApiResponse({ status: 200, description: 'Search results returned' })
  async search(@Query('q') q: string): Promise<any> {
    return this.videosService.search(q);
  }

  @Get(':id/recommendations')
  @ApiOperation({ summary: 'Get video recommendations' })
  @ApiParam({ name: 'id', example: 'video_123' })
  @ApiResponse({ status: 200, description: 'Recommendations returned' })
  async getRecommendations(@Param('id') id: string): Promise<any> {
    return this.videosService.getRecommendations(id);
  }

  @Post('import-stream')
  @ApiOperation({ summary: 'Import video from URL' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['url'],
      properties: {
        url: { type: 'string', example: 'https://cdn.example.com/video.mp4' },
        creator: { type: 'string', example: 'creator_1' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Video imported' })
  async importFromUrl(@Body() body: { url: string; creator?: string }) {
    const uid = await this.videosService.importVideoFromR2(
      body.url,
      body.creator
    );
    return { uid };
  }

  @Get('database/keys')
  @ApiOperation({ summary: 'List registered video keys' })
  @ApiResponse({ status: 200, description: 'Keys returned' })
  async getAllVideoKeys(): Promise<string[]> {
    const specs = await this.videosService.getAllRegisteredSpecs();
    return specs.map((s) => s.r2Key);
  }

  @Post('sync')
  @ApiOperation({ summary: 'Sync videos with storage' })
  @ApiResponse({ status: 200, description: 'Sync triggered' })
  async syncVideos(): Promise<any> {
    return this.videosService.syncWithStorage();
  }

  // @UseGuards(JwtAuthGuard) // Protect this endpoint
  @Post('upload-url')
  @ApiOperation({ summary: 'Get direct upload URL' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['uploadLength'],
      properties: {
        uploadLength: { type: 'number', example: 104857600 },
        metadata: { type: 'object', additionalProperties: true },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Upload URL issued' })
  async getDirectUploadUrl(
    @Body() body: { uploadLength: number; metadata?: any },
    @Request() req: any
  ): Promise<{ uploadUrl: string }> {
    // Logic:
    // 1. Get User ID from Auth (req.user.id) - Mocking for now if Auth not fully setup in this context
    const userId = req.user?.id || 'system_test_user';

    const url = await this.cloudflareService.getDirectUploadUrl(
      userId,
      body.uploadLength,
      body.metadata
    );
    return { uploadUrl: url };
  }
}
