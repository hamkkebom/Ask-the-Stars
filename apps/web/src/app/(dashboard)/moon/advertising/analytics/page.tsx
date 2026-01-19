'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

interface CampaignAnalytics {
  period: string;
  totalSpent: number;
  totalViews: number;
  totalClicks: number;
  totalConversions: number;
  avgCTR: number;
  avgCostPerClick: number;
  avgCostPerConversion: number;
  topCampaigns: { name: string; views: number; conversions: number }[];
  platformBreakdown: { platform: string; spent: number; views: number }[];
}

const mockAnalytics: CampaignAnalytics = {
  period: '2026년 1월',
  totalSpent: 1500000,
  totalViews: 250000,
  totalClicks: 12500,
  totalConversions: 875,
  avgCTR: 5.0,
  avgCostPerClick: 120,
  avgCostPerConversion: 1714,
  topCampaigns: [
    { name: '신년운세 대박 캠페인', views: 85000, conversions: 320 },
    { name: '타로 연애운 프로모션', views: 62000, conversions: 248 },
    { name: '봄 시즌 사전 예약', views: 45000, conversions: 180 },
  ],
  platformBreakdown: [
    { platform: 'YouTube', spent: 800000, views: 140000 },
    { platform: 'Instagram', spent: 450000, views: 75000 },
    { platform: 'Facebook', spent: 250000, views: 35000 },
  ],
};

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function AdvertisingAnalyticsPage() {
  const [analytics] = useState(mockAnalytics);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">광고 성과 분석</h1>
              <p className="mt-1 text-gray-600">{analytics.period} 기준</p>
            </div>
            <div className="flex gap-2">
              {['weekly', 'monthly', 'quarterly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period === 'weekly' ? '주간' : period === 'monthly' ? '월간' : '분기'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Main Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 광고비</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{formatCurrency(analytics.totalSpent)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 조회수</p>
            <p className="text-2xl font-bold mt-1">{formatNumber(analytics.totalViews)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 전환</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{formatNumber(analytics.totalConversions)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">평균 CTR</p>
            <p className="text-2xl font-bold mt-1">{analytics.avgCTR}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Cost Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">비용 효율</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">클릭당 비용 (CPC)</span>
                <span className="font-bold text-lg">{formatCurrency(analytics.avgCostPerClick)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">전환당 비용 (CPA)</span>
                <span className="font-bold text-lg">{formatCurrency(analytics.avgCostPerConversion)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">클릭수</span>
                <span className="font-bold text-lg">{formatNumber(analytics.totalClicks)}</span>
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">플랫폼별 성과</h2>
            <div className="space-y-3">
              {analytics.platformBreakdown.map((platform) => (
                <div key={platform.platform} className="flex items-center gap-4">
                  <div className="w-24 font-medium">{platform.platform}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${(platform.views / analytics.totalViews) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-600">
                    {formatNumber(platform.views)}
                  </div>
                  <div className="w-24 text-right text-sm font-medium">
                    {formatCurrency(platform.spent)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Campaigns */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">상위 캠페인</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">순위</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">캠페인</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">조회수</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">전환</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">전환율</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {analytics.topCampaigns.map((campaign, i) => (
                  <tr key={campaign.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className={`font-bold ${i === 0 ? 'text-yellow-500' : 'text-gray-600'}`}>
                        #{i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{campaign.name}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(campaign.views)}</td>
                    <td className="px-4 py-3 text-right text-green-600 font-medium">
                      {campaign.conversions}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {((campaign.conversions / campaign.views) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
