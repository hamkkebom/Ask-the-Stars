'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VerticalPosterCard, PosterProps } from '@/components/ui/vertical-poster-card';

// Mock Data
const MOCK_DATA: Record<string, PosterProps[]> = {
  Story: [
    { id: '1', title: 'The Silence of Space', imageUrl: '', category: 'Sci-Fi', year: '2025', isNew: true, platform: 'VoDA', color: '#00F0FF' },
    { id: '2', title: 'Last Summer', imageUrl: '', category: 'Drama', year: '2024', color: '#FF3D71' },
    { id: '3', title: 'Cyberpunk Seoul', imageUrl: '', category: 'Documentary', year: '2026', isNew: true, platform: 'Exclusive', color: '#39FF14' },
    { id: '4', title: 'Mountain Echo', imageUrl: '', category: 'Nature', year: '2023', color: '#FFAA00' },
  ],
  Music: [
    { id: '5', title: 'Midnight Jazz', imageUrl: '', category: 'Live', year: '2025', isNew: true, color: '#FF0050' },
    { id: '6', title: 'K-Indie Vibes', imageUrl: '', category: 'Concert', year: '2025', color: '#00C050' },
    { id: '7', title: 'Symphony No.9', imageUrl: '', category: 'Classical', year: '2024', color: '#0080FF' },
  ],
  Tech: [
    { id: '8', title: 'AI Revolution', imageUrl: '', category: 'Tech', year: '2026', isNew: true, platform: 'Doc', color: '#00F0FF' },
    { id: '9', title: 'Future Cities', imageUrl: '', category: 'Architecture', year: '2025', color: '#39FF14' },
  ]
};

const TABS = ['Story', 'Music', 'Tech'];

export function TabbedPosterSection() {
  const [activeTab, setActiveTab] = useState('Story');

  return (
    <section className="py-20 px-6 md:px-12 w-full max-w-[1800px] mx-auto">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <h2 className="text-3xl font-black text-white tracking-tight">
          POPULAR ON <span className="text-vibrant-cyan">VoDA</span>
        </h2>

        {/* Floating Pills Tab */}
        <div className="flex bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors z-10",
                activeTab === tab ? "text-black" : "text-white/60 hover:text-white"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {MOCK_DATA[activeTab].map((item) => (
              <VerticalPosterCard key={item.id} {...item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
