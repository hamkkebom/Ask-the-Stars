'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  User,
  Video,
  DollarSign,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Mock 활동 로그
const mockActivityLogs = [
  {
    id: '1',
    type: 'video_approved',
    actor: '관리자',
    description: '영상 "브랜드 홍보 영상 v3" 승인 완료',
    timestamp: '2026-01-29 14:32',
    icon: CheckCircle,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: '2',
    type: 'payment_processed',
    actor: '시스템',
    description: '프리랜서 "김영상" 정산 ₩1,200,000 처리',
    timestamp: '2026-01-29 14:00',
    icon: DollarSign,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    id: '3',
    type: 'user_registered',
    actor: '시스템',
    description: '신규 프리랜서 "박크리에이터" 가입',
    timestamp: '2026-01-29 12:15',
    icon: User,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: '4',
    type: 'video_uploaded',
    actor: '이프리랜서',
    description: '영상 "제품 소개 영상" 업로드',
    timestamp: '2026-01-29 10:45',
    icon: Video,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: '5',
    type: 'settings_changed',
    actor: '관리자',
    description: '시스템 설정 변경: 정산 주기 수정',
    timestamp: '2026-01-28 16:30',
    icon: Settings,
    iconColor: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
  },
  {
    id: '6',
    type: 'warning',
    actor: '시스템',
    description: '스토리지 사용량 80% 도달',
    timestamp: '2026-01-27 09:00',
    icon: AlertTriangle,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
];

const filterTabs = [
  { id: 'all', label: '전체' },
  { id: 'video', label: '영상' },
  { id: 'payment', label: '정산' },
  { id: 'user', label: '사용자' },
  { id: 'system', label: '시스템' },
];

export default function ActivityLogPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">활동 로그</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#3f3f3f]">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-white border-white'
                : 'text-[#aaa] border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
          <input
            type="text"
            placeholder="활동 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#aaa] focus:outline-none focus:border-[#666]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
          <Filter className="w-4 h-4" />
          날짜 필터
        </button>
      </div>

      {/* Activity List */}
      <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
        <div className="divide-y divide-[#3f3f3f]">
          {mockActivityLogs.map((log) => {
            const Icon = log.icon;
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 hover:bg-[#3f3f3f] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${log.bgColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${log.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white">{log.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#666]">
                    <span>{log.actor}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-[#aaa] text-sm">총 156개 활동</span>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[#aaa] text-sm px-4">1 / 16</span>
          <button className="p-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
