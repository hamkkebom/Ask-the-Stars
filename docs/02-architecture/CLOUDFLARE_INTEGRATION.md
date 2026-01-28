# Cloudflare Integration Architecture

This document details the architectural integration of Cloudflare services (R2, Stream, Images) into the Hankaebom (Ask-the-Stars) platform.

## 1. Overview
We utilize a **Hybrid Architecture** leveraging Cloudflare's edge network for performance, security, and cost efficiency.

| Service | Component | Role | Strategy |
| :--- | :--- | :--- | :--- |
| **Cloudflare R2** | Object Storage | **"The Vault"** | Stores original raw assets (Videos, Images). Private bucket. |
| **Cloudflare Stream** | Video Delivery | **"The Player"** | Transcodes and streams video via HLS/DASH. |
| **Image Resizing** | Content Delivery | **"The Optimiser"** | Real-time resizing/formatting of images stored in R2. |

---

## 2. Video Pipeline: "Direct-to-Vault"

We avoid server-side bottlenecks by allowing clients to upload directly to R2.

### Flow Step-by-Step
1.  **Request Upload URL**: Client requests a `PUT` URL from `POST /api/uploads/presigned-put-url`.
    *   *Security*: Endpoint is protected via JWT. URL expires in 1 hour.
2.  **Direct Upload**: Client uploads the raw video file directly to R2 bucket.
    *   *Performance*: 0% bandwidth load on our API server.
3.  **Stream Import**: Upon success, Client notifies Backend. Backend calls Cloudflare Stream's `copy` endpoint.
    *   *Efficiency*: Cloudflare pulls the file internally from R2 (High speed).
4.  **Playback**: Stream processes the video and provides a UID.

### Key Configuration
*   **Bucket**: `hamkkebom-uploads` (Private)
*   **CORS**: Configured to allow `PUT` from valid origins.
*   **Retention**: Original references are kept in R2 for data sovereignty.

---

## 3. Image Optimization: "R2 + Zone Resizing"

Instead of using the separate "Cloudflare Images" product storage, we use **Image Resizing** on our existing R2 bucket.

### Architecture
*   **Origin**: R2 Bucket (`media.hamkkebom.com`)
*   **Proxy**: Cloudflare Zone (`hamkkebom.com`)
*   **Mechanism**:
    1.  Frontend transforms URL: `media.hamkkebom.com/avatar.jpg` -> `hamkkebom.com/cdn-cgi/image/width=100/https://media.hamkkebom.com/avatar.jpg`
    2.  Cloudflare Edge fetches original from R2 (if not cached).
    3.  Edge resizes, optimizes (WebP/AVIF), and caches the result.
    4.  Browser receives highly optimized image.

### Usage
Use the `getOptimizedImageUrl` utility in `@/utils/image`:
```typescript
import { getOptimizedImageUrl } from '@/utils/image';

<img src={getOptimizedImageUrl(user.avatarUrl, { width: 100 })} />
```

---

## 4. Security Measures

### Signed Tokens (Video & Thumbnails)
To prevent hotlinking and unauthorized sharing of paid content:
*   Stream videos are configured to **require signed URLs**.
*   **Thumbnails & Previews (GIF)** are also secured using Signed Tokens.
*   Backend generates a JWT signed with a 2048-bit RSA Private Key (`CLOUDFLARE_SIGNING_KEY_PEM`).
*   The `CloudflareStreamService` handles batch signing for grid views as well as single signing for player detail.
*   Token includes expiration (e.g., 2 hours).

### Presigned URLs (Upload)
*   AWS SDK `getSignedUrl` is used to generate limited-time access for uploading.
*   Check `UploadsService` for implementation details.

---

## 5. Maintenance & Troubleshooting

*   **CORS Issues**: Run `node scripts/setup-r2-cors.js` to reset bucket policies.
*   **Webhook Failures**: Check Cloudflare Dashboard > Stream > Webhooks. Ensure `CLOUDFLARE_WEBHOOK_SECRET` matches.
*   **Image Not Resizing**: Verify "Image Resizing" is enabled in Cloudflare Dashboard > Speed > Optimization.

## 6. Future Roadmap
*   **Turnstile**: Add to Login/Signup forms for bot protection.
*   **Workers**: Move Webhook processing to Cloudflare Workers for higher availability.
