import type { ScreenAnnotation, FeedbackCategory } from '../entities/feedback';

export interface CreateFeedbackDto {
  project_submission_id: string;
  timestamp_start: number;
  timestamp_end: number;
  screen_annotations?: ScreenAnnotation[];
  comment: string;
  category?: FeedbackCategory;
  priority?: number;
}

export interface UpdateFeedbackDto {
  comment?: string;
  category?: FeedbackCategory;
  priority?: number;
}

export interface ResolveFeedbackDto {
  resolution_notes?: string;
}

export interface FeedbackQueryDto {
  submission_id?: string;
  status?: string;
  category?: FeedbackCategory;
  created_by?: string;
  page?: number;
  limit?: number;
}
