'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Video,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from 'lucide-react';

// Mock Data
const overviewStats = [
  { label: '총 매출', value: '₩125.5M', change: 23, icon: DollarSign, color: 'text-green-400' },
  { label: '총 프로젝트', value: '328건', change: 15, icon: Video, color: 'text-blue-400' },
  { label: '활성 사용자', value: '1,245명', change: 8, icon: Users, color: 'text-purple-400' },
  { label: '평균 평점', value: '4.7', change: 2, icon: Star, color: 'text-yellow-400' },
];

const monthlyData = [
  { month: '8월', revenue: 8500000, projects: 22 },
  { month: '9월', revenue: 9200000, projects: 26 },
  { month: '10월', revenue: 10500000, projects: 31 },
  { month: '11월', revenue: 11800000, projects: 35 },
  { month: '12월', revenue: 12500000, projects: 42 },
  { month: '1월', revenue: 8200000, projects: 28 },
];

const serviceBreakdown = [
  { name: '프리랜서 영상', percentage: 45, revenue: 56250000, color: 'bg-primary' },
  { name: 'AI 교육', percentage: 28, revenue: 35140000, color: 'bg-blue-500' },
  { name: 'AI 스튜디오', percentage: 18, revenue: 22590000, color: 'bg-purple-500' },
  { name: '마케팅 대행', percentage: 9, revenue: 11295000, color: 'bg-green-500' },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            통합 분석
          </h1>
          <p className="text-gray-400 mt-1">전체 서비스 현황을 한눈에 확인하세요</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 text-sm">2025.08 - 2026.01</span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overviewStats.map(stat => (
          <GlassCard key={stat.label} className="p-5 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (CSS-based) */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            월별 매출 추이
          </h2>

          <div className="flex items-end justify-between h-48 gap-3">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-8 bg-linear-to-t from-primary to-purple-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 160}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400">{data.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-gray-400 text-sm">총 6개월</span>
            <span className="text-primary font-medium">
              평균 {formatCurrency(monthlyData.reduce((a, b) => a + b.revenue, 0) / monthlyData.length)}/월
            </span>
          </div>
        </GlassCard>

        {/* Service Breakdown */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-6">서비스별 매출 비중</h2>

          <div className="space-y-4">
            {serviceBreakdown.map(service => (
              <div key={service.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{service.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{service.percentage}%</span>
                    <span className="text-gray-500 text-sm">{formatCurrency(service.revenue)}</span>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${service.color} rounded-full transition-all duration-700`}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">총 매출</span>
              <span className="text-xl font-bold text-white">₩125.5M</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Performance Metrics */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-bold text-white mb-6">핵심 성과 지표</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-green-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-400">92%</span>
            </div>
            <p className="text-gray-400 text-sm">프로젝트 완료율</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-blue-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">3.2일</span>
            </div>
            <p className="text-gray-400 text-sm">평균 처리 시간</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-yellow-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-400">4.7</span>
            </div>
            <p className="text-gray-400 text-sm">고객 만족도</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-purple-500/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-400">68%</span>
            </div>
            <p className="text-gray-400 text-sm">재구매율</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
