import { useState, useRef, useEffect } from 'react';
import { Upload } from 'tus-js-client';
import { Button } from '@ask-the-stars/ui';
import { GlassCard } from '../ui/glass-card';
import { UploadCloud, X, FileVideo, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface StreamUploaderProps {
  onUploadComplete: (result: { uid: string; videoUrl: string }) => void;
  allowedExtensions?: string[];
  maxSizeMB?: number;
}

export default function StreamUploader({
  onUploadComplete,
  allowedExtensions = ['mp4', 'mov', 'avi', 'mkv'],
  maxSizeMB = 2048 // 2GB default
}: StreamUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useRef<any>(null); // To store upload url params if needed
  const uploadInstance = useRef<Upload | null>(null); // Keep for TUS fallback (maybe remove later)
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate Extension
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setError(`지원하지 않는 파일 형식입니다. (${allowedExtensions.join(', ')})`);
      return;
    }

    // Validate Size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploadProgress(0);
  };

  const startUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      // 1. Get Presigned PUT URL for R2 (Backend)
      // We assume this endpoint returns { url, key }
      const presignedRes = await axios.post('/api/uploads/presigned-put-url', {
        key: `raw/${Date.now()}_${file.name}`, // Generate a safe key prefix
        contentType: file.type
      });

      if (!presignedRes.data.success || !presignedRes.data.url) {
          throw new Error('Failed to generate upload URL');
      }

      const { url, key } = presignedRes.data;

      // 2. Upload to R2 (Direct PUT)
      await axios.put(url, file, {
          headers: {
              'Content-Type': file.type
          },
          onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                  const percent = (progressEvent.loaded / progressEvent.total) * 100;
                  setUploadProgress(percent);
              }
          },
          signal: signal
      });

      console.log('✅ R2 Upload Complete:', key);

      // 3. Import to Cloudflare Stream (Backend Trigger)
      // Note: We need a public URL for Stream to copy from.
      // If R2 is private, we might need a presigned GET url, or the backend generates it.
      // The backend 'importVideoFromR2' expects a URL.
      // If we pass the R2 Public URL (if configured) or Presigned GET.
      // The Backend 'UploadsService' has 'getPresignedUrl' (GET). Use that!

      const getUrlRes = await axios.post('/api/uploads/presigned', { key });
      if (!getUrlRes.data.success) {
           throw new Error('Failed to get verification URL');
      }
      const publicR2Url = getUrlRes.data.url;

      // 4. Trigger Stream Import
      const importRes = await axios.post('/api/videos/import-stream', {
          url: publicR2Url,
          creator: 'user_upload' // Pass metadata if needed
      });

      const { uid } = importRes.data;

      // 5. Complete
      setIsUploading(false);
      onUploadComplete({
        uid,
        videoUrl: `https://cloudflarestream.com/${uid}/manifest/video.m3u8`
      });
      toast.success('동영상 업로드 및 변환 요청이 완료되었습니다.');

    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log('Upload cancelled by user:', err.message);
        setError('업로드가 취소되었습니다.');
      } else {
        console.error(err);
        setError(err.message || '업로드 실패');
      }
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsUploading(false);
      setUploadProgress(0);
      setFile(null);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative">
          <input
            type="file"
            accept={allowedExtensions.map(ext => `.${ext}`).join(',')}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="bg-primary/20 p-4 rounded-full">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-white font-medium">동영상 파일을 드래그하거나 클릭하여 선택하세요</p>
              <p className="text-sm text-gray-500 mt-1">
                최대 {maxSizeMB}MB • {allowedExtensions.join(', ').toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="bg-white/10 p-2 rounded-lg">
                 <FileVideo className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                 <p className="text-white font-medium truncate max-w-[200px]">{file.name}</p>
                 <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(1)}MB</p>
               </div>
            </div>
            {!isUploading && !uploadProgress && (
               <button onClick={() => setFile(null)} className="text-gray-400 hover:text-white">
                 <X className="w-5 h-5" />
               </button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {isUploading ? (
             <div className="space-y-2">
               <div className="flex justify-between text-xs text-gray-400">
                 <span>업로드 중...</span>
                 <span>{uploadProgress.toFixed(0)}%</span>
               </div>
               <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                 <div
                   className="h-full bg-primary transition-all duration-300 ease-out"
                   style={{ width: `${uploadProgress}%` }}
                 />
               </div>
               <div className="flex justify-end mt-2">
                 <button onClick={cancelUpload} className="text-xs text-red-300 hover:text-red-200">
                    취소
                 </button>
               </div>
             </div>
          ) : (
             <Button onClick={startUpload} className="w-full">
               업로드 시작
             </Button>
          )}
        </GlassCard>
      )}
    </div>
  );
}
