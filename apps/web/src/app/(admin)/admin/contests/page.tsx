'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Trophy, Users, FileCheck, Gift } from 'lucide-react';

export default function ContestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          AI 공모전
        </h1>
        <p className="text-gray-400 mt-1">AI 공모전과 참가자를 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Trophy className="w-6 h-6 text-yellow-400 mb-3" />
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-sm text-gray-400">진행 중 공모전</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Users className="w-6 h-6 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-sm text-gray-400">참가자</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <FileCheck className="w-6 h-6 text-green-400 mb-3" />
          <p className="text-2xl font-bold text-white">48</p>
          <p className="text-sm text-gray-400">제출 작품</p>
        </GlassCard>
      </div>

      <GlassCard className="p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-white mb-2">서비스 준비 중</h2>
        <p className="text-gray-400">AI 공모전 관리 기능이 곧 추가됩니다.</p>
      </GlassCard>
    </div>
  );
}
