'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi, AdminStats } from '@/lib/api/admin';
import {
  Users,
  Video,
  DollarSign,
  FolderKanban,
  ArrowUpRight,
  AlertCircle,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react';

function formatCurrency(value: number) {
  if (value >= 10000) {
    return `₩${(value / 10000).toFixed(0)}만`;
  }
  return `₩${value.toLocaleString()}`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, activitiesData] = await Promise.all([
          adminApi.getDashboardStats(),
          adminApi.getRecentActivities(10),
        ]);
        setStats(statsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#aaa]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 핵심 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 전체 영상 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-5">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-3">
            <Video className="w-4 h-4" />
            전체 영상
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white">
              {(stats?.totalVideos || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* 활성 프리랜서 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-5">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-3">
            <Users className="w-4 h-4" />
            프리랜서
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white">
              {stats?.totalFreelancers || 0}
            </span>
          </div>
        </div>

        {/* 진행 중 프로젝트 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-5">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-3">
            <FolderKanban className="w-4 h-4" />총 프로젝트
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white">
              {stats?.totalProjects || 0}
            </span>
          </div>
        </div>

        {/* 월 수익 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-5">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-3">
            <DollarSign className="w-4 h-4" />
            이번달 정산
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white">
              {formatCurrency(stats?.monthlyRevenue || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* 긴급 알림 + 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 긴급 알림 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#3f3f3f]">
            <h2 className="text-white font-semibold">대기 중인 작업</h2>
          </div>
          <div className="divide-y divide-[#3f3f3f]">
            <Link
              href="/admin/videos?status=REVIEWING"
              className="flex items-center justify-between px-5 py-3 hover:bg-[#3f3f3f] transition-colors"
            >
              <span className="flex items-center gap-2 text-orange-400">
                <AlertCircle className="w-4 h-4" />
                영상 검수 대기
              </span>
              <span className="bg-orange-400/20 text-orange-400 px-2 py-0.5 rounded text-sm">
                {stats?.pendingReviews || 0}
              </span>
            </Link>
            <Link
              href="/admin/settlements?status=PENDING"
              className="flex items-center justify-between px-5 py-3 hover:bg-[#3f3f3f] transition-colors"
            >
              <span className="flex items-center gap-2 text-yellow-400">
                <Clock className="w-4 h-4" />
                정산 승인 대기
              </span>
              <span className="bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded text-sm">
                {stats?.pendingPayouts || 0}
              </span>
            </Link>
            <Link
              href="/admin/clients"
              className="flex items-center justify-between px-5 py-3 hover:bg-[#3f3f3f] transition-colors"
            >
              <span className="flex items-center gap-2 text-blue-400">
                <Users className="w-4 h-4" />
                클라이언트
              </span>
              <span className="bg-blue-400/20 text-blue-400 px-2 py-0.5 rounded text-sm">
                {stats?.totalClients || 0}
              </span>
            </Link>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#3f3f3f]">
            <h2 className="text-white font-semibold">최근 활동</h2>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {activities.length === 0 ? (
              <div className="px-5 py-6 text-center text-[#666]">
                아직 활동이 없습니다
              </div>
            ) : (
              <div className="divide-y divide-[#3f3f3f]">
                {activities.map((activity) => (
                  <div
                    key={`${activity.type}-${activity.id}`}
                    className="px-5 py-3 flex items-start gap-3"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full ${
                        activity.type === 'video_upload'
                          ? 'bg-green-400'
                          : 'bg-blue-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {activity.type === 'video_upload'
                          ? '영상 업로드: '
                          : '프로젝트 생성: '}
                        {activity.title}
                      </p>
                      <p className="text-xs text-[#666]">
                        {activity.actor} ·{' '}
                        {new Date(activity.timestamp).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 빠른 링크 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/videos"
          className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4 hover:bg-[#3f3f3f] transition-colors text-center"
        >
          <Video className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <span className="text-white text-sm">영상 관리</span>
        </Link>
        <Link
          href="/admin/freelancers"
          className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4 hover:bg-[#3f3f3f] transition-colors text-center"
        >
          <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <span className="text-white text-sm">프리랜서 관리</span>
        </Link>
        <Link
          href="/admin/projects"
          className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4 hover:bg-[#3f3f3f] transition-colors text-center"
        >
          <FolderKanban className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <span className="text-white text-sm">프로젝트 관리</span>
        </Link>
        <Link
          href="/admin/settlements"
          className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4 hover:bg-[#3f3f3f] transition-colors text-center"
        >
          <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <span className="text-white text-sm">정산 관리</span>
        </Link>
      </div>
    </div>
  );
}
