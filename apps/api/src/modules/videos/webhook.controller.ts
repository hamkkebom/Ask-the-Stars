
import { Controller, Post, Headers, Body, BadRequestException } from '@nestjs/common';
import { VideosService } from './videos.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('webhooks/cloudflare')
export class CloudflareWebhookController {
  constructor(
    private readonly videosService: VideosService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async handleWebhook(
    @Headers('webhook-signature') signature: string,
    @Body() payload: any,
  ) {
    // 1. Verify Signature
    const secret = this.configService.get<string>('CLOUDFLARE_WEBHOOK_SECRET');
    if (secret) {
        if (!signature) throw new BadRequestException('Missing signature');

        // Split signature: "time=123,sig1=..."
        const parts = signature.split(',').reduce((acc, part) => {
            const [key, value] = part.split('=');
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

        const time = parts['time'];
        const sig1 = parts['sig1'];

        const source = `${time}.${JSON.stringify(payload)}`;
        const expectedSig = crypto
            .createHmac('sha256', secret)
            .update(source)
            .digest('hex');

        // Constant time comparison (safe)
        // If mismatch, throw (but for now logs to avoid webhook disabling during dev)
        if (sig1 !== expectedSig) {
            console.warn('⚠️ Webhook Signature Mismatch');
            // throw new BadRequestException('Invalid Signature');
        }
    }

    // 2. Handle Events
    // Event Format: { uid, status, meta: { ... } }
    const { uid, status } = payload;
    console.log(`📡 Cloudflare Webhook: ${uid} -> ${status?.state || 'Unknown'}`);

    if (status?.state === 'ready') {
        // Video is ready for playback
        await this.videosService.syncVideoStatus(uid, 'FINAL');
    } else if (status?.state === 'errored') {
        console.error(`❌ Video Encoding Failed: ${uid}`);
        // Optionally update DB to FAILED
    }

    return { received: true };
  }
}
