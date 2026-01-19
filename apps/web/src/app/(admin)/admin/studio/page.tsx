'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Rocket, Video, Sparkles, TrendingUp } from 'lucide-react';

export default function StudioPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Rocket className="w-8 h-8 text-purple-400" />
          AI 스튜디오
        </h1>
        <p className="text-gray-400 mt-1">AI 기반 영상 제작 서비스를 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Video className="w-6 h-6 text-purple-400 mb-3" />
          <p className="text-2xl font-bold text-white">48</p>
          <p className="text-sm text-gray-400">제작 중 영상</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Sparkles className="w-6 h-6 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-sm text-gray-400">AI 생성 콘텐츠</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <TrendingUp className="w-6 h-6 text-green-400 mb-3" />
          <p className="text-2xl font-bold text-white">+32%</p>
          <p className="text-sm text-gray-400">이용량 증가</p>
        </GlassCard>
      </div>

      <GlassCard className="p-8 text-center">
        <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-white mb-2">서비스 준비 중</h2>
        <p className="text-gray-400">AI 스튜디오 관리 기능이 곧 추가됩니다.</p>
      </GlassCard>
    </div>
  );
}
