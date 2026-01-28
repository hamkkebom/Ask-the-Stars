'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/utils/image';
import { useState, memo, useEffect } from 'react';
import { videosApi } from '@/lib/api/videos';

export interface VideoProps {
    id: string;
    title: string;
    thumbnailUrl: string;
    description?: string;
    currentYear?: string;
    counselor?: {
        name: string;
        avatarUrl?: string; // Optional
    };
    creator?: {
        name: string;
        avatarUrl?: string;
    };
    category: string;
    tags: string[];
    views?: number;
    createdAt?: string; // "25/01/17"
    duration?: string;
    videoUrl?: string; // Add videoUrl property
    onHoverChange?: (isHovered: boolean) => void;
    matchScore?: number;
    isNew?: boolean;
    streamUid?: string; // Add streamUid property
    previewUrl?: string; // Animated GIF
}

function CompactVideoCardImpl({
    id, title, thumbnailUrl, videoUrl: initialVideoUrl, streamUid, previewUrl,
    counselor = { name: "상담사" },
    creator = { name: "제작자" },
    category, tags, createdAt = "25/01/17",
    onHoverChange
}: VideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [dynamicVideoUrl, setDynamicVideoUrl] = useState<string | null>(initialVideoUrl || null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const videoUrl = dynamicVideoUrl || initialVideoUrl;
  // Only fallback to video if thumbnail fails AND we have a valid playable video URL
  // Ideally, we shouldn't autoplay on error unless hovered, but for now we just want to avoid black boxes.
  // Actually, if thumbnail fails, we should show placeholder unless video is ready.
  // Let's rely on standard imgError leading to placeholder if videoUrl is not perfect.
  // BUT current logic was: showVideoThumbnail = (... || imgError) && videoUrl
  // If videoUrl is S3 link (private), it won't play.
  // So: Only show video thumbnail if videoUrl is NOT an S3 link (contains signature or is public) OR we are hovered.
  // Actually, simpler: showVideoThumbnail is ONLY for "Video as Thumbnail" feature.
  // If imgError, we want to show PLACEHOLDER image, not broken video.
  const showVideoThumbnail = (!thumbnailUrl || thumbnailUrl === "/placeholder.jpg") && videoUrl;

  // If image errors, we set imgError state, which force renders the Image component with placeholder src?
  // No, currently imgError was part of showVideoThumbnail condition. I am removing it.
  // So if imgError is true, showVideoThumbnail remains false (unless title match etc).
  // Image component below handles src={thumbnailUrl || "/placeholder.jpg"} and onError sets imgError.
  // Wait, if imgError is set, we need to ensure Image component re-renders with placeholder?
  // Image component logic: src={thumbnailUrl || "/placeholder.jpg"}
  // If thumbnailUrl is bad, onError triggers. We setImgError(true).
  // But src prop doesn't change unless we change it based on imgError?
  // Let's modify the Image src logic too.


  // Device Detection
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Intersection Observer for Mobile Autoplay
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
      });
    }, { threshold: 0.8 }); // Trigger when 80% visible

    const el = document.getElementById(`card-${id}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [id, isMobile]);

  // Handle 1s Delay for Mobile Autoplay (Intersection)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Strict: Only use intersection autoplay on mobile
    if (isMobile && isIntersecting && !isHovered) {
      timer = setTimeout(() => {
        setShouldPlay(true);
        // Start fetching preview if needed
        handleTriggerPreview();
      }, 1000);
    } else {
      setShouldPlay(false);
    }

    return () => clearTimeout(timer);
  }, [isIntersecting, isHovered, id, isMobile]);

  const handleTriggerPreview = async () => {
    if (isLoadingPreview || dynamicVideoUrl || streamUid) return;
    setIsLoadingPreview(true);
    try {
        const url = await videosApi.getVideoPreviewUrl(id);
        setDynamicVideoUrl(url);
    } catch (error) {
        console.error('Failed to fetch preview URL:', error);
    } finally {
        setIsLoadingPreview(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
    // Instant fetch and play for PC hover
    handleTriggerPreview();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  const isActuallyPlaying = isHovered || shouldPlay;

  return (
    <Link id={`card-${id}`} href={`/videos/${id}`} className="block">
      <div
        className="group relative w-full flex flex-col gap-3 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* --- Thumbnail Container --- */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group-hover:shadow-2xl transition-all duration-300 z-0 group-hover:z-10 text-decoration-slice">

          {/* Main Image */}
          <div className={cn("absolute inset-0 transition-transform duration-700 ease-out", isActuallyPlaying ? "scale-[1.1]" : "scale-100")}>
              {showVideoThumbnail ? (
                  <video
                      src={videoUrl || undefined}
                      className={cn("object-cover w-full h-full transition-opacity duration-300", isActuallyPlaying ? "opacity-0" : "opacity-90")}
                      muted
                      playsInline
                      loop
                      onLoadedMetadata={(e) => (e.target as HTMLVideoElement).currentTime = 0.1}
                  />
              ) : (
                  <Image
                      src={imgError ? "/placeholder.jpg" : getOptimizedImageUrl(thumbnailUrl || "/placeholder.jpg", { width: 400 })}
                      alt={title}
                      fill
                      className={cn("object-cover transition-opacity duration-300", isActuallyPlaying ? "opacity-0" : "opacity-90")}
                      unoptimized
                      onError={() => setImgError(true)}
                  />
              )}
              {/* Subtle Gradient Overlay for Depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>


          {/* Animated GIF Preview on Hover */}
          {isActuallyPlaying && (previewUrl || videoUrl) && (
            <div className="absolute inset-0 w-full h-full">
                {/* Use standard img for GIF to avoid Next.js optimization issues with animated images */}
                <img
                    src={previewUrl || videoUrl}
                    alt={title}
                    className="w-full h-full object-cover scale-[1.1] transition-transform duration-700"
                />
            </div>
          )}

          {/* --- Overlays --- */}
          {/* Top Left: Counselor Name (Text Only) */}
          <div className="absolute top-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none z-20">
              <span className="text-[11px] text-white/90 font-medium tracking-tight">{counselor?.name}</span>
          </div>

          {/* Bottom Left: Creator Name (Text Only) */}
          <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none z-20">
              <span className="text-[11px] text-white/90 font-medium tracking-tight">{creator?.name}</span>
          </div>
        </div>

        {/* --- Detailed Info (Below: Title, Category, Worry, Date) --- */}
        <div className="flex flex-col gap-1.5 px-0.5">
            {/* Title */}
            <h3 className="text-white font-medium text-[15px] leading-snug line-clamp-2 group-hover:text-vibrant-cyan transition-colors">
                {title}
            </h3>

            {/* Metadata: Category • Worry (Tag) • Date */}
            <div className="flex items-center gap-2 text-[12px] text-neutral-400 font-normal">
                <span className="text-vibrant-cyan">{category}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-300">{tags[0] || "고민상담"}</span>
                <span className="text-neutral-600">•</span>
                <span>{createdAt}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}

const CompactVideoCard = memo(CompactVideoCardImpl, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.title === next.title &&
        prev.thumbnailUrl === next.thumbnailUrl &&
        prev.views === next.views &&
        prev.matchScore === next.matchScore &&
        prev.isNew === next.isNew &&
        prev.counselor?.name === next.counselor?.name &&
        prev.creator?.name === next.creator?.name
    );
});

// Support both named and default import
export { CompactVideoCard };
export default CompactVideoCard;

