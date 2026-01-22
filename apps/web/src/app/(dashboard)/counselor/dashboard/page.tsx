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
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule - Highlighted */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl">📅</span>
              </div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                오늘의 일정
                <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">3건</span>
              </h2>
              <div className="space-y-3 relative z-10">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-purple-900">김철수님 상담</span>
                    <span className="text-xs text-purple-600 font-bold">14:00</span>
                  </div>
                  <p className="text-xs text-purple-500">신년운세 종합 (30분)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-700">이영희님 상담</span>
                    <span className="text-xs text-gray-500">16:30</span>
                  </div>
                  <p className="text-xs text-gray-400">타로 연애운 (15분)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-700">박지성님 상담</span>
                    <span className="text-xs text-gray-500">19:00</span>
                  </div>
                  <p className="text-xs text-gray-400">사주 직업운 (60분)</p>
                </div>
              </div>
            </div>

            {/* Inquiries & Q&A - With Badge */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">문의 관리</h2>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-bold text-red-500">5건 미답변</span>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/counselor/inquiries" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">상품 문의</span>
                    <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded">New</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">혹시 전화 상담도 가능한가요?</p>
                </Link>
                <div className="h-px bg-gray-100 my-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/counselor/requests"
                    className="py-2 px-3 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 text-center"
                  >
                    새 영상 요청
                  </Link>
                  <Link
                    href="/counselor/profile"
                    className="py-2 px-3 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 text-center"
                  >
                    프로필 수정
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity (Simplified) */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-3">최근 활동</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-gray-700">영상 &quot;신년운세&quot; 승인됨</p>
                    <p className="text-gray-400 text-xs">2시간 전</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⭐</span>
                  <div>
                    <p className="text-gray-700">5점 리뷰 도착</p>
                    <p className="text-gray-400 text-xs">어제</p>
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
