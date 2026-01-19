'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ReviewItem {
  id: string;
  projectTitle: string;
  freelancer: { id: string; name: string };
  versionSlot: number;
  versionTitle: string;
  version: string;
  submittedAt: string;
  deadline: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  feedbackCount: number;
}

const mockReviewQueue: ReviewItem[] = [
  {
    id: 'r1',
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    freelancer: { id: 'f1', name: '박건우' },
    versionSlot: 2,
    versionTitle: '차분한 톤',
    version: 'v1.0',
    submittedAt: '2026-01-17T14:00:00Z',
    deadline: '2026-01-25T23:59:59Z',
    priority: 'HIGH',
    feedbackCount: 0,
  },
  {
    id: 'r2',
    projectTitle: '2026 봄 타로 시즌 캠페인',
    freelancer: { id: 'f2', name: '이지현' },
    versionSlot: 1,
    versionTitle: '감성적 톤',
    version: 'v1.1',
    submittedAt: '2026-01-17T10:00:00Z',
    deadline: '2026-02-10T23:59:59Z',
    priority: 'NORMAL',
    feedbackCount: 3,
  },
  {
    id: 'r3',
    projectTitle: '인간관계 고민 해결 시리즈',
    freelancer: { id: 'f3', name: '최민수' },
    versionSlot: 1,
    versionTitle: '유머러스 톤',
    version: 'v2.0',
    submittedAt: '2026-01-16T09:00:00Z',
    deadline: '2026-01-18T23:59:59Z',
    priority: 'URGENT',
    feedbackCount: 5,
  },
];

const priorityConfig = {
  LOW: { label: '낮음', color: 'bg-gray-100 text-gray-700', order: 0 },
  NORMAL: { label: '보통', color: 'bg-blue-100 text-blue-700', order: 1 },
  HIGH: { label: '높음', color: 'bg-orange-100 text-orange-700', order: 2 },
  URGENT: { label: '긴급', color: 'bg-red-100 text-red-700', order: 3 },
};

function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ReviewQueuePage() {
  const [queue, setQueue] = useState<ReviewItem[]>(mockReviewQueue);
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'submitted'>('priority');

  const sortedQueue = [...queue].sort((a, b) => {
    if (sortBy === 'priority') {
      return priorityConfig[b.priority].order - priorityConfig[a.priority].order;
    }
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
  });

  const urgentCount = queue.filter((r) => r.priority === 'URGENT').length;
  const todayDeadline = queue.filter((r) => getDaysUntilDeadline(r.deadline) <= 1).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">검수 대기열</h1>
          <p className="mt-1 text-gray-600">
            제출된 영상을 검수하고 피드백을 작성하세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">대기 중</p>
            <p className="text-2xl font-bold">{queue.length}건</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-red-600">긴급</p>
            <p className="text-2xl font-bold text-red-600">{urgentCount}건</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-orange-600">마감 임박</p>
            <p className="text-2xl font-bold text-orange-600">{todayDeadline}건</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-green-600">오늘 완료</p>
            <p className="text-2xl font-bold text-green-600">12건</p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">정렬:</span>
            <button
              onClick={() => setSortBy('priority')}
              className={`px-3 py-1 rounded text-sm ${
                sortBy === 'priority' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              우선순위
            </button>
            <button
              onClick={() => setSortBy('deadline')}
              className={`px-3 py-1 rounded text-sm ${
                sortBy === 'deadline' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              마감일
            </button>
            <button
              onClick={() => setSortBy('submitted')}
              className={`px-3 py-1 rounded text-sm ${
                sortBy === 'submitted' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              제출일
            </button>
          </div>
        </div>

        {/* Queue List */}
        <div className="space-y-4">
          {sortedQueue.map((item) => {
            const daysLeft = getDaysUntilDeadline(item.deadline);

            return (
              <div key={item.id} className="bg-white rounded-lg shadow p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig[item.priority].color}`}>
                        {priorityConfig[item.priority].label}
                      </span>
                      <h3 className="font-medium text-gray-900">{item.projectTitle}</h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>👤 {item.freelancer.name}</span>
                      <span>버전 {item.versionSlot}: {item.versionTitle} ({item.version})</span>
                      <span>제출: {formatDate(item.submittedAt)}</span>
                      {item.feedbackCount > 0 && (
                        <span className="text-orange-600">📝 피드백 {item.feedbackCount}개</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded text-sm font-medium ${
                      daysLeft <= 1
                        ? 'bg-red-100 text-red-700'
                        : daysLeft <= 3
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {daysLeft <= 0 ? '마감됨' : `D-${daysLeft}`}
                    </div>

                    <Link
                      href={`/moon/feedback/video-review/${item.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                      검수 시작
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {sortedQueue.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              검수 대기 중인 영상이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
