'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CompactVideoCard, VideoProps } from '@/components/ui/compact-video-card';
import { Grid, ListFilter } from 'lucide-react';

// Mock Data Generator
const GENERATE_MOCK_VIDEOS = (count: number): VideoProps[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `grid-v-${i}`,
    title: i % 3 === 0 ? `2026 운세 대잔치 - ${i}` : i % 3 === 1 ? `타로의 세계 ${i}` : `신점의 비밀 ${i}`,
    thumbnailUrl: '', // Will use placeholder
    matchScore: 80 + Math.floor(Math.random() * 20),
    duration: `${Math.floor(Math.random() * 10) + 2}m`,
    tags: i % 2 === 0 ? ['사주', '신년', '운세'] : ['타로', '연애', '고민'],
    description: 'This is a description.'
  }));
};

const INITIAL_BATCH = GENERATE_MOCK_VIDEOS(30);

const FILTERS = ['All', 'Saju', 'Tarot', 'Sinjeom', 'Love', 'Career', 'Wealth', 'Vibe'];

export function FilterableVideoGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [videos, setVideos] = useState<VideoProps[]>(INITIAL_BATCH);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setVideos(prev => [...prev, ...GENERATE_MOCK_VIDEOS(30)]);
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-black min-h-screen">
      {/* Sticky Filter Bar */}
      <div className="sticky top-[0px] z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 transition-all">
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
            <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar">
                <h2 className="text-xl font-bold text-white whitespace-nowrap hidden md:block">
                    Browse All
                </h2>

                {/* Pills */}
                <div className="flex items-center gap-3">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border",
                                activeFilter === filter
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 ml-4">
               <button className="hover:text-white transition-colors "><Grid className="w-5 h-5" /></button>
            </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="px-6 py-8 md:px-12 max-w-[1920px] mx-auto">
        <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12"
        >
            <AnimatePresence>
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="relative"
                        style={{ zIndex: hoveredId === video.id ? 50 : 1 }}
                    >
                        <CompactVideoCard
                            {...video}
                            onHoverChange={(isHovered) => setHoveredId(isHovered ? video.id : null)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Load More Trigger */}
        <div className="mt-20 flex justify-center pb-20">
            <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-gray-600 hover:border-vibrant-cyan transition-colors"
            >
                <div className={cn(
                    "absolute inset-0 bg-white/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0",
                    isLoading && "translate-y-0 bg-white/20 animate-pulse"
                )} />
                <span className="relative text-gray-300 font-bold group-hover:text-white">
                    {isLoading ? 'LOADING...' : 'LOAD MORE'}
                </span>
            </button>
        </div>
      </div>
    </div>
  );
}
