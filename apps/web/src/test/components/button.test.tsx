import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies variant prop correctly', () => {
    const { container } = render(
      <Button variant="destructive">Destructive</Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-destructive');
  });

  it('applies size prop correctly', () => {
    const { container } = render(<Button size="lg">Large Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('h-11');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });
});
