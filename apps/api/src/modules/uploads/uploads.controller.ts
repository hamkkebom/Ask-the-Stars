import { Controller, Post, Get, UseInterceptors, UploadedFile, UseGuards, ParseFilePipe, MaxFileSizeValidator, Query, Body, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { VideosService, CreateVideoDto } from '../videos/videos.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly videosService: VideosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Max 500MB for testing video uploads
          new MaxFileSizeValidator({ maxSize: 500 * 1024 * 1024 }),
          // Allow images and videos
          // new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4|mov|avi)' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: any,
    @Body() body: any,
    @Request() req: any,
  ) {
    const isVideo = file.mimetype.startsWith('video');
    const folder = isVideo ? 'videos' : 'images';

    // 1. Upload to R2 (and Stream)
    const result = await this.uploadsService.uploadFile(file, folder);

    // 2. If it is a video and metadata is provided, create DB record immediately
    let videoRecord = null;
    if (isVideo && body.versionTitle) {
      // Parse Body to DTO
      const dto: CreateVideoDto = {
        title: body.title || body.versionTitle, // Fallback to version title if project title missing
        versionLabel: body.versionNumber || 'v1.0',
        versionTitle: body.versionTitle,
        description: body.notes,
        // Optional fields could be passed safely if needed
      };

      videoRecord = await this.videosService.createVideoRecord(
        {
          key: result.key,
          url: result.url,
          streamId: result.streamId,
          size: file.size,
          filename: file.originalname,
          mimetype: file.mimetype
        },
        dto,
        req.user.userId, // From JwtAuthGuard
      );
    }

    return {
      success: true,
      ...result,
      video: videoRecord,
    };
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async listFiles(@Query('prefix') prefix?: string) {
    const files = await this.uploadsService.listFiles(prefix);
    return {
      success: true,
      files,
    };
  }

  @Post('presigned')
  @UseGuards(JwtAuthGuard)
  async getPresignedUrl(@Body() body: { key: string }) {
      const url = await this.uploadsService.getPresignedUrl(body.key);
      return {
          success: !!url,
          url,
          key: body.key
      };
  }

  @Post('presigned-put-url')
  @UseGuards(JwtAuthGuard)
  async getPresignedPutUrl(@Body() body: { key: string; contentType: string }) {
      // Validate key to prevent path traversal
      // Simple check: Allow safe chars. For now simple pass.
      const url = await this.uploadsService.getPresignedPutUrl(body.key, body.contentType);
      return {
          success: !!url,
          url,
          key: body.key
      };
  }
}
