import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FileDropzone } from '@/components/ui/file-dropzone';

const createFile = (name: string, size: number, type: string) => {
  const buffer = new ArrayBuffer(size);
  return new File([buffer], name, { type });
};

describe('FileDropzone Component', () => {
  it('renders helper text', () => {
    render(<FileDropzone onFilesSelected={vi.fn()} />);

    expect(
      screen.getByText('파일을 드래그하거나 클릭하여 업로드')
    ).toBeInTheDocument();
  });

  it('invokes onFilesSelected for valid files', () => {
    const onFilesSelected = vi.fn();
    const file = createFile('avatar.png', 1024, 'image/png');

    const { container } = render(
      <FileDropzone onFilesSelected={onFilesSelected} accept={['image/*']} />
    );

    const input = container.querySelector('input[type="file"]');
    expect(input).toBeTruthy();
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it('shows error when too many files are selected', () => {
    const onFilesSelected = vi.fn();
    const files = [
      createFile('a.png', 1024, 'image/png'),
      createFile('b.png', 1024, 'image/png'),
    ];

    const { container } = render(
      <FileDropzone onFilesSelected={onFilesSelected} maxFiles={1} />
    );

    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input as HTMLInputElement, {
      target: { files },
    });

    expect(
      screen.getByText('최대 1개 파일까지 업로드 가능합니다.')
    ).toBeInTheDocument();
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it('shows error when file exceeds max size', () => {
    const onFilesSelected = vi.fn();
    const file = createFile('big.mov', 11 * 1024 * 1024, 'video/quicktime');

    const { container } = render(
      <FileDropzone
        onFilesSelected={onFilesSelected}
        maxSize={10 * 1024 * 1024}
      />
    );

    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(
      screen.getByText('big.mov: 파일 크기는 10MB 이하여야 합니다.')
    ).toBeInTheDocument();
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it('shows error when file type is not accepted', () => {
    const onFilesSelected = vi.fn();
    const file = createFile('doc.pdf', 1024, 'application/pdf');

    const { container } = render(
      <FileDropzone onFilesSelected={onFilesSelected} accept={['image/*']} />
    );

    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(
      screen.getByText('doc.pdf: 지원하지 않는 파일 형식입니다.')
    ).toBeInTheDocument();
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it('adds dragging styles on drag over and removes on drag leave', () => {
    const { container } = render(<FileDropzone onFilesSelected={vi.fn()} />);
    const dropzone =
      container.querySelector('div[role]') ||
      container.querySelector('div.relative');

    expect(dropzone).toBeTruthy();
    fireEvent.dragOver(dropzone as HTMLElement);
    expect(dropzone).toHaveClass('border-purple-500');

    fireEvent.dragLeave(dropzone as HTMLElement);
    expect(dropzone).not.toHaveClass('border-purple-500');
  });

  it('triggers hidden input click when clicked', async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');

    const { container } = render(<FileDropzone onFilesSelected={vi.fn()} />);
    const dropzone = container.querySelector('div.relative');
    expect(dropzone).toBeTruthy();

    await user.click(dropzone as HTMLElement);
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});
