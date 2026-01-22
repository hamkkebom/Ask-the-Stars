'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  ArrowRight, Check, HelpCircle, Zap
} from 'lucide-react';

const plans = [
  {
    name: '숏폼',
    description: '15-60초 짧은 영상',
    price: 80000,
    features: [
      '15-60초 영상',
      '기본 자막',
      '배경음악 1곡',
      '1회 수정',
      '3일 내 완성',
    ],
    popular: false,
  },
  {
    name: '표준',
    description: '1-3분 홍보/소개 영상',
    price: 150000,
    features: [
      '1-3분 영상',
      '고급 자막 & 효과',
      '배경음악 + 효과음',
      '3회 수정',
      '5일 내 완성',
      '썸네일 제공',
    ],
    popular: true,
  },
  {
    name: '프리미엄',
    description: '3-10분 전문 콘텐츠',
    price: 250000,
    features: [
      '3-10분 영상',
      '모든 고급 기능',
      '전문 나레이션',
      '무제한 수정',
      '7일 내 완성',
      '썸네일 + 숏폼 버전',
      '전담 매니저',
    ],
    popular: false,
  },
];

const addons = [
  { name: '나레이션 추가', price: 30000 },
  { name: '긴급 제작 (50% 단축)', price: 50000 },
  { name: '소스 파일 제공', price: 30000 },
  { name: '추가 수정 (1회)', price: 20000 },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">요금 안내</h1>
          <p className="text-xl text-gray-400">
            프로젝트에 맞는 플랜을 선택하세요
          </p>
        </m.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <m.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  인기
                </div>
              )}
              <GlassCard className={`p-8 h-full ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{plan.name}</h2>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-white">
                    ₩{plan.price.toLocaleString()}
                    <span className="text-lg text-gray-400">~</span>
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/studio/request"
                  className={`block w-full py-3 px-4 rounded-xl text-center font-medium transition-opacity ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  선택하기
                </Link>
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* Add-ons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">추가 옵션</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {addons.map((addon) => (
                <div key={addon.name} className="p-4 rounded-xl bg-white/5 text-center">
                  <p className="text-white font-medium mb-1">{addon.name}</p>
                  <p className="text-purple-400 font-bold">+₩{addon.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </m.div>

        {/* FAQ */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5" />
            요금에 대해 궁금한 점이 있으신가요?
          </p>
          <Link
            href="/help/faq"
            className="text-purple-400 hover:underline flex items-center justify-center gap-1"
          >
            자주 묻는 질문 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </m.div>
      </div>
    </div>
  );
}

