# Video Detail Page Implementation Plan

## Objective
Enable actual video playback on the Video Detail Page (`/videos/[id]`), replacing the current mock data and placeholder UI.

## Proposed Changes

### 1. Data Fetching (Frontend)

**File**: `apps/web/src/lib/api/videos.ts` (Create if not exists)
- Add `fetchVideoById(id: string)` function.
- It should call `NEXT_PUBLIC_API_URL/api/videos/:id`.

**File**: `apps/web/src/app/(public)/videos/[id]/page.tsx`
- Remove `mockVideo`.
- Call `fetchVideoById(id)` inside the server component.
- Map the API response to the `video` prop expected by `VideoDetailClient`.
- Handle 404/Error states.

### 2. UI Implementation (Frontend)

**File**: `apps/web/src/app/(public)/videos/[id]/VideoDetailClient.tsx`
- Update `VideoDetailClientProps` to match the real data structure (or a mapped version).
- In the "Cinema Mode" section:
    - Replace the static "Cinema Mode" div with a conditional player.
    - **Logic**:
        - If `video.technicalSpec?.streamUid`: Render Cloudflare Stream iframe.
        - Else if `video.technicalSpec?.r2Key` (or constructed `videoUrl`): Render standard `<video>` tag with R2 URL.
        - R2 URL construction: `NEXT_PUBLIC_R2_PUBLIC_URL` + `video.technicalSpec.r2Key`.

## Verification Plan

### Manual Verification
1.  **Navigation**: Click a video card from the `/videos` list.
2.  **Loading**: Ensure the page loads without 500 error.
3.  **Playback**:
    - Verify the video player appears at the top.
    - Click play and verify video content plays.
    - Check if "Cinema Mode" text is gone (or replaced by player).
4.  **Metadata**: Verify Title, Description, and Creator info match the clicked video.
