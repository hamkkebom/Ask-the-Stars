import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;
  let cloudflareService: CloudflareStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: {
            listAllFinalVideos: jest.fn(),
            getVideoByProjectNo: jest.fn(),
            getVideoById: jest.fn(),
            listVideosByChannel: jest.fn(),
            getPresignedUrl: jest.fn(),
            generateCaptions: jest.fn(),
            uploadCaption: jest.fn(),
            search: jest.fn(),
            getRecommendations: jest.fn(),
            importVideoFromR2: jest.fn(),
            getAllRegisteredSpecs: jest.fn(),
            syncWithStorage: jest.fn(),
          },
        },
        {
          provide: CloudflareStreamService,
          useValue: {
            getDirectUploadUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
    cloudflareService = module.get<CloudflareStreamService>(
      CloudflareStreamService
    );
  });

  it('lists videos with pagination', async () => {
    (service.listAllFinalVideos as jest.Mock).mockResolvedValue({ data: [] });

    const result = await controller.listVideos(1, 10, 'Cat');

    expect(service.listAllFinalVideos).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      category: 'Cat',
      counselor: undefined,
      creator: undefined,
      sort: undefined,
    });
    expect(result.data).toEqual([]);
  });

  it('gets project video', async () => {
    (service.getVideoByProjectNo as jest.Mock).mockResolvedValue({
      title: 'Title',
    });

    const result = await controller.getProjectVideo(5);

    expect(service.getVideoByProjectNo).toHaveBeenCalledWith(5);
    expect(result.title).toBe('Title');
  });

  it('gets video details', async () => {
    (service.getVideoById as jest.Mock).mockResolvedValue({ id: 'video-1' });

    const result = await controller.getVideoDetails('video-1');

    expect(service.getVideoById).toHaveBeenCalledWith('video-1');
    expect(result.id).toBe('video-1');
  });

  it('returns preview url', async () => {
    (service.getPresignedUrl as jest.Mock).mockResolvedValue('preview-url');

    const result = await controller.getVideoPreview('video-1');

    expect(result.videoUrl).toBe('preview-url');
  });

  it('throws when caption file missing', async () => {
    await expect(
      controller.uploadCaption('video-1', 'ko', undefined)
    ).rejects.toThrow('File is required');
  });

  it('uploads caption file', async () => {
    (service.uploadCaption as jest.Mock).mockResolvedValue(true);

    const result = await controller.uploadCaption('video-1', 'ko', {
      buffer: Buffer.from('data'),
    });

    expect(service.uploadCaption).toHaveBeenCalled();
    expect(result.success).toBe(true);
  });

  it('creates direct upload url', async () => {
    (cloudflareService.getDirectUploadUrl as jest.Mock).mockResolvedValue(
      'url'
    );

    const result = await controller.getDirectUploadUrl(
      { uploadLength: 10 },
      { user: { id: 'user-1' } }
    );

    expect(result.uploadUrl).toBe('url');
  });

  it('uses system user when request user is missing', async () => {
    (cloudflareService.getDirectUploadUrl as jest.Mock).mockResolvedValue(
      'url'
    );

    await controller.getDirectUploadUrl(
      { uploadLength: 10 },
      {} as { user?: { id?: string } }
    );

    expect(cloudflareService.getDirectUploadUrl).toHaveBeenCalledWith(
      'system_test_user',
      10,
      undefined
    );
  });

  it('gets channel videos', async () => {
    (service.listVideosByChannel as jest.Mock).mockResolvedValue([
      { id: 'v1' },
    ]);

    const result = await controller.getChannelVideos('Channel');

    expect(service.listVideosByChannel).toHaveBeenCalledWith('Channel');
    expect(result).toHaveLength(1);
  });

  it('returns search results', async () => {
    (service.search as jest.Mock).mockResolvedValue(['video-1']);

    const result = await controller.search('term');

    expect(service.search).toHaveBeenCalledWith('term');
    expect(result).toEqual(['video-1']);
  });

  it('returns recommendations', async () => {
    (service.getRecommendations as jest.Mock).mockResolvedValue(['video-2']);

    const result = await controller.getRecommendations('video-1');

    expect(service.getRecommendations).toHaveBeenCalledWith('video-1');
    expect(result).toEqual(['video-2']);
  });

  it('imports video from url', async () => {
    (service.importVideoFromR2 as jest.Mock).mockResolvedValue('uid-1');

    const result = await controller.importFromUrl({
      url: 'https://example.com',
    });

    expect(service.importVideoFromR2).toHaveBeenCalledWith(
      'https://example.com',
      undefined
    );
    expect(result.uid).toBe('uid-1');
  });

  it('returns all video keys', async () => {
    (service.getAllRegisteredSpecs as jest.Mock).mockResolvedValue([
      { r2Key: 'key-1' },
    ]);

    const result = await controller.getAllVideoKeys();

    expect(result).toEqual(['key-1']);
  });

  it('syncs videos', async () => {
    (service.syncWithStorage as jest.Mock).mockResolvedValue({ total: 1 });

    const result = await controller.syncVideos();

    expect(service.syncWithStorage).toHaveBeenCalled();
    expect(result.total).toBe(1);
  });
});
