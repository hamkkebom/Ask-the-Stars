/**
 * Cloudflare Image Resizing Utility
 *
 * Constructs a URL for on-the-fly image resizing using Cloudflare's /cdn-cgi/image/ endpoint.
 * Requires "Image Resizing" to be enabled in Cloudflare Dashboard -> Zone -> Speed -> Optimization.
 */

// Production domain where the Zone is active
const CLOUDFLARE_ZONE_DOMAIN = 'https://hamkkebom.com';

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'json';
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
}

export function getOptimizedImageUrl(originalUrl: string | undefined | null, options: ImageOptions = {}): string {
  if (!originalUrl) return '/images/placeholder-avatar.png'; // Fallback

  // If already optimized or local relative path, return as is (unless we want to optimize local assets too?)
  // Generally we only optimize external R2 URLs.
  if (originalUrl.startsWith('/')) {
      // Local asset optimization? Cloudflare can optimize relative paths if served from same origin.
      // But for now let's focus on R2 URLs.
      return originalUrl;
  }

  // Handle Cloudflare Stream Thumbnails (videodelivery.net / cloudflarestream.com)
  const isStreamUrl = originalUrl.includes('videodelivery.net') || originalUrl.includes('cloudflarestream.com');
  if (isStreamUrl) {
      // Cloudflare Stream supports resizing via query params
      // Docs: https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/#thumbnail-dimensions
      const separator = originalUrl.includes('?') ? '&' : '?';
      const params = [];
      if (options.width) params.push(`width=${options.width}`);
      if (options.height) params.push(`height=${options.height}`);
      if (options.fit) params.push(`fit=${options.fit}`);

      if (params.length > 0) {
          return `${originalUrl}${separator}${params.join('&')}`;
      }
      return originalUrl;
  }

  // If URL is not from our R2 bucket, skip it (unless we set up Custom Origin for others)
  // Check if it's already an optimizable R2 URL or Custom Domain R2
  const isR2Url = originalUrl.includes('r2.cloudflarestorage.com') || originalUrl.includes('media.hamkkebom.com');

  if (!isR2Url) {
      return originalUrl;
  }

  const {
      width = 400,
      quality = 80,
      format = 'auto',
      fit = 'scale-down'
  } = options;

  // Construct options string: "width=400,quality=80,format=auto"
  const optionsString = `width=${width},quality=${quality},format=${format},fit=${fit}`;

  // Using the Cloudflare Zone domain to proxy the resize request
  // Format: https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-URL>
  return `${CLOUDFLARE_ZONE_DOMAIN}/cdn-cgi/image/${optionsString}/${originalUrl}`;
}
