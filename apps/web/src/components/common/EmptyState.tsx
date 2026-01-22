import React from 'react';
import { LucideIcon, Search, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Search,
  title = '데이터가 없습니다',
  description = '조건을 변경하거나 새로운 데이터를 등록해보세요.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white/5 border border-white/10",
      className
    )}>
      <div className="p-4 bg-white/5 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 max-w-sm mb-6">
        {description}
      </p>

      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
