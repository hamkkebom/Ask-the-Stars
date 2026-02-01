'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  TrendingUp,
  Award,
  Star,
  Target,
  BarChart3,
  Users,
} from 'lucide-react';

interface PerformanceData {
  period: string;
  projectsCompleted: number;
  versionsSubmitted: number;
  approvalRate: number;
  avgFeedbackScore: number;
  totalEarnings: number;
  viewsGenerated: number;
  ranking: number;
}

const mockPerformance: PerformanceData = {
  period: '2026년 1월',
  projectsCompleted: 8,
  versionsSubmitted: 15,
  approvalRate: 87,
  avgFeedbackScore: 4.5,
  totalEarnings: 1250000,
  viewsGenerated: 125000,
  ranking: 12,
};

const monthlyData = [
  { month: '10월', earnings: 980000, projects: 6 },
  { month: '11월', earnings: 1120000, projects: 7 },
  { month: '12월', earnings: 1350000, projects: 9 },
  { month: '1월', earnings: 1250000, projects: 8 },
];

export default function StarsPerformancePage() {
  const [performance] = useState(mockPerformance);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">내 성과</h1>
        <p className="text-gray-400 mt-1">
          {performance.period} 기준 성과를 확인하세요
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">
              완료 프로젝트
            </span>
          </div>
          <p className="text-4xl font-bold text-white">
            {performance.projectsCompleted}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">승인율</span>
          </div>
          <p className="text-4xl font-bold text-green-400">
            {performance.approvalRate}%
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">평균 평점</span>
          </div>
          <p className="text-4xl font-bold text-yellow-400">
            ⭐ {performance.avgFeedbackScore}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">전체 순위</span>
          </div>
          <p className="text-4xl font-bold text-purple-400">
            #{performance.ranking}
          </p>
        </div>
      </div>

      {/* Earnings Chart Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">수입 추이</h2>
          </div>
          <div className="flex gap-2">
            {['monthly', 'quarterly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {period === 'monthly' ? '월별' : '분기별'}
              </button>
            ))}
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="h-48 flex items-end justify-center gap-8 px-4 mb-6">
          {monthlyData.map((data, i) => {
            const maxEarnings = Math.max(...monthlyData.map((d) => d.earnings));
            const heightPercent = (data.earnings / maxEarnings) * 100;
            const isLast = i === monthlyData.length - 1;

            return (
              <div
                key={data.month}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-sm text-gray-400">
                  {formatCurrency(data.earnings)}
                </span>
                <div
                  className={`w-16 rounded-t-lg transition-all ${
                    isLast
                      ? 'bg-gradient-to-t from-yellow-600 to-yellow-400'
                      : 'bg-gradient-to-t from-blue-600 to-blue-400'
                  }`}
                  style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                />
                <span className="text-sm text-gray-500">{data.month}</span>
              </div>
            );
          })}
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">이번 달 수입</p>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(performance.totalEarnings)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">누적 조회수</p>
            <p className="text-2xl font-bold text-white">
              {(performance.viewsGenerated / 10000).toFixed(1)}만
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Stats + Badges */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Version Stats */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">버전별 통계</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">제출한 버전</span>
              <span className="font-medium text-white">
                {performance.versionsSubmitted}개
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">승인된 버전</span>
              <span className="font-medium text-green-400">
                {Math.round(
                  performance.versionsSubmitted *
                    (performance.approvalRate / 100)
                )}
                개
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">수정 요청</span>
              <span className="font-medium text-orange-400">3개</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">평균 작업 시간</span>
              <span className="font-medium text-white">2.5일</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">획득 배지</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Active Badges */}
            <div className="text-center p-3 rounded-xl bg-white/5 border border-yellow-500/20">
              <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl mb-2">
                🏆
              </div>
              <p className="text-xs text-yellow-400 font-medium">TOP 20</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-green-500/20">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-2xl mb-2">
                ✅
              </div>
              <p className="text-xs text-green-400 font-medium">품질왕</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-blue-500/20">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-2">
                ⚡
              </div>
              <p className="text-xs text-blue-400 font-medium">신속함</p>
            </div>

            {/* Locked Badges */}
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 opacity-40">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl mb-2">
                🎯
              </div>
              <p className="text-xs text-gray-500 font-medium">10완성</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 opacity-40">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl mb-2">
                💎
              </div>
              <p className="text-xs text-gray-500 font-medium">100만원</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5 opacity-40">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl mb-2">
                👑
              </div>
              <p className="text-xs text-gray-500 font-medium">TOP 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
