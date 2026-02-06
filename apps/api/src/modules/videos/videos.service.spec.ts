import { Test, TestingModule } from '@nestjs/testing';
import { VideoStatus } from '@prisma/client';
import { VideosService } from './videos.service';
import { VideoStorageService } from './video-storage.service';
import { VideoQueryService } from './video-query.service';
import { VideoMutationService } from './video-mutation.service';
import { VideoSyncService } from './video-sync.service';

describe('VideosService', () => {
  let service: VideosService;
  let videoQueryService: jest.Mocked<VideoQueryService>;
  let videoMutationService: jest.Mocked<VideoMutationService>;
  let videoSyncService: jest.Mocked<VideoSyncService>;
  let videoStorageService: jest.Mocked<VideoStorageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: VideoQueryService,
          useValue: {
            getVideoByProjectNo: jest.fn(),
            getVideoById: jest.fn(),
            listVideosByChannel: jest.fn(),
            getPresignedUrl: jest.fn(),
            listAllFinalVideos: jest.fn(),
            searchVideos: jest.fn(),
            getRecommendations: jest.fn(),
          },
        },
        {
          provide: VideoMutationService,
          useValue: {
            updateVideoStatus: jest.fn(),
            createVideoRecord: jest.fn(),
          },
        },
        {
          provide: VideoSyncService,
          useValue: {
            syncVideoStatus: jest.fn(),
            importVideoFromR2: jest.fn(),
            getAllRegisteredSpecs: jest.fn(),
            syncWithStorage: jest.fn(),
          },
        },
        {
          provide: VideoStorageService,
          useValue: {
            generateCaptions: jest.fn(),
            uploadCaption: jest.fn(),
            getDirectUploadUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    videoQueryService = module.get(VideoQueryService);
    videoMutationService = module.get(VideoMutationService);
    videoSyncService = module.get(VideoSyncService);
    videoStorageService = module.get(VideoStorageService);
  });

  it('delegates getVideoByProjectNo', async () => {
    const expected = { title: 'P1' };
    videoQueryService.getVideoByProjectNo.mockResolvedValue(expected as any);

    const result = await service.getVideoByProjectNo(1);

    expect(videoQueryService.getVideoByProjectNo).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });

  it('delegates getVideoById', async () => {
    const expected = { id: 'video-1' };
    videoQueryService.getVideoById.mockResolvedValue(expected as any);

    const result = await service.getVideoById('video-1');

    expect(videoQueryService.getVideoById).toHaveBeenCalledWith('video-1');
    expect(result).toBe(expected);
  });

  it('delegates syncVideoStatus', async () => {
    await service.syncVideoStatus('uid-1', 'FINAL', 123);

    expect(videoSyncService.syncVideoStatus).toHaveBeenCalledWith(
      'uid-1',
      'FINAL',
      123
    );
  });

  it('delegates updateVideoStatus', async () => {
    await service.updateVideoStatus('video-1', VideoStatus.FINAL);

    expect(videoMutationService.updateVideoStatus).toHaveBeenCalledWith(
      'video-1',
      VideoStatus.FINAL
    );
  });

  it('throws when generateCaptions called without stream uid', async () => {
    videoQueryService.getVideoById.mockResolvedValue({
      technicalSpec: { streamUid: null },
    } as any);

    await expect(service.generateCaptions('video-1')).rejects.toThrow(
      'Video stream not ready'
    );
  });

  it('delegates generateCaptions to storage service', async () => {
    videoQueryService.getVideoById.mockResolvedValue({
      technicalSpec: { streamUid: 'uid-1' },
    } as any);
    videoStorageService.generateCaptions.mockResolvedValue(true);

    const result = await service.generateCaptions('video-1');

    expect(videoStorageService.generateCaptions).toHaveBeenCalledWith('uid-1');
    expect(result).toBe(true);
  });

  it('throws when uploadCaption called without stream uid', async () => {
    videoQueryService.getVideoById.mockResolvedValue({
      technicalSpec: { streamUid: null },
    } as any);

    await expect(
      service.uploadCaption('video-1', 'ko', Buffer.from('vtt'))
    ).rejects.toThrow('Video stream not ready');
  });

  it('delegates uploadCaption to storage service', async () => {
    videoQueryService.getVideoById.mockResolvedValue({
      technicalSpec: { streamUid: 'uid-1' },
    } as any);
    videoStorageService.uploadCaption.mockResolvedValue(true);

    const result = await service.uploadCaption(
      'video-1',
      'ko',
      Buffer.from('vtt')
    );

    expect(videoStorageService.uploadCaption).toHaveBeenCalledWith(
      'uid-1',
      'ko',
      expect.any(Buffer)
    );
    expect(result).toBe(true);
  });

  it('delegates importVideoFromR2', async () => {
    videoSyncService.importVideoFromR2.mockResolvedValue('uid-1');

    const result = await service.importVideoFromR2('https://example.com', 'c1');

    expect(videoSyncService.importVideoFromR2).toHaveBeenCalledWith(
      'https://example.com',
      'c1'
    );
    expect(result).toBe('uid-1');
  });

  it('delegates listVideosByChannel', async () => {
    videoQueryService.listVideosByChannel.mockResolvedValue([
      { id: 'v1' },
    ] as any);

    const result = await service.listVideosByChannel('channel-1');

    expect(videoQueryService.listVideosByChannel).toHaveBeenCalledWith(
      'channel-1'
    );
    expect(result).toEqual([{ id: 'v1' }]);
  });

  it('delegates getAllRegisteredSpecs', async () => {
    const specs = [{ r2Key: 'k', thumbnailUrl: null, video_id: 'video-1' }];
    videoSyncService.getAllRegisteredSpecs.mockResolvedValue(specs);

    const result = await service.getAllRegisteredSpecs();

    expect(videoSyncService.getAllRegisteredSpecs).toHaveBeenCalled();
    expect(result).toBe(specs);
  });

  it('delegates getPresignedUrl', async () => {
    videoQueryService.getPresignedUrl.mockResolvedValue('url');

    const result = await service.getPresignedUrl('video-1');

    expect(videoQueryService.getPresignedUrl).toHaveBeenCalledWith('video-1');
    expect(result).toBe('url');
  });

  it('delegates getDirectUploadUrl', async () => {
    videoStorageService.getDirectUploadUrl.mockResolvedValue('direct-url');

    const result = await service.getDirectUploadUrl('user-1', 100, { a: 'b' });

    expect(videoStorageService.getDirectUploadUrl).toHaveBeenCalledWith(
      'user-1',
      100,
      { a: 'b' }
    );
    expect(result).toBe('direct-url');
  });

  it('delegates listAllFinalVideos', async () => {
    const expected = { data: [], meta: { total: 0 } };
    videoQueryService.listAllFinalVideos.mockResolvedValue(expected as any);

    const result = await service.listAllFinalVideos({ page: 1, limit: 1 });

    expect(videoQueryService.listAllFinalVideos).toHaveBeenCalledWith({
      page: 1,
      limit: 1,
    });
    expect(result).toBe(expected);
  });

  it('delegates syncWithStorage', async () => {
    const expected = { totalInStorage: 1 };
    videoSyncService.syncWithStorage.mockResolvedValue(expected as any);

    const result = await service.syncWithStorage();

    expect(videoSyncService.syncWithStorage).toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  it('delegates createVideoRecord', async () => {
    const uploadResult = {
      key: 'k',
      url: 'u',
      size: 100,
      filename: 'f.mp4',
      mimetype: 'video/mp4',
    };
    const meta = { title: 't', versionLabel: 'v1.0' };
    const expected = { id: 'project-1' };
    videoMutationService.createVideoRecord.mockResolvedValue(expected as any);

    const result = await service.createVideoRecord(
      uploadResult,
      meta,
      'user-1'
    );

    expect(videoMutationService.createVideoRecord).toHaveBeenCalledWith(
      uploadResult,
      meta,
      'user-1'
    );
    expect(result).toBe(expected);
  });

  it('delegates search and recommendations', async () => {
    videoQueryService.searchVideos.mockResolvedValue(['id-1'] as any);
    videoQueryService.getRecommendations.mockResolvedValue(['id-2'] as any);

    const searchResult = await service.search('query');
    const recommendationResult = await service.getRecommendations('video-1');

    expect(videoQueryService.searchVideos).toHaveBeenCalledWith('query');
    expect(videoQueryService.getRecommendations).toHaveBeenCalledWith(
      'video-1'
    );
    expect(searchResult).toEqual(['id-1']);
    expect(recommendationResult).toEqual(['id-2']);
  });
});
