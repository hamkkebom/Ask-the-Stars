# Tech Stack Alignment Task

- [x] **Video Architecture Alignment**
    - [x] Check DB for existing `streamUid` data. (Empty, but code supported)
    - [x] Update `CompactVideoCard` to support HLS playback (using `hls.js` or `Plyr`) for Cloudflare Stream compatibility. (Implemented iframe fallback)
    - [x] Ensure fallback to R2 (MP4) remains functional. (Verified logic)
- [x] **Authentication Alignment**
    - [x] Inspect `AuthModule` to confirm usage of Passport vs Supabase. (Confirmed compliant)
    - [x] If Passport is unused, remove logic/deps OR integrate it properly if required by spec. (N/A)
- [x] **Documentation Update**
    - [x] Update `TECH_STACK.md` (if exists) or `README.md` to reflect the "Hybrid" reality (Stream preferred, R2 fallback). (Updated README)
