'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Heart, Share2, MessageCircle, ThumbsUp, Calendar, Eye, Hash, ChevronRight } from 'lucide-react';
import { CompactVideoCard, VideoProps } from '@/components/ui/compact-video-card';
import { StreamPlayer } from '@/components/ui/stream-player';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { videosApi } from '@/lib/api/videos';
import { useEffect } from 'react';

interface VideoDetailClientProps {
  video: any;
  categoryVideos: VideoProps[];
  creatorVideos: VideoProps[];
  comments: any[];
}

export default function VideoDetailClient({ video, categoryVideos, creatorVideos, comments }: VideoDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [recommendations, setRecommendations] = useState<VideoProps[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      if (video.id) {
        const data = await videosApi.getRecommendations(video.id);
        const mapped = data.map((v: any) => ({
            id: v.id,
            title: v.title,
            thumbnailUrl: v.technicalSpec?.thumbnailUrl || v.thumbnailUrl || '/placeholder.jpg',
            counselor: { name: v.project?.counselor?.name || '상담사' },
            category: v.project?.category?.name || '영상',
            tags: [],
            views: v.views || 0,
            createdAt: new Date(v.createdAt).toLocaleDateString(),
            matchScore: Math.round((1 - (v.distance || 0)) * 100) // Convert distance to score
        }));
        setRecommendations(mapped);
      }
    }
    fetchRecommendations();
  }, [video.id]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev: number) => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-vibrant-cyan/30">
      {/* --- 배경 글로우 효과 --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-vibrant-cyan/5 rounded-[100%] blur-[120px] pointer-events-none z-0" />

      {/* --- 1. 시네마 모드 플레이어 섹션 --- */}
      <div className="relative w-full bg-black z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden group">
                 {/* Player Logic */}
                 {/* Player Logic */}
                 {video.streamUid ? (
                    <StreamPlayer
                        uid={video.streamUid}
                        token={video.technicalSpec?.streamToken}
                        poster={video.thumbnailUrl}
                        autoplay={false}
                    />
                 ) : video.videoUrl ? (
                    <video
                        src={video.videoUrl}
                        className="absolute inset-0 w-full h-full object-contain"
                        controls
                        autoPlay={false}
                        muted={false}
                        playsInline
                        poster={video.thumbnailUrl}
                    />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4 opacity-50">
                            <p className="text-sm font-medium tracking-widest uppercase">Video Not Available</p>
                        </div>
                    </div>
                 )}

                {/* Title Overlay (Only show if not playing? Or keeping it below?) */}
                {/* Removed overlay to not block controls. Title is usually below. */}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8 space-y-12">
                {/* 영상 메타 데이터 및 액션 버튼 */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-white/10">
                        <div className="flex items-center gap-6 text-sm text-neutral-400">
                             <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{video.views.toLocaleString()}회</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{video.createdAt}</span>
                             </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleLike}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform active:scale-95 border",
                                    isLiked
                                        ? "bg-vibrant-magenta/10 border-vibrant-magenta/50 text-vibrant-magenta shadow-[0_0_15px_-3px_rgba(255,0,255,0.3)]"
                                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                )}
                            >
                                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                                <span>{likes}</span>
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>공유</span>
                            </button>
                        </div>
                    </div>

                    {/* 영상 설명 박스 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {video.categories.map((cat: string) => (
                                <span key={cat} className="px-3 py-1 bg-vibrant-cyan/20 text-vibrant-cyan text-xs font-bold rounded-full border border-vibrant-cyan/20">
                                    #{cat}
                                </span>
                            ))}
                            {video.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-white/5 text-neutral-400 text-xs font-medium rounded-full border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                            {video.description}
                        </p>
                    </div>
                </div>

                <div>
                     {/* AI 추천 영상 섹션 */}
                {recommendations.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xl">🤖</span>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                AI 추천 영상
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recommendations.map((video) => (
                                <CompactVideoCard key={video.id} {...video} isNew={video.matchScore ? video.matchScore > 85 : false} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 댓글 섹션 */}
                     <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-vibrant-cyan" />
                            댓글 <span className="text-neutral-500 text-lg font-medium">{comments.length + 29}</span>
                        </h2>
                     </div>

                     {/* 댓글 입력창 모킹 */}
                     <div className="flex gap-4 mb-8">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex-shrink-0" />
                         <div className="flex-1">
                             <input
                                type="text"
                                placeholder="영상에 대한 생각이나 궁금한 점을 남겨주세요..."
                                className="w-full bg-transparent border-b border-white/20 py-2 focus:border-vibrant-cyan outline-none transition-colors text-white placeholder-neutral-500"
                             />
                             <div className="flex justify-end mt-2">
                                 <button className="px-4 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors">등록</button>
                             </div>
                         </div>
                     </div>

                     {/* 댓글 리스트 */}
                     <div className="space-y-6">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                                     <Image src={comment.profileUrl} alt={comment.user} width={40} height={40} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-neutral-200">{comment.user}</span>
                                            <span className="text-xs text-neutral-500">{comment.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-neutral-300 text-sm leading-relaxed mb-2">{comment.content}</p>
                                    <button className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                        <span>{comment.likes}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>
                     <button className="w-full py-4 mt-6 text-sm text-neutral-500 hover:text-vibrant-cyan transition-colors font-medium border-t border-white/5">
                        댓글 더보기
                     </button>
                </div>

                {/* 하단 섹션: 카테고리별 관련 영상 */}
                <div className="pt-8 border-t border-white/10">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Hash className="w-5 h-5 text-vibrant-magenta" />
                            '<span className="text-vibrant-magenta">{video.categories[0]}</span>' 카테고리 인기 영상
                        </h2>
                        <Link href="/videos" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                            더보기 <ChevronRight className="w-3 h-3" />
                        </Link>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        {categoryVideos.map(v => (
                            <CompactVideoCard key={v.id} {...v} />
                        ))}
                     </div>
                </div>
            </div>

            {/* --- 우측 사이드바: 상담사 프로필 및 제작자 영상 --- */}
            <div className="lg:col-span-4 space-y-8">
                {/* 상담사/제작자 프로필 카드 */}
                <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6">
                         <div className="flex items-center gap-4 mb-4">
                             <div className="w-16 h-16 rounded-full border-2 border-vibrant-cyan/30 p-0.5">
                                 <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image src={video.counselor.avatarUrl} alt={video.counselor.name} fill className="object-cover" />
                                 </div>
                             </div>
                             <div>
                                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                     {video.counselor.name}
                                     <span className="px-1.5 py-0.5 bg-black/40 border border-vibrant-cyan/50 rounded text-[10px] text-vibrant-cyan">Official</span>
                                 </h3>
                                 <p className="text-sm text-neutral-400">{video.counselor.role}</p>
                             </div>
                         </div>
                         <div className="mt-4">
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors">
                                프로필 상세
                            </button>
                         </div>
                    </div>
                </div>

                {/* 제작자의 다른 영상 (수직 리스트) */}
                <div>
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-vibrant-cyan rounded-full"/>
                        {video.creator.name} 제작자의 다른 영상
                    </h3>
                    <div className="space-y-4">
                        {creatorVideos.map(v => (
                            <div key={v.id} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 border border-white/5">
                                     <Image src={v.thumbnailUrl} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                     <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 rounded text-[10px] text-white backdrop-blur-sm">
                                         10:05
                                     </div>
                                </div>
                                <h4 className="text-sm font-medium text-neutral-200 line-clamp-2 group-hover:text-vibrant-cyan transition-colors">
                                    {v.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                                    <span>조회 {v.views?.toLocaleString()}</span>
                                    <span>•</span>
                                    <span>{v.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
