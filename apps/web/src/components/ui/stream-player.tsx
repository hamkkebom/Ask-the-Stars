
"use client";

import { useEffect, useRef, useState } from "react";
// @cloudflare/stream-react types might need declaration if not found,
// but usually it works. Using 'any' fallback if strict mode complains
// or if we want to be safe with React 19.
import { Stream } from "@cloudflare/stream-react";

export interface StreamPlayerProps {
  uid: string;
  token?: string; // Signed Token for Premium/Private content
  poster?: string;
  autoplay?: boolean;
  className?: string; // For Tailwind classes
  [key: string]: any; // Allow other props like events
}

export function StreamPlayer({ uid, token, poster, autoplay = false, className, ...props }: StreamPlayerProps) {
  const streamRef = useRef<any>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (streamRef.current) {
        // Example: Listen to events
        streamRef.current.addEventListener('error', (e: any) => {
            console.error("Stream Playback Error", e);
            setHasError(true);
        });
    }
  }, []);

  if (hasError) {
      return (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-4 text-center">
              <p>영상 재생에 실패했습니다. (Error: Playback Failed)</p>
          </div>
      );
  }

  // Cloudflare Stream React Component
  // Documentation: https://www.npmjs.com/package/@cloudflare/stream-react
  const StreamComponent = Stream as any;

  return (
    <div className={`relative w-full aspect-video ${className || ''}`}>
        <StreamComponent
            controls
            responsive={false}
            src={token || uid}
            poster={poster}
            autoplay={autoplay}
            className="w-full h-full object-cover"
            ref={streamRef}
            preload="metadata"
            {...props}
        />
    </div>
  );
}
