'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import StreamUploader from '@/components/upload/StreamUploader';
import { submissionsApi } from '@/lib/api/submissions';
import { toast } from '@/hooks/use-toast';

function UploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query params
  const projectId = searchParams.get('projectId') || '';
  const slotParam = searchParams.get('slot');
  const titleParam = searchParams.get('title') || '';
  const isRevision = searchParams.get('revision') === 'true';

  const [formData, setFormData] = useState({
    projectId: projectId,
    versionSlot: slotParam ? parseInt(slotParam) : 1,
    versionTitle: titleParam,
    notes: '',
  });

  const [uploadResult, setUploadResult] = useState<{ uid: string; videoUrl: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadComplete = (result: { uid: string; videoUrl: string }) => {
    setUploadResult(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadResult) {
      toast.error('영상을 먼저 업로드해주세요.');
      return;
    }

    if (!formData.versionTitle.trim()) {
      toast.error('버전 제목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submissionsApi.create({
        projectId: formData.projectId,
        assignmentId: formData.projectId, // Assuming projectId in URL is assignmentId as per previous code
        versionSlot: formData.versionSlot,
        versionTitle: formData.versionTitle,
        notes: formData.notes,
        videoUrl: uploadResult.videoUrl,
        streamUid: uploadResult.uid,
        duration: 0, // Duration will be processed by webhook ideally
      });

      toast.success('제출물이 등록되었습니다! 검수가 시작됩니다.');

      if (formData.projectId) {
         router.push(`/stars/my-projects/detail/${formData.projectId}`);
      } else {
         router.push('/stars/my-projects');
      }
    } catch (error: any) {
      console.error('Submission failed:', error);
      toast.error(error.response?.data?.message || '제출에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href={`/stars/my-projects/detail/${projectId}`} className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            프로젝트 상세
          </Link>
          <span>/</span>
          <span className="text-gray-400">영상 제출</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {isRevision ? '수정 영상 제출' : '새 버전 제출'}
        </h1>
        <p className="text-gray-400 mt-2">
           Cloudflare Stream을 통해 고화질 영상을 직접 업로드합니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* Stream Uploader */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">영상 업로드</h2>
          {uploadResult ? (
             <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center justify-between">
                <div>
                   <p className="text-green-400 font-bold flex items-center gap-2">
                      ✓ 업로드 완료
                   </p>
                   <p className="text-xs text-green-300 mt-1">UID: {uploadResult.uid}</p>
                </div>
                <button
                  onClick={() => setUploadResult(null)}
                  className="text-sm text-red-300 hover:text-red-200 underline"
                >
                  재업로드
                </button>
             </div>
          ) : (
             <StreamUploader onUploadComplete={handleUploadComplete} />
          )}
        </div>

        {/* Version Info Form */}
        <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">제출 정보</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                버전 슬롯
              </label>
              <select
                value={formData.versionSlot}
                onChange={(e) => setFormData({ ...formData, versionSlot: parseInt(e.target.value) })}
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={!!slotParam}
              >
                {[1, 2, 3, 4, 5].map((slot) => (
                  <option key={slot} value={slot} className="bg-gray-900">
                    버전 {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                 버전 제목 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.versionTitle}
                onChange={(e) => setFormData({ ...formData, versionTitle: e.target.value })}
                placeholder='예: "초안 제출", "피드백 반영본"'
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              작업 노트 (선택)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="제작 의도나 특이사항을 남겨주세요."
              className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={3}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
             <Link
               href={`/stars/my-projects/detail/${projectId}`}
               className="px-6 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
             >
               취소
             </Link>
             <button
               type="submit"
               disabled={!uploadResult || isSubmitting}
               className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               {isSubmitting ? '제출 중...' : '제출하기'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-white">Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
}
