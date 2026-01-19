'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Share2, MessageCircle, ThumbsUp, Calendar, Eye, Clock, Hash, ChevronRight } from 'lucide-react';
import { CompactVideoCard, VideoProps } from '@/components/ui/compact-video-card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// --- Mock Data ---
const mockVideo = {
  id: 'v1',
  title: '2026 신년운세 - 푸른 뱀의 해, 당신의 재물운이 터지는 시기는?',
  videoUrl: '/videos/sample.mp4',
  thumbnailUrl: 'https://images.unsplash.com/photo-1515523110800-941516ebcd43?auto=format&fit=crop&q=80&w=1000',
  views: 15420,
  likes: 892,
  createdAt: '2026.01.15',
  duration: '12:30',
  description: '2026년 을사년(푸른 뱀의 해)은 지혜와 재물을 상징합니다. 특히 상반기보다 하반기에 주목해야 할 띠별 운세를 상세하게 풀어드립니다. 사주 전문가 김태희 상담사가 알려드리는 행운의 비밀을 놓치지 마세요!',
  categories: ['신년운세', '사주'],
  tags: ['2026운세', '재물운', '띠별운세'],
  counselor: {
    id: 'c1',
    name: '김태희',
    role: '사주 명리 전문가',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    stats: { rating: 4.9, reviews: 1205, consultations: 5000 }
  },
  creator: {
    id: 'f1',
    name: '박건우',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack'
  },
};

const creatorVideos: VideoProps[] = [
  { id: 'cv1', title: '황금 돼지띠 2월 운세 총정리', thumbnailUrl: 'https://images.unsplash.com/photo-1549480662-8f6a9e2d3d92?auto=format&fit=crop&q=80&w=500', category: '월별운세', tags: ['돼지띠'], counselor: { name: '김태희' }, creator: { name: '박건우' }, views: 5200, createdAt: '3일 전' },
  { id: 'cv2', title: '손금으로 보는 나의 말년운', thumbnailUrl: 'https://images.unsplash.com/photo-1581023719881-acef076b9071?auto=format&fit=crop&q=80&w=500', category: '관상', tags: ['손금'], counselor: { name: '김태희' }, creator: { name: '박건우' }, views: 3400, createdAt: '1주일 전' },
  { id: 'cv3', title: '이사 가기 좋은 날짜/방향', thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=500', category: '풍수', tags: ['이사운'], counselor: { name: '김태희' }, creator: { name: '박건우' }, views: 8900, createdAt: '2주일 전' },
];

const categoryVideos: VideoProps[] = [
  { id: 'rv1', title: '타로로 보는 이번 달 연애운', thumbnailUrl: 'https://images.unsplash.com/photo-1620065463208-c87aecb39130?auto=format&fit=crop&q=80&w=500', category: '타로', tags: ['연애운'], counselor: { name: '지니' }, creator: { name: '김PD' }, views: 12500, createdAt: '어제' },
  { id: 'rv2', title: '꿈해몽: 이빨 빠지는 꿈', thumbnailUrl: 'https://images.unsplash.com/photo-1445462657202-a0893228a1e1?auto=format&fit=crop&q=80&w=500', category: '해몽', tags: ['흉몽'], counselor: { name: '천명' }, creator: { name: '이감독' }, views: 4200, createdAt: '2일 전' },
  { id: 'rv3', title: '나에게 맞는 수호신 찾기', thumbnailUrl: 'https://images.unsplash.com/photo-1599703498064-0775d7857193?auto=format&fit=crop&q=80&w=500', category: '신점', tags: ['수호신'], counselor: { name: '무무' }, creator: { name: '박PD' }, views: 7600, createdAt: '5일 전' },
  { id: 'rv4', title: '돈이 들어오는 지갑 풍수', thumbnailUrl: 'https://images.unsplash.com/photo-1620786595460-64585f57fc1a?auto=format&fit=crop&q=80&w=500', category: '풍수', tags: ['재물운'], counselor: { name: '청담' }, creator: { name: '김제작' }, views: 25000, createdAt: '10일 전' },
];

const comments = [
    { id: 1, user: '별님123', content: '정말 소름돋네요... 지난달에 말씀하신 거 다 맞았어요 ㄷㄷ', date: '2시간 전', likes: 24, profileUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix' },
    { id: 2, user: '행운가득', content: '목소리가 너무 편안해서 끝까지 다 봤습니다. 감사합니다!', date: '5시간 전', likes: 12, profileUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka' },
    { id: 3, user: '미래지향', content: '내년 하반기 기대되네요! 화이팅!', date: '1일 전', likes: 5, profileUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Precious' },
];

export default function VideoDetailPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(mockVideo.likes);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-vibrant-cyan/30">

      {/* --- Ambient Background Glow --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-vibrant-cyan/5 rounded-[100%] blur-[120px] pointer-events-none z-0" />

      {/* --- 1. Cinema Mode Player Section --- */}
      <div className="relative w-full bg-black z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
            {/* Cinema Container */}
            <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden group">
                 {/* Placeholder for Video Player */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
                            <span className="text-4xl ml-1">▶</span>
                        </div>
                        <p className="text-sm font-medium tracking-widest uppercase">Cinema Mode</p>
                    </div>
                </div>
                {/* Simulated Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Immersive Title Overlay (Visible on Pause/Hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/60 to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
                            {mockVideo.title}
                        </h1>
                    </motion.div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* --- Left Column: Main Info & Comments (8 cols) --- */}
            <div className="lg:col-span-8 space-y-12">

                {/* Video Meta & Actions */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-white/10">
                        <div className="flex items-center gap-6 text-sm text-neutral-400">
                             <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{mockVideo.views.toLocaleString()}회</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{mockVideo.createdAt}</span>
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

                    {/* Description Box */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {mockVideo.categories.map(cat => (
                                <span key={cat} className="px-3 py-1 bg-vibrant-cyan/20 text-vibrant-cyan text-xs font-bold rounded-full border border-vibrant-cyan/20">
                                    #{cat}
                                </span>
                            ))}
                            {mockVideo.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 text-neutral-400 text-xs font-medium rounded-full border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                            {mockVideo.description}
                        </p>
                    </div>
                </div>

                {/* Comments Section */}
                <div>
                     <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <MessageCircle className="w-6 h-6 text-vibrant-cyan" />
                            댓글 <span className="text-neutral-500 text-lg font-medium">32</span>
                        </h2>
                     </div>

                     {/* Comment Input Mock */}
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

                     {/* Comment List */}
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

                {/* --- Bottom Section: Related by Category --- */}
                <div className="pt-8 border-t border-white/10">
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Hash className="w-5 h-5 text-vibrant-magenta" />
                            '<span className="text-vibrant-magenta">{mockVideo.categories[0]}</span>' 카테고리 인기 영상
                        </h2>
                        <Link href="/videos" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                            더보기 <ChevronRight className="w-3 h-3" />
                        </Link>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        {categoryVideos.map(video => (
                            <CompactVideoCard key={video.id} {...video} />
                        ))}
                     </div>
                </div>

            </div>

            {/* --- Right Column: Sidebar (4 cols) --- */}
            <div className="lg:col-span-4 space-y-8">

                {/* Creator/Counselor Profile Card */}
                <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6">
                         <div className="flex items-center gap-4 mb-4">
                             <div className="w-16 h-16 rounded-full border-2 border-vibrant-cyan/30 p-0.5">
                                 <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <Image src={mockVideo.counselor.avatarUrl} alt={mockVideo.counselor.name} fill className="object-cover" />
                                 </div>
                             </div>
                             <div>
                                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                     {mockVideo.counselor.name}
                                     <span className="px-1.5 py-0.5 bg-black/40 border border-vibrant-cyan/50 rounded text-[10px] text-vibrant-cyan">Official</span>
                                 </h3>
                                 <p className="text-sm text-neutral-400">{mockVideo.counselor.role}</p>
                             </div>
                         </div>

                         <div className="mt-4">
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors">
                                프로필 상세
                            </button>
                         </div>
                    </div>
                </div>

                {/* Creator's Other Videos (Vertical List) */}
                <div>
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-vibrant-cyan rounded-full"/>
                        {mockVideo.creator.name} 제작자의 다른 영상
                    </h3>
                    <div className="space-y-4">
                        {creatorVideos.map(video => (
                            <div key={video.id} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 border border-white/5">
                                     <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                     <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 rounded text-[10px] text-white backdrop-blur-sm">
                                         10:05
                                     </div>
                                </div>
                                <h4 className="text-sm font-medium text-neutral-200 line-clamp-2 group-hover:text-vibrant-cyan transition-colors">
                                    {video.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                                    <span>조회 {video.views?.toLocaleString()}</span>
                                    <span>•</span>
                                    <span>{video.createdAt}</span>
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
