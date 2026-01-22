'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, cn } from '@/lib/utils';
import {
  TrendingUp, TrendingDown, DollarSign, Calendar,
  ArrowUpRight, ArrowDownRight, Download, Filter
} from 'lucide-react';

interface RevenueItem {
  id: string;
  source: string;
  category: string;
  amount: number;
  date: string;
  status: 'confirmed' | 'pending';
}

const mockRevenue: RevenueItem[] = [
  { id: '1', source: '교육 수강료 - AI 영상제작 기초반', category: '교육', amount: 159000, date: '2026-01-21', status: 'confirmed' },
  { id: '2', source: '교육 수강료 - AI 영상제작 기초반', category: '교육', amount: 159000, date: '2026-01-21', status: 'confirmed' },
  { id: '3', source: '영상 제작 의뢰 - A사', category: '제작', amount: 500000, date: '2026-01-20', status: 'confirmed' },
  { id: '4', source: '프리미엄 멤버십', category: '구독', amount: 29000, date: '2026-01-20', status: 'pending' },
  { id: '5', source: '교육 수강료 - AI 퍼스널마케팅 심화반', category: '교육', amount: 259000, date: '2026-01-19', status: 'confirmed' },
  { id: '6', source: '영상 제작 의뢰 - B사', category: '제작', amount: 350000, date: '2026-01-18', status: 'confirmed' },
];

const stats = {
  thisMonth: 12500000,
  lastMonth: 10200000,
  growth: 22.5,
  pending: 1850000,
};

const categoryBreakdown = [
  { name: '교육', amount: 6500000, percentage: 52 },
  { name: '제작', amount: 4200000, percentage: 34 },
  { name: '구독', amount: 1100000, percentage: 9 },
  { name: '기타', amount: 700000, percentage: 5 },
];

export default function RevenuePage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-400" />
            매출
          </h1>
          <p className="text-gray-400 mt-1">매출 현황 및 분석</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-white/5 p-1">
            {(['week', 'month', 'year'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1 rounded text-sm transition-colors",
                  period === p ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {p === 'week' ? '주간' : p === 'month' ? '월간' : '연간'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            내보내기
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">이번 달 매출</p>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              +{stats.growth}%
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(stats.thisMonth)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">지난 달</p>
          <p className="text-3xl font-bold text-gray-300">{formatCurrency(stats.lastMonth)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">확정 대기</p>
          <p className="text-3xl font-bold text-yellow-400">{formatCurrency(stats.pending)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">성장률</p>
          <p className="text-3xl font-bold text-green-400">+{stats.growth}%</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">카테고리별 매출</h2>
          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{cat.name}</span>
                  <span className="text-white font-medium">{cat.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <m.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">{formatCurrency(cat.amount)}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Revenue List */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">최근 매출</h2>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <Filter className="w-4 h-4" />
              필터
            </button>
          </div>

          <div className="space-y-3">
            {mockRevenue.map((item, index) => (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{item.source}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-gray-400">{item.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">+{formatCurrency(item.amount)}</p>
                  <span className={cn(
                    "text-xs",
                    item.status === 'confirmed' ? "text-green-400" : "text-yellow-400"
                  )}>
                    {item.status === 'confirmed' ? '확정' : '대기'}
                  </span>
                </div>
              </m.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

