'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency } from '@/lib/utils';
import { FolderKanban, Clock, CheckCircle, Search } from 'lucide-react';

const projects = [
  { id: '1', title: '신년 운세 시리즈', freelancer: '홍길동', progress: 75, deadline: '2026-01-22', status: 'in_progress' },
  { id: '2', title: '타로 마스터클래스', freelancer: '김영희', progress: 100, deadline: '2026-01-15', status: 'review' },
  { id: '3', title: '사주 해설 영상', freelancer: '이철수', progress: 40, deadline: '2026-01-28', status: 'in_progress' },
  { id: '4', title: '운세 인트로 모션', freelancer: '박지민', progress: 100, deadline: '2026-01-10', status: 'completed' },
];

const statusColors: Record<string, string> = {
  in_progress: 'text-blue-400',
  review: 'text-yellow-400',
  completed: 'text-green-400',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-blue-400" />
            프로젝트 관리
          </h1>
          <p className="text-gray-400 text-sm mt-1">진행 중인 프로젝트를 모니터링합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xl font-bold text-white">8</p>
              <p className="text-xs text-gray-400">진행중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-xl font-bold text-white">3</p>
              <p className="text-xs text-gray-400">검수 대기</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xl font-bold text-white">24</p>
              <p className="text-xs text-gray-400">완료</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <GlassCard key={project.id} className="p-5 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">{project.title}</h3>
              <span className={`text-sm ${statusColors[project.status]}`}>
                {project.status === 'in_progress' ? '진행중' : project.status === 'review' ? '검수대기' : '완료'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
              <span>담당: {project.freelancer}</span>
              <span>마감: {project.deadline}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{project.progress}%</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
