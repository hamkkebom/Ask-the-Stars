export type FeedbackType = 'subtitle' | 'bgm' | 'cut' | 'color' | 'other';
export type AnnotationType = 'rect' | 'ellipse' | 'arrow' | 'path';
export type ViewMode = 'single' | 'compare';
export type AspectRatio = '16:9' | '9:16';

export interface Annotation {
  type: AnnotationType;
  color: string;
  points: { x: number; y: number }[];
}

export interface Feedback {
  id: string;
  version: number;
  timestamp: number;
  timestampEnd?: number;
  type: FeedbackType;
  content: string;
  annotation?: Annotation;
  resolved: boolean;
  createdAt: string;
}

export interface VideoVersion {
  version: number;
  url: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
  aspectRatio: AspectRatio;
}

// Feedback type config
export const feedbackTypes: Record<
  FeedbackType,
  { label: string; icon: string; color: string }
> = {
  subtitle: {
    label: '자막',
    icon: '📝',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500',
  },
  bgm: {
    label: 'BGM',
    icon: '🎵',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500',
  },
  cut: {
    label: '컷편집',
    icon: '✂️',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500',
  },
  color: {
    label: '색보정',
    icon: '🎨',
    color: 'bg-green-500/20 text-green-400 border-green-500',
  },
  other: {
    label: '기타',
    icon: '💬',
    color: 'bg-gray-500/20 text-gray-400 border-gray-500',
  },
};

// Mock Data
export const videoVersions: VideoVersion[] = [
  {
    version: 1,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    submittedAt: '2026-01-15T14:00:00',
    status: 'revision',
    aspectRatio: '16:9',
  },
  {
    version: 2,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    submittedAt: '2026-01-18T10:30:00',
    status: 'pending',
    aspectRatio: '16:9',
  },
];

export const initialFeedbacks: Feedback[] = [
  {
    id: 'fb-001',
    version: 2,
    timestamp: 15.3,
    timestampEnd: 18.0,
    type: 'subtitle',
    content: '자막 위치가 너무 아래쪽입니다. 상단으로 올려주세요.',
    annotation: {
      type: 'rect',
      color: '#3b82f6',
      points: [
        { x: 20, y: 70 },
        { x: 80, y: 85 },
      ],
    },
    resolved: false,
    createdAt: '2026-01-16T15:00:00',
  },
  {
    id: 'fb-002',
    version: 2,
    timestamp: 32.5,
    type: 'bgm',
    content: 'BGM 볼륨 30% 낮춰주세요.',
    resolved: true,
    createdAt: '2026-01-16T15:05:00',
  },
  {
    id: 'fb-003',
    version: 2,
    timestamp: 45.0,
    type: 'cut',
    content: '인트로 2초만 더 줄여주세요.',
    resolved: false,
    createdAt: '2026-01-16T15:10:00',
  },
  // Previous version feedbacks (mock)
  {
    id: 'fb-prev-001',
    version: 1,
    timestamp: 10.0,
    type: 'color',
    content: '전체적으로 톤이 너무 어둡습니다. 밝게 조정해주세요.',
    annotation: {
      type: 'rect',
      color: '#ef4444',
      points: [
        { x: 10, y: 10 },
        { x: 90, y: 90 },
      ],
    },
    resolved: true,
    createdAt: '2026-01-15T16:00:00',
  },
];

export const reviewData = {
  id: 'rv-001',
  title: '신년운세_타로_최종.mp4',
  freelancer: { id: 'f-001', name: '홍길동' },
  project: { id: 'pj-001', title: '신년 운세 숏폼', client: '타로TV' },
  status: 'pending' as const,
};
