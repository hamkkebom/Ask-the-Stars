'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Rocket, Video, Sparkles, TrendingUp, Settings,
  Play, Pause, RefreshCw, CheckCircle, AlertTriangle,
  Wand2, Image, Music, Type, Zap
} from 'lucide-react';

interface AIJob {
  id: string;
  type: 'thumbnail' | 'subtitle' | 'bgm' | 'enhancement';
  title: string;
  videoTitle: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  estimatedTime?: string;
}

const mockJobs: AIJob[] = [
  {
    id: 'j1',
    type: 'subtitle',
    title: '자동 자막 생성',
    videoTitle: '신년운세 영상 #1024',
    status: 'processing',
    progress: 65,
    createdAt: '2026-01-21 18:30',
    estimatedTime: '약 2분',
  },
  {
    id: 'j2',
    type: 'thumbnail',
    title: '썸네일 AI 생성',
    videoTitle: '타로 리딩 연애운',
    status: 'completed',
    progress: 100,
    createdAt: '2026-01-21 18:15',
  },
  {
    id: 'j3',
    type: 'bgm',
    title: 'BGM 자동 매칭',
    videoTitle: '2026 재물운 대박',
    status: 'queued',
    progress: 0,
    createdAt: '2026-01-21 18:35',
    estimatedTime: '대기중 (3번째)',
  },
  {
    id: 'j4',
    type: 'enhancement',
    title: '화질 개선 (4K)',
    videoTitle: '사주 팔자 해석',
    status: 'failed',
    progress: 30,
    createdAt: '2026-01-21 17:00',
  },
];

const typeConfig = {
  thumbnail: { icon: Image, label: '썸네일', color: 'text-purple-400 bg-purple-500/20' },
  subtitle: { icon: Type, label: '자막', color: 'text-blue-400 bg-blue-500/20' },
  bgm: { icon: Music, label: 'BGM', color: 'text-green-400 bg-green-500/20' },
  enhancement: { icon: Zap, label: '화질 개선', color: 'text-yellow-400 bg-yellow-500/20' },
};

const statusConfig = {
  queued: { label: '대기 중', color: 'bg-gray-500/20 text-gray-400', icon: RefreshCw },
  processing: { label: '처리 중', color: 'bg-blue-500/20 text-blue-400', icon: RefreshCw },
  completed: { label: '완료', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  failed: { label: '실패', color: 'bg-red-500/20 text-red-400', icon: AlertTriangle },
};

export default function StudioPage() {
  const [jobs] = useState<AIJob[]>(mockJobs);
  const [selectedTab, setSelectedTab] = useState<'all' | 'processing' | 'completed'>('all');

  const filteredJobs = jobs.filter(job => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'processing') return job.status === 'processing' || job.status === 'queued';
    return job.status === 'completed';
  });

  const stats = {
    processing: jobs.filter(j => j.status === 'processing').length,
    queued: jobs.filter(j => j.status === 'queued').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-8 h-8 text-purple-400" />
            AI 스튜디오
          </h1>
          <p className="text-gray-400 mt-1">AI 기반 영상 제작 자동화 서비스</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Wand2 className="w-4 h-4" />
          새 AI 작업
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.processing}</p>
              <p className="text-sm text-gray-400">처리 중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Pause className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.queued}</p>
              <p className="text-sm text-gray-400">대기 중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-sm text-gray-400">완료</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.failed}</p>
              <p className="text-sm text-gray-400">실패</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI Services */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">AI 서비스</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(typeConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <GlassCard key={key} className="p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", config.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                  {config.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">AI 자동 생성</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        {[
          { key: 'all', label: '전체' },
          { key: 'processing', label: '진행 중' },
          { key: 'completed', label: '완료' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as any)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedTab === tab.key
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-3">
        {filteredJobs.map((job, index) => {
          const TypeIcon = typeConfig[job.type].icon;
          const StatusIcon = statusConfig[job.status].icon;

          return (
            <m.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-center gap-4">
                  {/* Type Icon */}
                  <div className={cn("p-3 rounded-xl", typeConfig[job.type].color)}>
                    <TypeIcon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{job.title}</h3>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1",
                        statusConfig[job.status].color
                      )}>
                        <StatusIcon className={cn("w-3 h-3", job.status === 'processing' && "animate-spin")} />
                        {statusConfig[job.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">🎬 {job.videoTitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{job.createdAt}</p>
                  </div>

                  {/* Progress */}
                  <div className="w-32 text-right">
                    {job.status === 'processing' && (
                      <>
                        <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{job.estimatedTime}</span>
                      </>
                    )}
                    {job.status === 'queued' && (
                      <span className="text-xs text-gray-500">{job.estimatedTime}</span>
                    )}
                    {job.status === 'completed' && (
                      <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors">
                        결과 보기
                      </button>
                    )}
                    {job.status === 'failed' && (
                      <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors">
                        재시도
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}

