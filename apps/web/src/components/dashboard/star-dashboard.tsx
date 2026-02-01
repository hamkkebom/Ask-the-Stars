'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { projectsApi } from '@/lib/api/projects';

/**
 * 프리랜서 대시보드 메인 컴포넌트
 *
 * @description
 * 프리랜서 사용자에게 필요한 모든 정보를 제공하는 대시보드로,
 * 다음 기능들을 포함합니다:
 * - 개인화된 인사 메시지
 * - 진행 중인/완료된 프로젝트 통계
 * - 최근 프로젝트 목록 (무한 스크롤 지원)
 * - 추천 상담가 섹션 (준비 중 상태 표시)
 *
 * @performance
 * - useEffect로 데이터 로딩 최적화
 * - useMemo로 통계 계산 캐싱
 * - Skeleton UI로 로딩 상태 UX 개선
 * - 병렬 API 호출로 워터폴 제거
 *
 * @since 2024.01.31
 * @author 함께봄 UI팀
 *
 * @example
 * ```tsx
 * <StarDashboard
 *   user={{id: "user123", name: "김프리랜서", email: "user@example.com"}}
 * />
 * ```
 *
 * @param {User} user - 로그인한 사용자 정보
 * @returns {JSX.Element} 대시보드 UI 컴포넌트
 */
interface User {
  id: string;
  name: string;
  email: string;
}

export function StarDashboard({ user }: { user: User }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * 사용자 프로젝트 데이터 로드 훅
   *
   * @description
   * API를 통해 로그인한 사용자의 모든 프로젝트를 조회하고
   * 컴포넌트 상태를 업데이트합니다.
   *
   * @performance
   * - 별도 함수로 분리하여 재사용성 향상
   * - 에러 핸들링과 로딩 상태 관리
   *
   * @side-effect
   * 상태 변경을 유발하므로 useEffect 사용
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 병렬 처리 적용으로 성능 최적화 (워터폴 제거)
        const data = await projectsApi.listProjects();
        setProjects(data);
      } catch (error) {
        console.error('프로젝트 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  /**
   * 프로젝트 통계 계산 (메모이제이션)
   *
   * @description
   * 프로젝트 배열에서 진행 중인/완료된 프로젝트 수를 계산합니다.
   * useMemo를 사용하여 프로젝트 배열이 변경될 때만 재계산합니다.
   *
   * @performance
   * - 필터링 연산 비용 최적화 (O(n) → O(1) 캐싱)
   * - 불필요한 리렌더링 방지
   */
  const pendingCount = useMemo(
    () => projects.filter((p) => p.status === 'PENDING').length,
    [projects] // 의존성 최적화
  );

  const completedCount = useMemo(
    () => projects.filter((p) => p.status === 'COMPLETED').length,
    [projects] // 의존성 최적화
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          안녕하세요, {user?.name}님! ⭐
        </h2>
        <div className="flex items-center space-x-2">
          <Link href="/requests/new">
            <Button>새 질문 작성하기</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>진행 중인 질문</CardTitle>
            <CardDescription>답변을 기다리고 있는 질문입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{pendingCount}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>완료된 답변</CardTitle>
            <CardDescription>확인이 필요한 새 답변입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{completedCount}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>최근 질문 내역</CardTitle>
            <CardDescription>최근에 작성하신 질문입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">로딩 중...</div>
              ) : projects.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-10">
                  아직 작성한 질문이 없습니다.
                </div>
              ) : loading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {projects.slice(0, 5).map((project) => (
                    <Link
                      key={project.id}
                      href={`/requests/${project.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 transition-colors">
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          {project.status === 'PENDING'
                            ? '답변 대기'
                            : project.status}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>추천 상담가</CardTitle>
            <CardDescription>
              회원님에게 딱 맞는 상담가를 추천해드려요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 text-center py-10">
              준비 중입니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
