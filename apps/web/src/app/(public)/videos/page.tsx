'use client';

import { VibrantHero } from '@/components/sections/vibrant-hero';
import { AdvancedVideoGrid } from '@/components/sections/advanced-video-grid';

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* 1. Interactive Vibrant Hero */}
      <VibrantHero />

      {/* 2. Advanced Filter Grid with Trays */}
      <AdvancedVideoGrid />

    </main>
  );
}
