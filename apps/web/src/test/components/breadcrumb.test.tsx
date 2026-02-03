import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const usePathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.ComponentProps<'a'>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    usePathname.mockReset();
  });

  it('renders nothing on home path', () => {
    usePathname.mockReturnValue('/');
    const { container } = render(<Breadcrumb />);

    expect(container.firstChild).toBeNull();
  });

  it('renders breadcrumb links and current page', () => {
    usePathname.mockReturnValue('/stars/project-board');
    render(<Breadcrumb />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(screen.getByText('전문가')).toBeInTheDocument();
    expect(screen.getByText('의뢰 게시판')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('falls back to capitalized segment when no label exists', () => {
    usePathname.mockReturnValue('/custom/segment');
    render(<Breadcrumb />);

    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Segment')).toHaveAttribute('aria-current', 'page');
  });
});
