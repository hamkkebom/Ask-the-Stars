'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BarChart2,
  Video,
  Upload,
  FolderKanban,
  ClipboardList,
  MessageSquare,
  Wallet,
  Settings,
  ChevronRight,
  Menu,
  BookOpen,
  User,
  Briefcase,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { label: string; href: string }[];
}

interface StudioSidebarProps {
  variant: 'stars' | 'admin';
}

const starsNavItems: NavItem[] = [
  { label: '대시보드', href: '/stars/dashboard', icon: Home },
  { label: '분석', href: '/stars/analytics', icon: BarChart2 },
  {
    label: '콘텐츠',
    href: '/stars/my-videos',
    icon: Video,
    children: [
      { label: '영상 목록', href: '/stars/my-videos' },
      { label: '업로드', href: '/stars/upload' },
    ],
  },
  {
    label: '프로젝트',
    href: '/stars/project-board',
    icon: FolderKanban,
    children: [
      { label: '의뢰 게시판', href: '/stars/project-board' },
      { label: '내 프로젝트', href: '/stars/my-projects' },
    ],
  },
  { label: '피드백', href: '/stars/feedback', icon: MessageSquare },
  { label: '수입 관리', href: '/stars/earnings', icon: Wallet },
  { label: '작업 일지', href: '/stars/work-journal', icon: BookOpen },
  { label: '내 성과', href: '/stars/performance', icon: BarChart2 },
  { label: '포트폴리오', href: '/stars/portfolio', icon: Briefcase },
  { label: '프로필', href: '/stars/profile', icon: User },
  { label: '설정', href: '/stars/settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { label: '대시보드', href: '/admin', icon: Home },
  { label: '활동 로그', href: '/admin/activity-log', icon: ClipboardList },
  { label: '영상 자산', href: '/admin/videos', icon: Video },
  {
    label: '프리랜서',
    href: '/admin/stars',
    icon: User,
    children: [
      { label: '현황', href: '/admin/stars' },
      { label: '프로젝트', href: '/admin/stars/projects' },
      { label: '의뢰', href: '/admin/stars/requests' },
    ],
  },
  { label: '클라이언트', href: '/admin/clients', icon: Briefcase },
  { label: '재무 관리', href: '/admin/finance', icon: Wallet },
  { label: '설정', href: '/admin/settings', icon: Settings },
];

export function StudioSidebar({ variant }: StudioSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navItems = variant === 'stars' ? starsNavItems : adminNavItems;
  const brandName = variant === 'stars' ? 'Stars Studio' : 'Admin';
  const brandEmoji = variant === 'stars' ? '⭐' : '🛠️';

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin' && pathname === '/admin') return true;
    if (href === '/stars/dashboard' && pathname === '/stars/dashboard') return true;
    return pathname.startsWith(href) && href !== '/admin' && href !== '/stars/dashboard';
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-[#0f0f0f] border-r border-[#3f3f3f] z-50 transition-all duration-300 flex flex-col',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-[#3f3f3f]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-[#3f3f3f] rounded-full transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        {!collapsed && (
          <Link href={variant === 'stars' ? '/stars/dashboard' : '/admin'} className="ml-2 flex items-center gap-2">
            <span className="text-xl">{brandEmoji}</span>
            <span className="text-white font-semibold">{brandName}</span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);
          const active = isActive(item.href);

          // Add separator before specific items
          const needsSeparator =
            (variant === 'stars' && (item.label === '콘텐츠' || item.label === '피드백' || item.label === '내 성과' || item.label === '설정')) ||
            (variant === 'admin' && (item.label === '영상 자산' || item.label === '클라이언트' || item.label === '설정'));

          return (
            <div key={item.label}>
              {needsSeparator && (
                <div className="my-2 mx-3 border-t border-[#3f3f3f]" />
              )}

              {hasChildren ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                      active
                        ? 'bg-[#3f3f3f] text-white'
                        : 'text-[#aaa] hover:bg-[#272727] hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          className={cn(
                            'w-4 h-4 transition-transform',
                            isExpanded && 'rotate-90'
                          )}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded && (
                    <div className="pl-12 py-1">
                      {item.children?.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block py-2 text-sm transition-colors',
                            pathname === child.href
                              ? 'text-white'
                              : 'text-[#aaa] hover:text-white'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                    active
                      ? 'bg-[#3f3f3f] text-white'
                      : 'text-[#aaa] hover:bg-[#272727] hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-[#3f3f3f]">
          <Link
            href="/videos"
            className="flex items-center gap-2 text-sm text-[#aaa] hover:text-white transition-colors"
          >
            <Video className="w-4 h-4" />
            영상 갤러리로 이동
          </Link>
        </div>
      )}
    </aside>
  );
}
