'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';

const requests = [
  { id: '1', title: '신년 운세 숏폼', client: '타로TV', budget: 350000, deadline: '2026-01-20', status: 'pending' },
  { id: '2', title: '봄맞이 타로 시리즈', client: '운세마스터', budget: 1200000, deadline: '2026-02-01', status: 'assigned' },
  { id: '3', title: '연애운 특집', client: '러브타로', budget: 450000, deadline: '2026-01-25', status: 'pending' },
  { id: '4', title: '재물운 분석', client: '금전운닷컴', budget: 280000, deadline: '2026-01-22', status: 'completed' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '대기중', color: 'bg-yellow-500/20 text-yellow-400' },
  assigned: { label: '배정됨', color: 'bg-blue-500/20 text-blue-400' },
  completed: { label: '완료', color: 'bg-green-500/20 text-green-400' },
};

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            제작요청 관리
          </h1>
          <p className="text-gray-400 text-sm mt-1">모든 제작 요청을 확인하고 배정합니다</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색..."
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500"
            />
          </div>
          <button className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-xs text-gray-400">전체 요청</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">5</p>
          <p className="text-xs text-gray-400">대기중</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">4</p>
          <p className="text-xs text-gray-400">진행중</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-green-400">3</p>
          <p className="text-xs text-gray-400">완료</p>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-6 py-4 font-medium">제목</th>
              <th className="px-6 py-4 font-medium">클라이언트</th>
              <th className="px-6 py-4 font-medium">예산</th>
              <th className="px-6 py-4 font-medium">마감일</th>
              <th className="px-6 py-4 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map(req => (
              <tr key={req.id} className="hover:bg-white/5 cursor-pointer group">
                <td className="px-6 py-4 text-white font-medium group-hover:text-primary">{req.title}</td>
                <td className="px-6 py-4 text-gray-400">{req.client}</td>
                <td className="px-6 py-4 text-primary">{formatCurrency(req.budget)}</td>
                <td className="px-6 py-4 text-gray-400">{req.deadline}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusMap[req.status].color}`}>
                    {statusMap[req.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
