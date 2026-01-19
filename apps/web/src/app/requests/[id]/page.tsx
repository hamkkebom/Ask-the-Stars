'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsApi, Project } from '@/lib/api/projects';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const data = await projectsApi.findOne(id);
        setProject(data);
      } catch (err: any) {
        console.error(err);
        setError('질문을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <p className="text-red-500 font-medium">{error || '질문을 찾을 수 없습니다.'}</p>
        <Button onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  // Determine status color
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELED: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> 대시보드로 돌아가기
        </Link>
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">{project.title}</h1>
                <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                        {project.status === 'PENDING' ? '답변 대기 중' : project.status}
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()} 작성
                    </span>
                 </div>
            </div>
            {project.budget && project.budget > 0 && (
                <div className="text-right">
                    <div className="text-sm text-gray-500">사례금</div>
                    <div className="text-xl font-bold">₩{project.budget.toLocaleString()}</div>
                </div>
            )}
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>질문 내용</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px] whitespace-pre-wrap">
                {project.description || '내용이 없습니다.'}
            </CardContent>
        </Card>

        {/* Placeholder for Answers Section */}
        <Card className="bg-slate-50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-2xl mb-2">📬</div>
                <h3 className="font-semibold text-lg">아직 등록된 답변이 없습니다.</h3>
                <p className="text-muted-foreground text-sm mt-1">상담가님의 답변을 기다리고 있습니다.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
