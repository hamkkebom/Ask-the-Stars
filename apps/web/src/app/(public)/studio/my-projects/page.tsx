'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Folder, Clock, Video, ArrowLeft
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: 'in_progress' | 'review' | 'completed';
  deadline: string;
  progress: number;
}

const projects: Project[] = [
  { id: '1', title: '신년운세 타로 영상', status: 'in_progress', deadline: '2026-01-25', progress: 60 },
  { id: '2', title: '스타트업 소개 영상', status: 'review', deadline: '2026-01-28', progress: 90 },
  { id: '3', title: '온라인 강의 프로모', status: 'completed', deadline: '2026-01-15', progress: 100 },
];

const statusConfig = {
  in_progress: { label: '제작중', color: 'bg-blue-500/20 text-blue-400' },
  review: { label: '검토중', color: 'bg-yellow-500/20 text-yellow-400' },
  completed: { label: '완료', color: 'bg-green-500/20 text-green-400' },
};

export default function StudioMyProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          스튜디오로 돌아가기
        </Link>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Folder className="w-8 h-8 text-purple-400" />
            내 프로젝트
          </h1>
          <p className="text-gray-400 mt-1">의뢰한 프로젝트 현황을 확인하세요</p>
        </m.div>

        <div className="space-y-4">
          {projects.map((project, index) => {
            const config = statusConfig[project.status];
            return (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Video className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          마감: {project.deadline}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{project.progress}% 완료</p>
                </GlassCard>
              </m.div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <GlassCard className="p-12 text-center">
            <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">진행 중인 프로젝트가 없습니다</p>
            <Link
              href="/studio/request"
              className="text-purple-400 hover:underline"
            >
              새 프로젝트 의뢰하기
            </Link>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

