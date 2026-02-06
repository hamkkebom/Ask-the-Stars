import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';

@Injectable()
export class VideoSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadsService: UploadsService,
    private readonly cloudflareService: CloudflareStreamService
  ) {}

  async syncVideoStatus(
    streamUid: string,
    status: 'FINAL' | 'PENDING' | 'FAILED',
    duration?: number
  ) {
    const spec = await this.prisma.videoTechnicalSpec.findFirst({
      where: { streamUid },
    });

    if (!spec) {
      console.warn(`Webhook: No video found for streamUid ${streamUid}`);
      return;
    }

    await this.prisma.video.update({
      where: { id: spec.video_id },
      data: { status: status === 'FINAL' ? 'FINAL' : 'DRAFT' },
    });

    if (duration) {
      await this.prisma.videoTechnicalSpec.update({
        where: { video_id: spec.video_id },
        data: { duration },
      });
    }

    console.log(
      `✅ Synced Video Status: ${spec.video_id} -> ${status}, Duration: ${duration}`
    );
  }

  async importVideoFromR2(url: string, creator?: string): Promise<string> {
    return this.cloudflareService.copyFromUrl(url, { creator });
  }

  async getAllRegisteredSpecs(): Promise<
    { r2Key: string; thumbnailUrl: string | null; video_id: string }[]
  > {
    const specs = await this.prisma.videoTechnicalSpec.findMany({
      select: { r2Key: true, thumbnailUrl: true, video_id: true },
    });
    return specs;
  }

  async syncWithStorage() {
    console.log('🔄 Starting R2 to Supabase sync...');

    const r2Files = await this.uploadsService.listFiles();
    const videoFiles = r2Files.filter((f) =>
      ['.mp4', '.mov', '.mkv', '.avi'].some((ext) =>
        f.key.toLowerCase().endsWith(ext)
      )
    );
    const imageFiles = r2Files.filter((f) =>
      ['.jpg', '.jpeg', '.png', '.webp', '.avif'].some((ext) =>
        f.key.toLowerCase().endsWith(ext)
      )
    );

    const imageMap = new Map<string, string>();
    const debugLog: string[] = [];
    debugLog.push(`Sync Debug Start ${new Date().toISOString()}`);
    debugLog.push(`R2 Files Count: ${r2Files.length}`);
    debugLog.push(`Video Files: ${videoFiles.length}`);
    debugLog.push(`Image Files: ${imageFiles.length}`);
    debugLog.push(
      `Sample Image Keys:\n${imageFiles
        .slice(0, 5)
        .map((f) => f.key)
        .join('\n')}`
    );

    const priority: Record<string, number> = {
      '.jpg': 1,
      '.jpeg': 1,
      '.png': 2,
      '.webp': 3,
      '.avif': 4,
    };

    imageFiles.sort((a, b) => {
      const extA = a.key.substring(a.key.lastIndexOf('.')).toLowerCase();
      const extB = b.key.substring(b.key.lastIndexOf('.')).toLowerCase();
      return (priority[extA] || 0) - (priority[extB] || 0);
    });

    imageFiles.forEach((img) => {
      const decodedKey = decodeURIComponent(img.key).normalize('NFC');
      const extIndex = decodedKey.lastIndexOf('.');
      const baseName = decodedKey.substring(0, extIndex);
      const url = img.key;

      imageMap.set(baseName, url);

      if (baseName.endsWith('_thumb')) {
        const stripped = baseName.substring(0, baseName.length - 6);
        imageMap.set(stripped, url);
        if (imageMap.size < 10)
          debugLog.push(`Mapped: ${baseName} -> ${stripped}`);
      }
    });

    const dbSpecs = await this.getAllRegisteredSpecs();

    debugLog.push(
      `Sample Video R2 Keys (DB):\n${dbSpecs
        .slice(0, 5)
        .map((s) => s.r2Key)
        .join('\n')}`
    );

    let updatedThumbnailsCount = 0;

    for (const spec of dbSpecs) {
      const decodedDbKey = decodeURIComponent(spec.r2Key).normalize('NFC');
      const extIndex = decodedDbKey.lastIndexOf('.');
      if (extIndex > -1) {
        const videoBase = decodedDbKey.substring(0, extIndex);
        const thumbUrl = imageMap.get(videoBase);

        if (thumbUrl && spec.thumbnailUrl !== thumbUrl) {
          await this.prisma.videoTechnicalSpec.update({
            where: { video_id: spec.video_id },
            data: { thumbnailUrl: thumbUrl },
          });
          updatedThumbnailsCount++;
        }
      }
    }
    const dbKeySet = new Set(dbSpecs.map((s) => s.r2Key));

    const orphans = videoFiles.filter((f) => !dbKeySet.has(f.key));

    console.log(
      `📊 Sync Summary: R2 Total: ${r2Files.length}, Videos: ${videoFiles.length}, New: ${orphans.length}, Thumbnails Updated: ${updatedThumbnailsCount}`
    );

    const systemUser =
      (await this.prisma.user.findFirst({
        where: { role: 'ADMIN' },
      })) || (await this.prisma.user.findFirst());

    if (!systemUser && orphans.length > 0) {
      throw new Error(
        'Cannot sync: No users found in database to assign projects to.'
      );
    }

    let createdCount = 0;

    for (const orphan of orphans) {
      try {
        const decodedKey = decodeURIComponent(orphan.key);
        const fileName = decodedKey.split('/').pop() || '';

        const regex = /^\[(.+?)\]\s*(.+?)_\[(.+?)\]\s*(.+)$/;
        const match = fileName.match(regex);

        let categoryName = '기타';
        let startedAt: Date | null = null;
        let counselorName = '일반';
        let refinedTitle = fileName.replace(/\.[^/.]+$/, '');
        let versionLabel = 'v1.0';

        if (match) {
          categoryName = match[1];
          const dateStr = match[2];
          counselorName = match[3];
          const rawTitle = match[4].replace(/\.[^/.]+$/, '');

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
                    format:
                      fileName.split('.').pop()?.toLowerCase() || 'unknown',
                    thumbnailUrl:
                      imageMap.get(
                        fileName.substring(0, fileName.lastIndexOf('.'))
                      ) || null,
                  } as any,
                },
              },
            },
          },
        });
        createdCount++;
      } catch (err: any) {
        console.error(
          `❌ Failed metadata refinement for ${orphan.key}:`,
          err.message
        );
      }
    }

    return {
      totalInStorage: r2Files.length,
      videoFilesCount: videoFiles.length,
      newSyncedCount: createdCount,
      updatedThumbnailsCount,
      orphans: orphans
        .slice(0, 10)
        .map((o) => ({ key: o.key, lastModified: o.lastModified })),
      debugLog,
    };
  }
}
