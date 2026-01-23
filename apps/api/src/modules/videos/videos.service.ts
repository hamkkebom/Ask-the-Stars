import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  async getVideoByProjectNo(projectNo: number) {
    const project = await this.prisma.project.findUnique({
      where: { projectNo },
      include: {
        videos: {
          where: { status: 'FINAL' }, // Default to FINAL as per guide
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
        // Fallback: Check if there are ANY videos if no FINAL one exists?
        // For now, strict adherence to guide: "Only approved videos"
        return null;
    }

    return {
      title: project.title,
      versionLabel: video.versionLabel,
      r2Key: video.technicalSpec?.r2Key,
      streamUid: video.technicalSpec?.streamUid,
      thumbnailUrl: video.technicalSpec?.thumbnailUrl,
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

    return video;
  }

  async listVideosByChannel(channelName: string): Promise<any> {
      return this.prisma.project.findMany({
          where: {
              channel: { name: channelName },
              videos: { some: { status: 'FINAL' } }
          },
          select: {
              title: true,
              videos: {
                  where: { status: 'FINAL' },
                  take: 1,
                  select: {
                      createdAt: true,
                  }
              },
              channel: {
                  select: { name: true }
              }
          }
      });
  }

  async getAllRegisteredKeys(): Promise<string[]> {
      const specs = await this.prisma.videoTechnicalSpec.findMany({
          select: { r2Key: true }
      });
      return specs.map((s: { r2Key: string }) => s.r2Key);
  }

  async listAllFinalVideos(): Promise<any[]> {
    return this.prisma.video.findMany({
      where: { status: 'FINAL' },
      include: {
        technicalSpec: true,
        project: {
          include: {
            category: true,
            counselor: true,
          }
        },
        maker: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
