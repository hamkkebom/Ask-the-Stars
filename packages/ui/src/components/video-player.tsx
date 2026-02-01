'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
// @ts-ignore - HLS.js types not properly exported
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

export interface VideoPlayerProps {
  /** Video source URL (HLS or direct video) */
  src: string;
  /** Poster image URL */
  poster?: string;
  /** Called when time updates */
  onTimeUpdate?: (currentTime: number) => void;
  /** Called when player seeks to a time */
  onSeek?: (time: number) => void;
  /** Called when video is ready */
  onReady?: (player: any) => void;
  /** Called when video ends */
  onEnded?: () => void;
  /** Called when error occurs */
  onError?: (error: Error) => void;
  /** Enable/disable controls */
  controls?: boolean;
  /** Autoplay */
  autoplay?: boolean;
  /** Loop */
  loop?: boolean;
  /** Muted */
  muted?: boolean;
  /** CSS class name */
  className?: string;
}

/**
 * VideoPlayer - Plyr + HLS.js based video player
 * Supports HLS streaming and timestamp events
 */
export function VideoPlayer({
  src,
  poster,
  onTimeUpdate,
  onSeek,
  onReady,
  onEnded,
  onError,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Initialize Plyr + HLS
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!videoRef.current) return;

      try {
        const Plyr = (await import('plyr')).default;
        const HlsModule = await import('hls.js');
        const Hls = HlsModule.default;

        const video = videoRef.current;
        const isHls = src.includes('.m3u8') || src.includes('stream');

        if (!mounted) return;

        // Setup HLS if needed
        if (isHls && (Hls as any).isSupported()) {
          const hls = new (Hls as any)({
            enableWorker: true,
            lowLatencyMode: true,
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.5,
          });
          hls.loadSource(src);
          hls.attachMedia(video);
          hlsRef.current = hls;

          hls.on((Hls as any).Events.MANIFEST_PARSED, () => {
            initPlyr();
          });

          // @ts-ignore
          hls.on(Hls.Events.ERROR, (_: any, data: any) => {
            console.error('HLS Error:', data);
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  console.log('Attempting to restart HLS stream...');
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  console.log('Attempting to recover from media error...');
                  hls.recoverMediaError();
                  break;
                default:
                  console.log('Destroying HLS instance due to fatal error');
                  hls.destroy();
                  hlsRef.current = null;
                  onError?.(new Error(`HLS Error: ${data.type}`));
                  break;
              }
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Native HLS support (Safari)
          video.src = src;
          initPlyr();
        } else {
          // Direct video source
          video.src = src;
          initPlyr();
        }

        function initPlyr() {
          if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
          }

          const player = new Plyr(video, {
            controls: controls
              ? [
                  'play-large',
                  'play',
                  'progress',
                  'current-time',
                  'duration',
                  'mute',
                  'volume',
                  'settings',
                  'fullscreen',
                ]
              : [],
            settings: ['quality', 'speed'],
            autoplay,
            loop: { active: loop },
            muted,
            i18n: {
              play: '재생',
              pause: '일시정지',
              mute: '음소거',
              unmute: '음소거 해제',
              enterFullscreen: '전체화면',
              exitFullscreen: '전체화면 종료',
              settings: '설정',
              speed: '속도',
              quality: '화질',
            },
            // Performance optimizations
            hideControls: true,
            resetOnEnd: true,
            tooltips: {
              controls: true,
              seek: true,
            },
          });

          playerRef.current = player;

          player.on('ready', () => {
            if (mounted) {
              setIsReady(true);
              setDuration(player.duration);
              onReady?.(player);
            }
          });

          player.on('timeupdate', () => {
            if (mounted) {
              const time = player.currentTime;
              setCurrentTime(time);
              onTimeUpdate?.(time);
            }
          });

          player.on('seeking', () => {
            if (mounted) {
              onSeek?.(player.currentTime);
            }
          });

          player.on('ended', () => {
            if (mounted) {
              onEnded?.();
            }
          });

          player.on('loadedmetadata', () => {
            if (mounted) {
              setDuration(player.duration);
            }
          });
        }
      } catch (error) {
        console.error('Failed to load video player dependencies:', error);
        onError?.(
          error instanceof Error ? error : new Error('Failed to load player')
        );
      }
    };

    init();

    return () => {
      mounted = false;
      console.log('Cleaning up video player resources...');

      // Clean up HLS instance
      if (hlsRef.current) {
        hlsRef.current.off(Hls.Events.MANIFEST_PARSED, () => {});
        hlsRef.current.off(Hls.Events.ERROR, () => {});
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Clean up Plyr instance
      if (playerRef.current) {
        playerRef.current.off('ready', () => {});
        playerRef.current.off('timeupdate', () => {});
        playerRef.current.off('seeking', () => {});
        playerRef.current.off('ended', () => {});
        playerRef.current.off('loadedmetadata', () => {});
        playerRef.current.destroy();
        playerRef.current = null;
      }

      // Clean up video element
      if (videoRef.current) {
        const video = videoRef.current;
        // Pause and clear video source
        video.pause();
        video.removeAttribute('src');
        video.load(); // Reset media element

        // Clear any pending timeouts or intervals
        if (video.srcObject) {
          video.srcObject = null;
        }
      }

      console.log('Video player cleanup completed');
    };
  }, [
    src,
    controls,
    autoplay,
    loop,
    muted,
    onTimeUpdate,
    onSeek,
    onReady,
    onEnded,
    onError,
  ]);

  // Seek to specific time
  const seekTo = useCallback((time: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = time;
    }
  }, []);

  // Play video
  const play = useCallback(() => {
    playerRef.current?.play();
  }, []);

  // Pause video
  const pause = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    playerRef.current?.togglePlay();
  }, []);

  return (
    <div className={`video-player-wrapper relative ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        crossOrigin="anonymous"
        className="plyr-react plyr"
      />

      {/* Expose controls via data attributes for external access */}
      <div
        className="hidden"
        data-ready={isReady}
        data-current-time={currentTime}
        data-duration={duration}
      />
    </div>
  );
}

// Export utilities for external control
export function useVideoPlayerControls(ref: React.RefObject<HTMLDivElement>) {
  const seekTo = useCallback(
    (time: number) => {
      const video = ref.current?.querySelector('video');
      if (video) {
        video.currentTime = time;
      }
    },
    [ref]
  );

  const getCurrentTime = useCallback(() => {
    const wrapper = ref.current?.querySelector('[data-current-time]');
    return wrapper
      ? parseFloat(wrapper.getAttribute('data-current-time') || '0')
      : 0;
  }, [ref]);

  const getDuration = useCallback(() => {
    const wrapper = ref.current?.querySelector('[data-duration]');
    return wrapper
      ? parseFloat(wrapper.getAttribute('data-duration') || '0')
      : 0;
  }, [ref]);

  return { seekTo, getCurrentTime, getDuration };
}

export default VideoPlayer;
