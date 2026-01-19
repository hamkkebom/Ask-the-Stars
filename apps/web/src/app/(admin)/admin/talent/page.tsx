'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Star,
  TrendingUp,
  Search,
  Filter,
  UserPlus,
  Award,
  Briefcase
} from 'lucide-react';

// Mock Data
const talentStats = {
  total: 156,
  active: 128,
  newThisMonth: 12,
  avgRating: 4.7,
};

const topTalent = [
  { id: '1', name: '홍길동', role: '영상편집', rating: 4.9, projects: 45, earnings: 8500000, status: 'active' },
  { id: '2', name: '김영희', role: '모션그래픽', rating: 4.8, projects: 38, earnings: 7200000, status: 'active' },
  { id: '3', name: '이철수', role: '섬네일디자인', rating: 4.7, projects: 32, earnings: 5800000, status: 'active' },
  { id: '4', name: '박지민', role: 'AI영상', rating: 4.9, projects: 28, earnings: 5200000, status: 'pending' },
  { id: '5', name: '최수정', role: '영상편집', rating: 4.6, projects: 25, earnings: 4500000, status: 'active' },
];

const skills = ['영상편집', '모션그래픽', '섬네일디자인', 'AI영상', '자막작업'];

export default function TalentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-400" />
            인재 허브
          </h1>
          <p className="text-gray-400 mt-1">150명+ 프리랜서 인재풀을 관리합니다</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 hover:scale-105">
          <UserPlus className="w-4 h-4" />
          인재 초대
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{talentStats.total}</p>
              <p className="text-sm text-gray-400">전체 인재</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{talentStats.active}</p>
              <p className="text-sm text-gray-400">활동 중</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{talentStats.avgRating}</p>
              <p className="text-sm text-gray-400">평균 평점</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <UserPlus className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">+{talentStats.newThisMonth}</p>
              <p className="text-sm text-gray-400">이번달 신규</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="인재 검색..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          {skills.slice(0, 4).map(skill => (
            <button
              key={skill}
              className="px-3 py-2 rounded-lg text-sm bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {skill}
            </button>
          ))}
          <button className="px-3 py-2 rounded-lg text-sm bg-white/5 text-gray-400 hover:bg-white/10 transition-colors flex items-center gap-1">
            <Filter className="w-4 h-4" />
            더보기
          </button>
        </div>
      </div>

      {/* Talent Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">인재</th>
                <th className="px-6 py-4 font-medium">역할</th>
                <th className="px-6 py-4 font-medium">평점</th>
                <th className="px-6 py-4 font-medium">프로젝트</th>
                <th className="px-6 py-4 font-medium">총 수익</th>
                <th className="px-6 py-4 font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topTalent.map((talent, index) => (
                <tr
                  key={talent.id}
                  className="hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium group-hover:text-primary transition-colors">
                        {talent.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/10 text-gray-300 text-sm">
                      {talent.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-yellow-400">
                    ⭐ {talent.rating}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {talent.projects}건
                  </td>
                  <td className="px-6 py-4 text-primary font-medium">
                    {formatCurrency(talent.earnings)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      talent.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {talent.status === 'active' ? '활동중' : '대기중'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
