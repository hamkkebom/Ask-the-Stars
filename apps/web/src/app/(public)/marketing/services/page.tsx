'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  CheckCircle, Megaphone, TrendingUp, Target,
  BarChart3, Users, Zap, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'SNS 채널 운영',
    description: '인스타그램, 유튜브, 틱톡 등 다양한 플랫폼 통합 관리',
    features: ['콘텐츠 기획/제작', '게시 스케줄링', '댓글/DM 관리', '성장 전략'],
    price: '월 50만원~',
  },
  {
    icon: TrendingUp,
    title: '광고 대행',
    description: '네이버, 인스타, 유튜브 등 유료 광고 집행 대행',
    features: ['타겟 분석', '광고 소재 제작', '예산 최적화', '성과 리포트'],
    price: '광고비의 15%~',
  },
  {
    icon: Target,
    title: '브랜딩 패키지',
    description: '개인 브랜드 구축을 위한 토탈 솔루션',
    features: ['포지셔닝 전략', '비주얼 아이덴티티', '채널 최적화', '스토리텔링'],
    price: '300만원~',
  },
  {
    icon: BarChart3,
    title: '컨설팅',
    description: '마케팅 전략 수립 및 실행 코칭',
    features: ['현황 진단', '전략 수립', '실행 가이드', '월간 코칭'],
    price: '회당 30만원~',
  },
];

export default function MarketingServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">서비스 안내</h1>
          <p className="text-xl text-gray-400">
            상담사를 위한 맞춤형 마케팅 서비스
          </p>
        </m.div>

        {/* Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <m.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{service.title}</h2>
                    <p className="text-orange-400 font-medium">{service.price}</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
          <Link
            href="/marketing/request"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium text-lg hover:opacity-90 transition-opacity"
          >
            무료 상담 신청 <ArrowRight className="w-5 h-5" />
          </Link>
        </m.div>
      </div>
    </div>
  );
}

