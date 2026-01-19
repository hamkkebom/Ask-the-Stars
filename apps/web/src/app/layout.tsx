import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: '별들에게 물어봐 | Ask the Stars',
  description: '사주천궁 영상 협업 플랫폼',
  keywords: ['사주천궁', '영상제작', '협업', '프리랜서'],
};

import { PageTransition } from '@/components/layout/page-transition';
import { Toaster } from '@/components/ui/toast';

// ... imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground" suppressHydrationWarning>
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster />

        </Providers>
      </body>
    </html>
  );
}
