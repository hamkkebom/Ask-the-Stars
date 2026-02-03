import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { GlassCard } from '@/components/ui/glass-card';

describe('GlassCard Component', () => {
  it('renders children and default classes', () => {
    render(<GlassCard>Glass Content</GlassCard>);

    const card = screen.getByText('Glass Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('glass');
    expect(card).toHaveClass('glass-hover');
  });

  it('applies gradient class when enabled', () => {
    render(<GlassCard gradient>Gradient Card</GlassCard>);

    const card = screen.getByText('Gradient Card');
    expect(card).toHaveClass('bg-gradient-to-br');
  });

  it('disables hover effect when hoverEffect is false', () => {
    render(<GlassCard hoverEffect={false}>No Hover Effect</GlassCard>);

    const card = screen.getByText('No Hover Effect');
    expect(card).not.toHaveClass('glass-hover');
  });

  it('handles click events via props', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<GlassCard onClick={onClick}>Clickable</GlassCard>);

    await user.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
