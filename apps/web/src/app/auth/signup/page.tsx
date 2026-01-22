'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ask-the-stars/ui';
import { Button } from '@ask-the-stars/ui';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@ask-the-stars/types';

// Schema Validation
const signupSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  phone: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678).'),
  role: z.enum([UserRole.STAR, UserRole.COUNSELOR], {
    required_error: '가입 유형을 선택해주세요.',
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const strength = calculateStrength(password);

  const getColor = (score: number) => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = (score: number) => {
    if (score <= 2) return '취약';
    if (score <= 3) return '보통';
    return '강함';
  };

  return (
    <div className="space-y-1 mt-2">
      <div className="flex justify-between text-xs text-slate-400">
        <span>비밀번호 강도</span>
        <span>{getLabel(strength)}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColor(strength)}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      {strength <= 2 && (
        <p className="text-xs text-red-400 mt-1">
          특수문자, 대소문자, 숫자를 포함하여 더 강력하게 만드세요.
        </p>
      )}
    </div>
  );
}

function calculateStrength(password: string): number {
  let score = 0;
  if (password.length > 5) score++;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function SignupPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        role: UserRole.STAR // Default to STAR
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.signup({
        ...data,
      });
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

  const inputClass = "flex h-12 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-black text-center text-white">회원가입</CardTitle>
          <CardDescription className="text-center text-slate-400 font-medium">
            새로운 계정을 만들어 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col space-y-2 cursor-pointer">
                <input
                    type="radio"
                    value={UserRole.STAR}
                    className="peer sr-only"
                    {...register('role')}
                />
                <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-white/5 bg-slate-900/50 peer-checked:border-primary peer-checked:bg-primary/10 hover:bg-slate-800 transition-all">
                    <span className="text-2xl mb-2">⭐</span>
                    <span className="font-bold text-sm text-white">별 (의뢰인)</span>
                </div>
              </label>
              <label className="flex flex-col space-y-2 cursor-pointer">
                <input
                    type="radio"
                    value={UserRole.COUNSELOR}
                    className="peer sr-only"
                    {...register('role')}
                />
                <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-white/5 bg-slate-900/50 peer-checked:border-primary peer-checked:bg-primary/10 hover:bg-slate-800 transition-all">
                    <span className="text-2xl mb-2">🔮</span>
                    <span className="font-bold text-sm text-white">상담가</span>
                </div>
              </label>
            </div>
            {errors.role && <p className="text-sm text-red-500 text-center">{errors.role.message}</p>}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">이름</label>
              <input
                type="text"
                placeholder="홍길동"
                className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
                {...register('name')}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">이메일</label>
              <input
                type="email"
                placeholder="name@example.com"
                className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">전화번호</label>
              <input
                type="text"
                placeholder="010-0000-0000"
                className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
                {...register('phone')}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">비밀번호</label>
              <input
                type="password"
                className={`${inputClass} ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
                onChange={(e) => {
                  register('password').onChange(e);
                  // Trigger re-render for strength meter if needed,
                  // but react-hook-form handles state.
                  // We might need a separate watch or just let Zod handle it.
                  // Actually, let's use watch to get value for meter.
                }}
              />
              <PasswordStrengthMeter password={watch('password') || ''} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 rounded-xl font-black text-lg shadow-lg shadow-primary/20" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm text-slate-500 font-medium">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
