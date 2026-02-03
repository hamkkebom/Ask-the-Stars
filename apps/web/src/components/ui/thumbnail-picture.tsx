'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ThumbnailSources {
  sizes: string;
  sources: { type: string; srcSet: string }[];
  fallbackUrl: string;
}

interface ThumbnailPictureProps {
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  sources?: ThumbnailSources;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  unoptimized?: boolean;
}

export function ThumbnailPicture({
  alt,
  className,
  imageClassName,
  sizes,
  sources,
  fallbackSrc = '/placeholder.jpg',
  fill = false,
  width,
  height,
  priority = false,
  unoptimized = true,
}: ThumbnailPictureProps) {
  const [useFallback, setUseFallback] = useState(false);
  const pictureSources = useFallback ? [] : sources?.sources || [];
  const resolvedSizes = sources?.sizes || sizes;
  const resolvedSrc = useFallback
    ? fallbackSrc
    : sources?.fallbackUrl || fallbackSrc;

  return (
    <picture className={cn('block', className)}>
      {pictureSources.map((source) => (
        <source
          key={source.type}
          type={source.type}
          srcSet={source.srcSet}
          sizes={resolvedSizes}
        />
      ))}
      <Image
        alt={alt}
        className={imageClassName}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={resolvedSizes}
        src={resolvedSrc}
        unoptimized={unoptimized}
        onError={() => setUseFallback(true)}
      />
    </picture>
  );
}
