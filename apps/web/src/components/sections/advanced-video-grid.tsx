'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompactVideoCard, {
  VideoProps,
} from '@/components/ui/compact-video-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { videosApi } from '@/lib/api/videos';
import { getThumbnailSrc } from '@/lib/utils/video-url';
import { useVideoGridFilters } from '@/hooks/useVideoGridFilters';
import { VideoGridFilterBar } from './video-grid-filter-bar';
import { VideoGridFilterTray } from './video-grid-filter-tray';
import { EmptyState } from '@/components/common/EmptyState';
import { AlertCircle, Film, SearchX } from 'lucide-react';

/**
 * Extract a human-readable title from an encoded file path.
 * e.g. "uploads/%EC%83%81%EB%8B%B4%EC%82%AC%20.../[상담사] 운경_v1.0.mp4" → "[상담사] 운경_v1.0"
 */
function extractTitleFromFilename(
  filename: string | null | undefined
): string | undefined {
  if (!filename) return undefined;
  try {
    const decoded = decodeURIComponent(filename);
    // Get just the filename (last path segment)
    const basename = decoded.split('/').pop() || decoded;
    // Remove file extension
    return basename.replace(/\.[^/.]+$/, '');
  } catch {
    // Fallback if decode fails
    const basename = filename.split('/').pop() || filename;
    return basename.replace(/\.[^/.]+$/, '');
  }
}

export function AdvancedVideoGrid() {
  const filters = useVideoGridFilters();
  const {
    searchQuery,
    selectedCategory,
    selectedCounselor,
    selectedCreator,
    selectedSort,
  } = filters;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      'final-videos',
      selectedCategory,
      selectedCounselor,
      selectedCreator,
      selectedSort,
    ],
    queryFn: ({ pageParam = 1 }) =>
      videosApi.listAllFinalVideos({
        page: pageParam as number,
        limit: 25,
        category: selectedCategory,
        counselor: selectedCounselor,
        creator: selectedCreator,
        sort: selectedSort === '최신순' ? 'latest' : 'popular',
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.has_more) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const allVideos = data?.pages.flatMap((page) => page.data) || [];

  const videos: VideoProps[] = allVideos.map((v: any) => ({
    id: v.id,
    title:
      v.title ||
      extractTitleFromFilename(v.technicalSpec?.filename) ||
      v.project?.title ||
      v.versionLabel ||
      '제목 없음',
    thumbnailUrl:
      v.thumbnail_url ||
      getThumbnailSrc(v.technicalSpec) ||
      v.thumbnailUrl ||
      '/placeholder.jpg',
    videoUrl: v.stream_url || v.r2_url || v.videoUrl || null,
    description: v.description || v.feedback,
    category: v.category || v.project?.category?.name || '기타',
    tags: [v.counselor?.name || v.project?.counselor?.name || '일반'],
    counselor: {
      name: v.counselor?.name || v.project?.counselor?.name || '상담사',
    },
    creator: {
      name:
        v.freelancer?.name ||
        v.maker?.name ||
        v.project?.owner?.name ||
        '함께봄 스튜디오',
    },
    createdAt: new Date(v.created_at || v.createdAt)
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '/')
      .replace('.', ''),
    views: v.views || 0,
    likes: v.likes || 0,
    isAdApproved: v.isAdApproved || false,
  }));

  // Client-side search filtering
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const query = searchQuery.toLowerCase();
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query) ||
        v.counselor?.name.toLowerCase().includes(query) ||
        v.creator?.name.toLowerCase().includes(query) ||
        v.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [videos, searchQuery]);

  // Intersection Observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [sentinelRef, setSentinelRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '400px' }
    );

    if (sentinelRef) observer.observe(sentinelRef);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sentinelRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full bg-background relative">
      {/* Filter Bar */}
      <VideoGridFilterBar
        filters={filters}
        videoCount={filteredVideos.length}
      />

      {/* Filter Tray Overlay */}
      <VideoGridFilterTray filters={filters} />

      {/* Main Grid Content */}
      <main className="container mx-auto px-4 pt-8 min-h-[50vh]">
        {status === 'pending' ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : status === 'error' ? (
          <EmptyState
            icon={AlertCircle}
            title="영상을 불러오지 못했어요"
            description="일시적인 문제일 수 있어요. 잠시 후 다시 시도해 주세요."
            action={{ label: '다시 불러오기', onClick: () => refetch() }}
            className="my-12"
          />
        ) : filteredVideos.length === 0 ? (
          searchQuery.trim() ? (
            <EmptyState
              icon={SearchX}
              title="검색 결과가 없어요"
              description="다른 검색어나 필터로 다시 찾아보세요."
              className="my-12"
            />
          ) : (
            // API 래퍼가 오류를 빈 목록으로 돌려주므로, 빈 목록도 재시도를 안내한다
            <EmptyState
              icon={Film}
              title="아직 볼 수 있는 영상이 없어요"
              description="영상을 불러오지 못했거나 아직 공개된 영상이 없습니다. 잠시 후 다시 시도해 주세요."
              action={{ label: '다시 불러오기', onClick: () => refetch() }}
              className="my-12"
            />
          )
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <CompactVideoCard {...video} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Loading Sentinel */}
            <div
              ref={setSentinelRef}
              className="h-20 w-full flex justify-center items-center mt-10"
            >
              {isFetchingNextPage && (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/50"></div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
