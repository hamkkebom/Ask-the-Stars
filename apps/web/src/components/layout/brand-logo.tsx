import Link from 'next/link';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BRAND_NAME = '별들에게 물어봐';
export const COMPANY_NAME = '함께봄';

const sizes = {
  sm: { icon: 'w-5 h-5', text: 'text-lg' },
  md: { icon: 'w-6 h-6', text: 'text-xl' },
  lg: { icon: 'w-7 h-7', text: 'text-2xl' },
};

interface BrandLogoProps {
  href?: string;
  size?: keyof typeof sizes;
  className?: string;
}

export function BrandLogo({
  href = '/',
  size = 'sm',
  className,
}: BrandLogoProps) {
  const { icon, text } = sizes[size];

  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2', className)}
    >
      <Star
        className={cn(
          icon,
          'fill-secondary text-secondary transition-transform group-hover:scale-110'
        )}
        aria-hidden="true"
      />
      <span className={cn(text, 'font-bold tracking-tight text-white')}>
        {BRAND_NAME}
      </span>
    </Link>
  );
}
