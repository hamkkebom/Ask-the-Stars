'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Play,
  MoreVertical,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Download,
} from 'lucide-react';

// Mock 영상 데이터
const mockVideos = [
  {
    id: '1',
    title: '삼성 브랜드 스토리',
    thumbnail: null,
    status: 'public',
    statusLabel: '공개',
    views: 1234,
    uploadedAt: '2026-01-28',
    freelancer: '김영상',
    client: '삼성전자',
  },
  {
    id: '2',
    title: 'LG 신제품 런칭',
    thumbnail: null,
    status: 'public',
    statusLabel: '공개',
    views: 856,
    uploadedAt: '2026-01-26',
    freelancer: '이크리에이터',
    client: 'LG전자',
  },
  {
    id: '3',
    title: '현대 기업 PR',
    thumbnail: null,
    status: 'private',
    statusLabel: '비공개',
    views: 0,
    uploadedAt: '2026-01-24',
    freelancer: '박프로',
    client: '현대자동차',
  },
  {
    id: '4',
    title: 'SK 연말행사 하이라이트',
    thumbnail: null,
    status: 'reviewing',
    statusLabel: '검수중',
    views: 0,
    uploadedAt: '2026-01-22',
    freelancer: '최에디터',
    client: 'SK하이닉스',
  },
];

const statusTabs = [
  { id: 'all', label: '전체', count: mockVideos.length },
  { id: 'public', label: '공개', count: mockVideos.filter(v => v.status === 'public').length },
  { id: 'private', label: '비공개', count: mockVideos.filter(v => v.status === 'private').length },
  { id: 'reviewing', label: '검수중', count: mockVideos.filter(v => v.status === 'reviewing').length },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'public':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'private':
      return <XCircle className="w-4 h-4 text-gray-400" />;
    case 'reviewing':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    default:
      return null;
  }
}

export default function AdminVideosPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const filteredVideos = mockVideos.filter(video => {
    if (activeTab !== 'all' && video.status !== activeTab) return false;
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">영상 자산</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
          <Download className="w-4 h-4" />
          내보내기
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <p className="text-[#aaa] text-sm">전체 영상</p>
          <p className="text-2xl font-bold text-white mt-1">542</p>
        </div>
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <p className="text-[#aaa] text-sm">총 조회수</p>
          <p className="text-2xl font-bold text-white mt-1">12.4K</p>
        </div>
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <p className="text-[#aaa] text-sm">R2 저장 용량</p>
          <p className="text-2xl font-bold text-white mt-1">1.2TB</p>
        </div>
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <p className="text-[#aaa] text-sm">이번달 업로드</p>
          <p className="text-2xl font-bold text-white mt-1">24</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#3f3f3f]">
        {statusTabs.map((tab) => (
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
            <span className="ml-2 text-[#666]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
          <input
            type="text"
            placeholder="영상 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#aaa] focus:outline-none focus:border-[#666]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] border border-[#3f3f3f] rounded-lg text-[#aaa] hover:bg-[#3f3f3f] transition-colors">
          <Filter className="w-4 h-4" />
          필터
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_120px_100px_120px_120px_40px] gap-4 px-4 py-3 border-b border-[#3f3f3f] text-sm text-[#aaa]">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#666] bg-transparent"
            />
          </div>
          <div>영상</div>
          <div>상태</div>
          <div>조회수</div>
          <div>제작자</div>
          <div>업로드</div>
          <div></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#3f3f3f]">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="grid grid-cols-[auto_1fr_120px_100px_120px_120px_40px] gap-4 px-4 py-3 items-center hover:bg-[#3f3f3f] transition-colors"
            >
              <div>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#666] bg-transparent"
                />
              </div>

              <Link href={`/admin/videos/${video.id}`} className="flex items-center gap-3 group">
                <div className="w-28 h-16 bg-[#3f3f3f] rounded-lg flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-[#666]" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </p>
                  <p className="text-[#aaa] text-sm truncate">{video.client}</p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                {getStatusIcon(video.status)}
                <span className="text-sm text-[#aaa]">{video.statusLabel}</span>
              </div>

              <div className="text-white text-sm">
                {video.views > 0 ? (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#666]" />
                    {video.views.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[#666]">-</span>
                )}
              </div>

              <div className="text-[#aaa] text-sm truncate">
                {video.freelancer}
              </div>

              <div className="text-[#aaa] text-sm">
                {video.uploadedAt}
              </div>

              <div>
                <button className="p-1 hover:bg-[#272727] rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-[#aaa]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
