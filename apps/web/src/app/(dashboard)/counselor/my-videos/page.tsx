'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface MyVideo {
  id: string;
  title: string;
  thumbnailUrl?: string;
  views: number;
  likes: number;
  status: 'ACTIVE' | 'PENDING' | 'PAUSED' | 'REJECTED';
  createdAt: string;
  campaignStatus?: 'NONE' | 'ACTIVE' | 'COMPLETED';
}

const mockVideos: MyVideo[] = [
  {
    id: 'v1',
    title: '2026 신년운세 - 하반기 대박 운세가 찾아옵니다',
    views: 15420,
    likes: 892,
    status: 'ACTIVE',
    createdAt: '2026-01-15T10:00:00Z',
    campaignStatus: 'ACTIVE',
  },
  {
    id: 'v2',
    title: '사주로 보는 2026 재물운',
    views: 8930,
    likes: 567,
    status: 'ACTIVE',
    createdAt: '2026-01-10T14:00:00Z',
    campaignStatus: 'COMPLETED',
  },
  {
    id: 'v3',
    title: '타로 연애운 긴급 점검',
    views: 0,
    likes: 0,
    status: 'PENDING',
    createdAt: '2026-01-17T09:00:00Z',
    campaignStatus: 'NONE',
  },
];

const statusConfig = {
  ACTIVE: { label: '활성', color: 'bg-green-100 text-green-700' },
  PENDING: { label: '검토 중', color: 'bg-yellow-100 text-yellow-700' },
  PAUSED: { label: '일시중지', color: 'bg-gray-100 text-gray-700' },
  REJECTED: { label: '반려됨', color: 'bg-red-100 text-red-700' },
};

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function CounselorMyVideosPage() {
  const [videos] = useState<MyVideo[]>(mockVideos);
  const [filter, setFilter] = useState('all');

  const filteredVideos = videos.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">내 홍보 영상</h1>
              <p className="mt-1 text-gray-600">
                제작된 홍보 영상을 관리하세요
              </p>
            </div>
            <Link
              href="/counselor/requests"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              + 새 영상 요청
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {['all', 'ACTIVE', 'PENDING', 'PAUSED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? '전체' : statusConfig[status as keyof typeof statusConfig]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video List */}
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow p-5">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-48 h-28 bg-gray-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                  🎬
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-lg">{video.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[video.status].color}`}>
                      {statusConfig[video.status].label}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <span>👁️ 조회 {formatNumber(video.views)}</span>
                    <span>💕 좋아요 {formatNumber(video.likes)}</span>
                    <span>📅 {formatDate(video.createdAt)}</span>
                  </div>

                  {video.campaignStatus && video.campaignStatus !== 'NONE' && (
                    <div className="mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        video.campaignStatus === 'ACTIVE'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        📣 광고 {video.campaignStatus === 'ACTIVE' ? '진행 중' : '완료'}
                      </span>
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      통계 보기
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      공유
                    </button>
                    {video.status === 'ACTIVE' && (
                      <button className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        광고 요청
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredVideos.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              해당 상태의 영상이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
