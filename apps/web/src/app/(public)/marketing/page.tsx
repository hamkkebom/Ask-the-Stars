'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Megaphone, TrendingUp, Users, Target,
  ArrowRight, CheckCircle, BarChart3
} from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: '종합 마케팅',
    description: '상담사 SNS 채널 운영부터 광고 집행까지 통합 관리',
    features: ['채널 운영', '콘텐츠 기획', '광고 집행', '성과 리포트'],
  },
  {
    icon: TrendingUp,
    title: '광고 대행',
    description: '네이버, 인스타그램, 유튜브 등 다양한 플랫폼 광고',
    features: ['타겟 분석', '광고 제작', '성과 최적화', '예산 관리'],
  },
  {
    icon: Target,
    title: '브랜딩',
    description: '상담사 개인 브랜드 구축 및 포지셔닝 전략',
    features: ['브랜드 전략', '비주얼 디자인', '스토리텔링', '채널 최적화'],
  },
];

const stats = [
  { value: '500+', label: '관리 상담사' },
  { value: '200%', label: '평균 성장률' },
  { value: '5년+', label: '운영 경력' },
];

const cases = [
  { name: '김OO 상담사', result: '월 상담 건수 300% 증가', period: '3개월' },
  { name: '이OO 상담사', result: '인스타 팔로워 2만 달성', period: '6개월' },
  { name: '박OO 상담사', result: '유튜브 구독자 5만 돌파', period: '1년' },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              📢 AI 마케팅 대행
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              상담사를 위한<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                통합 마케팅 솔루션
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              500명+ 상담사의 성공적인 마케팅을<br />
              함께봄이 책임집니다
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/marketing/request"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                상담 신청하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/marketing/cases"
                className="px-8 py-4 rounded-xl bg-white/10 text-white font-medium text-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                성공 사례 보기
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
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

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">서비스 안내</h2>
            <p className="text-gray-400">상담사에게 필요한 모든 마케팅 서비스</p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-8 h-full hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-20 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">성공 사례</h2>
            <p className="text-gray-400">함께봄과 함께 성장한 상담사들</p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((item, index) => (
              <m.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl">
                    🔮
                  </div>
                  <p className="font-medium text-white mb-1">{item.name}</p>
                  <p className="text-orange-400 font-bold mb-2">{item.result}</p>
                  <p className="text-sm text-gray-500">{item.period} 만에 달성</p>
                </GlassCard>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              무료 마케팅 진단 받기
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              현재 마케팅 상황을 분석하고 맞춤 전략을 제안받으세요
            </p>
            <Link
              href="/marketing/request"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium text-lg hover:opacity-90 transition-opacity"
            >
              무료 진단 신청
              <ArrowRight className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

