import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ask-the-stars.vercel.app';

  // Static routes
  const routes = [
    '',
    '/about',
    '/about/contact',
    '/about/vision',
    '/about/history',
    '/videos',
    '/news',
    '/education',
    '/studio/request',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic routes (Mock examples for video and news)
  // In a real app, fetch these from your API/DB
  const videoRoutes = Array.from({ length: 10 }).map((_, i) => ({
    url: `${baseUrl}/videos/v-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const newsRoutes = Array.from({ length: 5 }).map((_, i) => ({
    url: `${baseUrl}/news/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...videoRoutes, ...newsRoutes];
}
