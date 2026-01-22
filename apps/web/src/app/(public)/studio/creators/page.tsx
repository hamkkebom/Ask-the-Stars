'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Star, Award, Video, User, ArrowRight, Filter
} from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  projects: number;
  avatar: string;
  badge?: string;
}

const creators: Creator[] = [
  { id: '1', name: '김편집', specialty: ['숏폼', '유튜브'], rating: 4.9, projects: 125, avatar: '👨‍🎨', badge: 'TOP' },
  { id: '2', name: '이영상', specialty: ['홍보', '교육'], rating: 4.8, projects: 98, avatar: '👩‍🎨', badge: 'TOP' },
  { id: '3', name: '박크리', specialty: ['타로', '운세'], rating: 4.9, projects: 156, avatar: '🧙‍♂️' },
  { id: '4', name: '최프로', specialty: ['광고', '마케팅'], rating: 4.7, projects: 87, avatar: '👨‍💼' },
  { id: '5', name: '정디자인', specialty: ['모션', '인포그래픽'], rating: 4.8, projects: 112, avatar: '👩‍💻' },
  { id: '6', name: '한영상', specialty: ['브이로그', '리뷰'], rating: 4.6, projects: 65, avatar: '🎬' },
  { id: '7', name: '오에디터', specialty: ['예능', '인터뷰'], rating: 4.9, projects: 143, avatar: '🎭' },
  { id: '8', name: '윤콘텐츠', specialty: ['부동산', '금융'], rating: 4.7, projects: 78, avatar: '📊' },
];

const specialties = ['전체', '숏폼', '유튜브', '홍보', '교육', '타로', '광고', '마케팅', '모션'];

export default function CreatorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('전체');

  const filteredCreators = creators.filter(c =>
    selectedSpecialty === '전체' || c.specialty.includes(selectedSpecialty)
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
          <h1 className="text-4xl font-bold text-white mb-4">AI 크리에이터</h1>
          <p className="text-xl text-gray-400">
            150명+ 전문 크리에이터가 함께합니다
          </p>
        </m.div>

        {/* Filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedSpecialty === specialty
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {specialty}
            </button>
          ))}
        </m.div>

        {/* Creator Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCreators.map((creator, index) => (
            <m.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassCard className="p-6 text-center hover:bg-white/10 transition-colors group relative">
                {creator.badge && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                    {creator.badge}
                  </span>
                )}

                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                  {creator.avatar}
                </div>

                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {creator.name}
                </h3>

                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{creator.rating}</span>
                  <span className="text-gray-500 text-sm">({creator.projects})</span>
                </div>

                <div className="flex flex-wrap gap-1 justify-center">
                  {creator.specialty.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-xs">
                      {spec}
                    </span>
                  ))}
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
          <p className="text-gray-400 mb-4">원하는 크리에이터를 못 찾으셨나요?</p>
          <Link
            href="/studio/request"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            맞춤 매칭 요청 <ArrowRight className="w-4 h-4" />
          </Link>
        </m.div>
      </div>
    </div>
  );
}

