'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListTodo,
  Star,
  Rocket,
  Megaphone,
  GraduationCap,
  Trophy,
  Users,
  Building2,
  Wallet,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// 담당 모듈 타입
type AdminModule =
  | 'stars' | 'studio' | 'marketing' | 'education' | 'contests'
  | 'talent' | 'clients' | 'finance' | 'analytics' | 'settings';

// 모듈별 메뉴 정의
const moduleMenus: Record<AdminModule, { label: string; icon: any; href: string; subItems?: { label: string; href: string }[] }> = {
  stars: {
    label: '프리랜서',
    icon: Star,
    href: '/admin/stars',
    subItems: [
      { label: '제작요청', href: '/admin/stars/requests' },
      { label: '프로젝트', href: '/admin/stars/projects' },
      { label: '영상 검수', href: '/admin/stars/reviews' },
      { label: '정산', href: '/admin/stars/payouts' },
    ],
  },
  studio: {
    label: 'AI 스튜디오',
    icon: Rocket,
    href: '/admin/studio',
  },
  marketing: {
    label: '마케팅 대행',
    icon: Megaphone,
    href: '/admin/marketing',
  },
  education: {
    label: 'AI 교육',
    icon: GraduationCap,
    href: '/admin/education',
  },
  contests: {
    label: 'AI 공모전',
    icon: Trophy,
    href: '/admin/contests',
  },
  talent: {
    label: '인재 허브',
    icon: Users,
    href: '/admin/talent',
  },
  clients: {
    label: '클라이언트',
    icon: Building2,
    href: '/admin/clients',
    subItems: [
      { label: '대행업체', href: '/admin/clients/agencies' },
      { label: '상담사', href: '/admin/clients/counselors' },
    ],
  },
  finance: {
    label: '정산/회계',
    icon: Wallet,
    href: '/admin/finance',
    subItems: [
      { label: '매출', href: '/admin/finance/revenue' },
      { label: '지급', href: '/admin/finance/payouts' },
      { label: '청구서', href: '/admin/finance/invoices' },
    ],
  },
  analytics: {
    label: '통합 분석',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  settings: {
    label: '시스템 설정',
    icon: Settings,
    href: '/admin/settings',
  },
};

// Mock: 현재 사용자의 담당 모듈 (실제로는 API에서 가져옴)
const userPermissions: AdminModule[] = [
  'stars', 'finance', 'talent', 'clients', 'analytics', 'settings'
];

// 시스템 관리자면 전체 접근
const isSystemAdmin = true;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // 접근 가능한 모듈
  const accessibleModules = isSystemAdmin
    ? Object.keys(moduleMenus) as AdminModule[]
    : userPermissions;

  const toggleMenu = (module: string) => {
    setExpandedMenus(prev =>
      prev.includes(module)
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-[#0a0a14] transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              {sidebarOpen && (
                <span className="text-white font-bold">한깨봄 Admin</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-white/10">
            <Link
              href="/admin/tasks"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isActive('/admin/tasks')
                  ? "bg-primary/20 text-primary"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <ListTodo className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>내 할일</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* 대시보드 */}
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                pathname === '/admin'
                  ? "bg-primary/20 text-primary"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>대시보드</span>}
            </Link>

            {/* 서비스 모듈 */}
            {sidebarOpen && (
              <p className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                서비스 관리
              </p>
            )}

            {(['stars', 'studio', 'marketing', 'education', 'contests'] as AdminModule[])
              .filter(m => accessibleModules.includes(m))
              .map(module => {
                const menu = moduleMenus[module];
                const hasSubItems = menu.subItems && menu.subItems.length > 0;
                const isExpanded = expandedMenus.includes(module);

                return (
                  <div key={module}>
                    <div className="flex items-center">
                      <Link
                        href={menu.href}
                        className={cn(
                          "flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                          isActive(menu.href)
                            ? "bg-primary/20 text-primary"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <menu.icon className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span>{menu.label}</span>}
                      </Link>
                      {sidebarOpen && hasSubItems && (
                        <button
                          onClick={() => toggleMenu(module)}
                          className="p-2 text-gray-400 hover:text-white"
                        >
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform",
                            isExpanded && "rotate-180"
                          )} />
                        </button>
                      )}
                    </div>

                    {sidebarOpen && hasSubItems && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {menu.subItems!.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors",
                              pathname === sub.href
                                ? "text-primary"
                                : "text-gray-500 hover:text-white"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            {/* 통합 관리 */}
            {sidebarOpen && (
              <p className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
                통합 관리
              </p>
            )}

            {(['talent', 'clients', 'finance', 'analytics'] as AdminModule[])
              .filter(m => accessibleModules.includes(m))
              .map(module => {
                const menu = moduleMenus[module];
                const hasSubItems = menu.subItems && menu.subItems.length > 0;
                const isExpanded = expandedMenus.includes(module);

                return (
                  <div key={module}>
                    <Link
                      href={menu.href}
                      className={cn(
                        "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                        isActive(menu.href)
                          ? "bg-primary/20 text-primary"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <menu.icon className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span>{menu.label}</span>}
                      </div>
                    </Link>
                  </div>
                );
              })}
          </nav>

          {/* User Menu */}
          <div className="border-t border-white/10 p-4 space-y-2">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>설정</span>}
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>로그아웃</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0f0f1a]/80 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-medium">관리자 대시보드</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              {sidebarOpen && (
                <div className="text-sm">
                  <p className="text-white font-medium">관리자</p>
                  <p className="text-gray-500 text-xs">시스템 관리자</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
