'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Megaphone, Users, TrendingUp, FileText } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Megaphone className="w-8 h-8 text-orange-400" />
          마케팅 대행
        </h1>
        <p className="text-gray-400 mt-1">마케팅 캠페인과 대행 서비스를 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <FileText className="w-6 h-6 text-orange-400 mb-3" />
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-sm text-gray-400">진행 중 캠페인</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Users className="w-6 h-6 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-white">8</p>
          <p className="text-sm text-gray-400">파트너 업체</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <TrendingUp className="w-6 h-6 text-green-400 mb-3" />
          <p className="text-2xl font-bold text-white">₩45M</p>
          <p className="text-sm text-gray-400">이번달 매출</p>
        </GlassCard>
      </div>

      <GlassCard className="p-8 text-center">
        <Megaphone className="w-16 h-16 text-orange-400 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-white mb-2">서비스 준비 중</h2>
        <p className="text-gray-400">마케팅 대행 관리 기능이 곧 추가됩니다.</p>
      </GlassCard>
    </div>
  );
}
