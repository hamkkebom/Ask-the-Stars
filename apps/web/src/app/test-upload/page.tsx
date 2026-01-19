'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/common/file-uploader';
import { Card, CardContent, CardHeader, CardTitle } from '@ask-the-stars/ui';

export default function TestUploadPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  return (
    <div className="container py-10 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>File Upload Test (R2)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 text-sm">
            <p className="font-bold">⚠️ 테스트 전 확인사항</p>
            <p>1. `.env` 파일에 Cloudflare R2 설정이 올바르게 되어 있어야 합니다.</p>
            <p>2. 백엔드 서버가 실행 중이어야 합니다.</p>
          </div>

          <FileUploader
            onUploadComplete={(url) => {
              console.log('Upload Complete:', url);
              setUploadedUrl(url);
            }}
            accept="image/*,video/*"
          />

          {uploadedUrl && (
            <div className="mt-6 p-4 border rounded-md bg-green-50">
              <p className="font-bold text-green-800 mb-2">✅ 업로드 성공!</p>
              <p className="text-xs text-gray-500 break-all mb-4">{uploadedUrl}</p>

              {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img src={uploadedUrl} alt="Uploaded" className="max-w-full rounded-md shadow-sm" />
              ) : (
                <video src={uploadedUrl} controls className="max-w-full rounded-md shadow-sm" />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
