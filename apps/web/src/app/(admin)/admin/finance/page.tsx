'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  FileText,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock Data
const financeStats = {
  monthlyRevenue: 12500000,
  revenueChange: 23,
  pendingPayouts: 3200000,
  completedPayouts: 8500000,
  monthlyExpense: 2100000,
};

const revenueByService = [
  { name: '프리랜서 영상', amount: 5500000, percentage: 44 },
  { name: 'AI 교육', amount: 3800000, percentage: 30 },
  { name: 'AI 스튜디오', amount: 2200000, percentage: 18 },
  { name: '마케팅 대행', amount: 1000000, percentage: 8 },
];

const recentTransactions = [
  { id: '1', type: 'income', description: '교육 수강료 - AI 영상 제작 기초', amount: 150000, date: '2026-01-18' },
  { id: '2', type: 'payout', description: '프리랜서 정산 - 홍길동', amount: -250000, date: '2026-01-18' },
  { id: '3', type: 'income', description: '영상 제작 의뢰 - A사', amount: 500000, date: '2026-01-17' },
  { id: '4', type: 'payout', description: '프리랜서 정산 - 김영희', amount: -180000, date: '2026-01-17' },
  { id: '5', type: 'expense', description: '클라우드 비용', amount: -89000, date: '2026-01-16' },
];

const quickLinks = [
  { label: '매출', href: '/admin/finance/revenue', icon: TrendingUp, color: 'text-green-400' },
  { label: '지급', href: '/admin/finance/payouts', icon: CreditCard, color: 'text-blue-400' },
  { label: '청구서', href: '/admin/finance/invoices', icon: FileText, color: 'text-yellow-400' },
  { label: '리포트', href: '/admin/finance/reports', icon: PieChart, color: 'text-purple-400' },
];

export default function FinancePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Wallet className="w-8 h-8 text-green-400" />
          정산/회계
        </h1>
        <p className="text-gray-400 mt-1">재무 현황을 확인하고 관리합니다</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">이번달 매출</p>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              +{financeStats.revenueChange}%
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(financeStats.monthlyRevenue)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">정산 대기</p>
          <p className="text-3xl font-bold text-orange-400">{formatCurrency(financeStats.pendingPayouts)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">완료된 정산</p>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(financeStats.completedPayouts)}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-sm text-gray-400 mb-4">이번달 비용</p>
          <p className="text-3xl font-bold text-red-400">{formatCurrency(financeStats.monthlyExpense)}</p>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map(link => (
          <Link key={link.label} href={link.href}>
            <GlassCard className="p-4 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-white/5", link.color)}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-white font-medium group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Service */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-6">서비스별 매출</h2>
          <div className="space-y-4">
            {revenueByService.map(service => (
              <div key={service.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{service.name}</span>
                  <span className="text-white font-medium">{formatCurrency(service.amount)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-purple-500 rounded-full"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent Transactions */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">최근 거래</h2>
            <Link href="/admin/finance/transactions" className="text-sm text-primary hover:underline">
              전체 보기
            </Link>
          </div>

          <div className="space-y-3">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    tx.type === 'income' ? 'bg-green-500/20' :
                    tx.type === 'payout' ? 'bg-blue-500/20' : 'bg-red-500/20'
                  )}>
                    {tx.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className={cn(
                        "w-4 h-4",
                        tx.type === 'payout' ? 'text-blue-400' : 'text-red-400'
                      )} />
                    )}
                  </div>
                  <div>
                    <p className="text-white text-sm">{tx.description}</p>
                    <p className="text-gray-500 text-xs">{tx.date}</p>
                  </div>
                </div>
                <p className={cn(
                  "font-medium",
                  tx.amount > 0 ? 'text-green-400' : 'text-gray-300'
                )}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
