'use client';

import { VibrantHero } from '@/components/sections/vibrant-hero';
import { AdvancedVideoGrid } from '@/components/sections/advanced-video-grid';
import { CategorySwimlane } from '@/components/sections/category-swimlane';

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* 1. Interactive Vibrant Hero */}
      <VibrantHero />

      {/* 2. Netflix-style Swimlanes */}
      <div className="relative z-10 -mt-20 md:-mt-32 pb-20 bg-linear-to-b from-transparent via-background to-background space-y-4 md:space-y-8 pl-4">
        <CategorySwimlane title="새로 올라온 영상" category="전체" />
        <CategorySwimlane title="인기 급상승 🔥" category="인기" />
        <CategorySwimlane title="신년운세" category="신년운세" />
        <CategorySwimlane title="당신의 고민을 해결해줄 타로" category="타로" />
        <CategorySwimlane title="속이 뻥 뚫리는 사주풀이" category="사주" />
      </div>

      {/* 3. Browse All (Hybrid Fallback) */}
      <section
        id="browse"
        className="container mx-auto px-4 pb-20 scroll-mt-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">모든 영상 찾아보기</h2>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>
        <AdvancedVideoGrid />
      </section>
    </main>
  );
}
