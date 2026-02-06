import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { AiService } from '../ai/ai.service';
import { VideoStorageService } from './video-storage.service';

@Injectable()
export class VideoQueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
    private readonly aiService: AiService,
    private readonly videoStorage: VideoStorageService
  ) {}

  async getVideoByProjectNo(projectNo: number) {
    const project = await this.prisma.project.findUnique({
      where: { projectNo },
      include: {
        videos: {
          where: { status: 'FINAL' },
          include: {
            technicalSpec: true,
            maker: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project #${projectNo} not found`);
    }

    const video = project.videos[0];
    if (!video) {
      return null;
    }

    return {
      title: project.title,
      versionLabel: video.versionLabel,
      r2Key: video.technicalSpec?.r2Key,
      streamUid: video.technicalSpec?.streamUid,
      thumbnailUrl: video.technicalSpec?.streamUid
        ? await this.videoStorage.getSignedThumbnailUrl(
            video.technicalSpec.streamUid
          )
        : video.technicalSpec?.thumbnailUrl,
      thumbnailVariants: video.technicalSpec?.streamUid
        ? this.videoStorage.getStreamThumbnailVariants(
            video.technicalSpec.streamUid
          )
        : null,
      status: video.status,
    };
  }

  async getVideoById(videoId: string) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
      include: {
        technicalSpec: true,
        project: true,
        maker: true,
        eventLogs: {
          orderBy: { occurredAt: 'desc' },
        },
      },
    });

    if (!video) {
      throw new NotFoundException(`Video ${videoId} not found`);
    }

    let signedUrl = null;
    let streamToken = null;

    if (video.technicalSpec?.streamUid) {
      streamToken = await this.videoStorage.generateSignedToken(
        video.technicalSpec.streamUid
      );
    } else if (video.technicalSpec?.r2Key) {
      signedUrl = await this.uploadsService.getPresignedUrl(
        video.technicalSpec.r2Key
      );
    }

    let views = 0;
    if (video.technicalSpec?.streamUid) {
      const analytics = await this.videoStorage.getVideoAnalytics(
        video.technicalSpec.streamUid
      );
      views = analytics.views;
    }

    return {
      ...video,
      views,
      streamToken,
      downloadUrl: video.technicalSpec?.streamUid
        ? this.videoStorage.getDownloadUrl(video.technicalSpec.streamUid)
        : null,
      technicalSpec: {
        ...video.technicalSpec,
        videoUrl: signedUrl,
        streamToken: streamToken,
        streamUid: video.technicalSpec?.streamUid,
        thumbnailUrl: video.technicalSpec?.streamUid
          ? await this.videoStorage.getSignedThumbnailUrl(
              video.technicalSpec.streamUid
            )
          : video.technicalSpec?.thumbnailUrl,
        thumbnailVariants: video.technicalSpec?.streamUid
          ? this.videoStorage.getStreamThumbnailVariants(
              video.technicalSpec.streamUid
            )
          : null,
      },
    };
  }

  async listVideosByChannel(channelName: string): Promise<any> {
    return this.prisma.project.findMany({
      where: {
        channel: { name: channelName },
        videos: { some: { status: 'FINAL' } },
      },
      select: {
        title: true,
        videos: {
          where: { status: 'FINAL' },
          take: 1,
          select: {
            createdAt: true,
          },
        },
        channel: {
          select: { name: true },
        },
      },
    });
  }

  async listAllFinalVideos(params?: {
    page?: number;
    limit?: number;
    category?: string;
    counselor?: string;
    creator?: string;
    sort?: 'latest' | 'popular';
  }): Promise<any> {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 25;
      const skip = (page - 1) * limit;

      const where: any = { status: 'FINAL' };

      if (params?.category && params.category !== '전체') {
        where.project = {
          ...where.project,
          category: { name: params.category },
        };
      }

      if (
        params?.counselor &&
        params.counselor !== '전체보기' &&
        params.counselor !== 'ALL'
      ) {
        where.project = {
          ...where.project,
          counselor: { name: params.counselor },
        };
      }

      if (params?.creator && params.creator !== '전체보기') {
      }

      const [videos, total] = await Promise.all([
        this.prisma.video.findMany({
          where,
          include: {
            technicalSpec: true,
            project: {
              include: {
                category: true,
                counselor: { select: { id: true, name: true } },
                owner: { select: { id: true, name: true, email: true } },
              },
            },
            maker: { select: { id: true, name: true } },
          },
          orderBy: {
            createdAt: params?.sort === 'popular' ? 'desc' : 'desc',
          },
          skip,
          take: limit,
        }),
        this.prisma.video.count({ where }),
      ]);

      const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
          let previewUrl = null;
          let thumbnailUrl = video.technicalSpec?.thumbnailUrl;
          const thumbnailVariants = video.technicalSpec?.streamUid
            ? this.videoStorage.getStreamThumbnailVariants(
                video.technicalSpec.streamUid
              )
            : null;

          if (video.technicalSpec?.streamUid) {
            const urls = await this.videoStorage.getSignedThumbnailUrls(
              video.technicalSpec.streamUid
            );
            previewUrl = urls.gif;
            if (!thumbnailUrl || thumbnailUrl.includes('videodelivery.net'))
              thumbnailUrl = urls.jpg;

            // Fallback: if signed URL generation failed (empty string), use unsigned thumbnail
            if (!thumbnailUrl) {
              thumbnailUrl = this.videoStorage.getStreamThumbnailBaseUrl(
                video.technicalSpec.streamUid
              );
            }
          }

          // Sanitize URLs: strip BOM, CR/LF that may have been stored in DB
          const sanitizeUrl = (url: string | null | undefined) =>
            url ? url.replace(/[\uFEFF\r\n]+/g, '').trim() : url;

          return {
            ...video,
            technicalSpec: {
              ...video.technicalSpec,
              thumbnailUrl: sanitizeUrl(thumbnailUrl),
              thumbnailVariants,
              previewUrl: sanitizeUrl(previewUrl),
            },
            thumbnailVariants,
            previewUrl: sanitizeUrl(previewUrl),
          };
        })
      );

      return {
        data: enrichedVideos,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / limit),
          has_more: page * limit < total,
        },
      };
    } catch (error) {
      console.error('❌ Error listing videos:', error);
      throw error;
    }
  }

  async search(query: string) {
    return this.aiService.searchSimilarVideos(query);
  }

  async getRecommendations(videoId: string) {
    return this.aiService.searchSimilarVideosById(videoId);
  }
}
