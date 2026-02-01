'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { pathLabels } from '@/config/navigation-config';

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  // 홈페이지에서는 Breadcrumb 표시 안함
  if (pathname === '/') return null;

  // 경로를 세그먼트로 분리
  const segments = pathname.split('/').filter(Boolean);

  // 각 세그먼트에 대한 경로와 라벨 생성
  const crumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label =
      pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;

    return { path, label, segment, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm', className)}
    >
      {/* 홈 링크 */}
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
        aria-label="홈으로 이동"
      >
        <Home className="w-4 h-4" />
      </Link>

      {crumbs.map((crumb) => (
        <span key={crumb.path} className="flex items-center gap-1.5">
          <ChevronRight
            className="w-3.5 h-3.5 text-gray-600"
            aria-hidden="true"
          />
          {crumb.isLast ? (
            <span className="text-white font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.path}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
