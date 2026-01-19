'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { useAuthStore, AuthState } from '@/store/useAuthStore';
import { authApi } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@ask-the-stars/types';

const contestantSignupSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  phone: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678).'),
  role: z.literal(UserRole.CONTESTANT),
  contestName: z.string().min(1, '참가할 공모전을 선택해주세요.'),
  teamName: z.string().optional(),
});

type ContestantSignupFormValues = z.infer<typeof contestantSignupSchema>;

export default function ContestantSignupPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state: AuthState) => state.setAccessToken);
  const setUser = useAuthStore((state: AuthState) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContestantSignupFormValues>({
    resolver: zodResolver(contestantSignupSchema),
    defaultValues: {
      role: UserRole.CONTESTANT,
    }
  });

  const onSubmit = async (data: ContestantSignupFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.signup(data);
      setAccessToken(response.access_token);
      const user = await authApi.getProfile();
      setUser(user);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">공모전 참가 접수</CardTitle>
          <CardDescription className="text-center">
            AI 영상 공모전에 도전하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">이름</label>
              <input type="text" placeholder="홍길동" className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`} {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">이메일 (대표자)</label>
              <input type="email" placeholder="name@example.com" className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`} {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">전화번호</label>
              <input type="text" placeholder="010-0000-0000" className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`} {...register('phone')} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">비밀번호</label>
              <input type="password" className={`${inputClass} ${errors.password ? 'border-red-500' : ''}`} {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="pt-4 border-t">
               <h3 className="text-sm font-semibold mb-3 text-gray-700">참가 정보</h3>

               <div className="space-y-2 mb-3">
                 <label className="text-sm font-medium">참가 공모전</label>
                 <select className={`${inputClass} ${errors.contestName ? 'border-red-500' : ''}`} {...register('contestName')}>
                    <option value="">선택해주세요</option>
                    <option value="gen_ai_2026">2026 생성형 AI 영상 공모전</option>
                    <option value="shortform_challenge">숏폼 챌린지 3기</option>
                 </select>
                 {errors.contestName && <p className="text-sm text-red-500">{errors.contestName.message}</p>}
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium">팀명 (없을 경우 개인)</label>
                 <input type="text" placeholder="예: 무적함대" className={`${inputClass} ${errors.teamName ? 'border-red-500' : ''}`} {...register('teamName')} />
               </div>
            </div>

            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              참가 등록
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <div className="text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{' '}
                <Link href="/auth/login" className="font-semibold text-blue-600 hover:text-blue-500">로그인</Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
