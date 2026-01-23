'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance as api } from '@/lib/api';
import { formatBytes } from '@/lib/utils';
import { FileVideo, Loader2, Play, RefreshCw, HardDrive, Database, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

// Define the file interface
interface R2File {
  key: string;
  size: number;
  lastModified: string;
  url: string;
  folder: string;
}

export default function VideoAssetsPage() {
  const [selectedVideo, setSelectedVideo] = useState<R2File | null>(null);

  const { data, isLoading, error, refetch } = useQuery<{ success: boolean; files: R2File[] }>({
    queryKey: ['r2-videos'],
    queryFn: async () => {
      const res = await api.get('/uploads');
      return res.data;
    },
  });

  const { data: dbKeys } = useQuery<string[]>({
    queryKey: ['db-video-keys'],
    queryFn: async () => {
      const res = await api.get('/videos/database/keys');
      return res.data;
    },
  });

  const registeredKeys = new Set(dbKeys || []);

  const files = data?.files || [];
  const videos = files.filter(f => f.key.endsWith('.mp4') || f.key.endsWith('.mov'));
  const folders = Array.from(new Set(videos.map(v => v.folder)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">영상 자산 관리 (R2)</h1>
          <p className="text-slate-400">R2 버킷에 저장된 영상 파일 목록입니다.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <FileVideo className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">전체 비디오</p>
              <p className="text-2xl font-bold">{videos.length}개</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">총 용량</p>
              <p className="text-2xl font-bold">
                {formatBytes(videos.reduce((acc, curr) => acc + curr.size, 0))}
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
           <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
              <Loader2 className="w-6 h-6" />
            </div>
             <div>
              <p className="text-slate-400 text-sm">로딩 상태</p>
              <p className="text-2xl font-bold">{isLoading ? '로딩 중...' : '완료'}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* File List */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
             <div className="flex items-center justify-center py-20">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : videos.length === 0 ? (
             <GlassCard className="p-12 text-center text-slate-400">
               영상이 없습니다.
             </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {videos.map((video) => (
                <div
                  key={video.key}
                  onClick={() => setSelectedVideo(video)}
                  className={`group relative p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${
                    selectedVideo?.key === video.key
                      ? 'border-primary bg-primary/5'
                      : 'border-white/5 bg-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                      <FileVideo className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      {registeredKeys.has(video.key) && (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          DB 연동됨
                        </span>
                      )}
                      <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                        {video.folder}
                      </span>
                    </div>
                  </div>
                  <p className="font-medium text-sm truncate mb-1" title={video.key}>
                    {video.key.split('/').pop()}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatBytes(video.size)} • {new Date(video.lastModified).toLocaleDateString()}
                  </p>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Player */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="font-bold mb-4">미리보기</h2>
            {selectedVideo ? (
              <GlassCard className="p-4 overflow-hidden">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <video
                    src={selectedVideo.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                   <p className="font-medium truncate">{selectedVideo.key.split('/').pop()}</p>
                   <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{formatBytes(selectedVideo.size)}</span>
                      <span>{selectedVideo.folder}</span>
                   </div>
                   <div className="pt-4 border-t border-white/10 mt-4">
                      <p className="text-xs text-slate-500 mb-1">Direct URL</p>
                      <code className="block w-full p-2 bg-black/30 rounded text-xs text-slate-300 break-all">
                        {selectedVideo.url}
                      </code>
                   </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 text-center text-slate-400 min-h-[300px] flex items-center justify-center">
                <p>영상을 선택하여 미리보기</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
