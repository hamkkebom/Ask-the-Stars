'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { cn, formatDate } from '@/lib/utils';
import {
  Video,
  Play,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'revision';

interface VideoReview {
  id: string;
  title: string;
  freelancer: string;
  projectId: string;
  projectTitle: string;
  version: number;
  submittedAt: string;
  duration: string;
  thumbnail: string;
  status: ReviewStatus;
  comments: number;
}

// Mock Data
const reviews: VideoReview[] = [
  {
    id: 'rv-001',
    title: '신년운세_타로_최종.mp4',
    freelancer: '홍길동',
    projectId: 'pj-001',
    projectTitle: '신년 운세 숏폼',
    version: 2,
    submittedAt: '2026-01-18T10:30:00',
    duration: '00:58',
    thumbnail: '/api/placeholder/320/180',
    status: 'pending',
    comments: 0,
  },
  {
    id: 'rv-002',
    title: '봄타로_시리즈_1화_v3.mp4',
    freelancer: '김영희',
    projectId: 'pj-002',
    projectTitle: '봄맞이 타로 시리즈',
    version: 3,
    submittedAt: '2026-01-18T09:15:00',
    duration: '02:34',
    thumbnail: '/api/placeholder/320/180',
    status: 'pending',
    comments: 2,
  },
  {
    id: 'rv-003',
    title: '연애운_특집_최종.mp4',
    freelancer: '이철수',
    projectId: 'pj-003',
    projectTitle: '연애운 특집',
    version: 1,
    submittedAt: '2026-01-17T16:45:00',
    duration: '01:22',
    thumbnail: '/api/placeholder/320/180',
    status: 'revision',
    comments: 3,
  },
  {
    id: 'rv-004',
    title: '재물운_분석.mp4',
    freelancer: '박지민',
    projectId: 'pj-004',
    projectTitle: '재물운 분석',
    version: 2,
    submittedAt: '2026-01-17T14:20:00',
    duration: '01:05',
    thumbnail: '/api/placeholder/320/180',
    status: 'approved',
    comments: 1,
  },
];

const statusConfig: Record<ReviewStatus, { label: string; color: string; icon: any }> = {
  pending: { label: '검수 대기', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  approved: { label: '승인', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  rejected: { label: '반려', color: 'bg-red-500/20 text-red-400', icon: XCircle },
  revision: { label: '수정요청', color: 'bg-orange-500/20 text-orange-400', icon: AlertTriangle },
};

const tabs: { key: ReviewStatus | 'all'; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'pending', label: '검수 대기' },
  { key: 'revision', label: '수정요청' },
  { key: 'approved', label: '승인' },
  { key: 'rejected', label: '반려' },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<ReviewStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesTab = activeTab === 'all' || review.status === activeTab;
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.freelancer.includes(searchQuery) ||
      review.projectTitle.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const revisionCount = reviews.filter(r => r.status === 'revision').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-400" />
            영상 검수
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            프리랜서가 제출한 영상을 검수하고 피드백을 제공합니다
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold text-white">{reviews.length}</p>
          <p className="text-xs text-gray-400">전체</p>
        </GlassCard>
        <GlassCard className="p-4 text-center border-l-2 border-yellow-500">
          <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
          <p className="text-xs text-gray-400">검수 대기</p>
        </GlassCard>
        <GlassCard className="p-4 text-center border-l-2 border-orange-500">
          <p className="text-2xl font-bold text-orange-400">{revisionCount}</p>
          <p className="text-xs text-gray-400">수정요청</p>
        </GlassCard>
        <GlassCard className="p-4 text-center border-l-2 border-green-500">
          <p className="text-2xl font-bold text-green-400">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
          <p className="text-xs text-gray-400">승인완료</p>
        </GlassCard>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {tab.label}
              {tab.key === 'pending' && pendingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-yellow-500/30 text-yellow-400 rounded text-xs">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="영상, 프리랜서, 프로젝트 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500 w-72"
          />
        </div>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredReviews.map(review => {
          const StatusIcon = statusConfig[review.status].icon;

          return (
            <Link
              key={review.id}
              href={`/admin/stars/reviews/${review.id}`}
              className="group"
            >
              <GlassCard className="p-4 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-40 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white">
                      {review.duration}
                    </div>
                    <div className="absolute top-1 left-1">
                      <span className="bg-primary/80 px-1.5 py-0.5 rounded text-xs text-white">
                        v{review.version}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-medium truncate group-hover:text-primary transition-colors">
                        {review.title}
                      </h3>
                      <span className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0",
                        statusConfig[review.status].color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[review.status].label}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mt-1">
                      {review.projectTitle}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>담당: {review.freelancer}</span>
                      <span>제출: {formatDate(review.submittedAt)}</span>
                      {review.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {review.comments}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors self-center" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">검수 대기 중인 영상이 없습니다</p>
        </div>
      )}
    </div>
  );
}
