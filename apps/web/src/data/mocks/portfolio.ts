export type PortfolioCategory = 'VIDEO' | 'SHORTS' | 'THUMBNAIL' | 'OTHER';

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string; // 유튜브 등의 링크
  category: PortfolioCategory;
  tags: string[];
  description: string;
  role: string; // 제작 기여도/역할 (예: 편집, 기획, 전체 제작)
  stats?: {
    views?: number;
    likes?: number;
  };
  createdAt: string;
}

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: '강남 맛집 탐방 브이로그',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
    category: 'VIDEO',
    tags: ['브이로그', '맛집', '여행'],
    description: '서울 강남의 숨겨진 맛집을 찾아다니는 브이로그 영상입니다. 빠른 컷 편집과 리듬감 있는 자막을 활용했습니다.',
    role: '편집, 자막',
    stats: {
      views: 12500,
      likes: 850
    },
    createdAt: '2025-01-10'
  },
  {
    id: '2',
    title: '30초 완성! 홈트레이닝 챌린지',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop',
    category: 'SHORTS',
    tags: ['운동', '자기관리', '숏폼'],
    description: '인스타그램 릴스와 틱톡을 타겟으로 한 빠른 템포의 운동 챌린지 영상입니다.',
    role: '전체 제작',
    stats: {
      views: 45000,
      likes: 3200
    },
    createdAt: '2025-01-12'
  },
  {
    id: '3',
    title: '신제품 런칭 프로모션 썸네일',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?q=80&w=1000&auto=format&fit=crop',
    category: 'THUMBNAIL',
    tags: ['디자인', '마케팅', '제품'],
    description: 'IT 기기 신제품 런칭 유튜브 영상의 클릭률을 높이기 위한 고화질 썸네일 디자인입니다.',
    role: '디자인',
    createdAt: '2025-01-15'
  },
  {
    id: '4',
    title: '게이밍 하이라이트 모음',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    category: 'VIDEO',
    tags: ['게임', '하이라이트', '이펙트'],
    description: '화려한 이펙트와 사운드 효과를 강조한 FPS 게임 하이라이트 영상입니다.',
    role: '편집, 효과',
    stats: {
      views: 8900,
      likes: 420
    },
    createdAt: '2025-01-05'
  },
  {
    id: '5',
    title: '감성 카페 시네마틱 무비',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000&auto=format&fit=crop',
    category: 'VIDEO',
    tags: ['시네마틱', '카페', '감성'],
    description: '색보정(Color Grading)에 중점을 둔 감성적인 카페 홍보 영상입니다.',
    role: '촬영, 편집, 색보정',
    stats: {
      views: 3400,
      likes: 150
    },
    createdAt: '2024-12-28'
  },
  {
    id: '6',
    title: '반려동물 틱톡 챌린지',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop',
    category: 'SHORTS',
    tags: ['반려동물', '귀여움', '바이럴'],
    description: '강아지의 귀여운 순간을 포착하여 음악에 맞춰 편집한 바이럴 영상입니다.',
    role: '전체 제작',
    stats: {
      views: 120000,
      likes: 15000
    },
    createdAt: '2025-01-16'
  }
];

export const portfolioCategories: { value: PortfolioCategory | 'ALL'; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'VIDEO', label: '영상' },
  { value: 'SHORTS', label: '숏폼' },
  { value: 'THUMBNAIL', label: '썸네일' },
  { value: 'OTHER', label: '기타' }
];
