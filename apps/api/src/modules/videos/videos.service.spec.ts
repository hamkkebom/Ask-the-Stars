import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VideosService } from './videos.service';
import { PrismaService } from '../../database/prisma.service';
import { UploadsService } from '../uploads/uploads.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { AiService } from '../ai/ai.service';
import { createPrismaMock } from '../../../test/utils/prisma.mock';

describe('VideosService', () => {
  let service: VideosService;
  let prisma: ReturnType<typeof createPrismaMock>;
  let uploadsService: UploadsService;
  let cloudflareService: CloudflareStreamService;
  let aiService: AiService;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: UploadsService,
          useValue: {
            getPresignedUrl: jest.fn(),
            listFiles: jest.fn(),
          },
        },
        {
          provide: CloudflareStreamService,
          useValue: {
            getSignedThumbnailUrl: jest.fn(),
            getSignedThumbnailUrls: jest.fn(),
            getStreamThumbnailVariants: jest.fn(),
            getStreamThumbnailBaseUrl: jest.fn(),
            generateSignedToken: jest.fn(),
            getVideoAnalytics: jest.fn(),
            getDownloadUrl: jest.fn(),
            generateCaptions: jest.fn(),
            uploadCaption: jest.fn(),
            copyFromUrl: jest.fn(),
          },
        },
        {
          provide: AiService,
          useValue: {
            searchSimilarVideos: jest.fn(),
            searchSimilarVideosById: jest.fn(),
            createVideoEmbedding: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    uploadsService = module.get<UploadsService>(UploadsService);
    cloudflareService = module.get<CloudflareStreamService>(
      CloudflareStreamService
    );
    aiService = module.get<AiService>(AiService);
  });

  it('throws when project video not found', async () => {
    prisma.project.findUnique.mockResolvedValue(null);

    await expect(service.getVideoByProjectNo(1)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('returns null when no final video exists', async () => {
    prisma.project.findUnique.mockResolvedValue({ videos: [], title: 'Title' });

    const result = await service.getVideoByProjectNo(1);

    expect(result).toBeNull();
  });

  it('returns project video with signed thumbnail', async () => {
    prisma.project.findUnique.mockResolvedValue({
      title: 'Title',
      videos: [
        {
          versionLabel: 'v1',
          status: 'FINAL',
          technicalSpec: { streamUid: 'uid-1', thumbnailUrl: null },
        },
      ],
    });
    (cloudflareService.getSignedThumbnailUrl as jest.Mock).mockResolvedValue(
      'thumb-url'
    );
    (cloudflareService.getStreamThumbnailVariants as jest.Mock).mockReturnValue(
      null
    );

    const result = await service.getVideoByProjectNo(1);

    expect(result?.thumbnailUrl).toBe('thumb-url');
  });

  it('returns project video without stream uid', async () => {
    prisma.project.findUnique.mockResolvedValue({
      title: 'Title',
      videos: [
        {
          versionLabel: 'v1',
          status: 'FINAL',
          technicalSpec: { streamUid: null, thumbnailUrl: 'thumb.jpg' },
        },
      ],
    });

    const result = await service.getVideoByProjectNo(1);

    expect(result?.thumbnailUrl).toBe('thumb.jpg');
  });

  it('throws when video not found', async () => {
    prisma.video.findUnique.mockResolvedValue(null);

    await expect(service.getVideoById('video-1')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('generates signed token when streamUid exists', async () => {
    prisma.video.findUnique.mockResolvedValue({
      id: 'video-1',
      technicalSpec: { streamUid: 'uid-1', r2Key: null },
      project: null,
      maker: null,
      eventLogs: [],
    });
    (cloudflareService.generateSignedToken as jest.Mock).mockResolvedValue(
      'token-1'
    );
    (cloudflareService.getVideoAnalytics as jest.Mock).mockResolvedValue({
      views: 5,
    });
    (cloudflareService.getSignedThumbnailUrl as jest.Mock).mockResolvedValue(
      'thumb-url'
    );
    (cloudflareService.getDownloadUrl as jest.Mock).mockReturnValue(
      'download-url'
    );
    (cloudflareService.getStreamThumbnailVariants as jest.Mock).mockReturnValue(
      null
    );

    const result = await service.getVideoById('video-1');

    expect(cloudflareService.generateSignedToken).toHaveBeenCalledWith('uid-1');
    expect(result.streamToken).toBe('token-1');
    expect(result.views).toBe(5);
  });

  it('uses presigned url when streamUid missing', async () => {
    prisma.video.findUnique.mockResolvedValue({
      id: 'video-1',
      technicalSpec: { streamUid: null, r2Key: 'r2-key' },
      project: null,
      maker: null,
      eventLogs: [],
    });
    (uploadsService.getPresignedUrl as jest.Mock).mockResolvedValue('r2-url');

    const result = await service.getVideoById('video-1');

    expect(uploadsService.getPresignedUrl).toHaveBeenCalledWith('r2-key');
    expect(result.technicalSpec.videoUrl).toBe('r2-url');
  });

  it('throws when presigned url has no spec', async () => {
    prisma.videoTechnicalSpec.findUnique.mockResolvedValue(null);

    await expect(service.getPresignedUrl('video-1')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('throws when generating captions without stream uid', async () => {
    prisma.video.findUnique.mockResolvedValue({
      id: 'video-1',
      technicalSpec: { streamUid: null },
      project: null,
      maker: null,
      eventLogs: [],
    });

    await expect(service.generateCaptions('video-1')).rejects.toThrow(
      'Video stream not ready'
    );
  });

  it('lists videos by channel', async () => {
    prisma.project.findMany.mockResolvedValue([{ id: 'project-1' }]);

    const result = await service.listVideosByChannel('Channel');

    expect(prisma.project.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('returns registered specs', async () => {
    prisma.videoTechnicalSpec.findMany.mockResolvedValue([
      { r2Key: 'key', thumbnailUrl: null, video_id: 'video-1' },
    ]);

    const result = await service.getAllRegisteredSpecs();

    expect(result).toHaveLength(1);
  });

  it('returns presigned url when spec exists', async () => {
    prisma.videoTechnicalSpec.findUnique.mockResolvedValue({ r2Key: 'key' });
    (uploadsService.getPresignedUrl as jest.Mock).mockResolvedValue('url');

    const result = await service.getPresignedUrl('video-1');

    expect(result).toBe('url');
  });

  it('imports video from r2', async () => {
    (cloudflareService.copyFromUrl as jest.Mock).mockResolvedValue('uid-1');

    const result = await service.importVideoFromR2('https://example.com');

    expect(result).toBe('uid-1');
  });

  it('searches and recommends videos', async () => {
    (aiService.searchSimilarVideos as jest.Mock).mockResolvedValue(['id-1']);
    (aiService.searchSimilarVideosById as jest.Mock).mockResolvedValue([
      'id-2',
    ]);

    const searchResult = await service.search('query');
    const recResult = await service.getRecommendations('video-1');

    expect(searchResult).toEqual(['id-1']);
    expect(recResult).toEqual(['id-2']);
  });

  it('syncs video status when spec exists', async () => {
    prisma.videoTechnicalSpec.findFirst.mockResolvedValue({
      video_id: 'video-1',
    });
    prisma.video.update.mockResolvedValue({ id: 'video-1' });
    prisma.videoTechnicalSpec.update.mockResolvedValue({ id: 'video-1' });

    await service.syncVideoStatus('uid-1', 'FINAL', 120);

    expect(prisma.video.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'video-1' } })
    );
    expect(prisma.videoTechnicalSpec.update).toHaveBeenCalled();
  });

  it('returns when syncVideoStatus cannot find spec', async () => {
    prisma.videoTechnicalSpec.findFirst.mockResolvedValue(null);

    await service.syncVideoStatus('uid-1', 'FINAL', 120);

    expect(prisma.video.update).not.toHaveBeenCalled();
  });

  it('lists final videos with preview urls', async () => {
    prisma.video.findMany.mockResolvedValue([
      {
        id: 'video-1',
        technicalSpec: { streamUid: 'uid-1', thumbnailUrl: null },
        project: { category: null, counselor: null, owner: null },
        maker: null,
      },
    ]);
    prisma.video.count.mockResolvedValue(1);
    (cloudflareService.getSignedThumbnailUrls as jest.Mock).mockResolvedValue({
      jpg: 'thumb.jpg',
      gif: 'thumb.gif',
    });
    (cloudflareService.getStreamThumbnailVariants as jest.Mock).mockReturnValue(
      null
    );

    const result = await service.listAllFinalVideos({ page: 1, limit: 1 });

    expect(result.meta.total).toBe(1);
    expect(result.data[0].previewUrl).toBe('thumb.gif');
  });

  it('filters videos by category and counselor', async () => {
    prisma.video.findMany.mockResolvedValue([]);
    prisma.video.count.mockResolvedValue(0);

    await service.listAllFinalVideos({
      page: 1,
      limit: 1,
      category: 'Category',
      counselor: 'Counselor',
    });

    expect(prisma.video.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ project: expect.any(Object) }),
      })
    );
  });

  it('creates video record and triggers embedding', async () => {
    prisma.category.upsert.mockResolvedValue({ id: 'cat-1' });
    prisma.counselor.findFirst.mockResolvedValue(null);
    prisma.counselor.create.mockResolvedValue({ id: 'coun-1' });
    prisma.project.create.mockResolvedValue({
      id: 'project-1',
      videos: [{ id: 'video-1' }],
    });
    (aiService.createVideoEmbedding as jest.Mock).mockResolvedValue(true);
    (cloudflareService.getStreamThumbnailBaseUrl as jest.Mock).mockReturnValue(
      'thumb-url'
    );

    const result = await service.createVideoRecord(
      {
        key: 'r2-key',
        url: 'url',
        streamId: 'stream-1',
        size: 100,
        filename: 'video.mp4',
        mimetype: 'video/mp4',
      },
      { title: 'Title', versionLabel: 'v1.0' },
      'user-1'
    );

    expect(result.id).toBe('project-1');
    expect(aiService.createVideoEmbedding).toHaveBeenCalled();
  });

  it('generates captions when stream uid exists', async () => {
    prisma.video.findUnique.mockResolvedValue({
      id: 'video-1',
      technicalSpec: { streamUid: 'uid-1' },
      project: null,
      maker: null,
      eventLogs: [],
    });
    (cloudflareService.generateCaptions as jest.Mock).mockResolvedValue(true);
    (cloudflareService.getSignedThumbnailUrl as jest.Mock).mockResolvedValue(
      ''
    );
    (cloudflareService.getVideoAnalytics as jest.Mock).mockResolvedValue({
      views: 0,
    });
    (cloudflareService.generateSignedToken as jest.Mock).mockResolvedValue('');

    const result = await service.generateCaptions('video-1');

    expect(result).toBe(true);
  });

  it('uploads caption when stream uid exists', async () => {
    prisma.video.findUnique.mockResolvedValue({
      id: 'video-1',
      technicalSpec: { streamUid: 'uid-1' },
      project: null,
      maker: null,
      eventLogs: [],
    });
    (cloudflareService.uploadCaption as jest.Mock).mockResolvedValue(true);
    (cloudflareService.getSignedThumbnailUrl as jest.Mock).mockResolvedValue(
      ''
    );
    (cloudflareService.getVideoAnalytics as jest.Mock).mockResolvedValue({
      views: 0,
    });
    (cloudflareService.generateSignedToken as jest.Mock).mockResolvedValue('');

    const result = await service.uploadCaption(
      'video-1',
      'ko',
      Buffer.from('vtt')
    );

    expect(result).toBe(true);
  });

  it('syncs with storage and creates missing videos', async () => {
    (uploadsService.listFiles as jest.Mock).mockResolvedValue([
      {
        key: 'videos/[Cat] 2025-01-01_[Counselor] Title_v1.0.mp4',
        size: 100,
        lastModified: new Date(),
      },
      {
        key: 'videos/[Cat] 2025-01-01_[Counselor] Title_v1.0_thumb.jpg',
        size: 10,
        lastModified: new Date(),
      },
    ]);
    prisma.videoTechnicalSpec.findMany.mockResolvedValue([]);
    prisma.user.findFirst
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 'user-1' });
    prisma.category.upsert.mockResolvedValue({ id: 'cat-1' });
    prisma.counselor.findFirst.mockResolvedValue(null);
    prisma.counselor.create.mockResolvedValue({ id: 'coun-1' });
    prisma.project.create.mockResolvedValue({ id: 'project-1' });

    const result = await service.syncWithStorage();

    expect(result.videoFilesCount).toBe(1);
    expect(result.newSyncedCount).toBe(1);
  });

  it('throws when sync has orphans and no system user', async () => {
    (uploadsService.listFiles as jest.Mock).mockResolvedValue([
      {
        key: 'videos/[Cat] 2025-01-01_[Counselor] Title_v1.0.mp4',
        size: 100,
        lastModified: new Date(),
      },
    ]);
    prisma.videoTechnicalSpec.findMany.mockResolvedValue([]);
    prisma.user.findFirst.mockResolvedValue(null);

    await expect(service.syncWithStorage()).rejects.toThrow(
      'Cannot sync: No users found in database to assign projects to.'
    );
  });
});
