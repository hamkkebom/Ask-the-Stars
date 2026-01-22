'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn, formatCurrency } from '@/lib/utils';
import {
  Trophy, Users, FileCheck, Gift, Plus, Calendar,
  Eye, Award, Clock, TrendingUp, Settings, ChevronRight
} from 'lucide-react';

interface Contest {
  id: string;
  title: string;
  description: string;
  reward: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'scheduled' | 'active' | 'ended';
  participants: number;
  submissions: number;
  views: number;
}

const mockContests: Contest[] = [
  {
    id: 'c1',
    title: '2026 신년 운세 영상 공모전',
    description: '창의적인 신년 운세 영상을 제작해주세요',
    reward: 50000000,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    status: 'active',
    participants: 1240,
    submissions: 156,
    views: 45000,
  },
  {
    id: 'c2',
    title: '타로 카드 리딩 쇼츠 챌린지',
    description: '60초 이내 타로 리딩 쇼츠 영상 공모',
    reward: 10000000,
    startDate: '2026-01-15',
    endDate: '2026-01-25',
    status: 'active',
    participants: 850,
    submissions: 98,
    views: 32000,
  },
  {
    id: 'c3',
    title: '풍수지리 인테리어 꿀팁 영상',
    description: '풍수 기반 인테리어 팁 영상 모집',
    reward: 5000000,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'scheduled',
    participants: 0,
    submissions: 0,
    views: 1200,
  },
  {
    id: 'c4',
    title: '2025 하반기 대박 운세 공모전',
    description: '2025년 하반기 운세 영상 공모',
    reward: 30000000,
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    status: 'ended',
    participants: 2100,
    submissions: 320,
    views: 89000,
  },
];

const statusConfig = {
  draft: { label: '초안', color: 'bg-gray-500/20 text-gray-400' },
  scheduled: { label: '예정', color: 'bg-blue-500/20 text-blue-400' },
  active: { label: '진행 중', color: 'bg-green-500/20 text-green-400' },
  ended: { label: '종료', color: 'bg-purple-500/20 text-purple-400' },
};

export default function ContestsPage() {
  const [contests] = useState<Contest[]>(mockContests);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'ended'>('all');

  const filteredContests = contests.filter(c => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return c.status === 'active' || c.status === 'scheduled';
    return c.status === 'ended';
  });

  const stats = {
    active: contests.filter(c => c.status === 'active').length,
    totalParticipants: contests.reduce((sum, c) => sum + c.participants, 0),
    totalSubmissions: contests.reduce((sum, c) => sum + c.submissions, 0),
    totalReward: contests.filter(c => c.status === 'active').reduce((sum, c) => sum + c.reward, 0),
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            공모전 관리
          </h1>
          <p className="text-gray-400 mt-1">공모전을 생성하고 참가자를 관리합니다</p>
        </div>
        <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          새 공모전
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
              <p className="text-sm text-gray-400">진행 중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</p>
              <p className="text-sm text-gray-400">총 참가자</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <FileCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalSubmissions}</p>
              <p className="text-sm text-gray-400">제출 작품</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Gift className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalReward)}</p>
              <p className="text-sm text-gray-400">진행중 상금</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        {[
          { key: 'all', label: '전체' },
          { key: 'active', label: '진행/예정' },
          { key: 'ended', label: '종료' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedTab === tab.key
                ? "bg-yellow-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contest List */}
      <div className="space-y-4">
        {filteredContests.map((contest, index) => (
          <m.div
            key={contest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="p-6 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      statusConfig[contest.status].color
                    )}>
                      {statusConfig[contest.status].label}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {contest.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">{contest.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </div>

              <div className="grid grid-cols-5 gap-4 py-4 border-t border-white/10">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                    <Gift className="w-3 h-3" />
                    상금
                  </div>
                  <p className="font-bold text-yellow-400">{formatCurrency(contest.reward)}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                    <Calendar className="w-3 h-3" />
                    기간
                  </div>
                  <p className="text-white text-sm">
                    {contest.startDate} ~ {contest.endDate}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                    <Users className="w-3 h-3" />
                    참가자
                  </div>
                  <p className="font-bold text-white">{contest.participants.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                    <FileCheck className="w-3 h-3" />
                    제출
                  </div>
                  <p className="font-bold text-white">{contest.submissions}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mb-1">
                    <Eye className="w-3 h-3" />
                    조회
                  </div>
                  <p className="font-bold text-white">{contest.views.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button className="px-3 py-1.5 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors">
                  참가자 보기
                </button>
                <button className="px-3 py-1.5 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors">
                  작품 심사
                </button>
                <button className="px-3 py-1.5 bg-white/10 text-white rounded text-sm hover:bg-white/20 transition-colors flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  설정
                </button>
                {contest.status === 'active' && (
                  <button className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded text-sm hover:bg-yellow-500/30 transition-colors ml-auto">
                    수상자 선정
                  </button>
                )}
              </div>
            </GlassCard>
          </m.div>
        ))}
      </div>
    </div>
  );
}

