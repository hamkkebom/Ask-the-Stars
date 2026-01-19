'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { projectsApi } from '@/lib/api/projects';

// Schema Validation
const requestSchema = z.object({
  title: z.string().min(2, '제목은 2자 이상이어야 합니다.').max(100, '제목은 100자를 넘을 수 없습니다.'),
  description: z.string().optional(),
  budget: z.coerce.number().min(0, '예산은 0 이상이어야 합니다.').optional(),
  deadline: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      budget: 0,
    },
  });

  const onSubmit = async (data: RequestFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure date is properly ISO formatted if provided, or undefined
      const payload = {
        ...data,
        deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
      };

      await projectsApi.create(payload);
      router.push('/dashboard'); // Go back to dashboard to see the list
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || '질문 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center">
               <ArrowLeft className="w-4 h-4 mr-1" /> 돌아가기
            </Link>
          </div>
          <CardTitle className="text-2xl">새 질문 작성하기 🌠</CardTitle>
          <CardDescription>
            상담받고 싶은 내용을 상세히 적어주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                제목
              </label>
              <input
                id="title"
                type="text"
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.title ? 'border-red-500' : ''}`}
                placeholder="어떤 고민이 있으신가요?"
                {...register('title')}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                내용 (선택)
              </label>
              <textarea
                id="description"
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="자세한 상황을 설명해주시면 더 좋은 답변을 받을 수 있습니다."
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    사례금 (원)
                </label>
                <input
                    id="budget"
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="0"
                    {...register('budget')}
                />
                {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                </div>

                <div className="space-y-2">
                <label htmlFor="deadline" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    마감 희망일
                </label>
                <input
                    id="deadline"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('deadline')}
                />
                </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              질문 등록하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
