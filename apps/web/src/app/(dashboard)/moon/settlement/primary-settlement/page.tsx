'use client';

import { useState } from 'react';
import { formatDate, formatCurrency } from '@/lib/utils';

interface PrimarySettlement {
  id: string;
  freelancer: { id: string; name: string; email: string; bankInfo: string };
  projectTitle: string;
  versionTitle: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED';
  approvedAt: string;
  scheduledPayDate: string;
}

// Mock data
const mockSettlements: PrimarySettlement[] = [
  {
    id: 's1',
    freelancer: { id: 'f1', name: '박건우', email: 'park@example.com', bankInfo: '국민 ***-***-1234' },
    projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
    versionTitle: '경쾌한 톤 v2.0',
    amount: 150000,
    status: 'PENDING',
    approvedAt: '2026-01-17T10:00:00Z',
    scheduledPayDate: '2026-02-01',
  },
  {
    id: 's2',
    freelancer: { id: 'f2', name: '이지현', email: 'lee@example.com', bankInfo: '신한 ***-***-5678' },
    projectTitle: '2026 봄 타로 시즌 캠페인',
    versionTitle: '차분한 톤 v1.0',
    amount: 200000,
    status: 'PENDING',
    approvedAt: '2026-01-16T14:00:00Z',
    scheduledPayDate: '2026-02-01',
  },
  {
    id: 's3',
    freelancer: { id: 'f3', name: '최민수', email: 'choi@example.com', bankInfo: '우리 ***-***-9012' },
    projectTitle: '인간관계 고민 해결',
    versionTitle: '감성적 톤 v1.2',
    amount: 120000,
    status: 'COMPLETED',
    approvedAt: '2026-01-10T09:00:00Z',
    scheduledPayDate: '2026-01-01',
  },
];

const statusConfig = {
  PENDING: { label: '정산 대기', color: 'bg-yellow-100 text-yellow-700' },
  PROCESSING: { label: '처리 중', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: '완료', color: 'bg-green-100 text-green-700' },
};

export default function PrimarySettlementPage() {
  const [settlements, setSettlements] = useState<PrimarySettlement[]>(mockSettlements);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState({ status: 'PENDING' });

  const filteredSettlements = settlements.filter((s) => {
    if (filter.status !== 'all' && s.status !== filter.status) return false;
    return true;
  });

  const pendingSettlements = settlements.filter((s) => s.status === 'PENDING');
  const totalPendingAmount = pendingSettlements.reduce((sum, s) => sum + s.amount, 0);

  const handleSelectAll = () => {
    if (selectedIds.length === pendingSettlements.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingSettlements.map((s) => s.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleApproveSelected = async () => {
    if (selectedIds.length === 0) {
      alert('승인할 정산 건을 선택해주세요.');
      return;
    }

    const total = settlements
      .filter((s) => selectedIds.includes(s.id))
      .reduce((sum, s) => sum + s.amount, 0);

    if (!confirm(`총 ${formatCurrency(total)} (${selectedIds.length}건)을 승인하시겠습니까?`)) {
      return;
    }

    // TODO: API call to approve
    setSettlements((prev) =>
      prev.map((s) =>
        selectedIds.includes(s.id) ? { ...s, status: 'PROCESSING' as const } : s
      )
    );
    setSelectedIds([]);
    alert('정산 승인이 완료되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">1차 정산 (제작비)</h1>
          <p className="mt-1 text-gray-600">
            승인된 영상에 대한 제작비를 정산합니다. 매월 1일 자동 지급됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 mb-6 text-white">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-blue-200">다음 정산 예정</p>
              <p className="text-3xl font-bold mt-1">2026년 2월 1일</p>
            </div>
            <div>
              <p className="text-blue-200">대기 건수</p>
              <p className="text-3xl font-bold mt-1">{pendingSettlements.length}건</p>
            </div>
            <div>
              <p className="text-blue-200">총 정산 예정 금액</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalPendingAmount)}</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="PENDING">정산 대기</option>
                <option value="PROCESSING">처리 중</option>
                <option value="COMPLETED">완료</option>
                <option value="all">전체</option>
              </select>

              {selectedIds.length > 0 && (
                <span className="text-sm text-blue-600 font-medium">
                  {selectedIds.length}건 선택됨
                </span>
              )}
            </div>

            <button
              onClick={handleApproveSelected}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">프리랜서</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">프로젝트</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">버전</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">승인일</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">금액</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSettlements.map((settlement) => (
                <tr key={settlement.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    {settlement.status === 'PENDING' && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(settlement.id)}
                        onChange={() => handleSelect(settlement.id)}
                        className="rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{settlement.freelancer.name}</p>
                      <p className="text-sm text-gray-500">{settlement.freelancer.bankInfo}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {settlement.projectTitle}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {settlement.versionTitle}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(settlement.approvedAt)}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-green-600">
                    {formatCurrency(settlement.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[settlement.status].color}`}>
                      {statusConfig[settlement.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSettlements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              해당 조건의 정산 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
