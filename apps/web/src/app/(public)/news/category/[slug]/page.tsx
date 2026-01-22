'use client';

import { redirect } from 'next/navigation';
import { use } from 'react';

export default function NewsCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // Redirect to main news page with category filter
  redirect(`/news?category=${slug}`);
}
