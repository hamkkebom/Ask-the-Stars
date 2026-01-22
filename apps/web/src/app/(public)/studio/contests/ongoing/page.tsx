'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Trophy, Clock, Users, ArrowRight, Play, Calendar
} from 'lucide-react';

const ongoingContests = [
  {
    id: '1',
    title: '2026 신년 AI 영상 공모전',
    theme: '새해 소망',
    deadline: '2026-02-15',
    prize: '총 500만원',
    participants: 234,
    daysLeft: 25,
  },
  {
    id: '2',
    title: '타로 콘텐츠 공모전',
    theme: '운세의 재발견',
    deadline: '2026-03-01',
    prize: '총 300만원',
    participants: 156,
    daysLeft: 39,
  },
];

export default function OngoingContestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-yellow-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/20 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">진행 중인 공모전</h1>
          <p className="text-xl text-gray-400">
            지금 참여 가능한 공모전에 도전하세요
          </p>
        </m.div>

        {/* Contests */}
        <div className="grid md:grid-cols-2 gap-8">
          {ongoingContests.map((contest, index) => (
            <m.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full hover:bg-white/10 transition-colors group">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    진행중
                  </span>
                  <span className="text-yellow-400 font-bold">{contest.prize}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {contest.title}
                </h2>
                <p className="text-gray-400 mb-6">주제: {contest.theme}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <Clock className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{contest.daysLeft}일</p>
                    <p className="text-xs text-gray-500">남음</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white font-bold">{contest.participants}</p>
                    <p className="text-xs text-gray-500">참가자</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-white font-bold text-sm">{contest.deadline}</p>
                    <p className="text-xs text-gray-500">마감</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/contests/${contest.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  참가 신청
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* Info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <GlassCard className="p-6 text-center">
            <p className="text-gray-400">
              공모전에 대한 문의는 <a href="mailto:contest@hamkkebom.com" className="text-primary hover:underline">contest@hamkkebom.com</a>으로 연락해주세요
            </p>
          </GlassCard>
        </m.div>
      </div>
    </div>
  );
}

