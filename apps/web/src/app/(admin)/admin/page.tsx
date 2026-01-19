'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Video,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Star,
  Wallet,
  GraduationCap,
  Trophy
} from 'lucide-react';

// Mock Data
const stats = {
  totalFreelancers: 156,
  activeProjects: 24,
  monthlyRevenue: 12500000,
  pendingPayouts: 3200000,
};

const pendingTasks = [
  { id: 1, type: 'review', title: '영상 검수 대기', count: 8, href: '/admin/stars/requests' },
  { id: 2, type: 'payout', title: '정산 승인 대기', count: 12, href: '/admin/finance/payouts' },
  { id: 3, type: 'talent', title: '신규 가입 승인', count: 5, href: '/admin/talent' },
];

const recentActivities = [
  { id: 1, type: 'project', message: '신년운세 홍보 영상 완료', time: '5분 전', status: 'success' },
  { id: 2, type: 'payout', message: '프리랜서 정산 처리 완료', time: '15분 전', status: 'success' },
  { id: 3, type: 'feedback', message: '클라이언트 수정 요청', time: '30분 전', status: 'warning' },
  { id: 4, type: 'project', message: '새 제작요청 등록', time: '1시간 전', status: 'info' },
];

const serviceStats = [
  { name: '프리랜서', icon: Star, value: 156, change: '+12%', color: 'text-yellow-400', href: '/admin/stars' },
  { name: '정산/회계', icon: Wallet, value: '₩3.2M', change: '대기중', color: 'text-green-400', href: '/admin/finance' },
  { name: 'AI 교육', icon: GraduationCap, value: 48, change: '수강생', color: 'text-blue-400', href: '/admin/education' },
  { name: 'AI 공모전', icon: Trophy, value: 3, change: '진행중', color: 'text-purple-400', href: '/admin/contests' },
];

function StatsCard({ title, value, icon: Icon, change, color }: {
  title: string;
  value: string;
  icon: any;
  change?: string;
  color: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          {change && (
            <p className={`text-sm ${color} mt-1 flex items-center gap-1`}>
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </GlassCard>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
        <p className="text-gray-400 mt-1">한깨봄 인재 생태계 통합 관리</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="전체 프리랜서"
          value={stats.totalFreelancers.toLocaleString() + '명'}
          icon={Users}
          change="+8% 이번달"
          color="text-blue-400"
        />
        <StatsCard
          title="진행중 프로젝트"
          value={stats.activeProjects.toLocaleString() + '건'}
          icon={Video}
          change="+15% 지난주 대비"
          color="text-green-400"
        />
        <StatsCard
          title="이번달 매출"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={DollarSign}
          change="+23% 전월 대비"
          color="text-yellow-400"
        />
        <StatsCard
          title="대기중 정산"
          value={formatCurrency(stats.pendingPayouts)}
          icon={Clock}
          color="text-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              처리 대기 중
            </h2>
            <Link href="/admin/tasks" className="text-sm text-primary hover:underline flex items-center gap-1">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {pendingTasks.map(task => (
              <Link key={task.id} href={task.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-400 font-bold">{task.count}</span>
                    </div>
                    <span className="text-white font-medium group-hover:text-primary transition-colors">
                      {task.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            최근 활동
          </h2>

          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-400' :
                  activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{activity.message}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Service Quick Access */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">서비스 바로가기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceStats.map(service => (
            <Link key={service.name} href={service.href}>
              <GlassCard className="p-5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-white/5 ${service.color}`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white font-medium group-hover:text-primary transition-colors">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-white">{service.value}</span>
                  <span className="text-xs text-gray-400">{service.change}</span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
