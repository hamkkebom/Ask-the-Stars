import { format, formatDistance, parseISO, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export function formatDate(date: Date | string, formatString = 'yyyy년 MM월 dd일'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, formatString, { locale: ko });
}

/**
 * 상대적 시간 표시 (예: "3일 전")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return formatDistance(d, new Date(), { addSuffix: true, locale: ko });
}

/**
 * 날짜와 시간을 한국어 형식으로 포맷팅
 */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'yyyy년 MM월 dd일 HH:mm');
}

/**
 * 시간만 포맷팅
 */
export function formatTime(date: Date | string): string {
  return formatDate(date, 'HH:mm');
}
