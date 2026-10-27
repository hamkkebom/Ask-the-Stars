'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { videosApi } from '@/lib/api/videos';
import { getThumbnailSrc } from '@/lib/utils/video-url';
import { BRAND_NAME } from '@/components/layout/brand-logo';

export function VibrantHero() {
  const { data, isLoading } = useQuery({
    queryKey: ['videos', 'featured'],
    queryFn: () => videosApi.getFeaturedVideos(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const featuredVideos = data?.data || [];
  // Use the first video as the Hero, or a fallback
  const heroVideo = featuredVideos.length > 0 ? featuredVideos[0] : null;

  // 추천 영상이 없을 때는 특정 이벤트 대신 서비스 소개를 보여준다
  const fallbackHero = {
    id: null,
    title: BRAND_NAME,
    description:
      'AI 영상 제작 인재를 키우고, 연결하고, 함께 만드는 플랫폼입니다. 완성된 영상을 둘러보세요.',
    imageUrl: null,
    videoUrl: null,
  };

  const activeHero = heroVideo
    ? {
        id: heroVideo.id,
        title: heroVideo.project?.title || '추천 영상',
        description: heroVideo.feedback || '지금 바로 확인해보세요.',
        imageUrl:
          getThumbnailSrc(heroVideo.technicalSpec) ||
          heroVideo.thumbnailUrl ||
          '/placeholder.jpg',
        videoUrl: heroVideo.videoUrl,
      }
    : fallbackHero;

  if (isLoading) {
    return (
      <section className="relative w-full h-[85vh] bg-background animate-pulse">
        <div className="absolute inset-0 bg-card" />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-background overflow-hidden font-sans">
      {/* 1. Background Image/Video */}
      <div className="absolute inset-0 z-0" style={{ aspectRatio: '16/9' }}>
        {activeHero.imageUrl ? (
          <Image
            src={activeHero.imageUrl}
            alt={activeHero.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-1/3 -right-1/4 w-3/4 h-full bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/3 left-1/4 w-1/2 h-3/4 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        )}
        {/* Cinematic Gradient Overlay (Bottom to Top) */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* 2. Content Area */}
      <div className="absolute bottom-0 left-0 z-10 w-full pl-4 md:pl-16 pb-20 md:pb-32 flex flex-col items-start gap-6">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white max-w-4xl tracking-tight leading-[1.1] drop-shadow-2xl"
        >
          {activeHero.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-md line-clamp-3"
        >
          {activeHero.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 mt-4"
        >
          {/* Play Button */}
          <Link
            href={activeHero.id ? `/videos/${activeHero.id}` : '#browse'}
            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-white/90 text-black rounded-md transition-all font-bold text-lg md:text-xl shadow-lg hover:scale-105 active:scale-95"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 fill-black" />
            {activeHero.id ? '재생' : '영상 둘러보기'}
          </Link>

          {/* More Info Button */}
          <Link
            href={activeHero.id ? `/videos/${activeHero.id}` : '/about'}
            aria-label={
              activeHero.id ? `${activeHero.title} 상세 정보 보기` : undefined
            }
            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gray-500/70 hover:bg-gray-500/50 text-white rounded-md transition-all font-bold text-lg md:text-xl backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
          >
            <Info className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            {activeHero.id ? '상세 정보' : '서비스 소개'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
