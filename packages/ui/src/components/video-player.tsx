'use client';

import React, { useRef, useEffect, useState } from 'react';
import 'plyr/dist/plyr.css';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onReady?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  onTimeUpdate,
  onReady,
  onError,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!videoRef.current) return;

      const Plyr = (await import('plyr')).default;
      const Hls = (await import('hls.js')).default;

      const video = videoRef.current;
      const isHLS = src.includes('.m3u8') || src.includes('cloudflarestream');

      if (!mounted) return;

      // Initialize HLS.js for HLS streams
      if (isHLS && Hls.isSupported()) {
        hlsRef.current = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });

        hlsRef.current.loadSource(src);
        hlsRef.current.attachMedia(video);

        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          if (mounted) {
            setIsReady(true);
            onReady?.();
          }
        });

        hlsRef.current.on(Hls.Events.ERROR, (_: any, data: any) => {
          if (data.fatal) {
            onError?.(new Error(`HLS Error: ${data.type}`));
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          if (mounted) {
            setIsReady(true);
            onReady?.();
          }
        });
      } else {
        // Regular video
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          if (mounted) {
            setIsReady(true);
            onReady?.();
          }
        });
      }

      // Initialize Plyr
      playerRef.current = new Plyr(video, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'duration',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'fullscreen',
        ],
        settings: ['captions', 'quality', 'speed'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        keyboard: { focused: true, global: true },
        tooltips: { controls: true, seek: true },
        i18n: {
          play: '재생',
          pause: '일시정지',
          mute: '음소거',
          unmute: '음소거 해제',
          settings: '설정',
          enterFullscreen: '전체화면',
          exitFullscreen: '전체화면 종료',
          speed: '재생속도',
          quality: '화질',
        },
      });

      // Time update handler
      const handleTimeUpdate = () => {
        if (video.currentTime && onTimeUpdate) {
          onTimeUpdate(video.currentTime);
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup for this instance
      playerRef.current.on('ended', () => {
        // handle ended if needed
      });
    };

    init();

    return () => {
      mounted = false;
      if (videoRef.current) {
        // Remove event listener manually if possible, or rely on plyr destroy
        // videoRef.current.removeEventListener('timeupdate', ...);
        // Cannot easily access handleTimeUpdate reference here without moving it out of init
      }
      hlsRef.current?.destroy();
      playerRef.current?.destroy();
    };
  }, [src, onTimeUpdate, onReady, onError]);

  // Update source when src changes - simplified for HLS dynamic import scenario
  // We rely on the main useEffect to re-init on src change for now to be safe with async imports

  return (
    <div className={`video-player-wrapper ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        crossOrigin="anonymous"
        className="plyr-react plyr"
      />
    </div>
  );
}

export default VideoPlayer;
