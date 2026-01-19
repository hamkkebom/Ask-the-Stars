/**
 * 금액을 한국 원화 형식으로 포맷팅
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 금액을 숫자 형식으로 포맷팅 (통화 기호 없음)
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 백분율 포맷팅
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
