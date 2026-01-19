'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
    onHoverChange?: (isHovered: boolean) => void;
    matchScore?: number;
    isNew?: boolean;
}

export function CompactVideoCard({
    id, title, thumbnailUrl,
    counselor = { name: "상담사" },
    creator = { name: "제작자" },
    category, tags, createdAt = "25/01/17",
    onHoverChange
}: VideoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <Link href={`/videos/${id}`} className="block">
      <div
        className="group relative w-full flex flex-col gap-3 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* --- Thumbnail Container --- */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group-hover:shadow-2xl transition-all duration-300 z-0 group-hover:z-10">

          {/* Main Image */}
          <div className={cn("absolute inset-0 transition-transform duration-700 ease-out", isHovered ? "scale-[1.2]" : "scale-100")}>
              <Image
                  src={thumbnailUrl || "/placeholder.jpg"}
                  alt={title}
                  fill
                  className={cn("object-cover transition-opacity duration-300", isHovered ? "opacity-0" : "opacity-90")}
                  unoptimized
              />
          </div>

          {/* Auto-play Video on Hover */}
          {isHovered && (
               <video
                  src="https://cdn.pixabay.com/video/2024/02/09/199958-911694865_large.mp4" // Placeholder video for demo
                  className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
                  autoPlay
                  muted
                  loop
                  playsInline
               />
          )}

          {/* Play Button on Hover */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 text-black fill-black ml-1" />
            </div>
          </div>

          {/* --- Overlays --- */}
          {/* Top Left: Counselor Name (Text Only) */}
          <div className="absolute top-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none z-20">
              <span className="text-[11px] text-white/90 font-medium tracking-tight">{counselor.name}</span>
          </div>

          {/* Bottom Left: Creator Name (Text Only) */}
          <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none z-20">
              <span className="text-[11px] text-white/90 font-medium tracking-tight">{creator.name}</span>
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

