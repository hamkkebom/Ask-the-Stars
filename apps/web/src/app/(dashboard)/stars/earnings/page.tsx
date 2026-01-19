'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Wallet, TrendingUp, DollarSign, FileText, ChevronRight, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface EarningItem {
  id: string;
  type: 'PRIMARY' | 'SECONDARY';
  projectTitle: string;
  versionTitle: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
  scheduledDate: string;
  processedDate?: string;
}

const mockEarnings: EarningItem[] = [
  {
    id: 'e1',
    type: 'PRIMARY',
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    versionTitle: '경쾌한 톤 v2.0',
    amount: 150000,
    status: 'PENDING',
    scheduledDate: '2026-02-01',
  },
  {
    id: 'e2',
    type: 'PRIMARY',
    projectTitle: '2026 봄 타로 시즌 캠페인',
    versionTitle: '감성적 톤 v1.2',
    amount: 200000,
    status: 'COMPLETED',
    scheduledDate: '2026-01-01',
    processedDate: '2026-01-02',
  },
  {
    id: 'e3',
    type: 'SECONDARY',
    projectTitle: '2025 Q4 성과 인센티브',
    versionTitle: '조회수 50K 달성 보너스',
    amount: 75000,
    status: 'COMPLETED',
    scheduledDate: '2025-12-31',
    processedDate: '2026-01-05',
  },
];

// 📊 Monthly earnings data for chart
const monthlyChartData = [
  { month: '9월', earnings: 720000, projects: 4 },
  { month: '10월', earnings: 980000, projects: 6 },
  { month: '11월', earnings: 1120000, projects: 7 },
  { month: '12월', earnings: 1350000, projects: 9 },
  { month: '1월', earnings: 1250000, projects: 8 },
  { month: '2월', earnings: 150000, projects: 1, predicted: true },
];

const statusConfig = {
  PENDING: { label: '지급 예정', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' },
  PROCESSING: { label: '처리 중', color: 'text-blue-400 bg-blue-500/20 border-blue-500/30' },
  COMPLETED: { label: '지급 완료', color: 'text-green-400 bg-green-500/20 border-green-500/30' },
};

function EarningsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  const [earnings] = useState<EarningItem[]>(mockEarnings);
  const [filter, setFilter] = useState({ type: 'all' });
  const [chartPeriod, setChartPeriod] = useState<'monthly' | 'quarterly'>('monthly');

  // Sync state with URL params
  useEffect(() => {
    if (initialType === 'PRIMARY' || initialType === 'SECONDARY') {
      setFilter({ type: initialType });
    } else {
      setFilter({ type: 'all' });
    }
  }, [initialType]);

  const filteredEarnings = earnings.filter((e) => {
    if (filter.type !== 'all' && e.type !== filter.type) return false;
    return true;
  });

  const totalPending = earnings
    .filter((e) => e.status === 'PENDING')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalCompleted = earnings
    .filter((e) => e.status === 'COMPLETED')
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyTotal = earnings
    .filter((e) => e.status === 'COMPLETED' && e.processedDate?.startsWith('2026-01'))
    .reduce((sum, e) => sum + e.amount, 0);

  // Calculate month-over-month change
  const currentMonthEarnings = 1250000;
  const lastMonthEarnings = 1350000;
  const monthChange = ((currentMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">수입 관리</h1>
        <p className="text-gray-400 mt-1">
          정산 내역을 확인하고 수입을 관리하세요
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/30">
              <Wallet className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-blue-300 font-medium">지급 예정</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalPending)}</p>
          <p className="text-sm text-blue-300/70 mt-2">다음 정산일: 2월 1일</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/30">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-green-300 font-medium">이번 달 수입</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(monthlyTotal)}</p>
          <div className="flex items-center gap-1 mt-2">
            {monthChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${monthChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(monthChange).toFixed(1)}% 전월 대비
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/30">
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-purple-300 font-medium">총 누적 수입</span>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalCompleted)}</p>
          <p className="text-sm text-purple-300/70 mt-2">전체 기간</p>
        </motion.div>
      </div>

      {/* 📊 Earnings Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">수입 추이</h2>
          </div>
          <div className="flex gap-2">
            {(['monthly', 'quarterly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  chartPeriod === period
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
              >
                {period === 'monthly' ? '월별' : '분기별'}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 flex items-end justify-between gap-4 px-2 mb-4">
          {monthlyChartData.map((data, i) => {
            const maxEarnings = Math.max(...monthlyChartData.map(d => d.earnings));
            const heightPercent = (data.earnings / maxEarnings) * 100;
            const isLast = i === monthlyChartData.length - 2; // Current month (not predicted)
            const isPredicted = data.predicted;

            return (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Value tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 whitespace-nowrap">
                  {formatCurrency(data.earnings)}
                </div>

                {/* Bar */}
                <div
                  className={`w-full max-w-16 rounded-t-lg transition-all relative overflow-hidden ${
                    isPredicted
                      ? 'bg-gray-700 border border-dashed border-gray-500'
                      : isLast
                        ? 'bg-gradient-to-t from-yellow-600 to-yellow-400'
                        : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                  }`}
                  style={{ height: `${Math.max(heightPercent, 5)}%` }}
                >
                  {isPredicted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] text-gray-400 font-medium">예상</span>
                    </div>
                  )}
                </div>

                {/* Month label */}
                <span className={`text-sm ${isLast ? 'text-yellow-400 font-medium' : 'text-gray-500'}`}>
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart Summary */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">최근 6개월 평균</p>
            <p className="text-xl font-bold text-emerald-400">
              {formatCurrency(Math.round(monthlyChartData.filter(d => !d.predicted).reduce((sum, d) => sum + d.earnings, 0) / 5))}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">최고 수입 월</p>
            <p className="text-xl font-bold text-white">
              12월 ({formatCurrency(1350000)})
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs & Earnings List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setFilter({ type: 'all' })}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              filter.type === 'all'
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter({ type: 'PRIMARY' })}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              filter.type === 'PRIMARY'
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            1차 정산 (제작비)
          </button>
          <button
            onClick={() => setFilter({ type: 'SECONDARY' })}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              filter.type === 'SECONDARY'
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-400/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            2차 정산 (인센티브)
          </button>
        </div>

        {/* Earnings List */}
        <div className="divide-y divide-white/5">
          {filteredEarnings.map((earning, index) => (
            <motion.div
              key={earning.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                    earning.type === 'PRIMARY'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  }`}>
                    {earning.type === 'PRIMARY' ? '1차' : '2차'}
                  </span>
                  <span className="font-medium text-white">{earning.projectTitle}</span>
                </div>
                <p className="text-sm text-gray-500">{earning.versionTitle}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-green-400">
                  +{formatCurrency(earning.amount)}
                </p>
                <p className={`text-sm px-2 py-0.5 rounded inline-block border ${statusConfig[earning.status].color}`}>
                  {statusConfig[earning.status].label}
                  {earning.status === 'PENDING' && ` (${earning.scheduledDate})`}
                  {earning.processedDate && ` (${earning.processedDate})`}
                </p>
              </div>
            </motion.div>
          ))}

          {filteredEarnings.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              해당 조건의 정산 내역이 없습니다.
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/stars/earnings?type=PRIMARY" className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-white font-medium">1차 정산 상세</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </Link>

        <Link href="/stars/earnings?type=SECONDARY" className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-white font-medium">2차 정산 상세</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </Link>

        {/* Note: Tax documents page might need a real page if it's complex, but for now linking to main earnings page with filter is a safe fallback or we disable it */}
        <button className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition-colors group text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <FileText className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-white font-medium">세금 문서 (준비중)</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default function StarsEarningsPage() {
  return (
    <Suspense fallback={<div className="text-white p-8 text-center">Loading...</div>}>
      <EarningsContent />
    </Suspense>
  );
}
