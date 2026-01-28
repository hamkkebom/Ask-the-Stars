ㅋ`Premium Strategy Gap Analysis & Development Roadmap

## 🎯 Objective
Transition the existing hybrid/MVP system to a **Cloudflare Stream-First architecture**, prioritizing detailed analytics, adaptive bitrate (quality), and security.

---

## 1. Backend Development (NestJS)

### A. Token Generation Service (New) `[COMPLETED]`
*   **Gap**: Currently, the system exposes the public `streamUid` or R2 Presigned URL. For Premium features (Analytics per user), we must generate Signed Tokens.
*   **Status**: **Implemented**. `CloudflareStreamService` generates signed tokens, and `StreamPlayer` uses them.
*   **Action**:
    *   [x] Create `StreamService` (or enhance `VideosService`).
    *   [x] Implement `generateSignedToken(uid: string, userId: string)` using Cloudflare Signing Keys.
    *   [x] Inject this token into the `getVideoById` response.

### B. Direct Stream Upload (TUS Protocol) `[ADJUSTED]`
*   **Gap**: Current upload logic (Post /uploads) might handle files on the server.
*   **Status**: **Adjusted to Hybrid R2 Model**. Instead of direct TUS, we implemented **R2 Presigned PUT** -> **Copy to Stream**. This provides a backup in R2 and allows Cloudflare Stream to optimize quality.
*   **Action**:
    *   [x] Implement R2 Presigned URL generation.
    *   [x] Auto-trigger "Copy to Stream" on upload completion.
    *   [ ] (Future) Consider Direct TUS for extremely large files (>5GB) if needed.

### C. Webhook Handler `[COMPLETED]`
*   **Gap**: We need to know when encoding is finished to mark the video as `FINAL`.
*   **Status**: **Implemented**. `CloudflareWebhookController` handles `video.ready` events.
*   **Action**:
    *   [x] Implement `POST /webhooks/cloudflare` endpoint.
    *   [x] Handle events: `video.ready`, `video.failed`.

---

## 2. Frontend Development (Next.js)

### A. Player Standardization `[COMPLETED]`
*   **Gap**: `VideoDetailClient` handles both R2 `<video>` and Stream `<iframe>`.
*   **Status**: **Implemented**. `StreamPlayer` component standarized for Cloudflare Stream with Signed Tokens.
*   **Action**:
    *   [x] Remove `<video>` fallback logic (mostly).
    *   [x] Standardize on `<StreamPlayer />` component.
    *   [x] Pass `token` to the player to enable User Analytics.

### B. Creator Studio (Upload UI) `[COMPLETED]`
*   **Gap**: Current UI might use simple form upload.
*   **Status**: **Implemented**.
*   **Action**:
    *   [x] Implemented File Upload UI with progress tracking.
    *   [x] Integrated `StreamUploader` with R2 Presigned URLs.
    *   [x] "Processing..." state: Basic implementation via `status` field.

### C. AI Vector Search (Phase 7) `[NEW & COMPLETED]`
*   **Objective**: Enable semantic search and video recommendations.
*   **Status**: **Implemented**.
*   **Action**:
    *   [x] Enable `pgvector` extension and `VideoEmbedding` schema.
    *   [x] Implement `AiService` with OpenAI `text-embedding-3-small`.
    *   [x] Update `VideosService` to generate embeddings on create/update.
    *   [x] Frontend: Add Search Page and Recommendations UI.

---

## 3. Data Migration (If applicable)

### A. R2 Videos -> Stream `[PENDING]`
*   **Gap**: Existing videos in R2 need to be moved to Stream to benefit from ABR.
*   **Status**: **Pending**. Manual migration script needed.
*   **Action**:
    *   [ ] Write a script to list R2 files and submit "Upload from URL" requests to Cloudflare Stream.
    *   [ ] Update DB `streamUid` once complete.

### B. AI Embedding Backfill `[PENDING]`
*   **Gap**: Existing videos do not have vector embeddings.
*   **Status**: **Pending**.
*   **Action**:
    *   [ ] Write script to generate embeddings for all existing videos.

---

## 📅 Execution Plan (Completed)

1.  **Phase 1-6**: Core Cloudflare Integration (Stream, R2, Analytics, Security) - **DONE**
2.  **Phase 7**: AI Vector Search - **DONE**
3.  **Next Steps**:
    *   Data Backfill (Embeddings & Stream Migration).
    *   Monitoring & Optimization.
