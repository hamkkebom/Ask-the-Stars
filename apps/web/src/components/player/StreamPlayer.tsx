'use client';

import { Stream } from '@cloudflare/stream-react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface StreamPlayerProps {
  videoUid: string;
  signedToken?: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

export default function StreamPlayer({
  videoUid,
  signedToken,
  poster,
  className,
  controls = true,
  muted = false,
  autoplay = false,
  loop = false,
}: StreamPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!videoUid) return null;

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 z-0">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      <div className="relative z-10 w-full h-full">
        <Stream
          src={signedToken || videoUid}
          poster={poster}
          controls={controls}
          muted={muted}
          autoplay={autoplay}
          loop={loop}
          onLoadedData={() => setIsLoading(false)}
          responsive={true}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
