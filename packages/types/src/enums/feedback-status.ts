export enum FeedbackStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  WONTFIX = 'WONTFIX',
}

export const FeedbackStatusLabels: Record<FeedbackStatus, string> = {
  [FeedbackStatus.PENDING]: '대기 중',
  [FeedbackStatus.RESOLVED]: '해결됨',
  [FeedbackStatus.WONTFIX]: '수정 안 함',
};

export const FeedbackStatusColors: Record<FeedbackStatus, string> = {
  [FeedbackStatus.PENDING]: 'yellow',
  [FeedbackStatus.RESOLVED]: 'green',
  [FeedbackStatus.WONTFIX]: 'gray',
};
