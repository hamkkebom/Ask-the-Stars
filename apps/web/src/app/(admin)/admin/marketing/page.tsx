'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Megaphone, TrendingUp, Users, Target, BarChart2,
  Calendar, CheckCircle, AlertCircle, PauseCircle, PlayCircle,
  DollarSign, Hash, PieChart, Settings
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'google';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 'c1',
    name: '신년 운세 프로모션',
    platform: 'instagram',
    status: 'active',
    budget: 5000000,
    spent: 2150000,
    impressions: 45000,
    clicks: 1200,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
  },
  {
    id: 'c2',
    name: '유튜브 프리롤 광고',
    platform: 'youtube',
    status: 'active',
    budget: 10000000,
    spent: 4500000,
    impressions: 89000,
    clicks: 3400,
    startDate: '2026-01-10',
    endDate: '2026-02-10',
  },
  {
    id: 'c3',
    name: '틱톡 숏폼 챌린지',
    platform: 'tiktok',
    status: 'paused',
    budget: 3000000,
    spent: 500000,
    impressions: 12000,
    clicks: 800,
    startDate: '2026-01-15',
    endDate: '2026-02-15',
  },
  {
    id: 'c4',
    name: '검색 키워드 광고',
    platform: 'google',
    status: 'completed',
    budget: 2000000,
    spent: 1980000,
    impressions: 25000,
    clicks: 950,
    startDate: '2025-12-01',
    endDate: '2025-12-31',
  },
];

const platformConfig = {
  instagram: { label: 'Instagram', color: 'text-pink-400 bg-pink-500/20' },
  youtube: { label: 'YouTube', color: 'text-red-400 bg-red-500/20' },
  tiktok: { label: 'TikTok', color: 'text-cyan-400 bg-cyan-500/20' },
  google: { label: 'Google', color: 'text-blue-400 bg-blue-500/20' },
};

const statusConfig = {
  active: { label: '진행 중', color: 'bg-green-500/20 text-green-400', icon: PlayCircle },
  paused: { label: '일시 중지', color: 'bg-yellow-500/20 text-yellow-400', icon: PauseCircle },
  completed: { label: '종료됨', color: 'bg-gray-500/20 text-gray-400', icon: CheckCircle },
  draft: { label: '초안', color: 'bg-white/10 text-gray-400', icon: AlertCircle },
};

export default function MarketingAdminPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return c.status === 'active';
    return c.status === 'completed';
  });

  const stats = {
    totalBudget: campaigns.reduce((acc, c) => acc + c.budget, 0),
    totalSpent: campaigns.reduce((acc, c) => acc + c.spent, 0),
    activeCount: campaigns.filter(c => c.status === 'active').length,
    totalImpressions: campaigns.reduce((acc, c) => acc + c.impressions, 0),
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-8 h-8 text-pink-400" />
            마케팅 관리
          </h1>
          <p className="text-gray-400 mt-1">캠페인 성과 및 예산 관리</p>
        </div>
        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Target className="w-4 h-4" />
          새 캠페인
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <PlayCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.activeCount}</p>
              <p className="text-sm text-gray-400">진행 중 캠페인</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalBudget.toLocaleString()}원</p>
              <p className="text-sm text-gray-400">총 예산</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalSpent.toLocaleString()}원</p>
              <p className="text-sm text-gray-400">집행 금액</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalImpressions.toLocaleString()}</p>
              <p className="text-sm text-gray-400">총 노출수</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        {[
          { key: 'all', label: '전체' },
          { key: 'active', label: '진행 중' },
          { key: 'completed', label: '종료됨' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedTab === tab.key
                ? "bg-pink-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-3">
        {filteredCampaigns.map((campaign, index) => {
          const StatusIcon = statusConfig[campaign.status].icon;
          const progress = (campaign.spent / campaign.budget) * 100;

          return (
            <m.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Platform Badge */}
                  <div className={cn("px-3 py-1 rounded-full text-xs font-bold w-fit", platformConfig[campaign.platform].color)}>
                    {platformConfig[campaign.platform].label}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white text-lg">{campaign.name}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1",
                        statusConfig[campaign.status].color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[campaign.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {campaign.startDate} ~ {campaign.endDate}</span>
                      <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> 클릭 {campaign.clicks.toLocaleString()}</span>
                    </p>
                  </div>

                  {/* Budget Progress */}
                  <div className="w-full md:w-64">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>집행률 {Math.round(progress)}%</span>
                      <span>{campaign.spent.toLocaleString()} / {campaign.budget.toLocaleString()}원</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <BarChart2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}

