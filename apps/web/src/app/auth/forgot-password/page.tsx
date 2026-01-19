'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { authApi } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await authApi.requestPasswordReset(data.email);
      setSuccessMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || '요청 처리에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">비밀번호 찾기</CardTitle>
          <CardDescription className="text-center">
            가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-md text-center">
              <p className="font-medium">{successMessage}</p>
              <p className="mt-2 text-sm">이메일을 확인해주세요.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                재설정 링크 받기
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            로그인으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
