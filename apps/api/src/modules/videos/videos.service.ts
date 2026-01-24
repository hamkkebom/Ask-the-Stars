import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class VideosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
  ) {}

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

  async syncWithStorage() {
    console.log('🔄 Starting R2 to Supabase sync...');

    // 1. Get all files from R2
    const r2Files = await this.uploadsService.listFiles();
    const videoFiles = r2Files.filter(f =>
      f.key.toLowerCase().endsWith('.mp4') ||
      f.key.toLowerCase().endsWith('.mov') ||
      f.key.toLowerCase().endsWith('.mkv')
    );

    // 2. Get all existing keys in DB
    const dbKeys = await this.getAllRegisteredKeys();
    const dbKeySet = new Set(dbKeys);

    // 3. Find missing files
    const orphans = videoFiles.filter(f => !dbKeySet.has(f.key));

    console.log(`📊 Sync Summary: R2 Total: ${r2Files.length}, Videos: ${videoFiles.length}, New: ${orphans.length}`);

    // 4. Get a system user (Admin or any existing user) for ownership
    const systemUser = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
    }) || await this.prisma.user.findFirst();

    if (!systemUser && orphans.length > 0) {
      throw new Error('Cannot sync: No users found in database to assign projects to.');
    }

    let createdCount = 0;

    for (const orphan of orphans) {
      try {
        const decodedKey = decodeURIComponent(orphan.key);
        const fileName = decodedKey.split('/').pop() || '';

        // Pattern parsing: [{Category}] {Date}_[{Counselor}] {Title}_{Version}.mp4
        const regex = /^\[(.+?)\]\s*(.+?)_\[(.+?)\]\s*(.+)$/;
        const match = fileName.match(regex);

        let categoryName = '기타';
        let startedAt: Date | null = null;
        let counselorName = '대상없음';
        let refinedTitle = fileName.replace(/\.[^/.]+$/, "");
        let versionLabel = 'v1.0';

        if (match) {
          categoryName = match[1];
          const dateStr = match[2];
          counselorName = match[3];
          const rawTitle = match[4].replace(/\.[^/.]+$/, "");

          const versionMatch = rawTitle.match(/(.+)_([vV]\d+\.\d+)$/);
          if (versionMatch) {
            refinedTitle = versionMatch[1];
            versionLabel = versionMatch[2];
          } else {
            refinedTitle = rawTitle;
          }

          if (dateStr && !isNaN(Date.parse(dateStr))) {
            startedAt = new Date(dateStr);
          }
        }

        const category = await this.prisma.category.upsert({
          where: { name: categoryName },
          update: {},
          create: { name: categoryName },
        });

        const counselor = await this.prisma.counselor.upsert({
          where: { name: counselorName },
          update: {},
          create: { name: counselorName },
        });

        await this.prisma.project.create({
          data: {
            title: refinedTitle || '제목 없음',
            status: 'COMPLETED',
            startedAt,
            ownerId: systemUser!.id,
            categoryId: category.id,
            counselorId: counselor.id,
            videos: {
              create: {
                versionLabel,
                status: 'FINAL',
                completedAt: startedAt,
                technicalSpec: {
                  create: {
                    filename: fileName,
                    r2Key: orphan.key,
                    fileSize: orphan.size ? BigInt(orphan.size) : null,
                    format: fileName.split('.').pop()?.toLowerCase() || 'unknown',
                  } as any
                }
              }
            }
          }
        });
        createdCount++;
      } catch (err: any) {
        console.error(`❌ Failed metadata refinement for ${orphan.key}:`, err.message);
      }
    }

    return {
      totalInStorage: r2Files.length,
      videoFilesCount: videoFiles.length,
      newSyncedCount: createdCount,
      orphans: orphans.slice(0, 10).map(o => ({ key: o.key, lastModified: o.lastModified }))
    };
  }
}
