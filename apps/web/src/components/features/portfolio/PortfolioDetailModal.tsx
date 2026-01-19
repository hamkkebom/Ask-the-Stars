'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, ExternalLink, Eye, Heart, Share2 } from 'lucide-react';
import { PortfolioItem } from '@/data/mocks/portfolio';

interface PortfolioDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export function PortfolioDetailModal({ isOpen, onClose, item }: PortfolioDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[90vh] md:h-auto bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button (Mobile) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white md:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Media Area */}
          <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative group min-h-[300px]">
            {item.category === 'VIDEO' || item.category === 'SHORTS' ? (
              // Video functionality to be implemented properly with players
              // For now using thumbnail with a play styling
               <div className="relative w-full h-full aspect-video md:aspect-auto">
                 <img
                   src={item.thumbnailUrl}
                   alt={item.title}
                   className="w-full h-full object-contain"
                 />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    {/* Placeholder for video player embed */}
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 font-bold transition-transform hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5" />
                      영상 보러가기
                    </a>
                 </div>
               </div>
            ) : (
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-contain p-4"
              />
            )}
          </div>

          {/* Right: Info Area */}
          <div className="w-full md:w-1/3 border-l border-white/10 flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-start">
               <div>
                 <div className="flex gap-2 mb-2">
                   <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/20">
                     {item.category}
                   </span>
                 </div>
                 <h2 className="text-xl font-bold text-white leading-tight">{item.title}</h2>
               </div>

               <button onClick={onClose} className="hidden md:block text-gray-400 hover:text-white transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Eye className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <span className="text-lg font-bold text-white block">
                      {item.stats?.views?.toLocaleString() || '0'}
                    </span>
                    <span className="text-xs text-gray-500">조회수</span>
                 </div>
                 <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Heart className="w-5 h-5 mx-auto text-primary mb-1" />
                    <span className="text-lg font-bold text-white block">
                      {item.stats?.likes?.toLocaleString() || '0'}
                    </span>
                    <span className="text-xs text-gray-500">좋아요</span>
                 </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">작품 소개</h3>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>역할: <span className="text-white ml-2">{item.role}</span></span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>등록일: <span className="text-white ml-2">{item.createdAt}</span></span>
                 </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> 태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/10 grid grid-cols-2 gap-3">
               <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <Heart className="w-4 h-4" /> 좋아요
               </button>
               <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
                  <Share2 className="w-4 h-4" /> 공유하기
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
