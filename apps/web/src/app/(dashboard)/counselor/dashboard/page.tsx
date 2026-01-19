'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';

interface VideoStats {
  id: string;
  title: string;
  views: number;
  likes: number;
  conversions: number;
  status: 'ACTIVE' | 'PENDING' | 'PAUSED';
  createdAt: string;
}

const mockVideos: VideoStats[] = [
  {
    id: 'v1',
    title: '2026 신년운세 - 하반기 대박 운세',
    views: 15420,
    likes: 892,
    conversions: 145,
    status: 'ACTIVE',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'v2',
    title: '사주로 보는 2026 재물운',
    views: 8930,
    likes: 567,
    conversions: 89,
    status: 'ACTIVE',
    createdAt: '2026-01-10T14:00:00Z',
  },
  {
    id: 'v3',
    title: '타로 연애운 긴급 점검',
    views: 5600,
    likes: 321,
    conversions: 42,
    status: 'PENDING',
    createdAt: '2025-12-28T09:00:00Z',
  },
];

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function CounselorDashboardPage() {
  const [videos] = useState<VideoStats[]>(mockVideos);

  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0);
  const totalConversions = videos.reduce((sum, v) => sum + v.conversions, 0);
  const conversionRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <h1 className="text-2xl font-bold">상담사 대시보드</h1>
          <p className="mt-1 text-purple-200">
            내 홍보 영상의 성과를 확인하세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 조회수</p>
            <p className="text-2xl font-bold mt-1">{formatNumber(totalViews)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 좋아요</p>
            <p className="text-2xl font-bold mt-1 text-pink-600">💕 {formatNumber(totalLikes)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">상담 전환</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{formatNumber(totalConversions)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">전환율</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{conversionRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Video List */}
          <div className="col-span-2 bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">내 홍보 영상</h2>
              <Link
                href="/counselor/my-videos"
                className="text-sm text-blue-600 hover:underline"
              >
                전체보기 →
              </Link>
            </div>
            <div className="divide-y">
              {videos.map((video) => (
                <div key={video.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-2xl">
                      🎬
                    </div>
                    <div>
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-sm text-gray-500">
                        조회 {formatNumber(video.views)} · 좋아요 {formatNumber(video.likes)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    video.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-700'
                      : video.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {video.status === 'ACTIVE' ? '활성' : video.status === 'PENDING' ? '검토중' : '일시중지'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">빠른 메뉴</h2>
              <div className="space-y-2">
                <Link
                  href="/counselor/requests"
                  className="block w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 text-center"
                >
                  🎬 새 영상 제작 요청
                </Link>
                <Link
                  href="/counselor/profile"
                  className="block w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-center"
                >
                  👤 프로필 수정
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">최근 알림</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <div>
                    <p>새 영상 &quot;신년운세&quot;가 승인되었습니다</p>
                    <p className="text-gray-500 text-xs">2시간 전</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">💬</span>
                  <div>
                    <p>새 상담 요청 3건</p>
                    <p className="text-gray-500 text-xs">오늘</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <div>
                    <p>새 리뷰 5개</p>
                    <p className="text-gray-500 text-xs">이번 주</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
