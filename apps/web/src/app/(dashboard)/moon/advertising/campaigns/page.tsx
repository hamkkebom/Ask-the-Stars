'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';

interface Campaign {
  id: string;
  name: string;
  videoTitle: string;
  platforms: string[];
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  metrics: {
    views: number;
    clicks: number;
    conversions: number;
  };
}

const mockCampaigns: Campaign[] = [
  {
    id: 'c1',
    name: '신년운세 대박 캠페인',
    videoTitle: '2026 신년운세 - 하반기 대박 운세',
    platforms: ['YouTube', 'Instagram'],
    budget: 500000,
    spent: 320000,
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    status: 'ACTIVE',
    metrics: { views: 45000, clicks: 2250, conversions: 180 },
  },
  {
    id: 'c2',
    name: '타로 연애운 프로모션',
    videoTitle: '타로로 보는 2026 연애운',
    platforms: ['Instagram', 'Facebook'],
    budget: 300000,
    spent: 300000,
    startDate: '2025-12-15',
    endDate: '2025-12-31',
    status: 'COMPLETED',
    metrics: { views: 32000, clicks: 1600, conversions: 128 },
  },
  {
    id: 'c3',
    name: '봄 시즌 사전 예약',
    videoTitle: '봄 운세 미리보기',
    platforms: ['YouTube'],
    budget: 200000,
    spent: 0,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'SCHEDULED',
    metrics: { views: 0, clicks: 0, conversions: 0 },
  },
];

const statusConfig = {
  DRAFT: { label: '초안', color: 'bg-gray-100 text-gray-700' },
  SCHEDULED: { label: '예정', color: 'bg-blue-100 text-blue-700' },
  ACTIVE: { label: '진행 중', color: 'bg-green-100 text-green-700' },
  PAUSED: { label: '일시중지', color: 'bg-yellow-100 text-yellow-700' },
  COMPLETED: { label: '완료', color: 'bg-purple-100 text-purple-700' },
};

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function CampaignsPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [filter, setFilter] = useState('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE');
  const totalBudget = activeCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = activeCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalViews = activeCampaigns.reduce((sum, c) => sum + c.metrics.views, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">광고 캠페인 관리</h1>
              <p className="mt-1 text-gray-600">
                영상 광고 캠페인을 생성하고 성과를 분석합니다
              </p>
            </div>
            <Link
              href="/moon/advertising/campaigns/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              + 새 캠페인
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">진행 중 캠페인</p>
            <p className="text-2xl font-bold mt-1">{activeCampaigns.length}개</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 예산</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(totalBudget)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">집행 금액</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{formatCurrency(totalSpent)}</p>
            <p className="text-xs text-gray-400">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% 소진</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 조회수</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{formatNumber(totalViews)}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {['all', 'ACTIVE', 'SCHEDULED', 'COMPLETED', 'PAUSED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? '전체' : statusConfig[status as keyof typeof statusConfig]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => {
            const ctr = campaign.metrics.views > 0
              ? ((campaign.metrics.clicks / campaign.metrics.views) * 100).toFixed(2)
              : '0.00';
            const conversionRate = campaign.metrics.clicks > 0
              ? ((campaign.metrics.conversions / campaign.metrics.clicks) * 100).toFixed(2)
              : '0.00';

            return (
              <div key={campaign.id} className="bg-white rounded-lg shadow p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{campaign.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[campaign.status].color}`}>
                        {statusConfig[campaign.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      🎬 {campaign.videoTitle}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {campaign.platforms.map((p) => (
                      <span key={p} className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>예산 소진</span>
                    <span>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-5 gap-4 py-4 border-t border-b">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">조회수</p>
                    <p className="text-lg font-bold">{formatNumber(campaign.metrics.views)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">클릭</p>
                    <p className="text-lg font-bold">{formatNumber(campaign.metrics.clicks)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">CTR</p>
                    <p className="text-lg font-bold text-blue-600">{ctr}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">전환</p>
                    <p className="text-lg font-bold">{formatNumber(campaign.metrics.conversions)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">전환율</p>
                    <p className="text-lg font-bold text-green-600">{conversionRate}%</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    📅 {campaign.startDate} ~ {campaign.endDate}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/moon/advertising/campaigns/${campaign.id}`}
                      className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      상세보기
                    </Link>
                    {campaign.status === 'ACTIVE' && (
                      <button className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
                        일시중지
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCampaigns.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              해당 상태의 캠페인이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
