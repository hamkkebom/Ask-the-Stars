'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatDate, cn } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Video,
  DollarSign,
  Users,
  ArrowRight,
  Filter
} from 'lucide-react';

// Types
interface Task {
  id: string;
  type: 'review' | 'payout' | 'approval' | 'feedback';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  href: string;
  createdAt: string;
}

// Mock Data
const mockTasks: Task[] = [
  {
    id: '1',
    type: 'review',
    title: '신년운세 영상 검수',
    description: '김태희 상담사 홍보 영상 v2.0 검수 필요',
    priority: 'high',
    deadline: '2026-01-19T18:00:00Z',
    href: '/admin/stars/requests/1',
    createdAt: '2026-01-18T09:00:00Z',
  },
  {
    id: '2',
    type: 'payout',
    title: '1월 2주차 정산 승인',
    description: '프리랜서 12명 정산 대기 (총 ₩3,200,000)',
    priority: 'high',
    deadline: '2026-01-20T12:00:00Z',
    href: '/admin/finance/payouts',
    createdAt: '2026-01-18T08:00:00Z',
  },
  {
    id: '3',
    type: 'approval',
    title: '신규 프리랜서 승인',
    description: '홍길동 외 4명 가입 승인 대기',
    priority: 'medium',
    href: '/admin/talent',
    createdAt: '2026-01-18T07:00:00Z',
  },
  {
    id: '4',
    type: 'feedback',
    title: '클라이언트 피드백 확인',
    description: '봄 타로 시즌 캠페인 수정 요청',
    priority: 'medium',
    href: '/admin/stars/requests/2',
    createdAt: '2026-01-17T16:00:00Z',
  },
  {
    id: '5',
    type: 'review',
    title: '인간관계 시리즈 최종 검수',
    description: '3개 버전 최종 승인 대기',
    priority: 'low',
    href: '/admin/stars/requests/3',
    createdAt: '2026-01-17T14:00:00Z',
  },
];

const typeIcons = {
  review: Video,
  payout: DollarSign,
  approval: Users,
  feedback: AlertCircle,
};

const typeLabels = {
  review: '영상 검수',
  payout: '정산 승인',
  approval: '가입 승인',
  feedback: '피드백',
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'review' | 'payout'>('all');
  const [tasks] = useState<Task[]>(mockTasks);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'high') return task.priority === 'high';
    if (filter === 'review') return task.type === 'review';
    if (filter === 'payout') return task.type === 'payout';
    return true;
  });

  const stats = {
    total: tasks.length,
    high: tasks.filter(t => t.priority === 'high').length,
    review: tasks.filter(t => t.type === 'review').length,
    payout: tasks.filter(t => t.type === 'payout').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">내 할일</h1>
        <p className="text-gray-400 mt-1">처리해야 할 업무를 확인하세요</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">전체</p>
        </GlassCard>
        <GlassCard className="p-4 text-center border-red-500/30">
          <p className="text-3xl font-bold text-red-400">{stats.high}</p>
          <p className="text-sm text-gray-400">긴급</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">{stats.review}</p>
          <p className="text-sm text-gray-400">검수 대기</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{stats.payout}</p>
          <p className="text-sm text-gray-400">정산 대기</p>
        </GlassCard>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        {[
          { key: 'all', label: '전체' },
          { key: 'high', label: '긴급' },
          { key: 'review', label: '검수' },
          { key: 'payout', label: '정산' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              filter === f.key
                ? "bg-primary text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const Icon = typeIcons[task.type];

          return (
            <Link key={task.id} href={task.href}>
              <m.div whileHover={{ x: 4 }}>
                <GlassCard className="p-5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "p-3 rounded-xl",
                      task.priority === 'high' ? 'bg-red-500/20' : 'bg-white/5'
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        task.priority === 'high' ? 'text-red-400' : 'text-gray-400'
                      )} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium border",
                          priorityColors[task.priority]
                        )}>
                          {task.priority === 'high' ? '긴급' : task.priority === 'medium' ? '보통' : '낮음'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {typeLabels[task.type]}
                        </span>
                      </div>
                      <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(task.createdAt)}
                        </span>
                        {task.deadline && (
                          <span className="flex items-center gap-1 text-orange-400">
                            <AlertCircle className="w-3 h-3" />
                            마감: {formatDate(task.deadline)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </GlassCard>
              </m.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

