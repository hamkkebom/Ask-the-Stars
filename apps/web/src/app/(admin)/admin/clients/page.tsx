'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Building2,
  Users,
  TrendingUp,
  Search,
  Star,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// Tabs
type Tab = 'agencies' | 'counselors';

// Mock Data
const agencies = [
  { id: '1', name: '(주)타로미디어', type: '콘텐츠 대행', projects: 15, rating: 4.8, status: 'active' },
  { id: '2', name: '운세컴퍼니', type: '마케팅 대행', projects: 12, rating: 4.6, status: 'active' },
  { id: '3', name: '스타라이트', type: '영상 제작', projects: 8, rating: 4.9, status: 'active' },
];

const counselors = [
  { id: '1', name: '김태희', specialty: '타로', videos: 48, subscribers: 125000, rating: 4.9 },
  { id: '2', name: '이민호', specialty: '사주', videos: 35, subscribers: 89000, rating: 4.7 },
  { id: '3', name: '박소연', specialty: '신점', videos: 28, subscribers: 67000, rating: 4.8 },
];

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('agencies');

  const stats = activeTab === 'agencies'
    ? { total: 24, active: 18, newThisMonth: 3 }
    : { total: 500, active: 380, newThisMonth: 28 };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-8 h-8 text-emerald-400" />
          클라이언트 관리
        </h1>
        <p className="text-gray-400 mt-1">대행업체와 상담사를 관리합니다</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
        {[
          { key: 'agencies', label: '대행업체', icon: Building2 },
          { key: 'counselors', label: '상담사', icon: Users },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
              activeTab === tab.key
                ? "bg-primary text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-gray-400">전체</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-400">활동 중</p>
        </GlassCard>
        <GlassCard className="p-5 hover:scale-105 transition-transform">
          <p className="text-3xl font-bold text-blue-400">+{stats.newThisMonth}</p>
          <p className="text-sm text-gray-400">이번달 신규</p>
        </GlassCard>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={`${activeTab === 'agencies' ? '대행업체' : '상담사'} 검색...`}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Content */}
      {activeTab === 'agencies' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agencies.map(agency => (
            <GlassCard key={agency.id} className="p-5 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400">
                  활동중
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                {agency.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{agency.type}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{agency.projects}개 프로젝트</span>
                <span className="text-yellow-400">⭐ {agency.rating}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {counselors.map(counselor => (
            <GlassCard key={counselor.id} className="p-5 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {counselor.name[0]}
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-primary transition-colors">
                    {counselor.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{counselor.specialty} 전문</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">영상</p>
                  <p className="text-white font-medium">{counselor.videos}개</p>
                </div>
                <div>
                  <p className="text-gray-500">구독자</p>
                  <p className="text-white font-medium">{(counselor.subscribers / 1000).toFixed(0)}K</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-yellow-400">⭐ {counselor.rating}</span>
                <button className="text-primary text-sm hover:underline">상세보기</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
