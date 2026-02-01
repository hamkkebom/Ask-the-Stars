'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
// @ts-ignore - Plyr types are not properly exported
import Plyr from 'plyr';
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
  onReady?: (player: Plyr) => void;
  /** Called when video ends */
  onEnded?: () => void;
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
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const initPlyr = useCallback(
    (video: HTMLVideoElement) => {
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
        setIsReady(true);
        setDuration(player.duration);
        onReady?.(player);
      });

      player.on('timeupdate', () => {
        const time = player.currentTime;
        setCurrentTime(time);
        onTimeUpdate?.(time);
      });

      player.on('seeking', () => {
        onSeek?.(player.currentTime);
      });

      player.on('ended', () => {
        onEnded?.();
      });

      player.on('loadedmetadata', () => {
        setDuration(player.duration);
      });
    },
    [controls, autoplay, loop, muted, onReady, onTimeUpdate, onSeek, onEnded]
  );

  // Initialize Plyr + HLS
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const isHls = src.includes('.m3u8') || src.includes('stream');

    // Setup HLS if needed
    if (isHls && Hls.isSupported()) {
      const hls = new Hls({
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

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        initPlyr(video);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
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
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      initPlyr(video);
    } else {
      // Direct video source
      video.src = src;
      initPlyr(video);
    }

    return () => {
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
      if (video) {
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
  }, [src, initPlyr]);

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
        className="w-full h-full"
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
