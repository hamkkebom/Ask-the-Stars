'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, cn } from '@/lib/utils';
import {
  CreditCard, Clock, CheckCircle, AlertCircle,
  Download, Filter, User, Calendar
} from 'lucide-react';

interface Payout {
  id: string;
  recipient: string;
  role: 'freelancer' | 'counselor';
  amount: number;
  period: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  dueDate: string;
}

const mockPayouts: Payout[] = [
  { id: '1', recipient: '홍길동', role: 'freelancer', amount: 350000, period: '1월 2주차', status: 'pending', dueDate: '2026-01-25' },
  { id: '2', recipient: '김영희', role: 'freelancer', amount: 280000, period: '1월 2주차', status: 'pending', dueDate: '2026-01-25' },
  { id: '3', recipient: '이철수', role: 'freelancer', amount: 420000, period: '1월 2주차', status: 'processing', dueDate: '2026-01-25' },
  { id: '4', recipient: '박민수', role: 'counselor', amount: 150000, period: '1월 2주차', status: 'completed', dueDate: '2026-01-20' },
  { id: '5', recipient: '최수아', role: 'freelancer', amount: 180000, period: '1월 1주차', status: 'completed', dueDate: '2026-01-10' },
  { id: '6', recipient: '정다은', role: 'freelancer', amount: 520000, period: '1월 1주차', status: 'completed', dueDate: '2026-01-10' },
];

const stats = {
  pending: 1050000,
  processing: 420000,
  completed: 8500000,
  failed: 0,
};

const statusConfig = {
  pending: { label: '대기', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: Clock },
  processing: { label: '처리중', color: 'text-blue-400', bg: 'bg-blue-500/20', icon: CreditCard },
  completed: { label: '완료', color: 'text-green-400', bg: 'bg-green-500/20', icon: CheckCircle },
  failed: { label: '실패', color: 'text-red-400', bg: 'bg-red-500/20', icon: AlertCircle },
};

export default function PayoutsPage() {
  const [filter, setFilter] = useState<Payout['status'] | 'all'>('all');

  const filteredPayouts = mockPayouts.filter(p =>
    filter === 'all' || p.status === filter
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-blue-400" />
            지급 관리
          </h1>
          <p className="text-gray-400 mt-1">프리랜서 및 상담사 정산 관리</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">
          일괄 처리
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => {
          const config = statusConfig[key as keyof typeof statusConfig];
          const Icon = config.icon;
          return (
            <GlassCard key={key} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-400">{config.label}</p>
                <div className={cn("p-2 rounded-lg", config.bg)}>
                  <Icon className={cn("w-4 h-4", config.color)} />
                </div>
              </div>
              <p className={cn("text-2xl font-bold", config.color)}>{formatCurrency(value)}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === 'all' ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            전체
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilter(key as Payout['status'])}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                filter === key ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {config.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>

      {/* Payouts List */}
      <GlassCard className="p-6">
        <div className="space-y-3">
          {filteredPayouts.map((payout, index) => {
            const config = statusConfig[payout.status];
            const StatusIcon = config.icon;

            return (
              <m.div
                key={payout.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-lg">
                    👤
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">{payout.recipient}</p>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs",
                        payout.role === 'freelancer' ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                      )}>
                        {payout.role === 'freelancer' ? '프리랜서' : '상담사'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{payout.period}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        마감: {payout.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-xl font-bold text-white">{formatCurrency(payout.amount)}</p>
                  <span className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                    config.bg, config.color
                  )}>
                    <StatusIcon className="w-4 h-4" />
                    {config.label}
                  </span>
                  {payout.status === 'pending' && (
                    <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:opacity-90 transition-opacity">
                      처리
                    </button>
                  )}
                </div>
              </m.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}

