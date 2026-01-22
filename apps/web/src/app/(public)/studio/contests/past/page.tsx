'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Trophy, Calendar, Users, Award } from 'lucide-react';

const pastContests = [
  {
    id: '1',
    title: '2025 연말 AI 영상 공모전',
    theme: '감사의 마음',
    endDate: '2025-12-31',
    participants: 312,
    winner: '김OO',
    prize: '200만원',
  },
  {
    id: '2',
    title: '할로윈 숏폼 공모전',
    theme: '공포의 밤',
    endDate: '2025-10-31',
    participants: 189,
    winner: '이OO',
    prize: '100만원',
  },
  {
    id: '3',
    title: '여름 휴가 영상 공모전',
    theme: '나만의 여행',
    endDate: '2025-08-31',
    participants: 256,
    winner: '박OO',
    prize: '150만원',
  },
];

export default function PastContestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gray-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">지난 공모전</h1>
          <p className="text-xl text-gray-400">
            과거 공모전 결과를 확인하세요
          </p>
        </m.div>

        {/* Past Contests */}
        <div className="space-y-6">
          {pastContests.map((contest, index) => (
            <m.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-500/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{contest.title}</h3>
                      <p className="text-sm text-gray-500">주제: {contest.theme}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {contest.endDate}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-4 h-4" />
                      {contest.participants}명
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">{contest.winner}</span>
                      <span className="text-yellow-400">({contest.prize})</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/studio/contests/ongoing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            진행 중인 공모전 보기
          </Link>
        </m.div>
      </div>
    </div>
  );
}

