'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Clock, Eye, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// 카테고리 정보
const categories: Record<string, { name: string; description: string }> = {
  'brand': { name: '브랜드 영상', description: '기업 브랜드 아이덴티티를 담은 영상' },
  'product': { name: '제품 소개', description: '제품의 특징과 장점을 소개하는 영상' },
  'education': { name: '교육 콘텐츠', description: '정보 전달 및 교육 목적의 영상' },
  'event': { name: '이벤트', description: '행사 및 이벤트 기록 영상' },
  'sns': { name: 'SNS 콘텐츠', description: '소셜 미디어용 숏폼 영상' },
};

// Mock 영상 데이터
const mockVideos = [
  { id: '1', title: '브랜드 스토리 영상', thumbnail: '/placeholder-thumbnail.jpg', duration: 180, views: 1234 },
  { id: '2', title: '2024 제품 런칭 영상', thumbnail: '/placeholder-thumbnail.jpg', duration: 240, views: 567 },
  { id: '3', title: '회사 소개 영상', thumbnail: '/placeholder-thumbnail.jpg', duration: 120, views: 890 },
  { id: '4', title: '서비스 튜토리얼', thumbnail: '/placeholder-thumbnail.jpg', duration: 300, views: 456 },
  { id: '5', title: '고객 인터뷰', thumbnail: '/placeholder-thumbnail.jpg', duration: 150, views: 234 },
  { id: '6', title: '팀 소개 영상', thumbnail: '/placeholder-thumbnail.jpg', duration: 200, views: 345 },
];

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories[slug] || { name: slug, description: '' };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-primary/20 to-black">
        <div className="container mx-auto">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            전체 영상
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-gray-400 text-lg">{category.description}</p>
          <p className="text-gray-500 mt-4">{mockVideos.length}개 영상</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
              필터
            </button>
          </div>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-300 focus:outline-none">
            <option>최신순</option>
            <option>조회수순</option>
            <option>인기순</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.id}`}
              className="group"
            >
              <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-3">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <h3 className="font-medium text-white group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {video.views.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
