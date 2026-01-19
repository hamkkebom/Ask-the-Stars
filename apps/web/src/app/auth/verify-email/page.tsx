'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { authApi } from '@/lib/api/auth';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
        setStatus('error');
        setMessage('유효하지 않은 접근입니다. 토큰이 없습니다.');
        return;
    }

    // Auto-verify on mount
    const verify = async () => {
        setStatus('loading');
        try {
            await authApi.verifyEmail(token);
            setStatus('success');
            setTimeout(() => {
                router.push('/auth/login');
            }, 3000);
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setMessage(err.response?.data?.message || '이메일 인증에 실패했습니다.');
        }
    };

    verify();
  }, [token, router]);

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <CardTitle>이메일 인증</CardTitle>
            <CardDescription>계정 활성화를 진행합니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 space-y-4">
            {status === 'loading' && (
                <>
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                    <p>인증 중입니다...</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <p className="font-medium text-green-600">이메일 인증이 완료되었습니다!</p>
                    <p className="text-sm text-gray-500">잠시 후 로그인 페이지로 이동합니다.</p>
                </>
            )}

            {status === 'error' && (
                <>
                    <XCircle className="h-12 w-12 text-red-500" />
                    <p className="font-medium text-red-600">인증 실패</p>
                    <p className="text-sm text-gray-500">{message}</p>
                    <Button onClick={() => router.push('/auth/login')} className="mt-4">
                        로그인으로 돌아가기
                    </Button>
                </>
            )}
        </CardContent>
    </Card>
  );
}

export default function VerifyEmailPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </div>
    );
}
