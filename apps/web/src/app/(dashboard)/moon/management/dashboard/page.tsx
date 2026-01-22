'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Briefcase, Users, MessageSquare, DollarSign,
  TrendingUp, Clock, CheckCircle, AlertTriangle,
  ArrowRight, Calendar, BarChart3, PieChart
} from 'lucide-react';

interface DashboardStats {
  activeProjects: number;
  activeFreelancers: number;
  pendingFeedbacks: number;
  monthlySettlement: number;
  projectGrowth: number;
  freelancerGrowth: number;
  avgResponseTime: string;
  settlementGrowth: number;
}

interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
  type: 'project' | 'video' | 'feedback' | 'settlement';
}

interface UpcomingTask {
  id: string;
  title: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

const mockStats: DashboardStats = {
  activeProjects: 24,
  activeFreelancers: 156,
  pendingFeedbacks: 43,
  monthlySettlement: 12500000,
  projectGrowth: 12,
  freelancerGrowth: 8,
  avgResponseTime: '2시간',
  settlementGrowth: 23,
};

const mockActivities: Activity[] = [
  { id: '1', action: '새 프로젝트 등록', user: '김상담', time: '5분 전', type: 'project' },
  { id: '2', action: '영상 제출 완료', user: '이별님', time: '15분 전', type: 'video' },
  { id: '3', action: '피드백 승인', user: '박피드백', time: '1시간 전', type: 'feedback' },
  { id: '4', action: '정산 처리 완료', user: '정산팀', time: '2시간 전', type: 'settlement' },
  { id: '5', action: '영상 검수 요청', user: '최검수', time: '3시간 전', type: 'video' },
];

const mockTasks: UpcomingTask[] = [
  { id: '1', title: '신년운세 영상 최종 검수', deadline: '오늘', priority: 'high' },
  { id: '2', title: '1월 2주차 정산 승인', deadline: '내일', priority: 'high' },
  { id: '3', title: '신규 프리랜서 면접', deadline: '1월 23일', priority: 'medium' },
  { id: '4', title: '분기 리포트 작성', deadline: '1월 31일', priority: 'low' },
];

const activityIcons = {
  project: Briefcase,
  video: CheckCircle,
  feedback: MessageSquare,
  settlement: DollarSign,
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function MoonDashboardPage() {
  const [stats] = useState(mockStats);
  const [activities] = useState(mockActivities);
  const [tasks] = useState(mockTasks);

  const statCards = [
    {
      title: '진행 중 프로젝트',
      value: stats.activeProjects,
      growth: stats.projectGrowth,
      icon: Briefcase,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: '활성 프리랜서',
      value: stats.activeFreelancers,
      growth: stats.freelancerGrowth,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: '대기 중 피드백',
      value: stats.pendingFeedbacks,
      subtitle: `평균 응답: ${stats.avgResponseTime}`,
      icon: MessageSquare,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: '이번 달 정산',
      value: formatCurrency(stats.monthlySettlement),
      growth: stats.settlementGrowth,
      icon: DollarSign,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">관리팀 대시보드</h1>
        <p className="text-gray-400 mt-1">
          프로젝트 현황과 팀 활동을 한눈에 확인하세요
        </p>
      </m.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <m.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                    <Icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  {stat.growth && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      +{stat.growth}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                )}
              </GlassCard>
            </m.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">빠른 작업</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/moon/management/project-requests/create"
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors group"
            >
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span className="text-white group-hover:text-blue-400 transition-colors">프로젝트 생성</span>
            </Link>
            <Link
              href="/moon/feedback/review-queue"
              className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors group"
            >
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              <span className="text-white group-hover:text-yellow-400 transition-colors">피드백 검토</span>
            </Link>
            <Link
              href="/moon/management/freelancers"
              className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors group"
            >
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white group-hover:text-green-400 transition-colors">프리랜서 관리</span>
            </Link>
            <Link
              href="/moon/settlement/primary-settlement"
              className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors group"
            >
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span className="text-white group-hover:text-purple-400 transition-colors">정산 처리</span>
            </Link>
          </div>
        </GlassCard>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">최근 활동</h2>
              <Link href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-1">
                전체보기 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {activities.map((activity, index) => {
                const Icon = activityIcons[activity.type];
                return (
                  <m.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-white/10">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </m.div>
                );
              })}
            </div>
          </GlassCard>
        </m.div>

        {/* Upcoming Tasks */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                다가오는 일정
              </h2>
            </div>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <m.div
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white text-sm font-medium">{task.title}</p>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      priorityColors[task.priority]
                    )}>
                      {task.priority === 'high' ? '긴급' : task.priority === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    마감: {task.deadline}
                  </p>
                </m.div>
              ))}
            </div>
          </GlassCard>
        </m.div>
      </div>

      {/* Performance Chart Placeholder */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              주간 성과 요약
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm">주간</button>
              <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10">월간</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-3xl font-bold text-blue-400">18</p>
              <p className="text-sm text-gray-400 mt-1">완료된 프로젝트</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-3xl font-bold text-green-400">92%</p>
              <p className="text-sm text-gray-400 mt-1">승인률</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-3xl font-bold text-purple-400">4.8</p>
              <p className="text-sm text-gray-400 mt-1">평균 평점</p>
            </div>
          </div>
        </GlassCard>
      </m.div>
    </div>
  );
}

