'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { createLead } from '@/lib/api/leads';
import { toast } from '@/hooks/use-toast';

const leadSchema = z.object({
  name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  phone: z.string().optional(),
  channel: z.string().optional(),
  interest: z.string().optional(),
  notes: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createLead(data);
      setIsSubmitted(true);
      toast.success('설명회 신청이 완료되었습니다!');
      reset();

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/education');
      }, 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-primary/30 backdrop-blur-xl text-center"
    >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">신청이 완료되었습니다!</h3>
        <p className="text-slate-400 mb-8">
          설명회 관련 상세 안내 사항을 적어주신 이메일로 보내드릴 예정입니다.
          <br />행사 당일 온라인 링크(Zoom)를 확인해주세요.
          <br /><br />
          <span className="text-sm text-primary">3초 후 교육 페이지로 이동합니다...</span>
        </p>
        <button
          onClick={() => router.push('/education')}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-semibold"
        >
          확인
        </button>
      </m.div>
    );
  }

  return (
    <div className="w-full max-w-md p-1 px-1 rounded-[32px] bg-linear-to-br from-primary via-blue-400 to-primary shadow-2xl">
      <div className="bg-slate-950 p-8 rounded-[30px] backdrop-blur-3xl">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">무료 설명회 신청</h3>
          <p className="text-neutral-400 text-sm">
            아래 정보를 입력하시면 신청이 완료됩니다.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">이름</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                {...register('name')}
                type="text"
                placeholder="홍길동"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-2xl border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white"
              />
            </div>
            {errors.name && <p className="text-xs text-primary ml-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">이메일</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                {...register('email')}
                type="email"
                placeholder="example@mail.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-2xl border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white"
              />
            </div>
            {errors.email && <p className="text-xs text-primary ml-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">연락처 (선택)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                {...register('phone')}
                type="tel"
                placeholder="010-0000-0000"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 rounded-2xl border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white"
              />
            </div>
          </div>

          {/* Interest */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">관심 분야</label>
            <div className="relative">
              <input
                {...register('interest')}
                type="text"
                placeholder="예: AI 영상 제작 기초반"
                className="w-full px-4 py-3.5 bg-white/5 rounded-2xl border border-white/10 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-white"
              />
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </m.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full group flex items-center justify-center gap-2 py-4 bg-primary rounded-2xl font-black text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                무료 설명회 신청하기
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
