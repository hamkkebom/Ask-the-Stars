'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { videosApi } from '@/lib/api/videos';
import {
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

type UploadStep = 'select' | 'details' | 'uploading' | 'complete';

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState<UploadStep>('select');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  // 파일 선택 핸들러
  const handleVideoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (1GB)
      if (file.size > 1024 * 1024 * 1024) {
        setError('파일 크기는 1GB 이하여야 합니다.');
        return;
      }
      setVideoFile(file);
      setFormData(prev => ({
        ...prev,
        title: file.name.replace(/\.[^/.]+$/, ''), // 확장자 제거한 파일명
      }));
      setStep('details');
    }
  }, []);

  const handleThumbnailSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 업로드 실행
  const handleUpload = async () => {
    if (!videoFile || !user) return;

    setStep('uploading');
    setError(null);

    try {
      // 1. R2에 업로드할 signed URL 요청 (백엔드 API 필요)
      // 현재는 직접 Supabase Storage 사용 또는 R2 Worker 호출

      // 시뮬레이션: 진행률 업데이트
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(r => setTimeout(r, 200));
        setUploadProgress(i);
      }

      // 2. 메타데이터 저장
      const videoData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: 'REVIEWING' as const,
        freelancer_id: user.id,
        r2_url: `${R2_PUBLIC_URL}/videos/${Date.now()}_${videoFile.name}`,
        thumbnail_url: thumbnailPreview || null,
      };

      await videosApi.createVideo(videoData);

      setStep('complete');
    } catch (err) {
      setError((err as Error).message);
      setStep('details');
    }
  };

  // 단계별 렌더링
  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-8 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">업로드 완료!</h1>
          <p className="text-[#aaa] mb-6">
            영상이 검토 대기열에 추가되었습니다.<br />
            승인 후 갤러리에 게시됩니다.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/stars/my-videos')}
              className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors"
            >
              내 영상 보기
            </button>
            <button
              onClick={() => {
                setStep('select');
                setVideoFile(null);
                setThumbnailFile(null);
                setFormData({ title: '', description: '', category: '' });
              }}
              className="px-6 py-2 bg-[#3f3f3f] text-white rounded-lg hover:bg-[#4f4f4f] transition-colors"
            >
              다른 영상 업로드
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-white mb-6">영상 업로드</h1>

      {step === 'select' && (
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] border-dashed p-12">
          <label className="flex flex-col items-center justify-center cursor-pointer group">
            <div className="w-20 h-20 bg-[#3f3f3f] rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
              <Upload className="w-10 h-10 text-[#aaa] group-hover:text-yellow-500 transition-colors" />
            </div>
            <p className="text-lg font-medium text-white mb-2">동영상 파일을 끌어다 놓거나 클릭하세요</p>
            <p className="text-sm text-[#666]">MP4, MOV, AVI (최대 1GB)</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              className="hidden"
            />
          </label>
        </div>
      )}

      {(step === 'details' || step === 'uploading') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-6">
              <h2 className="text-lg font-medium text-white mb-4">세부정보</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#aaa] mb-2">제목 (필수)</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="영상 제목을 입력하세요"
                    className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                    disabled={step === 'uploading'}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#aaa] mb-2">설명</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="영상에 대한 설명을 입력하세요"
                    className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 resize-none"
                    disabled={step === 'uploading'}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#aaa] mb-2">카테고리</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#121212] border border-[#3f3f3f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                    disabled={step === 'uploading'}
                  >
                    <option value="">선택하세요</option>
                    <option value="타로">타로</option>
                    <option value="사주">사주</option>
                    <option value="신년운세">신년운세</option>
                    <option value="관계">관계</option>
                    <option value="재물">재물</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-6">
              <h2 className="text-lg font-medium text-white mb-4">썸네일</h2>
              <div className="flex gap-4">
                <div className="w-40 h-24 bg-[#121212] rounded-lg overflow-hidden flex items-center justify-center">
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-[#666]" />
                  )}
                </div>
                <label className="flex-1 flex items-center justify-center border border-dashed border-[#3f3f3f] rounded-lg cursor-pointer hover:border-yellow-500 transition-colors">
                  <span className="text-[#aaa] text-sm">썸네일 업로드</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    className="hidden"
                    disabled={step === 'uploading'}
                  />
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>

          {/* Right: Preview & Actions */}
          <div className="space-y-4">
            <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-5 h-5 text-[#aaa]" />
                <span className="text-white font-medium truncate">{videoFile?.name}</span>
              </div>
              <p className="text-sm text-[#666]">
                {videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(1)} MB` : ''}
              </p>
            </div>

            {step === 'uploading' && (
              <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#aaa] text-sm">업로드 중...</span>
                  <span className="text-white text-sm">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={step === 'uploading' || !formData.title}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {step === 'uploading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  업로드 중...
                </>
              ) : (
                '업로드'
              )}
            </button>

            <button
              onClick={() => {
                setStep('select');
                setVideoFile(null);
              }}
              disabled={step === 'uploading'}
              className="w-full py-3 bg-[#3f3f3f] hover:bg-[#4f4f4f] disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
