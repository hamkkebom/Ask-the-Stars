import { Injectable } from '@nestjs/common';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';

@Injectable()
export class VideoStorageService {
  constructor(private readonly cloudflareStream: CloudflareStreamService) {}

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
