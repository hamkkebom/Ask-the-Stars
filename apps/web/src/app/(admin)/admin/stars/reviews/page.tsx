
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { cn, formatDate } from '@/lib/utils';
import { submissionsApi, Submission } from '@/lib/api/submissions';
import {
  Video,
  Play,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertTriangle,
  Search,
  ChevronRight,
  Loader2
} from 'lucide-react';

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: '검수 대기', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  APPROVED: { label: '승인', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  REJECTED: { label: '반려', color: 'bg-red-500/20 text-red-400', icon: XCircle },
  REVISION: { label: '수정요청', color: 'bg-orange-500/20 text-orange-400', icon: AlertTriangle },
};

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'PENDING', label: '검수 대기' },
  { key: 'REVISION', label: '수정요청' },
  { key: 'APPROVED', label: '승인' },
  { key: 'REJECTED', label: '반려' },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await submissionsApi.getAll();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesTab = activeTab === 'all' || review.status === activeTab;
    const projectTitle = review.assignment?.request.title || review.project?.title || '';
    const freelancerName = review.user?.name || '';

    const matchesSearch = projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = reviews.filter(r => r.status === 'PENDING').length;
  const revisionCount = reviews.filter(r => r.status === 'REVISION').length;

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
            {reviews.filter(r => r.status === 'APPROVED').length}
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
              {tab.key === 'PENDING' && pendingCount > 0 && (
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
            placeholder="프리랜서, 프로젝트 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500 w-72"
          />
        </div>
      </div>

      {/* Video Cards */}
      {loading ? (
          <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReviews.map(review => {
            const config = statusConfig[review.status] || statusConfig.PENDING;
            const StatusIcon = config.icon;
            const projectTitle = review.assignment?.request.title || review.project?.title || 'Unknown Project';

            return (
                <Link
                key={review.id}
                href={`/admin/stars/reviews/${review.id}`}
                className="group"
                >
                <GlassCard className="p-4 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex gap-4">
                    <div className="relative w-40 h-24 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        {review.thumbnailUrl ? (
                            <img src={review.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <Play className="w-8 h-8 text-white/50" />
                            </div>
                        )}
                        <div className="absolute top-1 left-1">
                        <span className="bg-primary/80 px-1.5 py-0.5 rounded text-xs text-white">
                            v{review.version}
                        </span>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-medium truncate group-hover:text-primary transition-colors">
                            {projectTitle}
                        </h3>
                        <span className={cn(
                            "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0",
                            config.color
                        )}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                        </span>
                        </div>

                        <p className="text-gray-400 text-sm mt-1">
                        {review.user?.name || 'Anonymous'}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>제출: {formatDate(review.createdAt)}</span>
                        </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors self-center" />
                    </div>
                </GlassCard>
                </Link>
            );
            })}
        </div>
      )}

      {!loading && filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">검수 대상이 없습니다</p>
        </div>
      )}
    </div>
  );
}
