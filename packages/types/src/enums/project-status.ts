export enum ProjectStatus {
  DRAFT = 'DRAFT',           // 초안
  PENDING = 'PENDING',       // 의뢰 대기
  MATCHING = 'MATCHING',     // 프리랜서 매칭 중
  IN_PROGRESS = 'IN_PROGRESS', // 작업 중
  REVIEW = 'REVIEW',         // 검토 중
  REVISION = 'REVISION',     // 수정 요청
  COMPLETED = 'COMPLETED',   // 완료
  CANCELLED = 'CANCELLED',   // 취소됨
}

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.DRAFT]: '초안',
  [ProjectStatus.PENDING]: '의뢰 대기',
  [ProjectStatus.MATCHING]: '매칭 중',
  [ProjectStatus.IN_PROGRESS]: '작업 중',
  [ProjectStatus.REVIEW]: '검토 중',
  [ProjectStatus.REVISION]: '수정 요청',
  [ProjectStatus.COMPLETED]: '완료',
  [ProjectStatus.CANCELLED]: '취소됨',
};

export const ProjectStatusColors: Record<ProjectStatus, string> = {
  [ProjectStatus.DRAFT]: 'gray',
  [ProjectStatus.PENDING]: 'yellow',
  [ProjectStatus.MATCHING]: 'blue',
  [ProjectStatus.IN_PROGRESS]: 'indigo',
  [ProjectStatus.REVIEW]: 'purple',
  [ProjectStatus.REVISION]: 'orange',
  [ProjectStatus.COMPLETED]: 'green',
  [ProjectStatus.CANCELLED]: 'red',
};
