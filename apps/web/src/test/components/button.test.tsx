import { render, screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { container } = render(Button, { text: 'Test Button' });
    expect(container.firstChild).toBeTruthy();
  });

  it('applies variant prop', () => {
    const { container } = render(Button, {
      text: 'Destructive',
      variant: 'destructive',
    });
    expect(container.firstChild).toHaveClass('bg-destructive');
  });
});
