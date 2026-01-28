'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { videosApi } from '@/lib/api/videos';
import CompactVideoCard, { VideoProps } from '@/components/ui/compact-video-card';
import { getThumbnailSrc } from '@/lib/utils/video-url';

interface CategorySwimlaneProps {
  title: string;
  category: string;
  viewAllLink?: string;
  count?: number; // Optional count to decide whether to show or not
}

export function CategorySwimlane({ title, category, viewAllLink }: CategorySwimlaneProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Fetch videos for this category
  const { data, isLoading } = useQuery({
    queryKey: ['videos', 'category', category],
    queryFn: () => videosApi.listVideosByCategory(category, 15),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const videos = data?.data || [];

  // Transform API data to VideoProps
  const videoItems: VideoProps[] = videos.map((v: any) => ({
      id: v.id,
      title: v.project?.title || v.versionLabel,
      thumbnailUrl: getThumbnailSrc(v.technicalSpec) || v.thumbnailUrl || "/placeholder.jpg",
      videoUrl: v.videoUrl || null,
      description: v.feedback,
      category: v.project?.category?.name || "기타",
      tags: [v.project?.counselor?.name || "일반"],
      counselor: { name: v.project?.counselor?.name || "상담사" },
      creator: { name: v.maker?.name || v.project?.owner?.name || "함께봄" },
      createdAt: new Date(v.createdAt).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\. /g, '/').replace('.', ''),
  }));



  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollMap = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Initial check
    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, [videos]);

  // Render Logic: If empty or too few items, render nothing (Netflix "Empty Shelf" rule)
  if (!isLoading && videoItems.length < 1) return null;


  return (
    <section className="py-8 relative group/section">
      {/* Header */}
      <div className="px-4 md:px-12 mb-4 flex items-end justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-white hover:text-vibrant-cyan transition-colors cursor-pointer flex items-center gap-2">
            {title}
             <span className="text-sm font-normal text-vibrant-cyan opacity-0 group-hover/section:opacity-100 transition-opacity flex items-center gap-1">
                모두 보기 <ChevronRight className="w-3 h-3" />
             </span>
        </h2>

        {/* Pagination Indicators (Optional) */}
        <div className="hidden md:flex gap-1">
             {/* Just for style, functional pagination is arrows */}
        </div>
      </div>

      {/* Swimlane Container */}
      <div className="relative group/lane">

        {/* Left Arrow */}
        <AnimatePresence>
            {showLeftArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollMap('left')}
                    className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/lane:opacity-100 transition-opacity hover:bg-black/70"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </motion.button>
            )}
        </AnimatePresence>

        {/* Scroll Area */}
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-8 pt-2 scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="min-w-[280px] md:min-w-[320px] aspect-video bg-white/5 animate-pulse rounded-lg" />
                ))
            ) : (
                videoItems.map((video) => (
                    <div key={video.id} className="min-w-[280px] md:min-w-[320px]">
                        <CompactVideoCard {...video} />
                    </div>
                ))
            )}

             {/* View All Card at the end */}
             {viewAllLink && (
                 <div className="min-w-[150px] flex items-center justify-center group/viewall">
                     <Link href={viewAllLink} className="flex flex-col items-center gap-3 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-vibrant-cyan transition-all group-hover/viewall:scale-110">
                        <div className="p-3 bg-vibrant-cyan/20 rounded-full">
                            <LayoutGrid className="w-6 h-6 text-vibrant-cyan" />
                        </div>
                        <span className="text-sm font-bold text-white whitespace-nowrap">전체 보기</span>
                     </Link>
                 </div>
             )}
        </div>

        {/* Right Arrow */}
         <AnimatePresence>
            {showRightArrow && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollMap('right')}
                    className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/lane:opacity-100 transition-opacity hover:bg-black/70"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </motion.button>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
}
