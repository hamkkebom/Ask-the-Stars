// API Clients Index
// Centralized export for all API clients using Supabase

export { axiosInstance } from './axios';
export { adminApi } from './admin';
export { authApi } from './auth';

export { feedbackApi } from './feedback';
export { leadsApi } from './leads';
export { notificationsApi } from './notifications';
export { projectsApi } from './projects';
export { settlementsApi } from './settlements';
export { submissionsApi } from './submissions';
export { uploadsApi } from './uploads';
export { usersApi } from './users';
export { videosApi } from './videos';
export { workJournalApi } from './work-journal';
export { earningsApi } from './earnings';

// Re-export types
export type { Feedback } from './feedback';
export type { Notification } from './notifications';
export type { Project, ProjectAssignment, ProjectRequest } from './projects';
export type { Settlement, SettlementSummary } from './settlements';
export type { Submission, CreateSubmissionDto } from './submissions';
export type { User, UpdateProfileDto } from './users';
export type { VideoDetails } from './videos';
export type { WorkJournalEntry } from './work-journal';
export type { EarningsSummary } from './earnings';
