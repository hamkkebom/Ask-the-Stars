'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { videosApi, VideoDetails } from '@/lib/api/videos';
import {
  Search,
  Filter,
  Play,
  MoreVertical,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Loader2,
} from 'lucide-react';

const statusTabs = [
  { id: 'all', label: '전체' },
  { id: 'PUBLIC', label: '공개됨' },
  { id: 'APPROVED', label: '승인됨' },
  { id: 'REVIEWING', label: '검수중' },
  { id: 'FEEDBACK', label: '피드백' },
  { id: 'DRAFT', label: '초안' },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'PUBLIC':
    case 'APPROVED':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'REVIEWING':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    case 'FEEDBACK':
      return <MessageSquare className="w-4 h-4 text-orange-400" />;
    case 'DRAFT':
      return <AlertCircle className="w-4 h-4 text-gray-400" />;
    default:
      return null;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'PUBLIC': return '공개됨';
    case 'APPROVED': return '승인됨';
    case 'REVIEWING': return '검수중';
    case 'FEEDBACK': return '피드백';
    case 'DRAFT': return '초안';
    default: return status;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'PUBLIC':
    case 'APPROVED':
      return 'text-green-400';
    case 'REVIEWING':
      return 'text-yellow-400';
    case 'FEEDBACK':
      return 'text-orange-400';
    case 'DRAFT':
      return 'text-gray-400';
    default:
      return 'text-white';
  }
}

export default function MyVideosPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [videos, setVideos] = useState<VideoDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase에서 영상 데이터 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await videosApi.getMyVideos(
          user.id,
          activeTab !== 'all' ? activeTab : undefined
        );
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user, activeTab]);

  // 검색 필터링
  const filteredVideos = videos.filter(video => {
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // 탭별 카운트 계산
  const getCounts = () => {
    const counts: Record<string, number> = { all: videos.length };
    videos.forEach(v => {
      counts[v.status] = (counts[v.status] || 0) + 1;
    });
    return counts;
  };
  const counts = getCounts();

  const toggleSelectAll = () => {
    if (selectedVideos.length === filteredVideos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(filteredVideos.map(v => v.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(prev => prev.filter(v => v !== id));
    } else {
      setSelectedVideos(prev => [...prev, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">채널 콘텐츠</h1>
        <Link
          href="/stars/upload"
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          업로드
        </Link>
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
            <span className="ml-2 text-[#666]">{counts[tab.id] || 0}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
          <input
            type="text"
            placeholder="검색"
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

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#aaa] animate-spin" />
        </div>
      )}

      {/* Table */}
      {!loading && filteredVideos.length > 0 && (
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_120px_100px_120px_40px] gap-4 px-4 py-3 border-b border-[#3f3f3f] text-sm text-[#aaa]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedVideos.length === filteredVideos.length && filteredVideos.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-[#666] bg-transparent"
              />
            </div>
            <div>동영상</div>
            <div>공개 상태</div>
            <div>조회수</div>
            <div>날짜</div>
            <div></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#3f3f3f]">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className={`grid grid-cols-[auto_1fr_120px_100px_120px_40px] gap-4 px-4 py-3 items-center hover:bg-[#3f3f3f] transition-colors ${
                  selectedVideos.includes(video.id) ? 'bg-[#272727]' : ''
                }`}
              >
                {/* Checkbox */}
                <div>
                  <input
                    type="checkbox"
                    checked={selectedVideos.includes(video.id)}
                    onChange={() => toggleSelect(video.id)}
                    className="w-4 h-4 rounded border-[#666] bg-transparent"
                  />
                </div>

                {/* Video Info */}
                <Link href={`/stars/my-videos/${video.id}`} className="flex items-center gap-3 group">
                  <div className="w-28 h-16 bg-[#3f3f3f] rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Play className="w-5 h-5 text-[#666]" />
                    )}
                    {video.duration && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-[10px] text-white">
                        {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </p>
                    <p className="text-[#aaa] text-sm truncate">
                      {video.project?.title || video.category || '-'}
                    </p>
                  </div>
                </Link>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {getStatusIcon(video.status)}
                  <span className={`text-sm ${getStatusColor(video.status)}`}>
                    {getStatusLabel(video.status)}
                  </span>
                </div>

                {/* Views */}
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

                {/* Date */}
                <div className="text-[#aaa] text-sm">
                  {new Date(video.created_at).toLocaleDateString('ko-KR')}
                </div>

                {/* Actions */}
                <div>
                  <button className="p-1 hover:bg-[#272727] rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-[#aaa]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <Play className="w-12 h-12 text-[#3f3f3f] mx-auto mb-4" />
          <p className="text-[#aaa] mb-4">아직 업로드한 영상이 없습니다</p>
          <Link
            href="/stars/upload"
            className="inline-flex px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors"
          >
            첫 영상 업로드하기
          </Link>
        </div>
      )}
    </div>
  );
}
