'use client';

import { m } from 'framer-motion';
import { Trophy, ArrowRight, Search, Calendar, Users, Star } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/lib/utils';

export default function ContestsPage() {
  const contests = [
    {
      id: 1,
      title: "2026 신년 운세 영상 공모전",
      reward: "총 상금 5,000만원",
      deadline: "D-12",
      badge: "인기",
      color: "from-cyan-400 to-blue-500",
      participants: 1240
    },
    {
      id: 2,
      title: "타로 카드 리딩 쇼츠 챌린지",
      reward: "건당 50만원 + 활동비",
      deadline: "D-5",
      badge: "마감임박",
      color: "from-blue-400 to-indigo-500",
      participants: 850
    },
    {
      id: 3,
      title: "풍수지리 인테리어 꿀팁 영상",
      reward: "영상 제작비 전액 지원",
      deadline: "상시모집",
      badge: "NEW",
      color: "from-cyan-300 to-teal-400",
      participants: 230
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-vibrant-cyan/30 pt-20">

      {/* Background Ambient */}
      <div className="fixed top-0 inset-x-0 h-[800px] bg-vibrant-cyan/5 rounded-[100%] blur-[120px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibrant-cyan/10 border border-vibrant-cyan/20 text-vibrant-cyan mb-8"
          >
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">CREATOR CHALLENGE</span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight px-4"
          >
            당신의 재능이<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-cyan via-white to-vibrant-cyan animate-clip-text">
              별이 되는 순간
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            총 상금 1억원의 주인공은 바로 당신입니다.<br />
            지금 진행 중인 공모전에 도전하고 크리에이터로서의 첫 걸음을 시작하세요.
          </m.p>
        </div>
      </section>

      {/* Contest Grid */}
      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="w-1 h-8 bg-vibrant-cyan rounded-full"/>
                    진행 중인 공모전
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <Search className="w-5 h-5 text-neutral-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.length > 0 ? (
                    contests.map((contest, i) => (
                    <m.div
                        key={contest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="group relative bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-vibrant-cyan/50 transition-colors"
                    >
                        <div className={`h-2 bg-gradient-to-r ${contest.color}`} />
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-vibrant-cyan">
                                    {contest.badge}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-neutral-500">
                                    <Users className="w-3 h-3" /> {contest.participants}명 참여
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 leading-snug group-hover:text-vibrant-cyan transition-colors">
                                {contest.title}
                            </h3>
                            <p className="text-neutral-400 font-medium mb-8">
                                {contest.reward}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>{contest.deadline}</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </m.div>
                ))
                ) : (
                    <div className="col-span-full">
                        <EmptyState
                            icon={Trophy}
                            title="진행 중인 공모전이 없습니다"
                            description="새로운 공모전이 곧 열릴 예정입니다. 조금만 기다려주세요!"
                        />
                    </div>
                )}
            </div>
        </div>
      </section>

    </div>
  );
}
