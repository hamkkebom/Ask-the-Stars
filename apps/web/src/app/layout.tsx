import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://ask-the-stars.vercel.app'),
  title: {
    default: '별들에게 물어봐 | Ask the Stars',
    template: '%s | 별들에게 물어봐',
  },
  description: '사주천궁 영상 협업 플랫폼. 프리랜서와 클라이언트를 연결하는 B2B2C 영상 제작 서비스.',
  keywords: ['사주천궁', '영상제작', '협업', '프리랜서', '운세', '타로', '영상편집'],
  authors: [{ name: '별들에게 물어봐' }],
  creator: '별들에게 물어봐',
  publisher: '별들에게 물어봐',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://ask-the-stars.vercel.app',
    siteName: '별들에게 물어봐',
    title: '별들에게 물어봐 | Ask the Stars',
    description: '사주천궁 영상 협업 플랫폼. 프리랜서와 클라이언트를 연결하는 B2B2C 영상 제작 서비스.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '별들에게 물어봐',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '별들에게 물어봐 | Ask the Stars',
    description: '사주천궁 영상 협업 플랫폼',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// Next.js 15: viewport는 별도 export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


import { Toaster } from '@/components/ui/toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground" suppressHydrationWarning>
        <Providers>
            {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
