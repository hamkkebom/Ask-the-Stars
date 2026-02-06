import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { VideoQueryService } from './video-query.service';
import { VideoMutationService } from './video-mutation.service';
import { VideoSyncService } from './video-sync.service';
import { VideoStorageService } from './video-storage.service';

export interface CreateVideoDto {
  title: string;
  versionLabel: string;
  versionTitle?: string;
  description?: string;
  categoryName?: string;
  counselorName?: string;
  creatorId?: string; // Optional: if we want to link to a specific creator
}

@Injectable()
export class VideosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
    private readonly cloudflareService: CloudflareStreamService,
    private readonly videoQueryService: VideoQueryService,
    private readonly videoMutationService: VideoMutationService,
    private readonly videoSyncService: VideoSyncService,
    private readonly videoStorageService: VideoStorageService
  ) {}

  async getVideoByProjectNo(projectNo: number) {
    return this.videoQueryService.getVideoByProjectNo(projectNo);
  }

  async getVideoById(videoId: string) {
    return this.videoQueryService.getVideoById(videoId);
  }

  async syncVideoStatus(
    streamUid: string,
    status: 'FINAL' | 'PENDING' | 'FAILED',
    duration?: number
  ) {
    return this.videoSyncService.syncVideoStatus(streamUid, status, duration);
  }

  async generateCaptions(videoId: string) {
    const video = await this.getVideoById(videoId);
    if (!video.technicalSpec?.streamUid) {
      throw new Error('Video stream not ready');
    }
    return this.cloudflareService.generateCaptions(
      video.technicalSpec.streamUid
    );
  }

  async uploadCaption(videoId: string, language: string, fileBuffer: Buffer) {
    const video = await this.getVideoById(videoId);
    if (!video.technicalSpec?.streamUid) {
      throw new Error('Video stream not ready');
    }
    return this.cloudflareService.uploadCaption(
      video.technicalSpec.streamUid,
      language,
      fileBuffer
    );
  }

  async importVideoFromR2(url: string, creator?: string): Promise<string> {
    return this.videoSyncService.importVideoFromR2(url, creator);
  }

  async listVideosByChannel(channelName: string): Promise<any> {
    return this.videoQueryService.listVideosByChannel(channelName);
  }

  async getAllRegisteredSpecs(): Promise<
    { r2Key: string; thumbnailUrl: string | null; video_id: string }[]
  > {
    return this.videoSyncService.getAllRegisteredSpecs();
  }

  async getPresignedUrl(videoId: string): Promise<string> {
    const spec = await this.prisma.videoTechnicalSpec.findUnique({
      where: { video_id: videoId },
    });
    if (!spec || !spec.r2Key) {
      throw new NotFoundException(`R2 Key for video ${videoId} not found`);
    }
    return this.uploadsService.getPresignedUrl(spec.r2Key);
  }

  async getDirectUploadUrl(
    userId: string,
    uploadLength: number,
    metadata?: Record<string, string>
  ): Promise<string> {
    return this.videoStorageService.getDirectUploadUrl(
      userId,
      uploadLength,
      metadata
    );
  }

  // Method to list all final videos for the grid
  async listAllFinalVideos(params?: {
    page?: number;
    limit?: number;
    category?: string;
    counselor?: string;
    creator?: string;
    sort?: 'latest' | 'popular';
  }): Promise<any> {
    return this.videoQueryService.listAllFinalVideos(params);
  }

  async syncWithStorage() {
    return this.videoSyncService.syncWithStorage();
  }

  async createVideoRecord(
    uploadResult: {
      key: string;
      url: string;
      streamId?: string;
      size: number;
      filename: string;
      mimetype: string;
      metadata?: {
        width?: number;
        height?: number;
        duration?: number;
        fps?: number;
        videoCodec?: string;
        audioCodec?: string | null;
        audioChannels?: number | null;
        sampleRate?: number | null;
        overallBitrate?: number;
        format?: string;
        aspectRatio?: string;
        pixelFormat?: string | null;
      };
    },
    meta: CreateVideoDto,
    userId: string
  ) {
    return this.videoMutationService.createVideoRecord(
      uploadResult,
      meta,
      userId
    );
  }

  async search(query: string) {
    return this.videoQueryService.search(query);
  }

  async getRecommendations(videoId: string) {
    return this.videoQueryService.getRecommendations(videoId);
  }
}
