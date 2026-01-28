import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { AiService } from '../ai/ai.service';


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
    private readonly aiService: AiService,
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
      thumbnailUrl: video.technicalSpec?.streamUid
        ? await this.cloudflareService.getSignedThumbnailUrl(video.technicalSpec.streamUid)
        : video.technicalSpec?.thumbnailUrl,
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

    // C. Fetch Analytics (Views)
    let views = 0;
    if (video.technicalSpec?.streamUid) {
        const analytics = await this.cloudflareService.getVideoAnalytics(video.technicalSpec.streamUid);
        views = analytics.views;
    }

    return {
        ...video,
        views,
        streamToken, // Expose token for frontend player
        downloadUrl: video.technicalSpec?.streamUid ? this.cloudflareService.getDownloadUrl(video.technicalSpec.streamUid) : null,
        technicalSpec: {
            ...video.technicalSpec,
            // If signedUrl exists, we can expose it.
            // Better to add a 'signedUrl' field.
            // Expose both for hybrid support
            videoUrl: signedUrl,
            streamToken: streamToken,
            streamUid: video.technicalSpec?.streamUid, // Ensure UID is passed
            thumbnailUrl: video.technicalSpec?.streamUid
                ? await this.cloudflareService.getSignedThumbnailUrl(video.technicalSpec.streamUid)
                : video.technicalSpec?.thumbnailUrl
        }
    };
  }

  async syncVideoStatus(streamUid: string, status: 'FINAL' | 'PENDING' | 'FAILED', duration?: number) {
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

      // Update Duration in Spec if provided
      if (duration) {
          await this.prisma.videoTechnicalSpec.update({
              where: { video_id: spec.video_id },
              data: { duration }
          });
      }

      console.log(`✅ Synced Video Status: ${spec.video_id} -> ${status}, Duration: ${duration}`);
  }

  async generateCaptions(videoId: string) {
      const video = await this.getVideoById(videoId);
      if (!video.technicalSpec?.streamUid) {
          throw new Error('Video stream not ready');
      }
      return this.cloudflareService.generateCaptions(video.technicalSpec.streamUid);
  }

  async uploadCaption(videoId: string, language: string, fileBuffer: Buffer) {
      const video = await this.getVideoById(videoId);
      if (!video.technicalSpec?.streamUid) {
          throw new Error('Video stream not ready');
      }
      return this.cloudflareService.uploadCaption(video.technicalSpec.streamUid, language, fileBuffer);
  }

  async importVideoFromR2(url: string, creator?: string): Promise<string> {
      return this.cloudflareService.copyFromUrl(url, { creator });
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

  async getPresignedUrl(videoId: string): Promise<string> {
      const spec = await this.prisma.videoTechnicalSpec.findUnique({
          where: { video_id: videoId }
      });
      if (!spec || !spec.r2Key) {
          throw new NotFoundException(`R2 Key for video ${videoId} not found`);
      }
      return this.uploadsService.getPresignedUrl(spec.r2Key);
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
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 25;
      const skip = (page - 1) * limit;

      const where: any = { status: 'FINAL' };

      if (params?.category && params.category !== '전체') {
        where.project = { ...where.project, category: { name: params.category } };
      }

      if (params?.counselor && params.counselor !== '전체보기' && params.counselor !== 'ALL') {
        // Handle specific counselor logic if needed, or simple name match
        // Assuming counselor name is unique enough or ID is passed.
        // Frontend passes "Name" currently.
        where.project = { ...where.project, counselor: { name: params.counselor } };
      }

      // Creator filter logic (if needed)
      if (params?.creator && params.creator !== '전체보기') {
         // This might need adjustment based on how creator is linked (Maker vs Owner)
         // For now, implementing basic support if schema allows.
         // checking schema: Video -> maker (Maker) OR Video -> project -> owner (User)
         // Complex logic, omit for now unless critical to keep "ALL" working.
         // Actually, let's keep it simple for now as requested "Infinite Scroll" priority.
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
                owner: { select: { id: true, name: true, email: true } }
              }
            },
            maker: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: params?.sort === 'popular' ? 'desc' : 'desc' }, // 'popular' logic TBD (views?), default desc
          skip,
          take: limit,
        }),
        this.prisma.video.count({ where }),
      ]);


      const enrichedVideos = await Promise.all(videos.map(async (video) => {
         let previewUrl = null;
         let thumbnailUrl = video.technicalSpec?.thumbnailUrl;

         if (video.technicalSpec?.streamUid) {
             const urls = await this.cloudflareService.getSignedThumbnailUrls(video.technicalSpec.streamUid);
             previewUrl = urls.gif;
             // We can optionally override thumbnail with the canonical one if missing
             if (!thumbnailUrl || thumbnailUrl.includes('videodelivery.net')) thumbnailUrl = urls.jpg;
         }

         return {
             ...video,
             technicalSpec: {
                 ...video.technicalSpec,
                 thumbnailUrl,
                 previewUrl // Add previewUrl to technicalSpec or root
             },
             previewUrl // Add to root for convenience
         };
      }));

      return {
        data: enrichedVideos,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / limit),
          has_more: page * limit < total
        }
      };
    } catch (error) {
      console.error('❌ Error listing videos:', error);
      throw error;
    }
  }



  async syncWithStorage() {
    console.log('🔄 Starting R2 to Supabase sync...');

    // 1. Get all files from R2
    const r2Files = await this.uploadsService.listFiles();
    const videoFiles = r2Files.filter(f =>
      ['.mp4', '.mov', '.mkv', '.avi'].some(ext => f.key.toLowerCase().endsWith(ext))
    );
    const imageFiles = r2Files.filter(f =>
      ['.jpg', '.jpeg', '.png', '.webp', '.avif'].some(ext => f.key.toLowerCase().endsWith(ext))
    );

    // Debug Log


    // Map base filenames to image keys/urls
    // We map BOTH "exact base name" AND "base name without _thumb" to the URL
    // so we can look up by the video's base name.
    const imageMap = new Map<string, string>();
    const debugLog: string[] = [];
    debugLog.push(`Sync Debug Start ${new Date().toISOString()}`);
    debugLog.push(`R2 Files Count: ${r2Files.length}`);
    debugLog.push(`Video Files: ${videoFiles.length}`);
    debugLog.push(`Image Files: ${imageFiles.length}`);
    debugLog.push(`Sample Image Keys:\n${imageFiles.slice(0, 5).map(f => f.key).join('\n')}`);

    // Priority: jpg < png < webp < avif
    const priority: Record<string, number> = { '.jpg': 1, '.jpeg': 1, '.png': 2, '.webp': 3, '.avif': 4 };

    // Sort so higher priority comes last (overwrites in Map)
    imageFiles.sort((a, b) => {
        const extA = a.key.substring(a.key.lastIndexOf('.')).toLowerCase();
        const extB = b.key.substring(b.key.lastIndexOf('.')).toLowerCase();
        return (priority[extA] || 0) - (priority[extB] || 0);
    });

    imageFiles.forEach(img => {
      // Decode and normalize for consistent matching across platforms
      const decodedKey = decodeURIComponent(img.key).normalize('NFC');
      const extIndex = decodedKey.lastIndexOf('.');
      const baseName = decodedKey.substring(0, extIndex);
      const url = img.key; // Keep original key for URL construction

      imageMap.set(baseName, url);

      if (baseName.endsWith('_thumb')) {
          const stripped = baseName.substring(0, baseName.length - 6);
          imageMap.set(stripped, url);
          if (imageMap.size < 10) debugLog.push(`Mapped: ${baseName} -> ${stripped}`);
      }
    });

    // 2. Get all existing specs in DB
    const dbSpecs = await this.getAllRegisteredSpecs();

    debugLog.push(`Sample Video R2 Keys (DB):\n${dbSpecs.slice(0, 5).map(s => s.r2Key).join('\n')}`);

    let updatedThumbnailsCount = 0;

    // Iterate ALL specs to update better thumbnails
    for (const spec of dbSpecs) {
         // Decode and normalize DB key for matching
         const decodedDbKey = decodeURIComponent(spec.r2Key).normalize('NFC');
         const extIndex = decodedDbKey.lastIndexOf('.');
         if (extIndex > -1) {
             const videoBase = decodedDbKey.substring(0, extIndex);
             const thumbUrl = imageMap.get(videoBase);

             // Update if found AND (different from current OR current is missing)
             if (thumbUrl && spec.thumbnailUrl !== thumbUrl) {
                await this.prisma.videoTechnicalSpec.update({
                    where: { video_id: spec.video_id },
                    data: { thumbnailUrl: thumbUrl }
                });
                updatedThumbnailsCount++;
             }
         }
    }
    const dbKeySet = new Set(dbSpecs.map(s => s.r2Key));

    // 3. Find missing files (New Videos)
    const orphans = videoFiles.filter(f => !dbKeySet.has(f.key));



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
      orphans: orphans.slice(0, 10).map(o => ({ key: o.key, lastModified: o.lastModified })),
      debugLog
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

    // Generate AI Embedding
    try {
      if (result.videos && result.videos.length > 0) {
        const video = result.videos[0];
        const embeddingText = `Title: ${meta.title}\nDescription: ${meta.description || ''}\nCategory: ${meta.categoryName || '기타'}\nCounselor: ${meta.counselorName || '대상없음'}`;

        // Run in background
        this.aiService.createVideoEmbedding(video.id, embeddingText).catch(e =>
          console.error(`AI Embedding failed for ${video.id}:`, e)
        );
      }
    } catch (e) {
        console.error('Error triggering AI embedding:', e);
    }

    return result;
  }

  async search(query: string) {
    return this.aiService.searchSimilarVideos(query);
  }

  async getRecommendations(videoId: string) {
    return this.aiService.searchSimilarVideosById(videoId);
  }

}
