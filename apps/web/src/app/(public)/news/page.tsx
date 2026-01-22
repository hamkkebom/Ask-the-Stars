'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Newspaper, Calendar, ChevronRight, Search, Tag
} from 'lucide-react';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumbnail: string;
  featured?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    slug: 'ai-video-trend-2026',
    title: '2026년 AI 영상 제작 트렌드 전망',
    excerpt: 'AI 기술의 발전으로 영상 제작 시장이 어떻게 변화할지 전망합니다.',
    category: '트렌드',
    date: '2026-01-20',
    thumbnail: '🎬',
    featured: true,
  },
  {
    id: '2',
    slug: 'education-1st-session',
    title: '1기 교육 설명회 성황리 마감',
    excerpt: '500명 이상의 참여자와 함께한 1기 교육 설명회 현장을 소개합니다.',
    category: '교육',
    date: '2026-01-18',
    thumbnail: '🎓',
  },
  {
    id: '3',
    slug: 'freelancer-success-story',
    title: '프리랜서 성공 스토리: 월 500만원 수익 달성',
    excerpt: '함께봄 프리랜서로 활동 중인 김OO님의 성공 스토리를 들어봅니다.',
    category: '성공사례',
    date: '2026-01-15',
    thumbnail: '⭐',
  },
  {
    id: '4',
    slug: 'new-service-launch',
    title: 'AI 스튜디오 신규 서비스 런칭',
    excerpt: '더욱 빠르고 품질 높은 영상 제작을 위한 신규 서비스를 소개합니다.',
    category: '서비스',
    date: '2026-01-12',
    thumbnail: '🚀',
  },
  {
    id: '5',
    slug: 'partnership-announcement',
    title: '대형 마케팅 에이전시와 파트너십 체결',
    excerpt: '더 넓은 고객층에게 서비스를 제공하기 위한 전략적 파트너십을 발표합니다.',
    category: '파트너십',
    date: '2026-01-10',
    thumbnail: '🤝',
  },
];

const categories = ['전체', '트렌드', '교육', '성공사례', '서비스', '파트너십'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = newsItems.filter(item => {
    const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredNews = newsItems.find(n => n.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-4">
            <Newspaper className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">뉴스룸</h1>
          <p className="text-xl text-gray-400">함께봄의 최신 소식을 확인하세요</p>
        </m.div>

        {/* Featured */}
        {featuredNews && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Link href={`/news/${featuredNews.slug}`}>
              <GlassCard className="p-8 hover:bg-white/10 transition-colors group">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-8xl">
                    {featuredNews.thumbnail}
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                      {featuredNews.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-3 mb-2 group-hover:text-primary transition-colors">
                      {featuredNews.title}
                    </h2>
                    <p className="text-gray-400 mb-4">{featuredNews.excerpt}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </m.div>
        )}

        {/* Search & Filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
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
          </div>
        </m.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.filter(n => !n.featured).map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Link href={`/news/${item.slug}`}>
                <GlassCard className="p-6 h-full hover:bg-white/10 transition-colors group">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg mb-4 flex items-center justify-center text-5xl">
                    {item.thumbnail}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.excerpt}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                </GlassCard>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}

