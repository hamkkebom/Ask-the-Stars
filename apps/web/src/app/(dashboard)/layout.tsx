'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ClipboardList, FolderKanban, Calendar, Upload,
  MessageSquare, Wallet, TrendingUp, Briefcase, BookOpen, User,
  Settings, LogOut, ChevronDown, Bell, Search, Star, ChevronLeft
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const freelancerNavItems: NavItem[] = [
  { label: '대시보드', href: '/stars/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: '제작요청 게시판', href: '/stars/project-board', icon: <ClipboardList className="w-4 h-4" /> },
  {
    label: '내 프로젝트',
    href: '/stars/my-projects',
    icon: <FolderKanban className="w-4 h-4" />,
    children: [
      { label: '캘린더', href: '/stars/my-projects?view=calendar' },
    ]
  },
  { label: '영상 업로드', href: '/stars/upload', icon: <Upload className="w-4 h-4" /> },
  { label: '피드백', href: '/stars/feedback', icon: <MessageSquare className="w-4 h-4" /> },
  {
    label: '수입 관리',
    href: '/stars/earnings',
    icon: <Wallet className="w-4 h-4" />,
    children: [
      { label: '1차 정산 (착수금)', href: '/stars/earnings?type=PRIMARY' },
      { label: '2차 정산 (잔금)', href: '/stars/earnings?type=SECONDARY' },
      { label: '세금 문서', href: '/stars/earnings?type=TAX' },
    ]
  },
  { label: '내 성과', href: '/stars/performance', icon: <TrendingUp className="w-4 h-4" /> },
  { label: '포트폴리오', href: '/stars/portfolio', icon: <Briefcase className="w-4 h-4" /> },
  { label: '자료실', href: '/stars/resources', icon: <BookOpen className="w-4 h-4" /> },
  { label: '내 프로필', href: '/stars/profile', icon: <User className="w-4 h-4" /> },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleExpand = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.href) || (hasChildren && item.children!.some(c => isActive(c.href)));

    return (
      <div key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-white border border-yellow-500/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <span className={cn(active && "text-yellow-400")}>{item.icon}</span>
            {!isSidebarCollapsed && item.label}
          </Link>
          {hasChildren && !isSidebarCollapsed && (
            <button
              onClick={() => toggleExpand(item.href)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ChevronDown className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                isExpanded && "rotate-180"
              )} />
            </button>
          )}
        </div>
        {hasChildren && isExpanded && !isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-3"
          >
            {item.children!.map(child => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(child.href)
                    ? "text-yellow-400 font-medium bg-yellow-500/10"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Netflix-style Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-black/95 backdrop-blur-xl overflow-y-auto transition-all duration-300",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
            <Link href="/videos" className="flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              {!isSidebarCollapsed && (
                <span className="font-bold text-lg text-white">별들에게 물어봐</span>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className={cn(
                "w-4 h-4 text-gray-400 transition-transform",
                isSidebarCollapsed && "rotate-180"
              )} />
            </button>
          </div>

          {/* Back to Videos Link */}
          <div className="px-4 py-3 border-b border-white/5">
            <Link
              href="/videos"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {!isSidebarCollapsed && "영상 브라우저로 돌아가기"}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Star (별님) Section */}
            <div>
              {!isSidebarCollapsed && (
                <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-600 tracking-wider flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  프리랜서
                </p>
              )}
              <div className="space-y-1">
                {freelancerNavItems.map(renderNavItem)}
              </div>
            </div>
          </nav>

          {/* User Menu */}
          <div className="border-t border-white/10 p-4 space-y-1">
            <Link
              href="/stars/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              {!isSidebarCollapsed && "설정"}
            </Link>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && "로그아웃"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-xl px-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="프로젝트, 상담사 검색..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                3
              </span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-sm ring-2 ring-yellow-500/20">
                별
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">별님</p>
                <p className="text-xs text-gray-500">프리랜서</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content with gradient background */}
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-black via-gray-900/50 to-black p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
