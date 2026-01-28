'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { formatDate, formatTimestamp } from '@/lib/utils';
import { MessageSquare, CheckCircle, Clock, Play, ExternalLink, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axios';

interface FeedbackItem {
  id: string;
  projectId: string;
  projectTitle: string;
  versionTitle: string;
  versionId: string;
  content: string;
  startTime?: number;
  endTime?: number;
  feedbackType: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'RESOLVED' | 'WONTFIX';
  createdAt: string;
  author: { name: string };
}

const mockFeedbacks: FeedbackItem[] = [
  {
    id: 'fb1',
    projectId: 'proj1',
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    versionTitle: '경쾌한 톤 v2.0',
    versionId: 'ver1',
    content: '자막이 화면 하단에 가려집니다. 위치를 조정해주세요.',
    startTime: 32,
    endTime: 45,
    feedbackType: '자막',
    priority: 'HIGH',
    status: 'PENDING',
    createdAt: '2026-01-17T15:00:00Z',
    author: { name: '피드백팀' },
  },
  {
    id: 'fb2',
    projectId: 'proj1',
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    versionTitle: '차분한 톤 v1.0',
    versionId: 'ver2',
    content: 'BGM 볼륨이 너무 큽니다. 30% 정도 낮춰주세요.',
    startTime: 120,
    endTime: 150,
    feedbackType: 'BGM',
    priority: 'NORMAL',
    status: 'RESOLVED',
    createdAt: '2026-01-16T14:00:00Z',
    author: { name: '피드백팀' },
  },
  {
    id: 'fb3',
    projectId: 'proj2',
    projectTitle: '2026 봄 타로 시즌 캠페인',
    versionTitle: '감성적 톤 v1.1',
    versionId: 'ver3',
    content: '0:45~0:52 구간 컷 전환이 너무 빠릅니다.',
    startTime: 45,
    endTime: 52,
    feedbackType: '컷편집',
    priority: 'URGENT',
    status: 'PENDING',
    createdAt: '2026-01-17T10:00:00Z',
    author: { name: '피드백팀' },
  },
];

const priorityConfig: Record<string, { label: string; color: string }> = {
  LOW: { label: '낮음', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  NORMAL: { label: '보통', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  HIGH: { label: '높음', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  URGENT: { label: '긴급', color: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: '미처리', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  RESOLVED: { label: '해결됨', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  WONTFIX: { label: '수정안함', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

export default function StarsFeedbackPage() {
  const [filter, setFilter] = useState({ status: 'all', priority: 'all' });

  // 📡 Real Data Fetching
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['my-feedbacks'],
    queryFn: async () => {
      // Fetch all feedbacks for current user (Star)
      const response = await axiosInstance.get('/feedback');
      return response.data;
    }
  });

  const filteredFeedbacks = feedbacks.filter((fb: FeedbackItem) => {
    if (filter.status !== 'all' && fb.status !== filter.status) return false;
    if (filter.priority !== 'all' && fb.priority !== filter.priority) return false;
    return true;
  });

  const pendingCount = feedbacks.filter((fb: FeedbackItem) => fb.status === 'PENDING').length;
  const resolvedCount = feedbacks.filter((fb: FeedbackItem) => fb.status === 'RESOLVED').length;
  const urgentCount = feedbacks.filter((fb: FeedbackItem) => fb.priority === 'URGENT' && fb.status === 'PENDING').length;

  if (isLoading) return <div className="p-8 text-center text-gray-500">피드백을 불러오는 중...</div>;

  // 🎬 Handle timestamp click - opens video at specific time
  const handleTimestampClick = (feedback: FeedbackItem) => {
    if (feedback.startTime === undefined) return;

    // Navigate to video player with timestamp
    const url = `/stars/my-projects/${feedback.projectId}/versions/${feedback.versionId}?t=${feedback.startTime}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">받은 피드백</h1>
        <p className="text-gray-400 mt-1">
          피드백팀에서 보낸 수정 요청을 확인하고 처리하세요
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-4"
        >
          <div className="p-2 rounded-lg bg-blue-500/20">
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">전체</p>
            <p className="text-2xl font-bold text-white">{feedbacks.length}개</p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-4"
        >
          <div className="p-2 rounded-lg bg-red-500/20 animate-pulse">
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-red-400">긴급</p>
            <p className="text-2xl font-bold text-red-400">{urgentCount}개</p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 flex items-center gap-4"
        >
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-yellow-400">미처리</p>
            <p className="text-2xl font-bold text-yellow-400">{pendingCount}개</p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 flex items-center gap-4"
        >
          <div className="p-2 rounded-lg bg-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-green-400">해결됨</p>
            <p className="text-2xl font-bold text-green-400">{resolvedCount}개</p>
          </div>
        </m.div>
      </div>

      {/* Filter */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-white/10 bg-white/5 p-4"
      >
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
          >
            <option value="all" className="bg-gray-900">전체 상태</option>
            <option value="PENDING" className="bg-gray-900">미처리</option>
            <option value="RESOLVED" className="bg-gray-900">해결됨</option>
            <option value="WONTFIX" className="bg-gray-900">수정안함</option>
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
          >
            <option value="all" className="bg-gray-900">전체 우선순위</option>
            <option value="URGENT" className="bg-gray-900">긴급</option>
            <option value="HIGH" className="bg-gray-900">높음</option>
            <option value="NORMAL" className="bg-gray-900">보통</option>
            <option value="LOW" className="bg-gray-900">낮음</option>
          </select>
        </div>
      </m.div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback: FeedbackItem, index: number) => (
          <m.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`rounded-xl border bg-white/5 p-5 hover:bg-white/10 transition-all ${
              feedback.priority === 'URGENT' && feedback.status === 'PENDING'
                ? 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <Link
                  href={`/stars/my-projects/${feedback.projectId}`}
                  className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                >
                  {feedback.projectTitle}
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <p className="text-xs text-gray-500 mt-0.5">
                  {feedback.versionTitle}
                </p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityConfig[feedback.priority].color}`}>
                  {priorityConfig[feedback.priority].label}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusConfig[feedback.status].color}`}>
                  {statusConfig[feedback.status].label}
                </span>
              </div>
            </div>

            <p className="text-white mb-4">{feedback.content}</p>

            <div className="flex items-center gap-4 text-sm">
              {/* 🎬 Clickable Timestamp Button - NEW! */}
              {feedback.startTime !== undefined && (
                <button
                  onClick={() => handleTimestampClick(feedback)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors border border-purple-500/30 group"
                  title="클릭하면 해당 시점으로 영상 이동"
                >
                  <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="font-mono">
                    {formatTimestamp(feedback.startTime)}
                    {feedback.endTime !== undefined && ` ~ ${formatTimestamp(feedback.endTime)}`}
                  </span>
                </button>
              )}
              <span className="text-gray-500 flex items-center gap-1">
                📝 {feedback.feedbackType}
              </span>
              <span className="text-gray-500 flex items-center gap-1">
                👤 {feedback.author.name}
              </span>
              <span className="text-gray-600">{formatDate(feedback.createdAt)}</span>
            </div>

            {feedback.status === 'PENDING' && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors border border-green-500/30">
                  ✓ 해결 완료
                </button>
                <button className="px-4 py-2 bg-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/20 transition-colors border border-white/10">
                  수정안함
                </button>
                <Link
                  href={`/stars/upload?projectId=${feedback.projectId}&versionId=${feedback.versionId}&revision=true`}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                >
                  수정 영상 업로드
                </Link>
              </div>
            )}
          </m.div>
        ))}

        {filteredFeedbacks.length === 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-500"
          >
            해당 조건의 피드백이 없습니다.
          </m.div>
        )}
      </div>
    </div>
  );
}

