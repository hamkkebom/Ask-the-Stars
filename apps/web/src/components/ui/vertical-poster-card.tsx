'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface PosterProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  year: string;
  isNew?: boolean;
  platform?: string;
  color?: string; // Hex for shadow, e.g. #00F0FF
}

export function VerticalPosterCard({ id, title, imageUrl, category, year, isNew, platform, color = '#00F0FF' }: PosterProps) {
  return (
    <motion.div
      className="group relative w-full aspect-[3/4] rounded-xl cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Dynamic Colored Shadow (Glows on Hover) */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: color }}
      />

      {/* Main Card Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        {/* Placeholder Image (until we have real images) - Using gradient fallback */}
        <div className="absolute inset-0 bg-neutral-900">
             {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 font-black text-4xl uppercase p-4 text-center">
                    {title.substring(0, 2)}
                </div>
             )}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
                <span className="px-2 py-0.5 bg-vibrant-cyan text-[10px] font-bold text-black uppercase rounded-sm">
                    New
                </span>
            )}
            {platform && (
                 <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-medium text-white uppercase rounded-sm">
                    {platform}
                 </span>
            )}
        </div>

        {/* Content (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
           <h3 className="text-white text-lg font-bold leading-tight mb-1 line-clamp-2 group-hover:text-vibrant-cyan transition-colors">
             {title}
           </h3>
           <div className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide">
             <span>{year}</span>
             <span className="w-1 h-1 rounded-full bg-gray-600" />
             <span>{category}</span>
           </div>
        </div>

        {/* Play Button (Centers on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
