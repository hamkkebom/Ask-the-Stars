'use client';

import { m } from 'framer-motion';
import { Trophy, ArrowRight, Search, Calendar, Users, Star } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ContestsPage() {
  const contests = [
    {
      id: 1,
      title: '2026 AI 영상 공모전',
      organizer: '한깨봄',
      dday: 'D-12',
      prize: '총 상금 1,000만원',
      participants: 128,
      image: '/images/contest-1.jpg',
      status: 'ongoing'
    },
    {
      id: 2,
      title: '숏폼 크리에이터 챌린지',
      organizer: 'Ask the Stars',
      dday: 'D-5',
      prize: '제작비 지원',
      participants: 342,
      image: '/images/contest-2.jpg',
      status: 'ongoing'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-bold">진행 중인 공모전</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            당신의 재능을 <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-400 to-primary italic">Expertise</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            다양한 공모전에 도전하고 포트폴리오를 쌓아보세요.
            <br />
            수상작은 스튜디오 메인에 전시됩니다.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest, idx) => (
            <m.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-900 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video bg-neutral-800 relative">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                  <Trophy className="w-12 h-12" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-black rounded-full shadow-lg">
                  {contest.dday}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs text-primary font-bold mb-2 uppercase tracking-widest">{contest.organizer}</div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors text-white">{contest.title}</h3>

                <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {contest.prize}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {contest.participants}명 참여
                  </div>
                </div>

                <Link
                  href={`/studio/contests/${contest.id}`}
                  className="block w-full py-3 text-center bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors"
                >
                  자세히 보기
                </Link>
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-8 rounded-3xl bg-slate-900 border border-white/5 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">원하는 공모전이 없나요?</h2>
          <p className="text-neutral-400 mb-8">
            새로운 공모전 알림을 신청하고 가장 먼저 소식을 받아보세요.
          </p>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors">
            알림 신청하기
          </button>
        </m.div>
      </div>
    </div>
  );
}
