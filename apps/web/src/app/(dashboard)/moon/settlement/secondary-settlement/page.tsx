'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface SecondarySettlement {
  id: string;
  freelancer: { id: string; name: string };
  quarterYear: number;
  quarterNumber: number;
  projectCount: number;
  totalViews: number;
  totalConversions: number;
  baseAmount: number;
  bonusAmount: number;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
}

const mockSettlements: SecondarySettlement[] = [
  {
    id: 's1',
    freelancer: { id: 'f1', name: '박건우' },
    quarterYear: 2025,
    quarterNumber: 4,
    projectCount: 12,
    totalViews: 156000,
    totalConversions: 2340,
    baseAmount: 120000,
    bonusAmount: 80000,
    totalAmount: 200000,
    status: 'PENDING',
  },
  {
    id: 's2',
    freelancer: { id: 'f2', name: '이지현' },
    quarterYear: 2025,
    quarterNumber: 4,
    projectCount: 8,
    totalViews: 89000,
    totalConversions: 1120,
    baseAmount: 80000,
    bonusAmount: 35000,
    totalAmount: 115000,
    status: 'PENDING',
  },
  {
    id: 's3',
    freelancer: { id: 'f3', name: '최민수' },
    quarterYear: 2025,
    quarterNumber: 3,
    projectCount: 10,
    totalViews: 120000,
    totalConversions: 1890,
    baseAmount: 100000,
    bonusAmount: 60000,
    totalAmount: 160000,
    status: 'COMPLETED',
  },
];

const statusConfig = {
  PENDING: { label: '정산 대기', color: 'bg-yellow-100 text-yellow-700' },
  PROCESSING: { label: '처리 중', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: '완료', color: 'bg-green-100 text-green-700' },
};

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function SecondarySettlementPage() {
  const [settlements] = useState<SecondarySettlement[]>(mockSettlements);
  const [selectedQuarter, setSelectedQuarter] = useState('2025-Q4');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const pendingSettlements = settlements.filter((s) => s.status === 'PENDING');
  const totalPendingAmount = pendingSettlements.reduce((sum, s) => sum + s.totalAmount, 0);

  const handleSelectAll = () => {
    if (selectedIds.length === pendingSettlements.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingSettlements.map((s) => s.id));
    }
  };

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    const total = settlements
      .filter((s) => selectedIds.includes(s.id))
      .reduce((sum, s) => sum + s.totalAmount, 0);
    if (confirm(`총 ${formatCurrency(total)} (${selectedIds.length}건)을 승인하시겠습니까?`)) {
      alert('2차 정산 승인이 완료되었습니다.');
      setSelectedIds([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">2차 정산 (인센티브)</h1>
          <p className="mt-1 text-gray-600">
            분기별 광고 성과에 따른 인센티브를 정산합니다
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow p-6 mb-6 text-white">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-purple-200">현재 분기</p>
              <p className="text-3xl font-bold mt-1">2025 Q4</p>
            </div>
            <div>
              <p className="text-purple-200">정산 예정</p>
              <p className="text-3xl font-bold mt-1">12월 31일</p>
            </div>
            <div>
              <p className="text-purple-200">대기 건수</p>
              <p className="text-3xl font-bold mt-1">{pendingSettlements.length}건</p>
            </div>
            <div>
              <p className="text-purple-200">총 인센티브</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalPendingAmount)}</p>
            </div>
          </div>
        </div>

        {/* Quarter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {['2025-Q4', '2025-Q3', '2025-Q2', '2025-Q1'].map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-6 py-3 font-medium text-sm ${
                  selectedQuarter === q
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedIds.length > 0 ? `${selectedIds.length}건 선택됨` : '정산 대기 목록'}
              </span>
            </div>
            <button
              onClick={handleApproveSelected}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              ✅ 선택 항목 승인
            </button>
          </div>
        </div>

        {/* Settlement Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === pendingSettlements.length && pendingSettlements.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">프리랜서</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">분기</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">프로젝트</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">총 조회수</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">전환</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">기본</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">보너스</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">합계</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {settlements.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    {s.status === 'PENDING' && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(s.id)}
                        onChange={() => setSelectedIds((prev) =>
                          prev.includes(s.id) ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                        )}
                      />
                    )}
                  </td>
                  <td className="px-4 py-4 font-medium">{s.freelancer.name}</td>
                  <td className="px-4 py-4 text-sm">{s.quarterYear} Q{s.quarterNumber}</td>
                  <td className="px-4 py-4 text-center">{s.projectCount}건</td>
                  <td className="px-4 py-4 text-center">{formatNumber(s.totalViews)}</td>
                  <td className="px-4 py-4 text-center">{formatNumber(s.totalConversions)}</td>
                  <td className="px-4 py-4 text-right text-sm">{formatCurrency(s.baseAmount)}</td>
                  <td className="px-4 py-4 text-right text-sm text-purple-600">+{formatCurrency(s.bonusAmount)}</td>
                  <td className="px-4 py-4 text-right font-bold text-green-600">{formatCurrency(s.totalAmount)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[s.status].color}`}>
                      {statusConfig[s.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Incentive Rules */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">인센티브 규칙</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">조회수 기준</p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>10K+: +₩10,000</li>
                <li>50K+: +₩30,000</li>
                <li>100K+: +₩50,000</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">전환율 기준</p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>3%+: +₩15,000</li>
                <li>5%+: +₩30,000</li>
                <li>8%+: +₩50,000</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">특별 보너스</p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>분기 MVP: +₩100,000</li>
                <li>신규 최다: +₩50,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
