/**
 * 영상 시간을 mm:ss 형식으로 변환
 */
export function formatVideoTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 영상 시간을 hh:mm:ss 형식으로 변환 (1시간 이상일 경우)
 */
export function formatVideoDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '00:00';

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 타임스탬프 문자열을 초로 변환 ("01:30" -> 90)
 */
export function parseTimestamp(timestamp: string): number {
  const parts = timestamp.split(':').map(Number);

  if (parts.length === 3) {
    const [hours, mins, secs] = parts;
    return hours * 3600 + mins * 60 + secs;
  } else if (parts.length === 2) {
    const [mins, secs] = parts;
    return mins * 60 + secs;
  }

  return 0;
}

/**
 * 영상 해상도 라벨 반환
 */
export function getResolutionLabel(width: number, height: number): string {
  if (height >= 2160) return '4K';
  if (height >= 1440) return '2K';
  if (height >= 1080) return 'FHD';
  if (height >= 720) return 'HD';
  if (height >= 480) return 'SD';
  return `${width}x${height}`;
}
