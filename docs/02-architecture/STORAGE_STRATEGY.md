# Cloudflare R2 Storage Strategy

## Executive Summary
**Cloudflare Stream** is the selected video delivery platform.
*   **Primary Goal**: Best-in-class User Experience (Zero Buffering, ABR).
*   **Secondary Goal**: Comprehensive Analytics & Content Protection.
*   **Role of R2**: Strictly for raw asset backup and file transfer (not playback).

## 📂 Directory Structure

### 1. Public Assets (Restricted Public Access)
*Accessible via `static.hamkkebom.com` (Custom Domain)*
- `/public/branding/` : Logos, Favicons
- `/public/marketing/` : Campaign banners, Landing page headers
- `/public/news/` : News article thumbnails

### 2. Protected Content (Presigned URL Only)
*Strict access control via Backend*

#### A. Education (LMS)
- `/lms/courses/{course_id}/materials/` : PDF, Zip resources
- `/lms/videos/{video_id}/` : Raw MP4 (if not using Stream) or HLS segments
    - *Policy*: Only enrolled students + Admin

#### B. Freelancer Submissions (Stars)
- `/projects/{project_id}/raw/` : Original uploads from Freelancers
    - *Lifecycle*: Delete after 30 days (Cost optimization)
- `/projects/{project_id}/submissions/{submission_id}/` : Versioned edits
    - Format: `[v{version}]_{filename}` (e.g., `v1.0_cut.mp4`)

#### C. Final Deliverables
- `/finals/{project_id}/` : Client-facing final files
- `/portfolio/{maker_id}/` : Verified portfolio clips (Optimized variants)

### 3. User Data
- `/users/{user_id}/avatar/` : Profile pictures
- `/users/{user_id}/documents/` : Contracts, Tax forms (Encrypted at rest recommended)

## 🔐 Security & Access Pattern

### Upload Flow (Direct Creator Upload)
1. **Frontend**: Request upload permission for specific file (name, size, type).
2. **Backend**: Generate **Presigned PUT URL** (valid for 15 mins).
    - Limit `Content-Length` and `Content-Type`.
3. **Frontend**: Upload directly to R2 using the URL.
4. **Backend**: Webhook/Callback verifies upload existence and updates DB.

### Playback/Download Flow (Premium Strategy)
1.  **Frontend**: Request video access (Project Page, LMS).
2.  **Backend**: Generate **Signed Stream Token** (JWT).
    *   Protect content with Domain Restrictions & Expiry.
3.  **Frontend**: Render `<StreamPlayer uid={uid} token={token} />`.
    *   **Features**: 4K/1080p ABR, Text Tracks, Analytics.

### R2 Usage (Archival Only)
*   **Role**: 'Cold Storage' for original raw files.
*   **Access**: Only for Creators downloading their own original files.
*   **Playback**: **Disabled** (Directed to Stream for all viewing).

## 💾 Naming Conventions
To prevent overwrite collisions and encoding issues:
- **Rule**: `{UUID-v4}_{Sanitized-Original-Name}.{Ext}`
- **Example**: `550e8400-e29b-41d4-a716-446655440000_promo_video_final.mp4`
- **Sanitization**: Remove spaces, special chars. Lowercase only.
