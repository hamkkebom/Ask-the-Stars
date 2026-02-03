import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton Component', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders with base classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('accepts custom className and props', () => {
    const { getByTestId } = render(
      <Skeleton
        data-testid="skeleton"
        className="custom-skeleton"
        aria-label="loading"
      />
    );

    const skeleton = getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-skeleton');
    expect(skeleton).toHaveAttribute('aria-label', 'loading');
  });
});
