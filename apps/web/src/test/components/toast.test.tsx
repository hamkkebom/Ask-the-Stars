import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Toaster } from '@/components/ui/toast';

const removeToast = vi.fn();
let mockToasts: Array<{ id: string; message: string; type: string }> = [];

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toasts: mockToasts,
    removeToast,
  }),
}));

describe('Toaster Component', () => {
  beforeEach(() => {
    mockToasts = [];
    removeToast.mockClear();
  });

  it('renders nothing when no toasts exist', () => {
    const { container } = render(<Toaster />);

    expect(container.textContent).toBe('');
  });

  it('renders toast message and allows dismissal', async () => {
    const user = userEvent.setup();
    mockToasts = [{ id: 'toast-1', message: 'Success!', type: 'success' }];

    render(<Toaster />);

    expect(screen.getByText('Success!')).toBeInTheDocument();

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(removeToast).toHaveBeenCalledWith('toast-1');
  });
});
