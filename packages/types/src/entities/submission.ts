export interface Submission {
  id: string;
  project_id: string;
  version: number;

  // 영상 정보
  video_url: string;
  video_duration?: number; // 초 단위
  thumbnail_url?: string;
  file_size?: number; // bytes

  // 메타데이터
  notes?: string;
  submitted_by: string;

  // 상태
  status: SubmissionStatus;

  // 타임스탬프
  created_at: Date;
  reviewed_at?: Date;
}

export type SubmissionStatus =
  | 'pending'      // 피드백 대기
  | 'in_review'    // 검토 중
  | 'revision'     // 수정 요청
  | 'approved';    // 승인됨

export interface SubmissionWithFeedback extends Submission {
  feedbacks?: {
    id: string;
    status: string;
    comment: string;
  }[];
  pending_feedback_count?: number;
  resolved_feedback_count?: number;
}
