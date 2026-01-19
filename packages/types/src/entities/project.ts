import { ProjectStatus } from '../enums';

export interface Project {
  id: string;
  title: string;
  description?: string;
  client_notes?: string;

  // 관계
  client_id: string; // 상담사 (의뢰인)
  freelancer_id?: string; // 별님 (프리랜서)

  // 상태
  status: ProjectStatus;
  priority: number; // 0: 일반, 1: 긴급

  // 금액
  budget?: number;
  final_amount?: number;

  // 기한
  deadline?: Date;

  // 타임스탬프
  created_at: Date;
  updated_at: Date;
  started_at?: Date;
  completed_at?: Date;
}

export interface ProjectWithRelations extends Project {
  client?: {
    id: string;
    name: string;
    email: string;
  };
  freelancer?: {
    id: string;
    name: string;
    email: string;
  };
  submissions_count?: number;
  latest_submission_status?: string;
}
