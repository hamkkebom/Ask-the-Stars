'use client';

import { useState, useCallback } from 'react';
import {
  Cloud,
  Upload,
  X,
  File,
  FileVideo,
  FileImage,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

export interface FileUploadOptions {
  maxFiles?: number;
  maxSize?: number; // bytes
  allowedTypes?: string[];
  multiple?: boolean;
  autoUpload?: boolean;
}

export default function FileUploader({
  options = {},
  onUpload,
  onFilesChange,
}: {
  options?: FileUploadOptions;
  onUpload?: (files: File[]) => Promise<{ url: string; fileId: string }[]>;
  onFilesChange?: (files: FileUploadItem[]) => void;
}) {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useState<HTMLInputElement>(null)[0];

  const {
    maxFiles = 10,
    maxSize = 100 * 1024 * 1024, // 100MB
    allowedTypes = ['image/*', 'video/*', 'application/pdf'],
    multiple = true,
    autoUpload = true,
  } = options;

  // 파일 아이콘 결정
  const getFileIcon = (type: string) => {
    if (type.startsWith('video/'))
      return <FileVideo className="w-5 h-5 text-blue-500" />;
    if (type.startsWith('image/'))
      return <FileImage className="w-5 h-5 text-green-500" />;
    if (type.includes('pdf'))
      return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  // 파일 크기 포맷
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 파일 검증
  const validateFiles = (fileList: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    // 파일 수 제한
    if (files.length + fileList.length > maxFiles) {
      errors.push(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return { validFiles, errors };
    }

    fileList.forEach((file) => {
      // 파일 크기 제한
      if (file.size > maxSize) {
        errors.push(
          `${file.name} 파일이 너무 큽니다 (최대 ${formatFileSize(maxSize)}).`
        );
        return;
      }

      // 파일 타입 검증
      const isAllowedType = allowedTypes.some((allowed) => {
        if (allowed.endsWith('*')) {
          return file.type.startsWith(allowed.slice(0, -2));
        }
        return file.type === allowed;
      });

      if (!isAllowedType) {
        errors.push(`${file.name} 파일 형식이 지원되지 않습니다.`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, errors };
  };

  // 파일 추가
  const addFiles = useCallback(
    (fileList: File[]) => {
      const { validFiles, errors } = validateFiles(fileList);

      if (errors.length > 0) {
        // 에러 표시 (Toast 등으로 변경 가능)
        console.error('File validation errors:', errors);
        // 여기서 Toast 표시 로직 추가 가능
        return;
      }

      const newFiles: FileUploadItem[] = validFiles.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
      }));

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      if (autoUpload && onUpload) {
        uploadFiles(newFiles.map((f) => f.file));
      }
    },
    [
      files,
      maxFiles,
      maxSize,
      allowedTypes,
      autoUpload,
      onUpload,
      onFilesChange,
    ]
  );

  // 파일 업로드
  const uploadFiles = async (fileList: File[]) => {
    if (!onUpload) return;

    const uploadPromises = fileList.map(
      (file) =>
        new Promise<{ fileId: string; url: string }>((resolve, reject) => {
          // 파일 ID로 상태 업데이트
          const fileId = `${file.name}-${Date.now()}-${Math.random()}`;

          // 파일 상태를 업로딩으로 변경
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, status: 'uploading', progress: 0 } : f
            )
          );

          // 시뮬레이션된 업로드 진행률
          const progressInterval = setInterval(() => {
            setFiles((prev) => {
              const currentFile = prev.find((f) => f.file === file);
              if (!currentFile || currentFile.status !== 'uploading') {
                clearInterval(progressInterval);
                return prev;
              }

              const newProgress = Math.min(
                currentFile.progress + Math.random() * 20,
                90
              );
              return prev.map((f) =>
                f.file === file ? { ...f, progress: newProgress } : f
              );
            });
          }, 200);

          // 실제 업로드 호출
          onUpload([file])
            .then((results) => {
              clearInterval(progressInterval);
              const result = results[0];

              setFiles((prev) =>
                prev.map((f) =>
                  f.file === file
                    ? {
                        ...f,
                        status: 'success',
                        progress: 100,
                        url: result.url,
                      }
                    : f
                )
              );

              resolve(result);
            })
            .catch((error) => {
              clearInterval(progressInterval);

              setFiles((prev) =>
                prev.map((f) =>
                  f.file === file
                    ? { ...f, status: 'error', error: error.message }
                    : f
                )
              );

              reject(error);
            });
        })
    );

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  // 파일 제거
  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);

    // input 초기화 (같은 파일 재선택 가능)
    if (fileInputRef) {
      fileInputRef.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        {/* 업로드 영역 */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={allowedTypes.join(',')}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="pointer-events-none">
            <Cloud className="w-12 h-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              파일을 드래그하거나 클릭하여 선택하세요
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {multiple ? `최대 ${maxFiles}개` : '1개'} 파일, 최대{' '}
              {formatFileSize(maxSize)}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors pointer-events-auto"
              onClick={() => fileInputRef?.click()}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              파일 선택
            </motion.button>
          </div>
        </div>

        {/* 파일 목록 */}
        {files.length > 0 && (
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              업로드된 파일 ({files.length})
            </h4>

            <div className="space-y-3">
              {files.map((fileItem, index) => (
                <motion.div
                  key={fileItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(fileItem.type)}
                    <div>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">
                        {fileItem.name}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatFileSize(fileItem.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* 업로드 상태 */}
                    {fileItem.status === 'uploading' && (
                      <div className="w-24">
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${fileItem.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                          {Math.round(fileItem.progress)}%
                        </p>
                      </div>
                    )}

                    {fileItem.status === 'success' && (
                      <span className="text-green-600 text-sm">✓ 완료</span>
                    )}

                    {fileItem.status === 'error' && (
                      <span
                        className="text-red-600 text-sm"
                        title={fileItem.error}
                      >
                        ✗ 오류
                      </span>
                    )}

                    {/* 제거 버튼 */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(fileItem.id)}
                      className="p-1 text-neutral-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 전체 업로드 버튼 (autoUpload가 false일 때) */}
            {!autoUpload && files.some((f) => f.status === 'pending') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  uploadFiles(
                    files
                      .filter((f) => f.status === 'pending')
                      .map((f) => f.file)
                  )
                }
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {files.filter((f) => f.status === 'pending').length}개 파일
                업로드
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
