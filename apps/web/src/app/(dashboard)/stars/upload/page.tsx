'use client';

import { useState, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Upload, ChevronLeft } from 'lucide-react';

function UploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get query params
  const projectId = searchParams.get('projectId') || '';
  const slotParam = searchParams.get('slot');
  const titleParam = searchParams.get('title') || '';
  const isRevision = searchParams.get('revision') === 'true';

  const [formData, setFormData] = useState({
    projectId: projectId,
    versionSlot: slotParam ? parseInt(slotParam) : 1,
    versionTitle: titleParam,
    versionNumber: isRevision ? '' : 'v1.0',
    notes: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile: File) => {
    // Validate file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(selectedFile.type)) {
      alert('지원하지 않는 파일 형식입니다. MP4, MOV, AVI 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (2GB max)
    const maxSize = 2 * 1024 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      alert('파일 크기가 너무 큽니다. 최대 2GB까지 업로드 가능합니다.');
      return;
    }

    setFile(selectedFile);

    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  }, []);

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('영상 파일을 선택해주세요.');
      return;
    }

    if (!formData.versionTitle.trim()) {
      alert('버전 제목을 입력해주세요.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      alert('영상이 성공적으로 업로드되었습니다!');
      router.push(`/stars/my-projects/detail/${formData.projectId}`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/stars/my-projects" className="hover:text-white transition-colors flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            내 프로젝트
          </Link>
          <span>/</span>
          <span className="text-gray-400">영상 업로드</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {isRevision ? '수정 영상 업로드' : '새 영상 업로드'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">영상 파일</h2>

          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              dragActive
                ? 'border-yellow-500 bg-yellow-500/10'
                : file
                ? 'border-green-500 bg-green-500/10'
                : 'border-white/20 hover:border-white/40'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />

            {file ? (
              <div>
                <div className="text-green-400 text-4xl mb-2">✓</div>
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview(null);
                  }}
                  className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  파일 변경
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-white font-medium">
                  파일을 드래그하거나 클릭하여 선택하세요
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  MP4, MOV, AVI · 최대 2GB
                </p>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400 mb-2">미리보기</p>
              <video
                src={preview}
                controls
                className="w-full rounded-lg bg-black"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
        </div>

        {/* Version Info */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">버전 정보</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                버전 슬롯
              </label>
              <select
                value={formData.versionSlot}
                onChange={(e) => setFormData({ ...formData, versionSlot: parseInt(e.target.value) })}
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
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
                버전 번호
              </label>
              <input
                type="text"
                value={formData.versionNumber}
                onChange={(e) => setFormData({ ...formData, versionNumber: e.target.value })}
                placeholder="v1.0"
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              버전 제목 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.versionTitle}
              onChange={(e) => setFormData({ ...formData, versionTitle: e.target.value })}
              placeholder='예: "경쾌한 톤", "차분한 톤"'
              className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              이 버전의 특징을 짧게 설명해주세요
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              설명 (선택)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="제작 의도, 특이사항 등을 작성해주세요..."
              className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              rows={3}
            />
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">업로드 중...</h2>
            <div className="w-full bg-white/10 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-gray-400">
              {uploadProgress}% 완료
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href={projectId ? `/stars/my-projects/detail/${projectId}` : '/stars/my-projects'}
            className="px-6 py-2 bg-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={!file || isUploading}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isUploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
}

