'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  FileVideo, Clock, CheckCircle, Eye, ArrowLeft
} from 'lucide-react';

interface Entry {
  id: string;
  title: string;
  contest: string;
  submittedAt: string;
  status: 'submitted' | 'reviewing' | 'awarded' | 'not_selected';
  award?: string;
}

const entries: Entry[] = [
  { id: '1', title: '신년 타로 영상', contest: '2026 신년 AI 영상 공모전', submittedAt: '2026-01-20', status: 'reviewing' },
  { id: '2', title: '운세 알림 숏폼', contest: '2026 신년 AI 영상 공모전', submittedAt: '2026-01-18', status: 'submitted' },
  { id: '3', title: '연말 감사 영상', contest: '2025 연말 AI 영상 공모전', submittedAt: '2025-12-20', status: 'awarded', award: '우수상' },
];

const statusConfig = {
  submitted: { label: '제출완료', color: 'bg-blue-500/20 text-blue-400' },
  reviewing: { label: '심사중', color: 'bg-yellow-500/20 text-yellow-400' },
  awarded: { label: '수상', color: 'bg-green-500/20 text-green-400' },
  not_selected: { label: '미선정', color: 'bg-gray-500/20 text-gray-400' },
};

export default function MyEntriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/contests"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          공모전으로 돌아가기
        </Link>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FileVideo className="w-8 h-8 text-purple-400" />
            내 출품작
          </h1>
          <p className="text-gray-400 mt-1">출품한 작품과 심사 현황을 확인하세요</p>
        </m.div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-3 gap-4 mb-8">
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-sm text-gray-400">총 출품</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">2</p>
              <p className="text-sm text-gray-400">심사중</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">1</p>
              <p className="text-sm text-gray-400">수상</p>
            </GlassCard>
          </div>
        </m.div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry, index) => {
            const config = statusConfig[entry.status];
            return (
              <m.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-6 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <FileVideo className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{entry.title}</h3>
                        <p className="text-sm text-gray-500">{entry.contest}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {entry.submittedAt} 제출
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {entry.award && (
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                          🏆 {entry.award}
                        </span>
                      )}
                      <span className={cn("px-3 py-1 rounded-full text-sm font-medium", config.color)}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </m.div>
            );
          })}
        </div>

        {entries.length === 0 && (
          <GlassCard className="p-12 text-center">
            <FileVideo className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">아직 출품한 작품이 없습니다</p>
            <Link href="/studio/contests/ongoing" className="text-purple-400 hover:underline">
              공모전 참가하기
            </Link>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

