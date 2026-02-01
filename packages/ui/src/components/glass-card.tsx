import * as React from 'react';
import { cn } from '../utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, children, gradient = false, hoverEffect = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'glass rounded-xl p-6 transition-colors duration-300',
        gradient && 'bg-gradient-to-br from-white/5 to-transparent',
        hoverEffect && 'glass-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = 'GlassCard';

export { GlassCard, type GlassCardProps };
