'use client';

import * as React from 'react';
import { Button } from '@ask-the-stars/ui';
import { UploadCloud, X, File as FileIcon, Loader2 } from 'lucide-react';
import { uploadsApi } from '@/lib/api/uploads';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  maxSizeMB?: number; // e.g., 5 for 5MB
  className?: string;
  folder?: 'images' | 'videos';
}

export function FileUploader({
  onUploadComplete,
  accept = 'image/*',
  maxSizeMB = 5,
  className,
  folder = 'images',
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // Fake progress for UX
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }
    // Basic type check based on accept prop
    if (accept.includes('image') && !selectedFile.type.startsWith('image/')) {
        alert('Images only please');
        return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
        setPreview(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(10); // Start progress

    try {
      // Fake progress interval
      const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 90) {
                clearInterval(interval);
                return 90;
            }
            return prev + 10;
        });
      }, 200);

      const response = await uploadsApi.uploadFile(file, folder);

      clearInterval(interval);
      setProgress(100);

      onUploadComplete(response.url);

      // Reset after success
      setTimeout(() => {
          setUploading(false);
          setProgress(0);
          handleRemove();
      }, 500);

    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors',
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {accept === 'image/*' ? 'PNG, JPG, GIF' : 'Files'} up to {maxSizeMB}MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <div className="relative w-full rounded-lg border p-4 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md"
              />
            ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                    <FileIcon className="w-8 h-8 text-gray-400" />
                </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.2s' }}></div>
                  </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
                {!uploading && (
                    <Button variant="ghost" size="icon" onClick={handleRemove}>
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
          </div>

          {!uploading && (
              <div className="mt-4 flex justify-end">
                <Button onClick={handleUpload} disabled={uploading}>
                    Upload
                </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
