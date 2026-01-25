import { after } from 'next/server';
import VideoDetailClient from './VideoDetailClient';
import { VideoProps } from '@/components/ui/compact-video-card';
import { videosApi } from '@/lib/api/videos';

// --- Mock Data (Usually fetched from a DB/API) ---
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

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch data
  let video;
  try {
    const data = await videosApi.getVideoById(id);

    // Use Signed URL from backend if available, otherwise construct (fallback)
    const r2Url = (data.technicalSpec as any)?.videoUrl || (data.technicalSpec?.r2Key
        ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-270030d34237d6ec.r2.dev'}/${data.technicalSpec.r2Key}`
        : null);

    video = {
      id: data.id,
      title: data.project?.title || '제목 없음',
      // Prefer Stream UID for client handling, fallback to R2 URL
      streamUid: data.technicalSpec?.streamUid,
      videoUrl: r2Url,
      thumbnailUrl: data.technicalSpec?.thumbnailUrl,
      views: 0, // Not in API response yet
      likes: 0, // Not in API response yet
      createdAt: new Date(data.createdAt).toLocaleDateString(),
      description: data.feedback || data.project?.description || '설명이 없습니다.',
      categories: data.project?.category ? [data.project.category.name] : ['기타'],
      tags: [], // Not in API response yet
      counselor: {
        id: data.project?.counselor?.id || 'unknown',
        name: data.project?.counselor?.name || '상담사',
        role: '전문가',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.project?.counselor?.name || 'Counselor'}`,
        stats: { rating: 5.0, reviews: 0, consultations: 0 }
      },
      creator: {
        id: data.maker?.id || 'unknown',
        name: data.maker?.name || '제작자',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.maker?.name || 'Creator'}`
      },
      // Pass raw technical spec if needed
      technicalSpec: data.technicalSpec
    };
  } catch (e) {
      console.error("Failed to fetch video:", e);
      // Fallback or Redirect (for now, let's render a fallback UI or throw)
      // throw new Error('Video not found');
      // For smoother UX during dev, maybe fallback to mock if fetch fails?
      // No, let's show Error.
      return (
          <div className="min-h-screen flex items-center justify-center text-white">
              <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2">영상을 찾을 수 없습니다</h1>
                  <p className="text-neutral-400">삭제되었거나 존재하지 않는 영상입니다.</p>
              </div>
          </div>
      );
  }

  // Non-blocking side effect: Log view count
  after(() => {
     // ...
  });

  return (
    <VideoDetailClient
      video={video}
      categoryVideos={categoryVideos}
      creatorVideos={creatorVideos}
      comments={comments}
    />
  );
}
