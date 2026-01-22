'use client';

import { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  maxSize?: number; // bytes
  maxFiles?: number;
  accept?: string[]; // e.g. ['image/*', 'application/pdf']
  className?: string;
}

export function FileDropzone({
  onFilesSelected,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  accept,
  className = '',
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB 이하여야 합니다.`;
    }
    // Simple MIME type check if accept is provided
    if (accept && accept.length > 0) {
      const fileType = file.type;
      const isAccepted = accept.some(type => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });
      if (!isAccepted) {
        return '지원하지 않는 파일 형식입니다.';
      }
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const validFiles: File[] = [];
    const errors: string[] = [];

    if (files.length > maxFiles) {
      setError(`최대 ${maxFiles}개 파일까지 업로드 가능합니다.`);
      return;
    }

    Array.from(files).forEach(file => {
      const errorMsg = validateFile(file);
      if (errorMsg) {
        errors.push(`${file.name}: ${errorMsg}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors[0]); // Show first error
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/10 hover:border-purple-400/50 hover:bg-white/5'
        } ${error ? 'border-red-500/50' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept={accept?.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center gap-3">
          <div className={`p-3 rounded-full transition-colors ${
            isDragging ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400 group-hover:text-purple-400'
          }`}>
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">
              파일을 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-sm text-gray-500">
              최대 {Math.round(maxSize / 1024 / 1024)}MB, {accept ? '관련 파일' : '모든 파일'}
            </p>
          </div>
        </div>

        {error && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-12 left-0 right-0 text-center"
          >
            <div className="inline-flex items-center gap-2 text-red-400 text-sm bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </m.div>
        )}
      </div>
    </div>
  );
}
