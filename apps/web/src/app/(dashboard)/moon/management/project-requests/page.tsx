'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Copy } from 'lucide-react';

interface ProjectRequest {
  id: string;
  title: string;
  description: string;
  categories: string[];
  deadline: string;
  assignmentType: 'SINGLE' | 'MULTIPLE';
  maxAssignees: number;
  currentAssignees: number;
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELLED';
  estimatedBudget: number;
  createdAt: string;
  createdBy: { name: string };
  targetCounselor?: { name: string };
  acceptedBy: { id: string; name: string; submittedVersions: number }[];
}

// Mock data
const mockRequests: ProjectRequest[] = [
  {
    id: '1',
    title: '신년운세 × 신규 상담사 김태희 홍보',
    description: '2026년 신년운세 시즌 홍보 영상',
    categories: ['신년운세', '신규상담사'],
    deadline: '2026-01-25T23:59:59Z',
    assignmentType: 'MULTIPLE',
    maxAssignees: 3,
    currentAssignees: 2,
    status: 'OPEN',
    estimatedBudget: 150000,
    createdAt: '2026-01-15T10:00:00Z',
    createdBy: { name: '관리자' },
    targetCounselor: { name: '김태희' },
    acceptedBy: [
      { id: 'f1', name: '박건우', submittedVersions: 3 },
      { id: 'f2', name: '이지현', submittedVersions: 1 },
    ],
  },
  {
    id: '2',
    title: '2026 봄 타로 시즌 캠페인',
    description: '봄 시즌 타로 운세 홍보',
    categories: ['타로', '계절별'],
    deadline: '2026-02-10T23:59:59Z',
    assignmentType: 'SINGLE',
    maxAssignees: 1,
    currentAssignees: 1,
    status: 'FULL',
    estimatedBudget: 200000,
    createdAt: '2026-01-16T14:00:00Z',
    createdBy: { name: '관리자' },
    acceptedBy: [
      { id: 'f3', name: '최민수', submittedVersions: 2 },
    ],
  },
];

const statusConfig = {
  OPEN: { label: '모집 중', color: 'bg-green-100 text-green-700' },
  FULL: { label: '정원 마감', color: 'bg-blue-100 text-blue-700' },
  CLOSED: { label: '마감', color: 'bg-gray-100 text-gray-700' },
  CANCELLED: { label: '취소됨', color: 'bg-red-100 text-red-700' },
};

export default function ProjectRequestsPage() {
  const [requests, setRequests] = useState<ProjectRequest[]>(mockRequests);
  const [filter, setFilter] = useState({ status: 'all' });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleClone = (request: ProjectRequest) => {
    const newRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      title: `${request.title} (복사됨)`,
      createdAt: new Date().toISOString(),
      currentAssignees: 0,
      acceptedBy: [],
      status: 'OPEN' as const,
    };
    setRequests([newRequest, ...requests]);
    alert('제작 요청이 복제되었습니다.');
  };

  const filteredRequests = requests.filter((req) => {
    if (filter.status !== 'all' && req.status !== filter.status) return false;
    return true;
  });

  const stats = {
    total: requests.length,
    open: requests.filter((r) => r.status === 'OPEN').length,
    full: requests.filter((r) => r.status === 'FULL').length,
    closed: requests.filter((r) => r.status === 'CLOSED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">제작요청 관리</h1>
              <p className="mt-1 text-gray-600">
                프리랜서들에게 영상 제작을 요청하고 진행 상황을 관리합니다
              </p>
            </div>

            <Link
              href="/moon/management/project-requests/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              + 새 제작요청
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">전체</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-green-600">모집 중</p>
            <p className="text-2xl font-bold text-green-600">{stats.open}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-blue-600">정원 마감</p>
            <p className="text-2xl font-bold text-blue-600">{stats.full}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">완료</p>
            <p className="text-2xl font-bold text-gray-500">{stats.closed}</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">필터:</span>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">전체 상태</option>
              <option value="OPEN">모집 중</option>
              <option value="FULL">정원 마감</option>
              <option value="CLOSED">마감</option>
              <option value="CANCELLED">취소됨</option>
            </select>
          </div>
        </div>

        {/* Request Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">제목</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">상태</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">제작방식</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">수락현황</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">마감일</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">예산</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <Link
                        href={`/moon/management/project-requests/detail/${request.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {request.title}
                      </Link>
                      <div className="flex gap-1 mt-1">
                        {request.categories.map((cat) => (
                          <span key={cat} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[request.status].color}`}>
                      {statusConfig[request.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {request.assignmentType === 'MULTIPLE' ? '🔁 중복' : '👤 독점'}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="font-medium">{request.currentAssignees}</span>
                    <span className="text-gray-500">/{request.maxAssignees}</span>
                    {request.acceptedBy.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {request.acceptedBy.map((f) => f.name).join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(request.deadline)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-green-600">
                    {formatCurrency(request.estimatedBudget)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/moon/management/project-requests/detail/${request.id}`}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        상세
                      </Link>
                      <button
                        onClick={() => handleClone(request)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"
                        title="복제"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {request.status === 'OPEN' && (
                        <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                          마감
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              조건에 맞는 제작요청이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
