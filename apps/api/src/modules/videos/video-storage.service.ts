import { Injectable } from '@nestjs/common';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class VideoStorageService {
  constructor(
    private readonly cloudflareStream: CloudflareStreamService,
    private readonly uploadsService: UploadsService
  ) {}

  async getR2PresignedUrl(r2Key: string): Promise<string> {
    return this.uploadsService.getPresignedUrl(r2Key);
  }

  async generateStreamSignedUrl(streamUid: string): Promise<string> {
    const token = await this.cloudflareStream.generateSignedToken(streamUid);
    return token
      ? `https://videodelivery.net/${token}/manifest/video.m3u8`
      : '';
  }

  async getSignedThumbnailUrl(streamUid: string): Promise<string> {
    return this.cloudflareStream.getSignedThumbnailUrl(streamUid);
  }

  async getSignedThumbnailUrls(
    streamUid: string
  ): Promise<{ jpg: string; gif: string }> {
    return this.cloudflareStream.getSignedThumbnailUrls(streamUid);
  }

  getStreamThumbnailVariants(streamUid: string) {
    return this.cloudflareStream.getStreamThumbnailVariants(streamUid);
  }

  getStreamThumbnailBaseUrl(streamUid: string): string {
    return this.cloudflareStream.getStreamThumbnailBaseUrl(streamUid);
  }

  async generateSignedToken(uid: string): Promise<string> {
    return this.cloudflareStream.generateSignedToken(uid);
  }

  async generateCaptions(streamUid: string): Promise<boolean> {
    return this.cloudflareStream.generateCaptions(streamUid);
  }

  async uploadCaption(
    streamUid: string,
    language: string,
    fileBuffer: Buffer
  ): Promise<boolean> {
    return this.cloudflareStream.uploadCaption(streamUid, language, fileBuffer);
  }

  getDownloadUrl(uid: string): string {
    return this.cloudflareStream.getDownloadUrl(uid);
  }

  async getVideoAnalytics(uid: string): Promise<{ views: number }> {
    return this.cloudflareStream.getVideoAnalytics(uid);
  }

  async getDirectUploadUrl(
    userId: string,
    uploadLength: number,
    metadata?: Record<string, string>
  ): Promise<string> {
    return this.cloudflareStream.getDirectUploadUrl(
      userId,
      uploadLength,
      metadata
    );
  }
}
