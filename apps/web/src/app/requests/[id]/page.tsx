'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsApi, ProjectRequest } from '@/lib/api/projects';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<ProjectRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const data = await projectsApi.getRequest(id);
        setProject(data);
      } catch (err: any) {
        console.error(err);
        setError('요청을 불러올 수 없습니다.');
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
        <p className="text-red-500 font-medium">{error || '요청을 찾을 수 없습니다.'}</p>
        <Button onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  // Determine status color
  const statusColors = {
    OPEN: 'bg-green-100 text-green-800',
    FULL: 'bg-yellow-100 text-yellow-800',
    CLOSED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  } as const; // Add const assertion for indexing

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <Link href="/stars/open-projects" className="text-sm text-muted-foreground hover:text-primary flex items-center mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> 게시판으로 돌아가기
        </Link>
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">{project.title}</h1>
                <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status as keyof typeof statusColors] || 'bg-gray-100'}`}>
                        {project.status === 'OPEN' ? '모집 중' : project.status}
                    </span>
                    <div className="text-sm text-gray-500 flex gap-2">
                        {/* <span>{new Date(project.createdAt).toLocaleDateString()} 작성</span> */}
                        <span>마감: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                 </div>
            </div>
            {project.estimatedBudget && project.estimatedBudget > 0 && (
                <div className="text-right">
                    <div className="text-sm text-gray-500">예산</div>
                    <div className="text-xl font-bold">₩{project.estimatedBudget.toLocaleString()}</div>
                </div>
            )}
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>요청 내용</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px] whitespace-pre-wrap">
                {project.description || '내용이 없습니다.'}
            </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex gap-2">
            {project.categories.map(cat => (
                <span key={cat} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {cat}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
}
