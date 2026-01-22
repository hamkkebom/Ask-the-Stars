'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import { Play, Eye, Heart, Filter, ArrowRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  views: number;
  likes: number;
  duration: string;
  creator: string;
}

const portfolioItems: PortfolioItem[] = [
  { id: '1', title: '신년운세 타로 영상', category: '타로', thumbnail: '🔮', views: 12500, likes: 890, duration: '2:30', creator: '박크리' },
  { id: '2', title: 'AI 코스메틱 광고', category: '광고', thumbnail: '💄', views: 8900, likes: 567, duration: '0:45', creator: '최프로' },
  { id: '3', title: '스타트업 소개 영상', category: '홍보', thumbnail: '🚀', views: 15600, likes: 1200, duration: '3:00', creator: '이영상' },
  { id: '4', title: '온라인 강의 프로모 숏폼', category: '숏폼', thumbnail: '📚', views: 25000, likes: 2100, duration: '0:30', creator: '김편집' },
  { id: '5', title: '금융 상품 설명 영상', category: '금융', thumbnail: '💰', views: 6700, likes: 430, duration: '4:15', creator: '윤콘텐츠' },
  { id: '6', title: '맛집 리뷰 브이로그', category: '리뷰', thumbnail: '🍜', views: 18000, likes: 1560, duration: '5:00', creator: '한영상' },
  { id: '7', title: '데이터 시각화 인포그래픽', category: '인포그래픽', thumbnail: '📊', views: 9200, likes: 670, duration: '1:45', creator: '정디자인' },
  { id: '8', title: '예능 하이라이트', category: '예능', thumbnail: '🎭', views: 32000, likes: 2800, duration: '2:00', creator: '오에디터' },
];

const categories = ['전체', '타로', '광고', '홍보', '숏폼', '금융', '리뷰', '인포그래픽', '예능'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredItems = portfolioItems.filter(item =>
    selectedCategory === '전체' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">작품 갤러리</h1>
          <p className="text-xl text-gray-400">
            크리에이터들의 최신 작품을 확인하세요
          </p>
        </m.div>

        {/* Filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </m.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassCard className="overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-6xl relative">
                  {item.thumbnail}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-xs">
                    {item.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.creator}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {(item.views / 1000).toFixed(1)}K
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" /> {item.likes}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/studio/request"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            나만의 영상 제작 요청 <ArrowRight className="w-4 h-4" />
          </Link>
        </m.div>
      </div>
    </div>
  );
}

