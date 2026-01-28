export function getVideoSrc(technicalSpec: any | null | undefined): string | undefined {
  if (!technicalSpec) return undefined;

  // 1. Cloudflare Stream (Priority)
  if (technicalSpec.streamUid) {
    // If we have a signed token in the future, we'd append it here.
    // For now, return undefined to let the player component handle the iframe/uid logic,
    // OR return the m3u8 URL if using a custom player.
    // However, the CompactVideoCard uses an iframe for Stream, so we might return undefined
    // to signal "Use Stream Player Construction" or handle it differently.
    // But for "videoUrl" prop (direct playback), we should fallback to R2 if Stream is not ready?
    // Actually, checking CompactVideoCard, it takes `videoUrl` OR `streamUid`.
    // So this function should focus on the "Direct File URL" generation.
    return undefined;
  }

  // 2. R2 Public Access
  if (technicalSpec.r2Key) {
    const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    if (baseUrl) {
      // Ensure no double slashes if baseUrl ends with / or key starts with /
      const cleanBase = baseUrl.replace(/\/$/, '');
      const cleanKey = technicalSpec.r2Key.replace(/^\//, '');
      return `${cleanBase}/${cleanKey}`;
    }
  }

  return undefined;
}

export function getThumbnailSrc(input: any | string | null | undefined): string | undefined {
  if (!input) return undefined;

  // 1. Extract raw URL
  let rawUrl: string | undefined;
  if (typeof input === 'string') {
    rawUrl = input;
  } else if (typeof input === 'object') {
    rawUrl = input.thumbnailUrl || input.thumbnail;
  }

  // 2. Derive rawUrl if missing but r2Key exists (Video -> Thumb pattern)
  // DB often has null thumbnails but R2 has the files.
  if(!rawUrl && typeof input === 'object' && input?.r2Key) {
      // Pattern: "video.mp4" -> "video_thumb.avif" (User confirmed AVIF exists and R2 listing showed it)
      // We prioritize AVIF for quality/performance.
      const videoKey = input.r2Key;
      const dotIndex = videoKey.lastIndexOf('.');
      if (dotIndex !== -1) {
          rawUrl = videoKey.substring(0, dotIndex) + '_thumb.avif';
      } else {
          rawUrl = videoKey + '_thumb.avif';
      }
  }

  if (!rawUrl) return undefined;

  // 3. Handle Base URL
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!baseUrl) return rawUrl;
  const cleanBase = baseUrl.replace(/\/$/, '');

  // 3. Logic: Rewrite S3-style R2 URLs to public domain
  if (rawUrl.includes('r2.cloudflarestorage.com')) {
    const key = rawUrl.split('.com/')[1];
    if (key) return `${cleanBase}/${key}`;
  }

  // 4. If it's already an absolute URL, return as is
  if (rawUrl.startsWith('http')) {
    return rawUrl;
  }

  // 5. Fallback for relative keys (e.g., "uploads/xxx.jpg")
  // Ensure we encode each path segment to handle spaces/special chars.
  // CRITICAL FIX: If the rawUrl is ALREADY encoded (common in S3 keys), we must decode first to avoid double encoding.
  try {
      const cleanKey = rawUrl.replace(/^\//, '');
      // Attempt to decode fully first (in case it was %20 or %EB%82...)
      const decodedKey = decodeURIComponent(cleanKey);
      // Now re-encode cleanly by segment
      const encodedKey = decodedKey.split('/').map(p => encodeURIComponent(p)).join('/');
      return `${cleanBase}/${encodedKey}`;
  } catch (e) {
      // Fallback if decode fails
      const encodedKey = rawUrl.split('/').map(p => encodeURIComponent(p)).join('/');
      return `${cleanBase}/${encodedKey}`;
  }
}
