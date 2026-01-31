'use client';

import Link from 'next/link';
import {
  Eye,
  Video,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  MessageSquare,
  Clock,
  CheckCircle,
} from 'lucide-react';

// Mock 채널 분석 데이터
const channelAnalytics = {
  views: { value: 1234, change: 12.5, up: true },
  completedVideos: { value: 24, change: 8.3, up: true },
  earnings: { value: 1850000, change: -2.1, up: false },
};

// Mock 최근 게시 콘텐츠
const recentContent = [
  {
    id: '1',
    title: '브랜드 스토리 영상 v3',
    thumbnail: null,
    status: '승인됨',
    statusColor: 'text-green-400',
    views: 234,
    uploadedAt: '3시간 전',
  },
  {
    id: '2',
    title: '제품 소개 영상',
    thumbnail: null,
    status: '검수중',
    statusColor: 'text-yellow-400',
    views: null,
    uploadedAt: '1일 전',
  },
  {
    id: '3',
    title: '기업 홍보 영상',
    thumbnail: null,
    status: '피드백',
    statusColor: 'text-orange-400',
    views: null,
    uploadedAt: '3일 전',
  },
];

// Mock 최근 피드백
const recentFeedback = [
  { id: '1', type: '수정요청', message: '자막 위치 조정 부탁드립니다', time: '2시간 전' },
  { id: '2', type: '승인', message: '잘됐어요! 감사합니다', time: '5시간 전' },
  { id: '3', type: '수정요청', message: '음악 볼륨 조절 필요', time: '1일 전' },
];

// Mock 오늘의 할 일
const todayTasks = [
  { id: '1', title: '브랜드 영상 편집', completed: false, urgent: true },
  { id: '2', title: '피드백 반영', completed: false, urgent: false },
  { id: '3', title: '최종 렌더링', completed: true, urgent: false },
];

function formatCurrency(value: number) {
  if (value >= 10000) {
    return `₩${(value / 10000).toFixed(0)}만`;
  }
  return `₩${value.toLocaleString()}`;
}

export default function StarsDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 채널 분석 */}
      <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f3f]">
          <h2 className="text-white font-medium">채널 분석</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#aaa]">최근 28일</span>
            <Link href="/stars/analytics" className="text-blue-400 hover:underline">
              분석으로 이동
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3f3f3f]">
          {/* 조회수 */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
              <Eye className="w-4 h-4" />
              조회수
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">
                {channelAnalytics.views.value.toLocaleString()}
              </span>
              <span className={`flex items-center text-sm ${
                channelAnalytics.views.up ? 'text-green-400' : 'text-red-400'
              }`}>
                {channelAnalytics.views.up ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(channelAnalytics.views.change)}%
              </span>
            </div>
          </div>

          {/* 완료 영상 */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
              <Video className="w-4 h-4" />
              완료 영상
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">
                {channelAnalytics.completedVideos.value}
              </span>
              <span className={`flex items-center text-sm ${
                channelAnalytics.completedVideos.up ? 'text-green-400' : 'text-red-400'
              }`}>
                {channelAnalytics.completedVideos.up ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(channelAnalytics.completedVideos.change)}%
              </span>
            </div>
          </div>

          {/* 수입 */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
              <DollarSign className="w-4 h-4" />
              수입
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">
                {formatCurrency(channelAnalytics.earnings.value)}
              </span>
              <span className={`flex items-center text-sm ${
                channelAnalytics.earnings.up ? 'text-green-400' : 'text-red-400'
              }`}>
                {channelAnalytics.earnings.up ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(channelAnalytics.earnings.change)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 게시 콘텐츠 */}
      <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f3f]">
          <h2 className="text-white font-medium">최근 게시 콘텐츠</h2>
          <Link href="/stars/my-videos" className="text-sm text-blue-400 hover:underline">
            모두 보기
          </Link>
        </div>
        <div className="divide-y divide-[#3f3f3f]">
          {recentContent.map((content) => (
            <Link
              key={content.id}
              href={`/stars/my-videos/${content.id}`}
              className="flex items-center gap-4 p-4 hover:bg-[#3f3f3f] transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-28 h-16 bg-[#3f3f3f] rounded-lg flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 text-[#666]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{content.title}</p>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className={content.statusColor}>{content.status}</span>
                  <span className="text-[#666]">•</span>
                  <span className="text-[#aaa]">{content.uploadedAt}</span>
                </div>
              </div>

              {/* Views */}
              {content.views !== null && (
                <div className="text-right shrink-0">
                  <p className="text-white font-medium">{content.views}</p>
                  <p className="text-[#aaa] text-sm">조회수</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* 하단 2열 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 피드백 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f3f]">
            <h2 className="text-white font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#aaa]" />
              최근 피드백
            </h2>
            <Link href="/stars/feedback" className="text-sm text-blue-400 hover:underline">
              모두 보기
            </Link>
          </div>
          <div className="divide-y divide-[#3f3f3f]">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="p-4 hover:bg-[#3f3f3f] transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                    feedback.type === '승인'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {feedback.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{feedback.message}</p>
                    <p className="text-[#666] text-xs mt-1">{feedback.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 할 일 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3f3f3f]">
            <h2 className="text-white font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#aaa]" />
              오늘의 할 일
            </h2>
            <Link href="/stars/my-projects" className="text-sm text-blue-400 hover:underline">
              모두 보기
            </Link>
          </div>
          <div className="divide-y divide-[#3f3f3f]">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-4 hover:bg-[#3f3f3f] transition-colors">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-[#666]'
                }`}>
                  {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={`flex-1 ${
                  task.completed ? 'text-[#666] line-through' : 'text-white'
                }`}>
                  {task.title}
                </span>
                {task.urgent && !task.completed && (
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs">
                    긴급
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
