import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import axios from 'axios';
import { CloudflareStreamService } from './cloudflare-stream.service';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CloudflareStreamService', () => {
  const buildService = async (overrides: Record<string, string> = {}) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudflareStreamService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (overrides[key] !== undefined) return overrides[key];
              if (key === 'CLOUDFLARE_WEBHOOK_SECRET') return 'secret';
              return '';
            }),
          },
        },
      ],
    }).compile();

    return module.get<CloudflareStreamService>(CloudflareStreamService);
  };

  it('returns false when signature header missing', async () => {
    const service = await buildService();
    const result = service.verifyWebhookSignature('', '{}');

    expect(result).toBe(false);
  });

  it('verifies valid webhook signature', async () => {
    const service = await buildService();
    const rawBody = '{"test":true}';
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const sourceString = `${timestamp}.${rawBody}`;
    const hmac = crypto.createHmac('sha256', 'secret');
    hmac.update(sourceString);
    const signature = hmac.digest('hex');
    const header = `time=${timestamp},sig1=${signature}`;

    const result = service.verifyWebhookSignature(header, rawBody);

    expect(result).toBe(true);
  });

  it('returns false on invalid signature format', async () => {
    const service = await buildService();

    const result = service.verifyWebhookSignature('sig1=abc', '{}');

    expect(result).toBe(false);
  });

  it('returns false when webhook timestamp is expired', async () => {
    const service = await buildService();
    const rawBody = '{"test":true}';
    const timestamp = (Math.floor(Date.now() / 1000) - 1000).toString();
    const sourceString = `${timestamp}.${rawBody}`;
    const hmac = crypto.createHmac('sha256', 'secret');
    hmac.update(sourceString);
    const signature = hmac.digest('hex');
    const header = `time=${timestamp},sig1=${signature}`;

    const result = service.verifyWebhookSignature(header, rawBody);

    expect(result).toBe(false);
  });

  it('returns empty token when signing keys are missing', async () => {
    const service = await buildService();
    const token = await service.generateSignedToken('uid-1');

    expect(token).toBe('');
  });

  it('throws when creating upload url without credentials', async () => {
    const service = await buildService();
    await expect(
      service.getDirectUploadUrl('user-1', 100)
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });

  it('creates direct upload url when credentials exist', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({
      headers: { location: 'upload-url' },
      status: 201,
    });

    const result = await service.getDirectUploadUrl('user-1', 100);

    expect(result).toBe('upload-url');
  });

  it('throws when upload url missing location header', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({ headers: {}, status: 201 });

    await expect(
      service.getDirectUploadUrl('user-1', 100)
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });

  it('copies from url using stream API', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({
      data: { success: true, result: { uid: 'uid-1' } },
    });

    const result = await service.copyFromUrl('https://example.com');

    expect(result).toBe('uid-1');
  });

  it('throws when copy api returns error', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({
      data: { success: false, errors: ['bad'] },
    });

    await expect(
      service.copyFromUrl('https://example.com')
    ).rejects.toBeInstanceOf(Error);
  });

  it('returns analytics views when available', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({
      data: {
        data: {
          viewer: {
            accounts: [
              {
                streamAnalyticsAdaptiveGroups: [{ sum: { views: 12 } }],
              },
            ],
          },
        },
      },
    });

    const result = await service.getVideoAnalytics('uid-1');

    expect(result.views).toBe(12);
  });

  it('returns zero views on analytics error', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({ data: { errors: ['bad'] } });

    const result = await service.getVideoAnalytics('uid-1');

    expect(result.views).toBe(0);
  });

  it('generates captions successfully', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockResolvedValue({ status: 200 });

    const result = await service.generateCaptions('uid-1');

    expect(result).toBe(true);
  });

  it('returns false when caption generation fails', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.post.mockRejectedValue(new Error('fail'));

    const result = await service.generateCaptions('uid-1');

    expect(result).toBe(false);
  });

  it('uploads captions successfully', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.put.mockResolvedValue({ status: 201 });

    const result = await service.uploadCaption(
      'uid-1',
      'ko',
      Buffer.from('vtt')
    );

    expect(result).toBe(true);
  });

  it('returns false when caption upload fails', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
      CLOUDFLARE_API_TOKEN: 'token',
    });
    mockedAxios.put.mockRejectedValue(new Error('fail'));

    const result = await service.uploadCaption(
      'uid-1',
      'ko',
      Buffer.from('vtt')
    );

    expect(result).toBe(false);
  });

  it('generates signed thumbnails with token', async () => {
    const { privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 1024,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });
    const service = await buildService({
      CLOUDFLARE_SIGNING_KEY_ID: 'key-id',
      CLOUDFLARE_SIGNING_KEY_PEM: privateKey,
    });

    const token = await service.generateSignedToken('uid-1');
    const thumbnail = await service.getSignedThumbnailUrl('uid-1');
    const thumbs = await service.getSignedThumbnailUrls('uid-1');

    expect(token.split('.')).toHaveLength(3);
    expect(thumbnail).toContain('/thumbnails/thumbnail.jpg');
    expect(thumbs.jpg).toContain('/thumbnails/thumbnail.jpg');
    expect(thumbs.gif).toContain('/thumbnails/thumbnail.gif');
  });

  it('returns thumbnail and download urls for account', async () => {
    const service = await buildService({
      CLOUDFLARE_ACCOUNT_ID: 'acc',
    });

    const thumbs = service.getThumbnailUrls('uid-1');
    const download = service.getDownloadUrl('uid-1');

    expect(thumbs.jpg).toContain('customer-acc');
    expect(download).toContain('downloads/default.mp4');
  });
});
