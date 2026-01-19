'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';

interface Freelancer {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  joinedAt: string;
  projectsCompleted: number;
  approvalRate: number;
  totalEarnings: number;
  ranking: number;
}

const mockFreelancers: Freelancer[] = [
  {
    id: 'f1',
    name: '박건우',
    email: 'park@example.com',
    status: 'ACTIVE',
    joinedAt: '2025-06-15',
    projectsCompleted: 45,
    approvalRate: 92,
    totalEarnings: 6750000,
    ranking: 3,
  },
  {
    id: 'f2',
    name: '이지현',
    email: 'lee@example.com',
    status: 'ACTIVE',
    joinedAt: '2025-08-20',
    projectsCompleted: 32,
    approvalRate: 88,
    totalEarnings: 4800000,
    ranking: 8,
  },
  {
    id: 'f3',
    name: '최민수',
    email: 'choi@example.com',
    status: 'INACTIVE',
    joinedAt: '2025-04-10',
    projectsCompleted: 28,
    approvalRate: 85,
    totalEarnings: 4200000,
    ranking: 12,
  },
];

const statusConfig = {
  ACTIVE: { label: '활성', color: 'bg-green-100 text-green-700' },
  INACTIVE: { label: '비활성', color: 'bg-gray-100 text-gray-700' },
  PENDING: { label: '대기', color: 'bg-yellow-100 text-yellow-700' },
};

export default function FreelancersPage() {
  const [freelancers] = useState<Freelancer[]>(mockFreelancers);
  const [filter, setFilter] = useState({ status: 'all', sort: 'ranking' });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFreelancers = freelancers
    .filter((f) => {
      if (filter.status !== 'all' && f.status !== filter.status) return false;
      if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (filter.sort === 'ranking') return a.ranking - b.ranking;
      if (filter.sort === 'earnings') return b.totalEarnings - a.totalEarnings;
      if (filter.sort === 'projects') return b.projectsCompleted - a.projectsCompleted;
      return 0;
    });

  const activeCount = freelancers.filter((f) => f.status === 'ACTIVE').length;
  const totalEarnings = freelancers.reduce((sum, f) => sum + f.totalEarnings, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">프리랜서 관리</h1>
          <p className="mt-1 text-gray-600">
            등록된 프리랜서를 관리하고 성과를 확인합니다
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">전체 인원</p>
            <p className="text-2xl font-bold mt-1">{freelancers.length}명</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-green-600">활성</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{activeCount}명</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">총 완료 프로젝트</p>
            <p className="text-2xl font-bold mt-1">
              {freelancers.reduce((sum, f) => sum + f.projectsCompleted, 0)}건
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">누적 정산</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{formatCurrency(totalEarnings)}</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름 검색..."
              className="border rounded-lg px-3 py-2 text-sm w-64"
            />
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">전체 상태</option>
              <option value="ACTIVE">활성</option>
              <option value="INACTIVE">비활성</option>
              <option value="PENDING">대기</option>
            </select>
            <select
              value={filter.sort}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="ranking">순위순</option>
              <option value="earnings">정산액순</option>
              <option value="projects">프로젝트순</option>
            </select>
          </div>
        </div>

        {/* Freelancer Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">순위</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">이름</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">상태</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">완료</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">승인율</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">누적 정산</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">가입일</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFreelancers.map((freelancer) => (
                <tr key={freelancer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className={`font-bold ${
                      freelancer.ranking <= 3 ? 'text-yellow-500' : 'text-gray-600'
                    }`}>
                      #{freelancer.ranking}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{freelancer.name}</p>
                      <p className="text-sm text-gray-500">{freelancer.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[freelancer.status].color}`}>
                      {statusConfig[freelancer.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">{freelancer.projectsCompleted}건</td>
                  <td className="px-4 py-4 text-center">
                    <span className={freelancer.approvalRate >= 90 ? 'text-green-600 font-medium' : ''}>
                      {freelancer.approvalRate}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-blue-600">
                    {formatCurrency(freelancer.totalEarnings)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {freelancer.joinedAt}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                        상세
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        메시지
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFreelancers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              조건에 맞는 프리랜서가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
