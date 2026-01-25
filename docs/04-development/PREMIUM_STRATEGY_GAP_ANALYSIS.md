# Premium Strategy Gap Analysis & Development Roadmap

## 🎯 Objective
Transition the existing hybrid/MVP system to a **Cloudflare Stream-First architecture**, prioritizing detailed analytics, adaptive bitrate (quality), and security.

---

## 1. Backend Development (NestJS)

### A. Token Generation Service (New)
*   **Gap**: Currently, the system exposes the public `streamUid` or R2 Presigned URL. For Premium features (Analytics per user), we must generate Signed Tokens.
*   **Action**:
    *   Create `StreamService` (or enhance `VideosService`).
    *   Implement `generateSignedToken(uid: string, userId: string)` using Cloudflare Signing Keys.
    *   Inject this token into the `getVideoById` response.

### B. Direct Stream Upload (TUS Protocol)
*   **Gap**: Current upload logic (Post /uploads) might handle files on the server or R2. Large video uploads via server are inefficient.
*   **Action**:
    *   Implement **Direct Creator Upload** endpoint for Cloudflare Stream.
    *   Endpoint: `POST /videos/upload-token` -> Returns a one-time upload URL.
    *   Frontend uses **TUS** (Resumable Upload) to send file directly to Cloudflare.
    *   Webhook handler to detect `ready` state and create DB record.

### C. Webhook Handler
*   **Gap**: We need to know when encoding is finished to mark the video as `FINAL`.
*   **Action**:
    *   Implement `POST /webhooks/cloudflare` endpoint.
    *   Handle events: `video.ready`, `video.failed`.

---

## 2. Frontend Development (Next.js)

### A. Player Standardization
*   **Gap**: `VideoDetailClient` handles both R2 `<video>` and Stream `<iframe>`.
*   **Action**:
    *   Remove `<video>` fallback logic (or keep strictly for Admin archival review).
    *   Standardize on `<StreamPlayer />` component (using `@cloudflare/stream-react` is recommended for React 19 compatibility check).
    *   Pass `uid` AND `token` to the player to enable User Analytics.

### B. Creator Studio (Upload UI)
*   **Gap**: Current UI might use simple form upload.
*   **Action**:
    *   Implement **TUS Client** for upload progress bar.
    *   "Processing..." state: Show spinner until Webhook confirms readiness.

---

## 3. Data Migration (If applicable)

### A. R2 Videos -> Stream
*   **Gap**: Existing videos in R2 need to be moved to Stream to benefit from ABR.
*   **Action**:
    *   Write a script to list R2 files and submit "Upload from URL" requests to Cloudflare Stream.
    *   Update DB `streamUid` once complete.

---

## 📅 Execution Plan (Recommended)

1.  **Week 1**: Backend Token Generation & Webhook Receiver.
2.  **Week 1**: Frontend Player update to support Tokens.
3.  **Week 2**: Direct Upload (TUS) implementation.
