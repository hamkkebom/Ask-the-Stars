
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
  private readonly webhookSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.accountId = this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID') || '';
    this.apiToken = this.configService.get<string>('CLOUDFLARE_API_TOKEN') || this.configService.get<string>('CLOUDFLARE_STREAM_TOKEN') || '';

    // For Signed Tokens (PEM key from Cloudflare Dashboard)
    this.signingKeyId = this.configService.get<string>('CLOUDFLARE_SIGNING_KEY_ID') || '';
    // Handle PEM formatting
    // If it comes as Base64 (starts with "LS0t" or doesn't have "BEGIN"), decode it
    let rawKey = this.configService.get<string>('CLOUDFLARE_SIGNING_KEY_PEM') || '';
    if (rawKey && !rawKey.trim().startsWith('-----')) {
        try {
            rawKey = Buffer.from(rawKey, 'base64').toString('utf8');
        } catch (e) {
            console.error('❌ Failed to decode Base64 PEM key');
        }
    }
    this.signingKeyPem = rawKey.replace(/\\n/g, '\n');

    this.webhookSecret = this.configService.get<string>('CLOUDFLARE_WEBHOOK_SECRET') || '';
  }

  async copyFromUrl(url: string, meta?: any): Promise<string> {
      console.log(`☁️ requesting copy to stream: ${url}`);
      try {
          const response = await axios.post(
          `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/copy`,
          {
              url: url,
              meta: meta || {},
              requireSignedURLs: true, // Default to secure
              creator: meta?.creator || undefined
          },
          {
              headers: {
                  Authorization: `Bearer ${this.apiToken}`,
                  'Content-Type': 'application/json'
              },
          }
          );

          if (response.data.success) {
              return response.data.result.uid;
          }
          throw new Error('Cloudflare Stream copy failed: ' + JSON.stringify(response.data.errors));
      } catch (e: any) {
          console.error('Stream Copy API Error:', e.response?.data || e.message);
          throw e;
      }
  }

  // ... existing methods ...

  /**
   * Verify Cloudflare Webhook Signature
   * Docs: https://developers.cloudflare.com/stream/webhooks/verify-webhook-authenticity/
   */
  verifyWebhookSignature(signatureHeader: string, rawBody: string): boolean {
    if (!this.webhookSecret) {
      console.error('❌ CLOUDFLARE_WEBHOOK_SECRET is not set.');
      return false;
    }

    if (!signatureHeader) {
        return false;
    }

    // 1. Parse the signature header
    // Header format: time=1230811200,sig1=60493ec9388...
    const parts = signatureHeader.split(',');
    let timestamp = '';
    let sig1 = '';

    for (const part of parts) {
      const [key, value] = part.split('=');
      if (key === 'time') timestamp = value;
      if (key === 'sig1') sig1 = value;
    }

    if (!timestamp || !sig1) {
      console.warn('⚠️ Invalid webhook signature format');
      return false;
    }

    // Check if timestamp is too old (e.g., > 5 mins) to prevent replay attacks
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - parseInt(timestamp)) > 300) {
        console.warn('⚠️ Webhook request expired');
        return false;
    }

    // 2. Create signature source string
    // format: {time}.{body}
    const sourceString = `${timestamp}.${rawBody}`;

    // 3. Create expected signature
    const hmac = crypto.createHmac('sha256', this.webhookSecret);
    hmac.update(sourceString);
    const expectedSignature = hmac.digest('hex');

    // 4. Compare signatures (constant-time)
    // We use crypto.timingSafeEqual for security
    const trusted = Buffer.from(expectedSignature, 'hex');
    const untrusted = Buffer.from(sig1, 'hex');

    if (trusted.length !== untrusted.length) {
        return false;
    }

    return crypto.timingSafeEqual(trusted, untrusted);
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

    try {
        // Standard JWT Header
        const header = {
            alg: 'RS256',
            kid: this.signingKeyId,
            typ: 'JWT',
        };

        // JWT Payload
        // Expire in 2 hours (suitable for a session)
        const ONE_HOUR = 60 * 60;
        const exp = Math.floor(Date.now() / 1000) + (ONE_HOUR * 2);
        const nbf = Math.floor(Date.now() / 1000) - 5; // Not before 5s ago (clock skew)

        const payload = {
            sub: uid,
            kid: this.signingKeyId,
            exp: exp,
            nbf: nbf,
            accessRules: [
                {
                    type: 'any',
                    action: 'allow',
                },
            ],
            // Optional: Meta for analytics
            // meta: {
            //     userId: '...',
            // }
        };

        // Sign using Node.js crypto
        const encodedHeader = this.base64url(JSON.stringify(header));
        const encodedPayload = this.base64url(JSON.stringify(payload));

        const signatureInput = `${encodedHeader}.${encodedPayload}`;
        const signer = crypto.createSign('RSA-SHA256');
        signer.update(signatureInput);
        const signature = signer.sign(this.signingKeyPem, 'base64url');

        return `${signatureInput}.${signature}`;
    } catch (e) {
        console.error('❌ Failed to generate signed token:', e);
        return '';
    }
  }

  /**
   * Generates a Signed Thumbnail URL.
   * Generates a Signed Thumbnail URL.
   * Format: https://videodelivery.net/<TOKEN>/thumbnails/thumbnail.jpg
   */
  async getSignedThumbnailUrl(uid: string): Promise<string> {
      const token = await this.generateSignedToken(uid);
      if (!token) return '';
      return `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg`;
  }

  /**
   * Generates Signed Thumbnail URLs (JPG and GIF).
   */
  async getSignedThumbnailUrls(uid: string): Promise<{ jpg: string, gif: string }> {
      const token = await this.generateSignedToken(uid);
      if (!token) return { jpg: '', gif: '' };

      const baseUrl = `https://videodelivery.net/${token}/thumbnails`;
      return {
          jpg: `${baseUrl}/thumbnail.jpg`,
          gif: `${baseUrl}/thumbnail.gif?time=1s&duration=5s`
      };
  }

  /**
   * Request a Resumable Upload URL (TUS) from Cloudflare.
   * Returns the 'Location' header which is the TUS endpoint for the frontend.
   */
  async getDirectUploadUrl(userId: string, uploadLength: number, _metadata: Record<string, string> = {}): Promise<string> {
    if (!this.accountId || !this.apiToken) {
      throw new InternalServerErrorException('Cloudflare credentials missing');
    }

    // Use the Resumable Upload endpoint (TUS compatible)
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream?direct_user=true`;

    // Prepare Metadata (Base64 encoded values, space separated key-value, comma separated pairs)
    // Example: "maxDurationSeconds NjAw,requiresignedurls"
    // Note: Keys are plain text, values are Base64
    const metaParts = [];

    // 1. maxDurationSeconds (4 hours = 14400)
    metaParts.push(`maxDurationSeconds ${Buffer.from('14400').toString('base64')}`);

    // 2. creator
    metaParts.push(`creator ${Buffer.from(userId).toString('base64')}`);

    // 3. requireSignedURLs
    metaParts.push(`requiresignedurls`); // Boolean flag, no value needed according to some docs, or value?
    // Docs say: "The Upload-Metadata header should contain key-value pairs... keys are text and values encoded in base64."
    // For flags like requiresignedurls, usually `requiresignedurls` is the key, value might be empty?
    // Let's check the doc example: 'Upload-Metadata: maxDurationSeconds NjAw,requiresignedurls,expiry ...'
    // It seems 'requiresignedurls' stands alone.

    // 4. allowedOrigins
    // Cloudflare TUS implementation might not support 'allowedOrigins' in Metadata.
    // However, the worker example showed returning 'Access-Control-Allow-Origin: *'.
    // Since the client uploads directly to Cloudflare, Cloudflare's servers must handle CORS.
    // Cloudflare Stream TUS endpoints generally allow all origins or we can't easily control it via metadata.
    // But let's try to add it if supported, otherwise TUS usually works.


    // 6. MP4 Download Support (Optimization Phase 2)
    // "mp4" key, value "true" (base64)
    metaParts.push(`download ${Buffer.from('true').toString('base64')}`); // Is key "download" or "mp4"?
    // Docs: "The key is download and the value is true (both unencoded? No, value base64)"
    // Actually, traditionally it's `mp4` in upload payload. In Upload-Metadata?
    // Let's use `requiresignedurls` pattern.
    // Wait, the documentation for turning on MP4 downloads via Upload-Metadata is distinct.
    // It is often set via "Basic Upload" payload json: `"mp4": true`.
    // For TUS, can we set it in Metadata?
    // "You can apply the same constraints as Direct Creator Upload via basic upload when using tus. To do so, you must pass... as part of the Upload-Metadata..."
    // Constraints listed: maxDurationSeconds, expiry, requiresignedurls, allowedOrigins.
    // DOES IT INCLUDE "mp4"?
    // If not supported in Metadata, we must enable it per-video (via Webhook or Update API).
    // Let's TRY adding it to metadata as `mp4 true`.
    // If that fails or doesn't work, we'll need to do it in the Webhook handler (update video -> mp4: true).

    // Let's stick to what's guaranteed in docs: Creator, MaxDuration, Expiry, Private.
    // MP4 generation usually incurs cost.
    // Alternative: We can update the video settings immediately after upload via Webhook?
    // Or, we can assume `mp4` works in metadata. Let's try `mp4`.
    // metaParts.push(`mp4 ${Buffer.from('true').toString('base64')}`);

    // Watermark Profile (Optimization Phase 2)
    const watermarkProfileId = this.configService.get<string>('CLOUDFLARE_WATERMARK_PROFILE_ID');
    if (watermarkProfileId) {
        metaParts.push(`watermark ${Buffer.from(watermarkProfileId).toString('base64')}`);
    }

    const uploadMetadata = metaParts.join(',');

    try {
      const response = await axios.post(
        endpoint,
        null, // Empty body for TUS creation via this endpoint
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            'Tus-Resumable': '1.0.0',
            'Upload-Length': uploadLength.toString(),
            'Upload-Metadata': uploadMetadata,
          },
          maxRedirects: 0, // We want the Location header, not to follow it
          validateStatus: (status) => status >= 200 && status < 400, // Accept 201 Created
        },
      );

      // The TUS endpoint is in the Location header
      const uploadUrl = response.headers['location'] || response.headers['Location'];

      if (!uploadUrl) {
          console.error('❌ Cloudflare TUS: No Location header', response.headers);
          throw new Error('No uploadURL (Location header) in Cloudflare response');
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

  getThumbnailUrls(uid: string) {
      const domain = `https://customer-${this.accountId}.cloudflarestream.com`;
      return {
          jpg: `${domain}/${uid}/thumbnails/thumbnail.jpg`,
          gif: `${domain}/${uid}/thumbnails/thumbnail.gif?time=1s&duration=5s`
      };
  }

  getDownloadUrl(uid: string) {
      // NOTE: This URL is only valid if "MP4 downloads" are enabled for the video.
      // Format: https://customer-<CODE>.cloudflarestream.com/<UID>/downloads/default.mp4
      // Use filename to be nice: ?filename=video.mp4
      const domain = `https://customer-${this.accountId}.cloudflarestream.com`;
      return `${domain}/${uid}/downloads/default.mp4`;
  }

  async getVideoAnalytics(uid: string): Promise<{ views: number }> {
      const endpoint = 'https://api.cloudflare.com/client/v4/graphql';

      const query = `
        query GetVideoViews($accountTag: String, $uid: String) {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              streamAnalyticsAdaptiveGroups(filter: {uid: $uid}, limit: 1) {
                sum {
                  views
                }
              }
            }
          }
        }
      `;

      try {
        // Note: axios is imported at the top
        const response = await axios.post(
            endpoint,
            {
                query: query,
                variables: {
                    accountTag: this.accountId,
                    uid: uid
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${this.apiToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = response.data;
        if (data.errors) {
            console.warn('⚠️ GraphQL Analytics Error:', data.errors);
            return { views: 0 };
        }

        const accounts = data.data?.viewer?.accounts || [];
        if (accounts.length > 0 && accounts[0].streamAnalyticsAdaptiveGroups?.length > 0) {
            const views = accounts[0].streamAnalyticsAdaptiveGroups[0].sum?.views || 0;
            return { views };
        }

        return { views: 0 };
      } catch (error) {
          console.error('❌ Failed to fetch analytics:', error);
          return { views: 0 };
      }
  }

  async generateCaptions(uid: string, language = 'ko'): Promise<boolean> {
      try {
          const response = await axios.post(
              `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${uid}/captions/${language}`,
              {}, // Empty body
              {
                  headers: {
                      'Authorization': `Bearer ${this.apiToken}`
                  }
              }
          );
          return response.status === 200 || response.status === 201;
      } catch (error: any) {
          console.error('❌ Failed to generate captions:', error?.response?.data || error.message);
          return false;
      }
  }

  async uploadCaption(uid: string, language: string, fileBuffer: Buffer): Promise<boolean> {
      try {
          // PUT https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{identifier}/captions/{language}
          // Body: The caption file content (text/vtt)
          const response = await axios.put(
              `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${uid}/captions/${language}`,
              fileBuffer,
              {
                  headers: {
                      'Authorization': `Bearer ${this.apiToken}`,
                      'Content-Type': 'text/vtt' // Defaulting to VTT for now, but API accepts SRT too? Check docs.
                      // Cloudflare docs say: "Upload captions" endpoint takes raw body.
                  }
              }
          );
          return response.status === 200 || response.status === 201;
      } catch (error: any) {
          console.error('❌ Failed to upload caption:', error?.response?.data || error.message);
          return false;
      }
  }
}
