'use client';

import * as Sentry from '@sentry/nextjs';

let isInitialized = false;

export function initSentry() {
  if (isInitialized || typeof window === 'undefined') return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.log('Sentry: Missing DSN, skipping initialization');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  isInitialized = true;
  console.log('✅ Sentry initialized');
}

export function setSentryUser(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  if (!isInitialized) return;
  Sentry.setUser(user);
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  if (!isInitialized) return;
  Sentry.captureException(error, { extra: context });
}

export { Sentry };
