'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { StudioSidebar } from '@/components/studio/StudioSidebar';
import { StudioHeader } from '@/components/studio/StudioHeader';

// 경로별 페이지 제목 매핑
const pageTitles: Record<string, string> = {
  '/admin': '대시보드',
  '/admin/activity-log': '활동 로그',
  '/admin/videos': '영상 자산',
  '/admin/stars': '프리랜서 현황',
  '/admin/stars/projects': '프로젝트 관리',
  '/admin/stars/requests': '의뢰 관리',
  '/admin/clients': '클라이언트',
  '/admin/finance': '재무 관리',
  '/admin/finance/payouts': '정산 승인',
  '/admin/settings': '설정',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentTitle = pageTitles[pathname] || '';

  // 브레드크럼 생성
  const breadcrumbs = currentTitle ? [{ label: currentTitle }] : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Sidebar */}
      <StudioSidebar variant="admin" />

      {/* Header */}
      <StudioHeader
        variant="admin"
        breadcrumbs={breadcrumbs}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <main
        className="pt-14 pl-[240px] min-h-screen transition-all duration-300"
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
