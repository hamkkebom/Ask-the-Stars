'use client';

import { motion } from 'framer-motion';
import { Play, Eye, Heart, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { PortfolioItem } from '@/data/mocks/portfolio';
import { cn } from '@/lib/utils';
import { useState, memo } from 'react';

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  stats?: {
    views?: number;
    likes?: number;
  };
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function PortfolioCardImpl({
  id, title, description, thumbnailUrl, category, tags, stats,
  onClick, onEdit, onDelete
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      layout
      className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/5 cursor-pointer backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail Aspect Ratio */}
      <div className={cn(
        "relative w-full overflow-hidden bg-gray-900",
        category === 'SHORTS' ? "aspect-[9/16]" : "aspect-video"
      )}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className={cn(
          "absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {category !== 'THUMBNAIL' && (
            <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30">
              <Play className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white border border-white/10">
          {category === 'VIDEO' && '영상'}
          {category === 'SHORTS' && '숏폼'}
          {category === 'THUMBNAIL' && '썸네일'}
          {category === 'OTHER' && '기타'}
        </div>

        {/* Options Menu Button code can go here if needed, but keeping it simple for now to avoid complexity in card click */}
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-white line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>

        {/* Stats & Tags */}
        <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-white/5 mt-2">
          <div className="flex gap-1">
             {tags.slice(0, 2).map((tag, i) => (
               <span key={i} className="px-1.5 py-0.5 bg-white/5 rounded text-gray-400">#{tag}</span>
             ))}
             {tags.length > 2 && <span>+{tags.length - 2}</span>}
          </div>

          {stats && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 tabular-nums">
                <Eye className="w-3 h-3" /> {stats.views?.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <Heart className="w-3 h-3" /> {stats.likes?.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export const PortfolioCard = memo(PortfolioCardImpl, (prev, next) => {
    return (
        prev.id === next.id &&
        prev.title === next.title &&
        prev.description === next.description &&
        prev.thumbnailUrl === next.thumbnailUrl &&
        prev.stats?.views === next.stats?.views &&
        prev.stats?.likes === next.stats?.likes
    );
});
