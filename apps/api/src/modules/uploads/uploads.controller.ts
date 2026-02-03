import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  Body,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { VideosService, CreateVideoDto } from '../videos/videos.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PresignedUrlDto } from './dto';

@Controller({ path: 'uploads', version: '1' })
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly videosService: VideosService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Max 100MB file size limit
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
          // Whitelist allowed MIME types for security
          new FileTypeValidator({
            fileType:
              /(video\/mp4|video\/quicktime|video\/webm|image\/jpeg|image\/png|image\/webp)/,
          }),
        ],
        fileIsRequired: true,
      })
    )
    file: any,
    @Body() body: any,
    @Request() req: any
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
          mimetype: file.mimetype,
          metadata: result.metadata, // Pass extracted FFprobe metadata
        },
        dto,
        req.user.userId // From JwtAuthGuard
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
  @ApiBody({ type: PresignedUrlDto })
  async getPresignedUrl(@Body() dto: PresignedUrlDto) {
    const url = await this.uploadsService.getPresignedUrl(dto.key);
    return {
      success: !!url,
      url,
      key: dto.key,
    };
  }

  @Post('presigned-put-url')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PresignedUrlDto })
  async getPresignedPutUrl(@Body() dto: PresignedUrlDto) {
    const url = await this.uploadsService.getPresignedPutUrl(
      dto.key,
      dto.contentType
    );
    return {
      success: !!url,
      url,
      key: dto.key,
    };
  }
}
