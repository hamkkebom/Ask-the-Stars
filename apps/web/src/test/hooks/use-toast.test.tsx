import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from '@/hooks/use-toast';

describe('useToast hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useToast());
    act(() => {
      result.current.toasts.forEach((item: { id: string }) => {
        result.current.removeToast(item.id);
      });
    });
    unmount();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('adds toast via helper and exposes state', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast.success('Saved', 0);
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Saved');
    expect(result.current.toasts[0].type).toBe('success');
  });

  it('auto-removes toast after duration', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast.error('Error', 50);
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('removes toast manually', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast.info('Info', 0);
    });

    const toastId = result.current.toasts[0].id;
    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });
});
