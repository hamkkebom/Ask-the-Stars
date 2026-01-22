'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  Play,
  Loader2,
  FolderOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

// Types and Mock Data remain same...
interface MyProject {
  id: string;
  requestId: string;
  title: string;
  description?: string;
  deadline: string;
  budget: number;
  targetCounselor?: { name: string };
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED' | 'CANCELLED';
  acceptedAt: string;
  versionsCount: number;
  approvedVersions: number;
  pendingFeedbacks: number;
}

const mockProjects: MyProject[] = [
  {
    id: 'proj1',
    requestId: '1',
    title: '신년운세 × 신규 상담사 김태희 홍보',
    description: '2026년 신년운세 시즌 홍보 영상 제작',
    deadline: '2026-01-25T23:59:59Z',
    budget: 150000,
    targetCounselor: { name: '김태희' },
    status: 'IN_PROGRESS',
    acceptedAt: '2026-01-16T10:00:00Z',
    versionsCount: 3,
    approvedVersions: 1,
    pendingFeedbacks: 3,
  },
  {
    id: 'proj2',
    requestId: '5',
    title: '애정운 시즌 3 홍보',
    description: '봄 시즌 애정운 홍보 영상',
    deadline: '2026-02-01T23:59:59Z',
    budget: 120000,
    targetCounselor: { name: '최영희' },
    status: 'SUBMITTED',
    acceptedAt: '2026-01-14T11:00:00Z',
    versionsCount: 2,
    approvedVersions: 2,
    pendingFeedbacks: 0,
  },
  {
    id: 'proj3',
    requestId: '3',
    title: '인간관계 고민 해결 시리즈',
    description: '인간관계 상담 프로모션 영상',
    deadline: '2026-01-15T23:59:59Z',
    budget: 100000,
    status: 'COMPLETED',
    acceptedAt: '2026-01-05T09:00:00Z',
    versionsCount: 1,
    approvedVersions: 1,
    pendingFeedbacks: 0,
  },
];

function StatusBadge({ status }: { status: MyProject['status'] }) {
  const styles = {
    IN_PROGRESS: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    SUBMITTED: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    COMPLETED: 'bg-green-500/20 text-green-300 border-green-500/30',
    CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const labels = {
    IN_PROGRESS: '진행중',
    SUBMITTED: '검수중',
    COMPLETED: '완료',
    CANCELLED: '취소됨',
  };

  return (
    <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", styles[status])}>
      {labels[status]}
    </span>
  );
}

function StatsCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
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

function CalendarView({ projects }: { projects: MyProject[] }) {
  const [currentDate] = useState(new Date('2026-01-01')); // Mock current date

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const getProjectsForDay = (day: number) => {
    return projects.filter(p => {
      const date = new Date(p.deadline);
      return date.getDate() === day && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-400" />
          2026년 1월
        </h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors" aria-label="이전 달"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors" aria-label="다음 달"><ChevronRightIcon className="w-5 h-5 text-gray-400" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center mb-4">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="text-gray-500 font-medium text-sm">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {blanks.map(i => <div key={`blank-${i}`} className="h-24" />)}
        {days.map(day => {
          const dayProjects = getProjectsForDay(day);
          const isToday = day === 18; // Mock today

          return (
            <div key={day} className={cn(
              "h-24 rounded-lg border p-2 relative group hover:border-yellow-500/50 transition-colors",
              isToday ? "bg-yellow-500/10 border-yellow-500/30" : "bg-white/5 border-white/5"
            )}>
              <div className={cn("text-sm font-medium mb-1", isToday ? "text-yellow-400" : "text-gray-400")}>
                {day}
              </div>
              <div className="space-y-1">
                {dayProjects.map(p => (
                  <div key={p.id} className="text-[10px] bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded truncate border border-blue-500/20">
                    {p.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function MyProjectsContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'list';

  const [projects, setProjects] = useState<MyProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return p.status === 'IN_PROGRESS' || p.status === 'SUBMITTED';
    if (filter === 'completed') return p.status === 'COMPLETED';
    return true;
  });

  const stats = {
    inProgress: projects.filter(p => p.status === 'IN_PROGRESS').length,
    submitted: projects.filter(p => p.status === 'SUBMITTED').length,
    completed: projects.filter(p => p.status === 'COMPLETED').length,
    totalEarnings: projects.filter(p => p.status === 'COMPLETED').reduce((acc, p) => acc + p.budget, 0),
  };

  const getDaysLeft = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-6 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">내 프로젝트</h1>
          <p className="text-gray-400 mt-1">수락한 프로젝트를 관리하고 진행 상황을 확인하세요</p>
        </div>
        <div className="flex gap-2">
           <Link
             href="/stars/my-projects?view=list"
             className={cn("p-2 rounded-lg transition-colors", view !== 'calendar' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
           >
             <FolderOpen className="w-5 h-5" />
           </Link>
           <Link
             href="/stars/my-projects?view=calendar"
             className={cn("p-2 rounded-lg transition-colors", view === 'calendar' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
           >
             <Calendar className="w-5 h-5" />
           </Link>
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView projects={projects} />
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="진행중" value={`${stats.inProgress}건`} icon={Play} color="text-blue-400" />
            <StatsCard title="검수중" value={`${stats.submitted}건`} icon={Clock} color="text-yellow-400" />
            <StatsCard title="완료" value={`${stats.completed}건`} icon={CheckCircle2} color="text-green-400" />
            <StatsCard title="총 수익" value={formatCurrency(stats.totalEarnings)} icon={DollarSign} color="text-primary" />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: '전체' },
              { key: 'in_progress', label: '진행중' },
              { key: 'completed', label: '완료' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors",
                  filter === tab.key
                    ? "bg-primary text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <FolderOpen className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">프로젝트가 없습니다</h3>
                <p className="text-gray-400 mb-4">
                  프로젝트 보드에서 제작 요청을 확인하고 수락해보세요
                </p>
                <Link
                  href="/stars/project-board"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  프로젝트 보드 가기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            ) : (
              filteredProjects.map((project) => {
                const daysLeft = getDaysLeft(project.deadline);

                return (
                  <m.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Link href={`/stars/my-projects/detail/${project.id}`}>
                      <GlassCard className="p-6 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Left: Project Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <StatusBadge status={project.status} />
                              {project.pendingFeedbacks > 0 && (
                                <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/20">
                                  <AlertCircle className="w-3 h-3" />
                                  피드백 {project.pendingFeedbacks}개
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                              {project.title}
                            </h3>

                            {project.description && (
                              <p className="text-gray-400 text-sm mt-1 truncate">
                                {project.description}
                              </p>
                            )}

                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                              {project.targetCounselor && (
                                <span>🔮 {project.targetCounselor.name}</span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(project.deadline)}
                                {daysLeft > 0 && project.status !== 'COMPLETED' && (
                                  <span className={cn(
                                    "ml-1",
                                    daysLeft <= 3 ? "text-red-400" : daysLeft <= 7 ? "text-yellow-400" : "text-gray-400"
                                  )}>
                                    ({daysLeft}일 남음)
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Right: Stats & Budget */}
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-xs text-gray-400">버전</p>
                              <p className="text-lg font-bold text-white">
                                {project.approvedVersions}/{project.versionsCount}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">예상 수익</p>
                              <p className="text-lg font-bold text-primary">
                                {formatCurrency(project.budget)}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  </m.div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function MyProjectsPage() {
  return (
    <Suspense fallback={<div className="text-white p-8 text-center">Loading...</div>}>
      <MyProjectsContent />
    </Suspense>
  );
}

