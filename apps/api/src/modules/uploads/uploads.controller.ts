import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

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
  ) {
    const folder = file.mimetype.startsWith('image') ? 'images' : 'videos';
    const result = await this.uploadsService.uploadFile(file, folder);
    return {
      success: true,
      ...result,
    };
  }
}
