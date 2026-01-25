
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class CloudflareStreamService {
  private readonly accountId: string;
  private readonly apiToken: string;
  private readonly signingKeyId: string;
  private readonly signingKeyPem: string;

  constructor(private readonly configService: ConfigService) {
    this.accountId = this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID') || '';
    this.apiToken = this.configService.get<string>('CLOUDFLARE_API_TOKEN') || '';

    // For Signed Tokens (PEM key from Cloudflare Dashboard)
    this.signingKeyId = this.configService.get<string>('CLOUDFLARE_SIGNING_KEY_ID') || '';
    // Handle PEM formatting (replace \n literals with actual newlines if stored as single line)
    const rawKey = this.configService.get<string>('CLOUDFLARE_SIGNING_KEY_PEM') || '';
    this.signingKeyPem = rawKey.replace(/\\n/g, '\n');
  }

  /**
   * Generates a Signed Token (JWT) for secure playback.
   * This allows restricting access to specific domains or expiration times.
   */
  async generateSignedToken(uid: string): Promise<string> {
    if (!this.signingKeyId || !this.signingKeyPem) {
      console.warn('⚠️ Missing Cloudflare Signing Keys. Returning empty token (Insecure playback).');
      return '';
    }

    // Standard JWT Header
    const header = {
      alg: 'RS256',
      kid: this.signingKeyId,
      typ: 'JWT',
    };

    // JWT Payload
    // Expire in 2 hours (suitable for a session)
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 2);

    const payload = {
      sub: uid,
      kid: this.signingKeyId,
      exp: exp,
      nbf: Math.floor(Date.now() / 1000) - 5, // Not before 5s ago
      accessRules: [
        {
          type: 'any',
          action: 'allow',
        },
      ],
    };

    // Sign using Node.js crypto
    const encodedHeader = this.base64url(JSON.stringify(header));
    const encodedPayload = this.base64url(JSON.stringify(payload));

    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(this.signingKeyPem, 'base64url');

    return `${signatureInput}.${signature}`;
  }

  /**
   * Request a Direct Upload URL (TUS) from Cloudflare.
   * Only returns the upload URL. The frontend TUS client handles the rest.
   */
  async getDirectUploadUrl(userId: string, uploadLength: number, metadata: Record<string, string> = {}): Promise<string> {
    if (!this.accountId || !this.apiToken) {
      throw new InternalServerErrorException('Cloudflare credentials missing');
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/direct_upload`;

    try {
      // Cloudflare requires TUS-like headers for direct_upload endpoint creation
      const response = await axios.post(
        endpoint,
        {
          maxDurationSeconds: 14400, // 4 hours
          creator: userId,
          allowedOrigins: ['*'], // Or restrict to production domain
          requireSignedURLs: true, // Enforce our Premium Strategy
          meta: {
            ...metadata,
            userId: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            'Upload-Length': uploadLength.toString(),
          },
        },
      );

      // The response header 'Location' contains the TUS endpoint,
      // OR body.result.uploadURL depending on the version.
      // Direct Upload V2 returns body.result.uploadURL

      const uploadUrl = response.data?.result?.uploadURL;
      if (!uploadUrl) {
          throw new Error('No uploadURL in Cloudflare response');
      }

      return uploadUrl;
    } catch (error: any) {
      console.error('❌ Cloudflare Direct Upload Error:', error?.response?.data || error.message);
      throw new InternalServerErrorException('Failed to create upload session');
    }
  }

  private base64url(str: string): string {
    return Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}
