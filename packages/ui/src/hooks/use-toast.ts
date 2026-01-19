import * as React from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'CLEAR_TOASTS' };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return { toasts: [...state.toasts, action.toast] };
    case 'REMOVE_TOAST':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    case 'CLEAR_TOASTS':
      return { toasts: [] };
    default:
      return state;
  }
};

export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const toast = React.useCallback(
    (props: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2);
      const newToast: Toast = { ...props, id };

      dispatch({ type: 'ADD_TOAST', toast: newToast });

      // Auto-dismiss
      const duration = props.duration ?? 5000;
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', id });
      }, duration);

      return id;
    },
    []
  );

  const dismiss = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, []);

  const clearAll = React.useCallback(() => {
    dispatch({ type: 'CLEAR_TOASTS' });
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss,
    clearAll,
  };
}
