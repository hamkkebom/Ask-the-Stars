// API Clients Index
// Centralized export for all API clients

export { axiosInstance } from './axios';
export { authApi } from './auth';
export { feedbackApi } from './feedback';
export { leadsApi } from './leads';
export { notificationsApi } from './notifications';
export { projectsApi } from './projects';
export { settlementsApi } from './settlements';
export { submissionsApi } from './submissions';
export { uploadsApi } from './uploads';
export { usersApi } from './users';

// Re-export types
export type { Feedback, CreateFeedbackDto } from './feedback';
export type { Notification } from './notifications';
export type { Settlement, SettlementSummary } from './settlements';
export type { Submission, CreateSubmissionDto } from './submissions';
export type { User, UpdateProfileDto } from './users';
