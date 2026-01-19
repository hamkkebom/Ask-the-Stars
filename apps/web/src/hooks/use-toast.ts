import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

// Simple event emitter for toast updates
const listeners = new Set<(toasts: Toast[]) => void>();
let toasts: Toast[] = [];

const notify = () => {
  listeners.forEach((listener) => listener(toasts));
};

export const toast = {
  success: (message: string, duration?: number) => addToast(message, 'success', duration),
  error: (message: string, duration?: number) => addToast(message, 'error', duration),
  info: (message: string, duration?: number) => addToast(message, 'info', duration),
  warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
};

function addToast(message: string, type: ToastType = 'info', duration: number = 3000) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { id, message, type, duration };
  toasts = [...toasts, newToast];
  notify();

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    toasts: state,
    removeToast
  };
}
