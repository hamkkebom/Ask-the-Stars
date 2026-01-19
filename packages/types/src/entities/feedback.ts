import { FeedbackStatus } from '../enums';

export interface Feedback {
  id: string;
  project_submission_id: string;

  // 타임스탬프 (초 단위, 밀리초 정밀도)
  timestamp_start: number;
  timestamp_end: number;

  // 화면 좌표 정보
  screen_annotations: ScreenAnnotation[];

  // 피드백 내용
  comment: string;
  category: FeedbackCategory;

  // 상태
  status: FeedbackStatus;
  priority: number; // 0: 일반, 1: 긴급

  // 작성자/해결자
  created_by: string;
  resolved_by?: string;

  // 타임스탬프
  created_at: Date;
  resolved_at?: Date;
}

export interface ScreenAnnotation {
  type: 'point' | 'circle' | 'rect' | 'arrow' | 'freehand';
  coordinates: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    points?: { x: number; y: number }[];
  };
  normalized: {
    x: number; // 0~1
    y: number; // 0~1
  };
  style: {
    color: string;
    strokeWidth: number;
  };
}

export type FeedbackCategory = 'subtitle' | 'audio' | 'video' | 'other';

export interface FeedbackWithUser extends Feedback {
  created_by_user?: {
    id: string;
    name: string;
  };
  resolved_by_user?: {
    id: string;
    name: string;
  };
}
