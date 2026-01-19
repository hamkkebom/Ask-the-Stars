'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import {
  Star,
  Users,
  Video,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

// Mock Data
const freelancerStats = {
  total: 156,
  active: 128,
  newThisMonth: 12,
  totalPayout: 45000000,
};

const recentRequests = [
  {
    id: '1',
    title: '신년운세 × 신규 상담사 김태희 홍보',
    status: 'IN_PROGRESS',
    freelancers: 3,
    deadline: '2026-01-25',
    budget: 150000,
  },
  {
    id: '2',
    title: '2026 봄 타로 시즌 캠페인',
    status: 'OPEN',
    freelancers: 0,
    deadline: '2026-02-10',
    budget: 200000,
  },
  {
    id: '3',
    title: '인간관계 고민 해결 시리즈',
    status: 'COMPLETED',
    freelancers: 5,
    deadline: '2026-01-15',
    budget: 500000,
  },
];

const topFreelancers = [
  { id: '1', name: '홍길동', projects: 15, rating: 4.9, earnings: 2500000 },
  { id: '2', name: '김영희', projects: 12, rating: 4.8, earnings: 2100000 },
  { id: '3', name: '이철수', projects: 10, rating: 4.7, earnings: 1800000 },
];

const statusColors = {
  OPEN: 'bg-green-500/20 text-green-400',
  IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
  COMPLETED: 'bg-gray-500/20 text-gray-400',
};

const statusLabels = {
  OPEN: '모집중',
  IN_PROGRESS: '진행중',
  COMPLETED: '완료',
};

export default function StarsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" />
            프리랜서 관리
          </h1>
          <p className="text-gray-400 mt-1">제작요청, 프로젝트, 정산을 관리합니다</p>
        </div>
        <Link
          href="/admin/stars/requests/new"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + 새 제작요청
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{freelancerStats.total}</p>
              <p className="text-sm text-gray-400">전체 프리랜서</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{freelancerStats.active}</p>
              <p className="text-sm text-gray-400">활동 중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Video className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{freelancerStats.newThisMonth}</p>
              <p className="text-sm text-gray-400">이번달 신규</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(freelancerStats.totalPayout)}</p>
              <p className="text-sm text-gray-400">총 정산금</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">최근 제작요청</h2>
            <Link href="/admin/stars/requests" className="text-sm text-primary hover:underline">
              전체 보기
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제작요청 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Request List */}
          <div className="space-y-3">
            {recentRequests.map(request => (
              <Link key={request.id} href={`/admin/stars/requests/${request.id}`}>
                <GlassCard className="p-4 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          statusColors[request.status as keyof typeof statusColors]
                        )}>
                          {statusLabels[request.status as keyof typeof statusLabels]}
                        </span>
                      </div>
                      <h3 className="text-white font-medium group-hover:text-primary transition-colors truncate">
                        {request.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span>{request.freelancers}명 참여</span>
                        <span>마감: {request.deadline}</span>
                        <span className="text-primary">{formatCurrency(request.budget)}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Freelancers */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">우수 프리랜서</h2>

          <div className="space-y-3">
            {topFreelancers.map((freelancer, index) => (
              <GlassCard key={freelancer.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{freelancer.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>⭐ {freelancer.rating}</span>
                      <span>•</span>
                      <span>{freelancer.projects}건</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium text-sm">
                    {formatCurrency(freelancer.earnings)}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
