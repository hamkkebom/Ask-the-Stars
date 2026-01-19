'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { GlassCard } from '@/components/ui/glass-card';
import { useAuthStore } from '@/store/useAuthStore';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  Filter,
  Plus,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Types
interface ProjectRequest {
  id: string;
  title: string;
  description?: string;
  categories: string[];
  deadline: string;
  assignmentType: 'SINGLE' | 'MULTIPLE';
  maxAssignees: number;
  currentAssignees: number;
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELLED';
  estimatedBudget?: number;
  createdAt: string;
  createdBy?: { name: string };
  targetCounselor?: { name: string };
}

// Mock Data
const mockRequests: ProjectRequest[] = [
  {
    id: '1',
    title: '신년운세 × 신규 상담사 김태희 홍보',
    description: '2026년 신년운세 시즌 홍보 영상 제작',
    categories: ['신년운세', '신규상담사', '사주'],
    deadline: '2026-01-25T23:59:59Z',
    assignmentType: 'MULTIPLE',
    maxAssignees: 3,
    currentAssignees: 1,
    status: 'OPEN',
    estimatedBudget: 150000,
    createdAt: '2026-01-15T10:00:00Z',
    createdBy: { name: '관리팀' },
    targetCounselor: { name: '김태희' },
  },
  {
    id: '2',
    title: '2026 봄 타로 시즌 캠페인',
    description: '봄 시즌 타로 운세 홍보 영상',
    categories: ['타로', '계절별', '브랜드홍보'],
    deadline: '2026-02-10T23:59:59Z',
    assignmentType: 'SINGLE',
    maxAssignees: 1,
    currentAssignees: 0,
    status: 'OPEN',
    estimatedBudget: 200000,
    createdAt: '2026-01-16T14:00:00Z',
    createdBy: { name: '관리팀' },
  },
  {
    id: '3',
    title: '인간관계 고민 해결 시리즈',
    description: '인간관계 상담 프로모션 영상',
    categories: ['인간관계', '고민'],
    deadline: '2026-01-20T23:59:59Z',
    assignmentType: 'MULTIPLE',
    maxAssignees: 5,
    currentAssignees: 5,
    status: 'FULL',
    estimatedBudget: 120000,
    createdAt: '2026-01-10T09:00:00Z',
    createdBy: { name: '관리팀' },
  },
  {
    id: '4',
    title: '재물운 상승 비법 (숏폼)',
    description: '숏폼 전용 재물운 콘텐츠 제작',
    categories: ['사주', '재물운', '숏폼'],
    deadline: '2026-01-18T23:59:59Z',
    assignmentType: 'SINGLE',
    maxAssignees: 1,
    currentAssignees: 1,
    status: 'CLOSED',
    estimatedBudget: 80000,
    createdAt: '2026-01-05T09:00:00Z',
    createdBy: { name: '마케팅팀' },
  },
];

const categoryColors: Record<string, string> = {
  '신년운세': 'bg-red-500/20 text-red-200 border-red-500/30',
  '타로': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
  '사주': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  '신점': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
  'default': 'bg-gray-500/20 text-gray-200 border-gray-500/30',
};

function getCategoryStyle(cat: string) {
  return categoryColors[cat] || categoryColors['default'];
}

function StatusBadge({ status }: { status: ProjectRequest['status'] }) {
  const styles = {
    OPEN: 'bg-green-500/20 text-green-300 border-green-500/30',
    FULL: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    CLOSED: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const labels = {
    OPEN: '모집중',
    FULL: '모집마감',
    CLOSED: '완료',
    CANCELLED: '취소됨',
  };

  return (
    <span className={cn("px-2 py-0.5 rounded textxs font-medium border", styles[status])}>
      {labels[status]}
    </span>
  );
}

function StatsCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) {
  return (
    <GlassCard className="flex items-center p-6 gap-4">
      <div className={cn("p-3 rounded-full bg-white/5", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </GlassCard>
  );
}

export default function ProjectBoardPage() {
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [requests] = useState<ProjectRequest[]>(mockRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  // Stats calculation
  const totalOpen = requests.filter(r => r.status === 'OPEN').length;
  const totalBudget = requests.reduce((acc, curr) => acc + (curr.estimatedBudget || 0), 0);

  const filteredRequests = requests.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.categories.some(c => c.includes(searchQuery))
  );

  const columns = {
    OPEN: filteredRequests.filter(r => r.status === 'OPEN'),
    FULL: filteredRequests.filter(r => r.status === 'FULL'),
    CLOSED: filteredRequests.filter(r => r.status === 'CLOSED'),
  };

  return (
    <div className="min-h-screen bg-transparent p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">프로젝트 보드</h1>
          <p className="text-gray-400 mt-1">실시간 영상 제작 요청을 확인하고 참여하세요</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="bg-white/5 border border-white/10 rounded-lg p-1 flex">
             <button
               onClick={() => setViewMode('board')}
               className={cn("p-2 rounded transition-all", viewMode === 'board' ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white")}
             >
               <LayoutGrid className="w-5 h-5" />
             </button>
             <button
               onClick={() => setViewMode('list')}
               className={cn("p-2 rounded transition-all", viewMode === 'list' ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white")}
             >
               <ListIcon className="w-5 h-5" />
             </button>
           </div>
            <button
              onClick={() => toast.info('새 요청 등록 기능은 준비 중입니다.', 2000)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> 새 요청 등록
            </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="모집 중인 프로젝트" value={`${totalOpen}건`} icon={AlertCircle} color="text-green-400" />
        <StatsCard title="총 예산 규모" value={formatCurrency(totalBudget)} icon={CheckCircle2} color="text-yellow-400" />
        <StatsCard title="참여중인 상담사" value="12명" icon={Users} color="text-blue-400" />
        <StatsCard title="이번 주 마감" value="3건" icon={Clock} color="text-red-400" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors">
          <Filter className="w-4 h-4" /> 필터
        </button>
      </div>

      {/* Board View */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
          {Object.entries(columns).map(([status, items]) => (
            <div key={status} className="flex flex-col gap-4 min-w-[300px]">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full",
                    status === 'OPEN' ? 'bg-green-500' :
                    status === 'FULL' ? 'bg-yellow-500' : 'bg-gray-500'
                  )} />
                  {status === 'OPEN' ? '모집 중' : status === 'FULL' ? '진행 중/마감' : '완료됨'}
                  <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-400">{items.length}</span>
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {loading ? (
                  // Skeleton Loading State
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/5 space-y-3">
                       <div className="flex justify-between">
                         <Skeleton className="h-5 w-16" />
                         <Skeleton className="h-5 w-12" />
                       </div>
                       <Skeleton className="h-6 w-3/4" />
                       <div className="flex gap-2">
                         <Skeleton className="h-4 w-12" />
                         <Skeleton className="h-4 w-12" />
                       </div>
                       <div className="pt-2 border-t border-white/5 flex justify-between">
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-4 w-16" />
                       </div>
                    </div>
                  ))
                ) : (
                  // Actual Content
                  items.map(item => (
                    <Link key={item.id} href={`/stars/request-detail/${item.id}`}>
                      <GlassCard
                        className="p-5 hover:bg-white/10 border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                        hoverEffect={true}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <StatusBadge status={item.status} />
                          {item.assignmentType === 'MULTIPLE' && (
                            <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">
                              중복가능
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.categories.slice(0, 3).map(cat => (
                            <span key={cat} className={cn("text-[10px] px-1.5 py-0.5 rounded border", getCategoryStyle(cat))}>
                              {cat}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2 text-xs text-gray-400">
                          <div className="flex items-center justify-between">
                            <span>예산</span>
                            <span className="text-white font-medium">{formatCurrency(item.estimatedBudget ?? 0)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>마감일</span>
                            <span className={cn(
                              new Date(item.deadline) < new Date() ? "text-red-400" : "text-gray-300"
                            )}>
                              {formatDate(item.deadline)}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-2">
                             <span className="flex items-center gap-1">
                               <Users className="w-3 h-3" /> {item.currentAssignees}/{item.maxAssignees}명
                             </span>
                             <span>{item.createdBy?.name}</span>
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View (Simplified) */}
      {viewMode === 'list' && (
        <div className="space-y-3">
           {filteredRequests.map(item => (
             <GlassCard key={item.id} className="p-4 flex items-center gap-4 hover:bg-white/10 cursor-pointer">
                <StatusBadge status={item.status} />
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{formatDate(item.createdAt)}</span>
                    <span>•</span>
                    <span>{item.createdBy?.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatCurrency(item.estimatedBudget ?? 0)}</p>
                  <p className="text-xs text-gray-400">{formatDate(item.deadline)} 까지</p>
                </div>
             </GlassCard>
           ))}
        </div>
      )}
    </div>
  );
}
