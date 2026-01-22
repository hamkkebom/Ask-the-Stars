'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, TrendingUp, Quote } from 'lucide-react';

const cases = [
  {
    id: '1',
    name: '김타로 상담사',
    category: 'SNS 운영 + 광고',
    period: '6개월',
    before: { followers: 500, monthly: 50 },
    after: { followers: 25000, monthly: 300 },
    quote: '함께봄과 함께한 후 상담 예약이 폭발적으로 증가했어요. 이제 예약 대기만 한 달입니다.',
    tags: ['인스타그램', '리브랜딩', '광고 최적화'],
  },
  {
    id: '2',
    name: '이운세 상담사',
    category: '유튜브 마케팅',
    period: '1년',
    before: { followers: 1000, monthly: 80 },
    after: { followers: 52000, monthly: 450 },
    quote: '유튜브 채널이 성장하면서 전국에서 상담 문의가 오고 있습니다. 꿈만 같아요.',
    tags: ['유튜브', '콘텐츠 기획', '브랜딩'],
  },
  {
    id: '3',
    name: '박사주 상담사',
    category: '통합 마케팅',
    period: '8개월',
    before: { followers: 2000, monthly: 100 },
    after: { followers: 18000, monthly: 280 },
    quote: '체계적인 마케팅 덕분에 안정적인 수입을 올리게 되었습니다. 강력 추천합니다!',
    tags: ['통합 관리', '퍼널 구축', 'CRM'],
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">성공 사례</h1>
          <p className="text-xl text-gray-400">
            함께봄과 함께 성장한 상담사들의 이야기
          </p>
        </m.div>

        {/* Cases */}
        <div className="space-y-8 mb-16">
          {cases.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Profile */}
                  <div>
                    <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-4xl">
                      🔮
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{item.name}</h2>
                    <p className="text-orange-400 font-medium mb-2">{item.category}</p>
                    <p className="text-sm text-gray-500">{item.period} 진행</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 text-center">
                        <p className="text-sm text-gray-400 mb-1">팔로워</p>
                        <p className="text-gray-500 line-through text-sm">{item.before.followers.toLocaleString()}</p>
                        <p className="text-2xl font-bold text-green-400">{item.after.followers.toLocaleString()}</p>
                        <p className="text-xs text-green-400 flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{Math.round((item.after.followers - item.before.followers) / item.before.followers * 100)}%
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 text-center">
                        <p className="text-sm text-gray-400 mb-1">월 상담</p>
                        <p className="text-gray-500 line-through text-sm">{item.before.monthly}건</p>
                        <p className="text-2xl font-bold text-green-400">{item.after.monthly}건</p>
                        <p className="text-xs text-green-400 flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{Math.round((item.after.monthly - item.before.monthly) / item.before.monthly * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex items-center">
                    <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <Quote className="w-6 h-6 text-orange-400 mb-2" />
                      <p className="text-gray-300 italic">{item.quote}</p>
                    </div>
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
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <GlassCard className="p-8 inline-block">
            <p className="text-white font-medium mb-4">다음 성공 사례의 주인공이 되세요</p>
            <Link
              href="/marketing/request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              무료 상담 신청 <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </m.div>
      </div>
    </div>
  );
}

