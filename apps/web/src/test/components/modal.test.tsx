import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '@/components/ui/modal';

describe('Modal Component', () => {
  it('does not render when closed', () => {
    const { container } = render(
      <Modal open={false} onClose={vi.fn()}>
        Hidden Content
      </Modal>
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('renders title and content when open', () => {
    render(
      <Modal open onClose={vi.fn()} title="Modal Title">
        Visible Content
      </Modal>
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Visible Content')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose}>
        Content
      </Modal>
    );

    const backdrop = container.querySelector('div.absolute.inset-0');
    expect(backdrop).toBeTruthy();
    await user.click(backdrop as HTMLDivElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose} title="Has Close">
        Content
      </Modal>
    );

    const closeButton = container.querySelector('button');
    expect(closeButton).toBeTruthy();
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className to content wrapper', () => {
    const { container } = render(
      <Modal open onClose={vi.fn()} className="custom-modal">
        Content
      </Modal>
    );

    const content = container.querySelector('div.relative');
    expect(content).toHaveClass('custom-modal');
  });
});
