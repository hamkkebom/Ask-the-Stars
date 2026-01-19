'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

export default function EducationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-blue-400" />
          AI 교육
        </h1>
        <p className="text-gray-400 mt-1">AI 교육 과정과 수강생을 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <BookOpen className="w-6 h-6 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-white">15</p>
          <p className="text-sm text-gray-400">개설 과정</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Users className="w-6 h-6 text-green-400 mb-3" />
          <p className="text-2xl font-bold text-white">248</p>
          <p className="text-sm text-gray-400">수강생</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <Award className="w-6 h-6 text-yellow-400 mb-3" />
          <p className="text-2xl font-bold text-white">89</p>
          <p className="text-sm text-gray-400">수료증 발급</p>
        </GlassCard>
      </div>

      <GlassCard className="p-8 text-center">
        <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-white mb-2">서비스 준비 중</h2>
        <p className="text-gray-400">AI 교육 관리 기능이 곧 추가됩니다.</p>
      </GlassCard>
    </div>
  );
}
