'use client';

import React from 'react';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      {/* Page Specific Content - Each page has its own unique Hero */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
}
