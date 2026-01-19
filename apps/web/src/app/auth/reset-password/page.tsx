'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { authApi } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';

const resetPasswordSchema = z.object({
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setError('유효하지 않은 접근입니다. 비밀번호 재설정 링크를 다시 확인해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await authApi.resetPassword(token, data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || '비밀번호 재설정에 실패했습니다. 링크가 만료되었을 수 있습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
     return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6 text-center">
                    <p className="text-red-500 mb-4">유효하지 않은 접근입니다.</p>
                    <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                        비밀번호 찾기 다시 시도
                    </Link>
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">비밀번호 재설정</CardTitle>
          <CardDescription className="text-center">
            새로운 비밀번호를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-md">
                <p className="font-medium">비밀번호가 성공적으로 변경되었습니다.</p>
              </div>
              <p className="text-sm text-gray-500">잠시 후 로그인 페이지로 이동합니다...</p>
              <Button onClick={() => router.push('/auth/login')} className="w-full">
                로그인하러 가기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">새 비밀번호</label>
                <input
                  type="password"
                  className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password')}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">비밀번호 확인</label>
                <input
                  type="password"
                  className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                비밀번호 변경
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ResetPasswordForm />
        </Suspense>
    )
}
