# Tech Stack Alignment Implementation Plan (Refined)

## Objective
Make the codebase **100% compliant** with the documented Tech Stack, specifically addressing the "Cloudflare Stream" and "Passport" requirements.

## Current Compliance Status
- **Authentication**: ✅ **Compliant**. `AuthModule` correctly uses `PassportModule` + `JwtStrategy` as documented. No changes needed.
- **Frontend Framework**: ✅ **Compliant** (Next.js 15, React 19).
- **Backend Framework**: ✅ **Compliant** (NestJS 11).
- **Video Streaming**: ⚠️ **Partial**. Document says "Cloudflare Stream", but implementation relies on R2 Direct.

## Proposed Changes to Achieve 100% Compliance

### 1. Frontend: Implement Cloudflare Stream Player (`apps/web`)

**File**: `apps/web/src/components/ui/compact-video-card.tsx`
- **Goal**: Use Cloudflare Stream (HLS/Dash) as the **Primary** playback engine, falling back to R2 only if Stream UID is missing.
- **Change**:
    - Import `Plyr` (or use iframe for simplest Stream integration).
    - If `video.streamUid` is present -> Render Stream Player.
    - If missing -> Render R2 Video (`<video>` tag).
    This ensures that *if* we use the stack (Stream), the code supports it.

### 2. Backend: Explicit Stream Support (`apps/api`)

**File**: `apps/api/src/modules/videos/videos.service.ts`
- **Goal**: Ensure the sync/creation logic is ready for Stream.
- **Verification**: `createVideoRecord` already accepts `streamId`.
- **Sync Logic**: We will keep the R2 sync (for legacy files) but add a comment clarifying that Stream UIDs should be populated via a separate migration or webhook if we switch availability.
- **No functional change needed** for Auth or basic Video logic, as they are already compliant enough for "capabilities".

## Verification Plan

### Manual Verification
1.  **Code Review**: Confirm imports of `@nestjs/passport` (Done).
2.  **Frontend Test**:
    - Manually mock a `streamUid` in the database for one video.
    - Open `/videos` page.
    - Verify that the specific card renders a Stream Player (iframe or Plyr) instead of the raw `<video>` tag.
    - Verify others still work with R2.
