import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { VideoStatus } from '@prisma/client';
import { AiService } from '../ai/ai.service';
import { VideoStorageService } from './video-storage.service';
import { CreateVideoDto } from './videos.service';

@Injectable()
export class VideoMutationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly videoStorage: VideoStorageService
  ) {}

  async updateVideoStatus(videoId: string, status: VideoStatus) {
    return this.prisma.video.update({
      where: { id: videoId },
      data: { status },
    });
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
    const category = await this.prisma.category.upsert({
      where: { name: meta.categoryName || '기타' },
      update: {},
      create: { name: meta.categoryName || '기타' },
    });

    let counselor = await this.prisma.counselor.findFirst({
      where: { name: meta.counselorName || '일반' },
    });

    if (!counselor) {
      counselor = await this.prisma.counselor.create({
        data: { name: meta.counselorName || '대상없음' },
      });
    }

    const format =
      uploadResult.metadata?.format ||
      uploadResult.filename.split('.').pop()?.toLowerCase() ||
      'unknown';

    const result = await this.prisma.project.create({
      data: {
        title: meta.title,
        status: 'COMPLETED',
        startedAt: new Date(),
        ownerId: userId,
        categoryId: category.id,
        counselorId: counselor.id,
        videos: {
          create: {
            versionLabel: meta.versionLabel || 'v1.0',
            status: 'FINAL',
            feedback: meta.description,
            completedAt: new Date(),
            technicalSpec: {
              create: {
                filename: uploadResult.filename,
                r2Key: uploadResult.key,
                fileSize: BigInt(uploadResult.size),
                format: format,
                streamUid: uploadResult.streamId,
                thumbnailUrl: uploadResult.streamId
                  ? this.videoStorage.getStreamThumbnailBaseUrl(
                      uploadResult.streamId
                    )
                  : undefined,
                width: uploadResult.metadata?.width,
                height: uploadResult.metadata?.height,
                duration: uploadResult.metadata?.duration,
                fps: uploadResult.metadata?.fps,
                videoCodec: uploadResult.metadata?.videoCodec,
                audioCodec: uploadResult.metadata?.audioCodec,
                audioChannels: uploadResult.metadata?.audioChannels,
                sampleRate: uploadResult.metadata?.sampleRate,
                overallBitrate: uploadResult.metadata?.overallBitrate,
                aspectRatio: uploadResult.metadata?.aspectRatio,
                pixelFormat: uploadResult.metadata?.pixelFormat,
              },
            },
          },
        },
      },
      include: {
        videos: true,
      },
    });

    try {
      if (result.videos && result.videos.length > 0) {
        const video = result.videos[0];
        const embeddingText = `Title: ${meta.title}\nDescription: ${meta.description || ''}\nCategory: ${meta.categoryName || '기타'}\nCounselor: ${meta.counselorName || '대상없음'}`;

        this.aiService
          .createVideoEmbedding(video.id, embeddingText)
          .catch((e) =>
            console.error(`AI Embedding failed for ${video.id}:`, e)
          );
      }
    } catch (e) {
      console.error('Error triggering AI embedding:', e);
    }

    return result;
  }
}
