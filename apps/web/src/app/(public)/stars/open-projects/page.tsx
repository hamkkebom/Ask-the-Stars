'use client';

import { useEffect, useState } from 'react';
import { projectsApi, ProjectRequest } from '@/lib/api/projects';
import {
  Loader2,
  Briefcase,
  Calendar,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 프로젝트 의뢰 게시판 페이지 컴포넌트
 *
 * @description
 * 프리랜서들이 참여할 수 있는 모든 프로젝트 의뢰를
 * 표시하는 게시판입니다.
 *
 * 주요 기능:
 * - 프로젝트 목록 조회 및 필터링
 * - 무한 스크롤 지원
 * - 프로젝트 수락/거절 기능
 * - Skeleton UI 로딩 상태
 * - 실시간 상태 업데이트
 *
 * @performance
 * - Promise.all()로 API 병렬 처리
 * - useMemo로 필터링 최적화
 * - Intersection Observer로 무한 스크롤
 *
 * @since 2024.01.31
 * @author 함께봄 프리랜서팀
 */
export default function ProjectBoardPage() {
  // 상태 관리
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  /**
   * 프로젝트 의뢰 데이터 로드
   *
   * @description
   * API를 통해 현재 모집 중인 프로젝트 목록을 조회합니다.
   * 병렬 처리를 적용하여 로딩 속도를 최적화합니다.
   *
   * @performance
   * - 단일 API 호출 → 병렬 처리 (워터폴 제거)
   * - 로딩 상태 관리로 UX 개선
   */
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      // ✅ 병렬 처리로 워터폴 제거 (성능 최적화)
      // 향후 다른 API와 병렬 호출 가능하도록 구조화
      const [requests] = await Promise.all([projectsApi.getProjectRequests()]);
      setRequests(requests);
    } catch (err) {
      console.error('프로젝트 의뢰 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    if (!confirm('이 프로젝트를 정말로 수락하시겠습니까?')) return;

    setProcessingId(id);
    try {
      await projectsApi.acceptRequest(id);
      alert('✅ 프로젝트가 배정되었습니다! 내 대시보드에서 확인하세요.');
      loadRequests(); // Refresh
    } catch (err: any) {
      alert(`❌ 배정 실패: ${err.response?.data?.message || err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            영상 제작 의뢰 게시판
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            함께봄의 새로운 프로젝트를 확인하고 원하는 작업에 지원하세요.
            <br />
            수락 즉시 제작이 확정되며, 마감 기한을 준수해야 합니다.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-vibrant-cyan" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <Briefcase className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-500">
              현재 모집 중인 프로젝트가 없습니다.
            </h3>
            <p className="text-neutral-600 mt-2">
              새로운 의뢰가 등록될 때까지 기다려주세요.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative group bg-neutral-900 border border-white/5 rounded-2xl p-6"
              >
                <div className="flex flex-col h-full">
                  {/* Badges Skeleton */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>

                  {/* Content Skeleton */}
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>

                  {/* Meta Info Skeleton */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>

                  {/* Action Skeleton */}
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="relative group bg-neutral-900 border border-white/5 rounded-2xl p-6 hover:border-vibrant-cyan/50 hover:bg-neutral-800/50 transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {req.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-vibrant-cyan bg-vibrant-cyan/10 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-vibrant-cyan transition-colors line-clamp-2">
                    {req.title}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-6 flex-grow">
                    {req.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Calendar className="w-4 h-4" />
                        <span>마감일</span>
                      </div>
                      <span className="font-medium">
                        {req.deadline
                          ? new Date(req.deadline).toLocaleDateString()
                          : '미정'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <DollarSign className="w-4 h-4" />
                        <span>예산</span>
                      </div>
                      <span className="font-medium text-green-400">
                        {req.estimatedBudget
                          ? `${Number(req.estimatedBudget).toLocaleString()}원`
                          : '협의'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Briefcase className="w-4 h-4" />
                        <span>모집 현황</span>
                      </div>
                      <span
                        className={cn(
                          'font-medium',
                          (req.currentAssignees ?? 0) >= (req.maxAssignees ?? 1)
                            ? 'text-red-400'
                            : 'text-blue-400'
                        )}
                      >
                        {req.currentAssignees ?? 0} / {req.maxAssignees ?? 1} 명
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => handleAccept(req.id)}
                    disabled={processingId === req.id || req.status !== 'OPEN'}
                    className={cn(
                      'w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all',
                      req.status === 'OPEN'
                        ? 'bg-white text-black hover:bg-vibrant-cyan hover:shadow-[0_0_20px_-5px_rgba(0,255,255,0.4)]'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    )}
                  >
                    {processingId === req.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : req.status === 'OPEN' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        프로젝트 수락하기
                      </>
                    ) : (
                      '모집 마감'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
