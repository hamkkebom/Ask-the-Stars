'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency } from '@/lib/utils';
import { Wallet, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const payouts = [
  { id: '1', freelancer: '홍길동', amount: 850000, projects: 3, status: 'pending', date: '2026-01-15' },
  { id: '2', freelancer: '김영희', amount: 720000, projects: 2, status: 'approved', date: '2026-01-14' },
  { id: '3', freelancer: '이철수', amount: 580000, projects: 2, status: 'processing', date: '2026-01-13' },
  { id: '4', freelancer: '박지민', amount: 420000, projects: 1, status: 'completed', date: '2026-01-12' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '승인대기', color: 'bg-yellow-500/20 text-yellow-400' },
  approved: { label: '승인완료', color: 'bg-blue-500/20 text-blue-400' },
  processing: { label: '지급중', color: 'bg-purple-500/20 text-purple-400' },
  completed: { label: '지급완료', color: 'bg-green-500/20 text-green-400' },
};

export default function PayoutsPage() {
  const totalPending = payouts.filter(p => p.status === 'pending').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-green-400" />
          정산 관리
        </h1>
        <p className="text-gray-400 text-sm mt-1">프리랜서 정산을 처리합니다</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalPending)}</p>
          <p className="text-xs text-gray-400">승인 대기</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-white">4</p>
          <p className="text-xs text-gray-400">이번주 정산</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-green-400">12</p>
          <p className="text-xs text-gray-400">이번달 완료</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{formatCurrency(12500000)}</p>
          <p className="text-xs text-gray-400">이번달 총 지급</p>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-6 py-4 font-medium">프리랜서</th>
              <th className="px-6 py-4 font-medium">프로젝트</th>
              <th className="px-6 py-4 font-medium">금액</th>
              <th className="px-6 py-4 font-medium">요청일</th>
              <th className="px-6 py-4 font-medium">상태</th>
              <th className="px-6 py-4 font-medium">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payouts.map(payout => (
              <tr key={payout.id} className="hover:bg-white/5">
                <td className="px-6 py-4 text-white font-medium">{payout.freelancer}</td>
                <td className="px-6 py-4 text-gray-400">{payout.projects}건</td>
                <td className="px-6 py-4 text-primary font-medium">{formatCurrency(payout.amount)}</td>
                <td className="px-6 py-4 text-gray-400">{payout.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusMap[payout.status].color}`}>
                    {statusMap[payout.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {payout.status === 'pending' && (
                    <button className="text-sm text-primary hover:underline">승인</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
