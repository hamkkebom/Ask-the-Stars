import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CloudflareWebhookController } from './webhook.controller';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { VideosService } from './videos.service';
import { Request } from 'express';

describe('CloudflareWebhookController', () => {
  let controller: CloudflareWebhookController;
  let cloudflareService: CloudflareStreamService;
  let videosService: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudflareWebhookController],
      providers: [
        {
          provide: CloudflareStreamService,
          useValue: { verifyWebhookSignature: jest.fn() },
        },
        {
          provide: VideosService,
          useValue: { syncVideoStatus: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CloudflareWebhookController>(
      CloudflareWebhookController
    );
    cloudflareService = module.get<CloudflareStreamService>(
      CloudflareStreamService
    );
    videosService = module.get<VideosService>(VideosService);
  });

  it('rejects invalid signature', async () => {
    (cloudflareService.verifyWebhookSignature as jest.Mock).mockReturnValue(
      false
    );

    const req = { body: { uid: 'uid-1' } } as Request;

    await expect(controller.handleWebhook('sig', req)).rejects.toBeInstanceOf(
      UnauthorizedException
    );
  });

  it('throws when uid missing', async () => {
    (cloudflareService.verifyWebhookSignature as jest.Mock).mockReturnValue(
      true
    );

    const req = { body: {} } as Request;

    await expect(controller.handleWebhook('sig', req)).rejects.toBeInstanceOf(
      BadRequestException
    );
  });

  it('syncs video status when ready', async () => {
    (cloudflareService.verifyWebhookSignature as jest.Mock).mockReturnValue(
      true
    );

    const req = {
      body: { uid: 'uid-1', status: { state: 'ready' }, duration: 10 },
    } as Request;

    const result = await controller.handleWebhook('sig', req);

    expect(videosService.syncVideoStatus).toHaveBeenCalledWith(
      'uid-1',
      'FINAL',
      10
    );
    expect(result.received).toBe(true);
  });

  it('syncs video status when error', async () => {
    (cloudflareService.verifyWebhookSignature as jest.Mock).mockReturnValue(
      true
    );

    const req = {
      body: { uid: 'uid-1', status: { state: 'error' } },
    } as Request;

    await controller.handleWebhook('sig', req);

    expect(videosService.syncVideoStatus).toHaveBeenCalledWith(
      'uid-1',
      'FAILED'
    );
  });

  it('ignores non-ready states', async () => {
    (cloudflareService.verifyWebhookSignature as jest.Mock).mockReturnValue(
      true
    );
    const req = {
      body: { uid: 'uid-1', status: { state: 'encoding' } },
    } as Request;

    const result = await controller.handleWebhook('sig', req);

    expect(videosService.syncVideoStatus).not.toHaveBeenCalledWith(
      'uid-1',
      'FINAL'
    );
    expect(result.received).toBe(true);
  });
});
