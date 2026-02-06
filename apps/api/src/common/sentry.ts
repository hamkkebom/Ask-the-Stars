import * as Sentry from '@sentry/node';

export function initializeSentry() {
  const dsn = process.env.SENTRY_DSN?.replace(/^\uFEFF/, '').trim();
  if (dsn) {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    });

    console.log('✅ Sentry initialized');
  }
}

export { Sentry };
