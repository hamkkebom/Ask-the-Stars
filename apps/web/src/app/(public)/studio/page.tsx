'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Video, Users, Award, ArrowRight, Sparkles,
  Play, Star, Zap, CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI 크리에이터',
    description: '150명+ 전문 영상 제작자가 함께합니다',
    color: 'text-purple-400',
  },
  {
    icon: Zap,
    title: '빠른 제작',
    description: '평균 3-5일 내 고품질 영상 제작',
    color: 'text-yellow-400',
  },
  {
    icon: Award,
    title: '품질 보증',
    description: '만족할 때까지 무제한 수정',
    color: 'text-green-400',
  },
];

const services = [
  { name: '숏폼 영상', price: '8만원~', duration: '1-2일' },
  { name: '홍보 영상', price: '15만원~', duration: '3-5일' },
  { name: '교육 콘텐츠', price: '20만원~', duration: '5-7일' },
  { name: '유튜브 영상', price: '25만원~', duration: '5-7일' },
];

const stats = [
  { value: '150+', label: 'AI 크리에이터' },
  { value: '2,500+', label: '완성 영상' },
  { value: '4.9', label: '평균 평점' },
  { value: '98%', label: '만족도' },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              🎬 AI 영상제작 스튜디오
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI로 만드는<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                고품질 영상
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              전문 AI 크리에이터들이 당신의 아이디어를<br />
              완벽한 영상으로 만들어드립니다
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/studio/request"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                제작 의뢰하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/studio/portfolio"
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-medium text-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                포트폴리오 보기
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">왜 함께봄 스튜디오인가?</h2>
            <p className="text-gray-400">AI 기술과 전문가의 결합으로 최상의 결과물을 제공합니다</p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <m.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-8 h-full text-center hover:bg-white/10 transition-colors">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassCard>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">서비스 안내</h2>
            <p className="text-gray-400">다양한 영상 유형에 맞는 서비스를 제공합니다</p>
          </m.div>

          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <m.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-6 text-center hover:bg-white/10 transition-colors group cursor-pointer">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-2xl font-bold text-purple-400 mb-2">{service.price}</p>
                  <p className="text-sm text-gray-500">약 {service.duration}</p>
                </GlassCard>
              </m.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/studio/pricing"
              className="text-purple-400 hover:underline flex items-center justify-center gap-1"
            >
              자세한 요금 안내 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              무료 상담을 통해 프로젝트에 맞는 최적의 솔루션을 제안받으세요
            </p>
            <Link
              href="/studio/request"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg hover:opacity-90 transition-opacity"
            >
              무료 상담 신청
              <ArrowRight className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

