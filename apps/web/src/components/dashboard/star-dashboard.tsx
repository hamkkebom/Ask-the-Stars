'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api/projects';

export function StarDashboard({ user }: { user: any }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.findAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const pendingCount = projects.filter(p => p.status === 'PENDING').length;
  const completedCount = projects.filter(p => p.status === 'COMPLETED').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">안녕하세요, {user?.name}님! ⭐</h2>
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
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>완료된 답변</CardTitle>
            <CardDescription>확인이 필요한 새 답변입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>최근 질문 내역</CardTitle>
            <CardDescription>
              최근에 작성하신 질문입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-4">로딩 중...</div>
                ) : projects.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-10">
                        아직 작성한 질문이 없습니다.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {projects.slice(0, 5).map((project) => (
              <Link key={project.id} href={`/requests/${project.id}`} className="block">
                <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {project.status === 'PENDING' ? '답변 대기' : project.status}
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
