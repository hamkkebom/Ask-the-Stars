'use client';

import { useState } from 'react';
import Link from 'next/link';

// 요청 상태 타입
type RequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// 임시 요청 데이터
const mockRequests = [
  {
    id: '1',
    title: '유튜브 브이로그 편집 요청',
    client: '김클라이언트',
    budget: 500000,
    deadline: '2026-02-15',
    status: 'PENDING' as RequestStatus,
    category: '유튜브',
    createdAt: '2026-01-20',
  },
  {
    id: '2',
    title: '기업 홍보 영상 제작',
    client: '(주)테크컴퍼니',
    budget: 2000000,
    deadline: '2026-03-01',
    status: 'IN_PROGRESS' as RequestStatus,
    category: '기업',
    createdAt: '2026-01-18',
  },
  {
    id: '3',
    title: '웨딩 하이라이트 영상',
    client: '이신랑',
    budget: 800000,
    deadline: '2026-02-28',
    status: 'COMPLETED' as RequestStatus,
    category: '웨딩',
    createdAt: '2026-01-15',
  },
  {
    id: '4',
    title: '온라인 강의 영상 편집',
    client: '박강사',
    budget: 300000,
    deadline: '2026-02-10',
    status: 'PENDING' as RequestStatus,
    category: '교육',
    createdAt: '2026-01-19',
  },
];

const statusLabels: Record<RequestStatus, string> = {
  PENDING: '대기중',
  IN_PROGRESS: '진행중',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

const statusColors: Record<RequestStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

export default function RequestsPage() {
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = mockRequests.filter((request) => {
    const matchesStatus = filterStatus === 'ALL' || request.status === filterStatus;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <span className="text-xl font-bold text-white">별들에게 물어봐</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login" className="text-white/70 hover:text-white transition">
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:opacity-90 transition"
            >
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">견적 요청</h1>
          <p className="text-white/60">프로젝트 요청을 확인하고 견적을 제출하세요</p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="제목 또는 클라이언트 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {(['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterStatus === status
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {status === 'ALL' ? '전체' : statusLabels[status]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Link
                key={request.id}
                href={`/requests/${request.id}`}
                className="block bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                        {statusLabels[request.status]}
                      </span>
                      <span className="text-white/40 text-sm">{request.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition">
                      {request.title}
                    </h3>
                    <p className="text-white/60 mt-1">
                      클라이언트: {request.client}
                    </p>
                  </div>
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {formatCurrency(request.budget)}
                    </div>
                    <div className="text-white/40 text-sm">
                      마감: {request.deadline}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-white mb-2">요청이 없습니다</h3>
              <p className="text-white/60">조건에 맞는 요청이 없습니다</p>
            </div>
          )}
        </div>

        {/* New Request Button (for clients) */}
        <div className="fixed bottom-8 right-8">
          <button className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition flex items-center gap-2">
            <span className="text-xl">+</span>
            <span>새 요청 작성</span>
          </button>
        </div>
      </main>
    </div>
  );
}
