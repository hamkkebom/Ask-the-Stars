import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { ConfigService } from '@nestjs/config';

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
    private readonly configService: ConfigService,
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

    // Enhance with signed URL if needed
    // Enhance with signed URL or Token
    let signedUrl = null;
    let streamToken = null;

    // A. Premium Strategy: Generate Token if streamUid exists
    if (video.technicalSpec?.streamUid) {
        streamToken = await this.cloudflareService.generateSignedToken(video.technicalSpec.streamUid);
    }
    // B. Legacy/Hybrid Strategy: Generate R2 Signed URL if no streamUid
    else if (video.technicalSpec?.r2Key) {
        signedUrl = await this.uploadsService.getPresignedUrl(video.technicalSpec.r2Key);
    }

    return {
        ...video,
        technicalSpec: {
            ...video.technicalSpec,
            // If signedUrl exists, we can expose it.
            // Better to add a 'signedUrl' field.
            // Expose both for hybrid support
            videoUrl: signedUrl,
            streamToken: streamToken,
            streamUid: video.technicalSpec?.streamUid // Ensure UID is passed
        }
    };
  }

  async syncVideoStatus(streamUid: string, status: 'FINAL' | 'PENDING' | 'FAILED') {
      // Find the Spec with this UID
      const spec = await this.prisma.videoTechnicalSpec.findFirst({
          where: { streamUid }
      });

      if (!spec) {
          console.warn(`Webhook: No video found for streamUid ${streamUid}`);
          return;
      }

      // Update Video Status
      await this.prisma.video.update({
          where: { id: spec.video_id },
          data: { status: status === 'FINAL' ? 'FINAL' : 'DRAFT' } // Map to Prisma Enum
      });

      console.log(`✅ Synced Video Status: ${spec.video_id} -> ${status}`);
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

  async getAllRegisteredSpecs(): Promise<{ r2Key: string; thumbnailUrl: string | null; video_id: string }[]> {
      const specs = await this.prisma.videoTechnicalSpec.findMany({
          select: { r2Key: true, thumbnailUrl: true, video_id: true }
      });
      return specs;
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
      ['.mp4', '.mov', '.mkv', '.avi'].some(ext => f.key.toLowerCase().endsWith(ext))
    );
    const imageFiles = r2Files.filter(f =>
      ['.jpg', '.jpeg', '.png', '.webp'].some(ext => f.key.toLowerCase().endsWith(ext))
    );

    // Map base filenames to image keys/urls
    const imageMap = new Map<string, string>();
    const publicUrl = this.configService.get<string>('CLOUDFLARE_PUBLIC_Url') ||
                      this.configService.get<string>('NEXT_PUBLIC_R2_PUBLIC_URL') ||
                      ''; // Fallback to empty if not configured

    imageFiles.forEach(img => {
      const baseName = img.key.substring(0, img.key.lastIndexOf('.'));
      // Store full URL if publicUrl exists, otherwise key
      imageMap.set(baseName, publicUrl ? `${publicUrl}/${img.key}` : img.key);
    });

    // 2. Get all existing specs in DB
    const dbSpecs = await this.getAllRegisteredSpecs();
    const dbKeySet = new Set(dbSpecs.map(s => s.r2Key));

    // 3. Find missing files (New Videos)
    const orphans = videoFiles.filter(f => !dbKeySet.has(f.key));

    // 3.5 Update existing thumbnails (Backfill)
    let updatedThumbnailsCount = 0;
    for (const spec of dbSpecs) {
      if (!spec.thumbnailUrl) { // Only update if missing
        const baseName = spec.r2Key.substring(0, spec.r2Key.lastIndexOf('.'));
        const thumbUrl = imageMap.get(baseName);
        if (thumbUrl) {
          await this.prisma.videoTechnicalSpec.update({
            where: { video_id: spec.video_id },
            data: { thumbnailUrl: thumbUrl }
          });
          updatedThumbnailsCount++;
        }
      }
    }

    console.log(`📊 Sync Summary: R2 Total: ${r2Files.length}, Videos: ${videoFiles.length}, New: ${orphans.length}, Thumbnails Updated: ${updatedThumbnailsCount}`);

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

        let counselor = await this.prisma.counselor.findFirst({
          where: { name: counselorName },
        });

        if (!counselor) {
          counselor = await this.prisma.counselor.create({
            data: { name: counselorName },
          });
        }

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
                    // Try to find matching thumbnail by base name
                    thumbnailUrl: imageMap.get(fileName.substring(0, fileName.lastIndexOf('.'))) || null,
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
      updatedThumbnailsCount,
      orphans: orphans.slice(0, 10).map(o => ({ key: o.key, lastModified: o.lastModified }))
    };
  }

  async createVideoRecord(
    uploadResult: { key: string; url: string; streamId?: string; size: number; filename: string; mimetype: string },
    meta: CreateVideoDto,
    userId: string,
  ) {
    // 1. Find or Create Project
    // If we assume every upload is a NEW project for now (unless projectId is passed, which we might add later)
    // For this basic version, let's create a new project.

    const category = await this.prisma.category.upsert({
      where: { name: meta.categoryName || '기타' },
      update: {},
      create: { name: meta.categoryName || '기타' },
    });

    let counselor = await this.prisma.counselor.findFirst({
      where: { name: meta.counselorName || '대상없음' },
    });

    if (!counselor) {
      counselor = await this.prisma.counselor.create({
        data: { name: meta.counselorName || '대상없음' },
      });
    }

    // Determine format
    const format = uploadResult.filename.split('.').pop()?.toLowerCase() || 'unknown';

    return this.prisma.project.create({
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
            status: 'FINAL', // Immediate visibility
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
                  ? `https://customer-${process.env.CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${uploadResult.streamId}/thumbnails/thumbnail.jpg`
                  : undefined
              }
            }
          }
        }
      },
      include: {
        videos: true
      }
    });
  }
}
