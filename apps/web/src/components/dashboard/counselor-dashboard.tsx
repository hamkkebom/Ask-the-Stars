'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { useEffect, useState } from 'react';
import { projectsApi } from '@/lib/api/projects';
import Link from 'next/link';

export function CounselorDashboard({ user }: { user: any }) {
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

  const waitingCount = projects.filter(p => p.status === 'PENDING').length;
  // Calculation for completed/earnings would go here when ready

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">안녕하세요, {user?.name} 상담가님! 🔮</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 수익</CardTitle>
            <span className="text-muted-foreground">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩0</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">답변 대기</CardTitle>
            <span className="text-muted-foreground">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingCount}</div>
            <p className="text-xs text-muted-foreground">전체 의뢰 중 대기 건</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">채택 완료</CardTitle>
            <span className="text-muted-foreground">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+0 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평점</CardTitle>
             <span className="text-muted-foreground">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.0</div>
            <p className="text-xs text-muted-foreground">Based on 0 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>답변 대기 중인 질문</CardTitle>
            <CardDescription>
             상담가님의 지혜를 기다리는 질문들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-4">로딩 중...</div>
                ) : waitingCount === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-10">
                        대기 중인 질문이 없습니다.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {projects.filter(p => p.status === 'PENDING').slice(0, 5).map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                    <div className="font-medium">{project.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {project.owner?.name} • {new Date(project.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <Link href={`/requests/${project.id}`}>
                                    <Button size="sm" variant="outline">답변하기</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>
              최근 답변 및 수익 내역입니다.
            </CardDescription>
          </CardHeader>
           <CardContent>
             <div className="text-sm text-gray-500 text-center py-10">
                활동 내역이 없습니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
