'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate, formatTimestamp, cn } from '@/lib/utils';
import { Send, Video, Clock, MessageSquare } from 'lucide-react';

interface VideoForFeedback {
  id: string;
  projectTitle: string;
  versionTitle: string;
  freelancerName: string;
  thumbnailUrl?: string;
  duration: number;
  status: 'PENDING_REVIEW' | 'IN_REVIEW' | 'REVIEWED';
  submittedAt: string;
}

const mockVideos: VideoForFeedback[] = [
  {
    id: 'v1',
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    versionTitle: '경쾌한 톤 v2.0',
    freelancerName: '별님',
    duration: 180,
    status: 'PENDING_REVIEW',
    submittedAt: '2026-01-17T14:00:00Z',
  },
  {
    id: 'v2',
    projectTitle: '2026 봄 타로 시즌 캠페인',
    versionTitle: '감성적 톤 v1.1',
    freelancerName: '달님',
    duration: 240,
    status: 'IN_REVIEW',
    submittedAt: '2026-01-16T10:00:00Z',
  },
  {
    id: 'v3',
    projectTitle: '인간관계 상담 시리즈',
    versionTitle: '차분한 톤 v1.0',
    freelancerName: '햇님',
    duration: 150,
    status: 'REVIEWED',
    submittedAt: '2026-01-15T09:00:00Z',
  },
];

const statusConfig = {
  PENDING_REVIEW: { label: '검토 대기', color: 'bg-yellow-500/20 text-yellow-400' },
  IN_REVIEW: { label: '검토 중', color: 'bg-blue-500/20 text-blue-400' },
  REVIEWED: { label: '완료', color: 'bg-green-500/20 text-green-400' },
};

export default function CounselorFeedbackPage() {
  const [videos] = useState<VideoForFeedback[]>(mockVideos);
  const [filter, setFilter] = useState('all');

  const filteredVideos = videos.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  const pendingCount = videos.filter((v) => v.status === 'PENDING_REVIEW').length;
  const inReviewCount = videos.filter((v) => v.status === 'IN_REVIEW').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">피드백 제출</h1>
        <p className="text-gray-400 mt-1">
          제작된 영상을 검토하고 피드백을 작성하세요
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-yellow-400">검토 대기</p>
            <p className="text-2xl font-bold text-yellow-400">{pendingCount}개</p>
          </div>
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-blue-400">검토 중</p>
            <p className="text-2xl font-bold text-blue-400">{inReviewCount}개</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Video className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">전체 영상</p>
            <p className="text-2xl font-bold text-white">{videos.length}개</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: '전체' },
          { key: 'PENDING_REVIEW', label: '검토 대기' },
          { key: 'IN_REVIEW', label: '검토 중' },
          { key: 'REVIEWED', label: '완료' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              filter === tab.key
                ? "bg-yellow-500 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnail */}
              <div className="w-full md:w-48 aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <Video className="w-8 h-8 text-gray-600" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-white">{video.projectTitle}</h3>
                    <p className="text-sm text-gray-500">{video.versionTitle}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[video.status].color}`}>
                    {statusConfig[video.status].label}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>👤 {video.freelancerName}</span>
                  <span>⏱️ {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}</span>
                  <span>{formatDate(video.submittedAt)}</span>
                </div>

                {video.status !== 'REVIEWED' && (
                  <Link
                    href={`/counselor/feedback/${video.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {video.status === 'PENDING_REVIEW' ? '피드백 작성' : '피드백 계속'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredVideos.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-500">
            해당 상태의 영상이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
