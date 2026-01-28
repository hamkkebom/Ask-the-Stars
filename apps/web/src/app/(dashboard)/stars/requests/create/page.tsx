'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@ask-the-stars/ui';
import { GlassCard } from '@/components/ui/glass-card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { projectsApi } from '@/lib/api/projects';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { AssignmentType } from '@ask-the-stars/types';

const requestSchema = z.object({
  title: z.string().min(5, '제목은 5자 이상이어야 합니다.'),
  description: z.string().optional(),
  categories: z.string().min(1, '카테고리를 1개 이상 입력해주세요 (쉼표로 구분)'),
  deadline: z.string().refine((date) => new Date(date) > new Date(), {
    message: '마감일은 미래여야 합니다.',
  }),
  budget: z.coerce.number().min(10000, '예산은 10,000원 이상이어야 합니다.'),
  maxAssignees: z.coerce.number().min(1, '최소 1명 이상이어야 합니다.').max(10, '최대 10명까지 가능합니다.'),
  assignmentType: z.enum([AssignmentType.SINGLE, AssignmentType.MULTIPLE, AssignmentType.GROUP]), // Use enum values for safety
  targetCounselorId: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

export default function CreateRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      assignmentType: AssignmentType.MULTIPLE,
      maxAssignees: 1,
      budget: 0
    }
  });

  const onSubmit = async (data: RequestFormValues) => {
    setLoading(true);
    try {
      await projectsApi.createRequest({
        ...data,
        categories: data.categories.split(',').map(c => c.trim()).filter(c => c.length > 0),
        estimatedBudget: data.budget,
      });
      toast.success('제작 요청이 등록되었습니다.');
      router.push('/stars/project-board');
    } catch (error: any) {
      console.error(error);
      toast.error('요청 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";
  const labelClass = "block text-sm font-bold text-gray-300 mb-2";

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/stars/project-board" className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-white">새 제작 요청 등록</h1>
        <p className="text-gray-400 mt-2">상담사들에게 영상 제작을 의뢰해보세요.</p>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div>
            <label className={labelClass}>제목</label>
            <input
              {...register('title')}
              placeholder="예: 신년운세 홍보 영상 제작 요청"
              className={inputClass}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>상세 내용</label>
            <textarea
              {...register('description')}
              placeholder="요청사항을 자세히 적어주세요."
              rows={5}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className={labelClass}>카테고리 (쉼표로 구분)</label>
              <input
                {...register('categories')}
                placeholder="사주, 타로, 홍보"
                className={inputClass}
              />
               {errors.categories && <p className="text-red-400 text-sm mt-1">{errors.categories.message}</p>}
            </div>

            {/* Deadline */}
            <div>
              <label className={labelClass}>마감일</label>
              <input
                type="date"
                {...register('deadline')}
                className={inputClass}
              />
              {errors.deadline && <p className="text-red-400 text-sm mt-1">{errors.deadline.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Budget */}
             <div>
              <label className={labelClass}>예상 예산 (원)</label>
              <input
                type="number"
                {...register('budget')}
                className={inputClass}
              />
              {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>}
            </div>

            {/* Max Assignees */}
            <div>
              <label className={labelClass}>최대 모집 인원</label>
              <input
                type="number"
                {...register('maxAssignees')}
                className={inputClass}
              />
              {errors.maxAssignees && <p className="text-red-400 text-sm mt-1">{errors.maxAssignees.message}</p>}
            </div>
          </div>

           {/* Assignment Type */}
           <div>
            <label className={labelClass}>모집 방식</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="cursor-pointer">
                <input type="radio" value="MULTIPLE" {...register('assignmentType')} className="sr-only peer" />
                <div className="p-4 h-full rounded-xl border border-white/10 bg-white/5 peer-checked:bg-primary/20 peer-checked:border-primary transition-all text-center">
                  <span className="block font-bold text-white mb-1">다중 배정 (중복)</span>
                  <span className="text-xs text-gray-400">여러 상담사가 지원 가능</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" value="SINGLE" {...register('assignmentType')} className="sr-only peer" />
                <div className="p-4 h-full rounded-xl border border-white/10 bg-white/5 peer-checked:bg-primary/20 peer-checked:border-primary transition-all text-center">
                  <span className="block font-bold text-white mb-1">단독 배정</span>
                  <span className="text-xs text-gray-400">특정 상담사 1명에게만 요청</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" value="GROUP" {...register('assignmentType')} className="sr-only peer" />
                <div className="p-4 h-full rounded-xl border border-white/10 bg-white/5 peer-checked:bg-primary/20 peer-checked:border-primary transition-all text-center">
                  <span className="block font-bold text-white mb-1">그룹 배정</span>
                  <span className="text-xs text-gray-400">그룹 단위로 의뢰 진행</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" size="lg" disabled={loading} className="font-bold min-w-[150px]">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : '요청 등록하기'}
            </Button>
          </div>

        </form>
      </GlassCard>
    </div>
  );
}
