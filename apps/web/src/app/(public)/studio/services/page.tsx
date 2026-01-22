'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  CheckCircle, Video, Zap, Shield, Users, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Video,
    title: '영상 제작',
    items: ['AI 영상 편집', '자막 자동화', '음성 합성', '모션 그래픽'],
  },
  {
    icon: Zap,
    title: '퀵 서비스',
    items: ['긴급 제작', '당일 완성', '숏폼 전문', '대량 제작'],
  },
  {
    icon: Shield,
    title: '품질 보증',
    items: ['무제한 수정', '만족 보장', '저작권 양도', '원본 제공'],
  },
  {
    icon: Users,
    title: '전담 관리',
    items: ['1:1 매니저', '실시간 소통', '진행 현황 공유', '피드백 반영'],
  },
];

export default function StudioServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">서비스 안내</h1>
          <p className="text-xl text-gray-400">
            함께봄 스튜디오가 제공하는 전문 서비스
          </p>
        </m.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <m.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{service.title}</h2>
                </div>
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* Process */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">진행 프로세스</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: '의뢰 접수', desc: '요청서 작성' },
                { step: 2, title: '견적 확정', desc: '상담 후 견적' },
                { step: 3, title: '제작 진행', desc: '피드백 반영' },
                { step: 4, title: '완료 납품', desc: '최종 전달' },
              ].map((item, i) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="absolute top-6 -right-3 w-6 h-6 text-gray-600 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </m.div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/studio/request"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg hover:opacity-90 transition-opacity"
          >
            지금 바로 의뢰하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </m.div>
      </div>
    </div>
  );
}
