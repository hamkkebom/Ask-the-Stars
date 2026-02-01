'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { StudioSidebar } from '@/components/studio/StudioSidebar';
import { StudioHeader } from '@/components/studio/StudioHeader';

// 경로별 페이지 제목 매핑
const pageTitles: Record<string, string> = {
  '/stars/dashboard': '대시보드',
  '/stars/analytics': '분석',
  '/stars/my-videos': '영상 목록',
  '/stars/upload': '업로드',
  '/stars/project-board': '의뢰 게시판',
  '/stars/my-projects': '내 프로젝트',
  '/stars/feedback': '피드백',
  '/stars/earnings': '수입 관리',
  '/stars/work-journal': '작업 일지',
  '/stars/performance': '내 성과',
  '/stars/portfolio': '포트폴리오',
  '/stars/profile': '프로필',
  '/stars/settings': '설정',
  '/stars/resources': '자료실',
};

export default function StarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 사이드바 상태 변경 감지 (실제로는 StudioSidebar 내부에서 관리)
  // 여기서는 CSS 변수로 처리

  const currentTitle = pageTitles[pathname] || '';

  // 브레드크럼 생성
  const breadcrumbs = currentTitle ? [{ label: currentTitle }] : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Sidebar */}
      <StudioSidebar variant="stars" />

      {/* Header */}
      <StudioHeader
        variant="stars"
        breadcrumbs={breadcrumbs}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main className="pt-14 pl-[240px] min-h-screen transition-all duration-300">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
