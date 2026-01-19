'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '../lib/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: getQueryClient() allows us to share the client across components
  // ensuring that the data is cached properly.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
