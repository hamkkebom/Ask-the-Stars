'use client';

import { Video, Star, Users, Building2, Phone, HelpCircle, PlayCircle, TrendingUp, FolderKanban, Upload, Briefcase, FileText } from 'lucide-react';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavSection {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  children?: NavChild[];
  requiresAuth?: boolean;
  guestAlternative?: NavChild[];
}

/**
 * 중앙화된 네비게이션 설정
 * 헤더, 푸터, 사이드바에서 공유
 *
 * 플랫폼 비전: 영상 갤러리 + 프리랜서 + 관리자
 */
export const navigationConfig: NavSection[] = [
  {
    label: '영상 갤러리',
    href: '/videos',
    icon: PlayCircle,
    children: [
      {
        label: '전체 영상',
        href: '/videos',
        description: '완성된 영상 둘러보기',
        icon: Video
      },
    ],
  },
  {
    label: '전문가',
    href: '/stars',
    icon: Star,
    requiresAuth: true,
    children: [
      {
        label: '대시보드',
        href: '/stars/dashboard',
        description: '내 활동 현황 한눈에',
        icon: TrendingUp
      },
      {
        label: '의뢰 게시판',
        href: '/stars/project-board',
        description: '제작 요청 확인 및 지원',
        icon: FolderKanban
      },
      {
        label: '영상 업로드',
        href: '/stars/upload',
        description: '완성 영상 업로드',
        icon: Upload
      },
      {
        label: '포트폴리오',
        href: '/stars/portfolio',
        description: '내 작품 관리',
        icon: Briefcase
      },
    ],
    guestAlternative: [
      {
        label: '전문가 소개',
        href: '/stars',
        description: 'AI 영상 전문가 알아보기',
        icon: Users
      },
    ],
  },
  {
    label: '회사소개',
    href: '/about',
    icon: Building2,
    children: [
      {
        label: '비전',
        href: '/about/vision',
        description: '함께봄이 그리는 미래',
        icon: Star
      },
      {
        label: '연혁',
        href: '/about/history',
        description: '우리의 발자취',
        icon: FileText
      },
      {
        label: '기업문화',
        href: '/about/culture',
        description: '함께봄 사람들',
        icon: Users
      },
      {
        label: '연락처',
        href: '/about/contact',
        description: '문의하기',
        icon: Phone
      },
      {
        label: '고객센터',
        href: '/help',
        description: 'FAQ 및 지원',
        icon: HelpCircle
      },
    ],
  },
];

/**
 * 푸터용 간소화된 링크
 */
export const footerLinks = {
  videos: [
    { label: '영상 갤러리', href: '/videos' },
  ],
  stars: [
    { label: '프리랜서 대시보드', href: '/stars/dashboard' },
    { label: '의뢰 게시판', href: '/stars/project-board' },
    { label: '영상 업로드', href: '/stars/upload' },
  ],
  services: [
    { label: '영상 제작', href: '/videos' },
    { label: '프리랜서 매칭', href: '/stars' },
    { label: '맞춤 의뢰', href: '/stars/project-board' },
  ],
  education: [
    { label: '교육 프로그램', href: '/education' },
    { label: '설명회 신청', href: '/education/session' },
  ],
  company: [
    { label: '회사 소개', href: '/about' },
    { label: '비전', href: '/about/vision' },
    { label: '연혁', href: '/about/history' },
  ],
  support: [
    { label: '고객센터', href: '/help' },
    { label: 'FAQ', href: '/help/faq' },
    { label: '이용약관', href: '/terms' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
};

/**
 * Breadcrumb용 경로-라벨 매핑
 */
export const pathLabels: Record<string, string> = {
  '': '홈',
  'stars': '전문가',
  'about': '회사소개',
  'help': '고객센터',
  'videos': '영상 갤러리',
  'dashboard': '대시보드',
  'project-board': '의뢰 게시판',
  'upload': '업로드',
  'portfolio': '포트폴리오',
  'vision': '비전',
  'history': '연혁',
  'culture': '기업문화',
  'contact': '연락처',
  'faq': 'FAQ',
  'terms': '이용약관',
  'privacy': '개인정보처리방침',
  'my-projects': '내 프로젝트',
  'my-videos': '내 영상',
  'earnings': '수입 관리',
  'feedback': '피드백',
  'performance': '성과',
  'profile': '프로필',
  'settings': '설정',
  'resources': '자료실',
  'work-journal': '작업 일지',
  'analytics': '분석',
  'admin': '관리자',
  'finance': '재무',
  'clients': '클라이언트',
  'reviews': '검수',
  'requests': '의뢰',
  'projects': '프로젝트',
  'activity-log': '활동 로그',
};
