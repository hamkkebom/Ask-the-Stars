/**
 * 사용자 역할
 * - ADMIN: 시스템 관리자
 * - MOON_MANAGER: 달님 - 관리팀
 * - MOON_ADVERTISING: 달님 - 광고팀
 * - MOON_FEEDBACK: 달님 - 피드백팀
 * - MOON_SETTLEMENT: 달님 - 정산팀
 * - STAR: 별님 - 프리랜서
 * - COUNSELOR: 상담사
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  MOON_MANAGER = 'MOON_MANAGER',
  MOON_ADVERTISING = 'MOON_ADVERTISING',
  MOON_FEEDBACK = 'MOON_FEEDBACK',
  MOON_SETTLEMENT = 'MOON_SETTLEMENT',
  STAR = 'STAR',
  COUNSELOR = 'COUNSELOR',
  STUDENT = 'STUDENT',
  CONTESTANT = 'CONTESTANT',
  CLIENT = 'CLIENT',
  MARKETING_CLIENT = 'MARKETING_CLIENT',
}

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: '관리자',
  [UserRole.MOON_MANAGER]: '달님(관리)',
  [UserRole.MOON_ADVERTISING]: '달님(광고)',
  [UserRole.MOON_FEEDBACK]: '달님(피드백)',
  [UserRole.MOON_SETTLEMENT]: '달님(정산)',
  [UserRole.STAR]: '별님',
  [UserRole.COUNSELOR]: '상담사',
  [UserRole.STUDENT]: '수강생',
  [UserRole.CONTESTANT]: '공모전 참가자',
  [UserRole.CLIENT]: '스튜디오 클라이언트',
  [UserRole.MARKETING_CLIENT]: '마케팅 클라이언트',
};
