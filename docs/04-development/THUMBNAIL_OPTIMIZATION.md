# Thumbnail Optimization (Cloudflare Image Variants)

## 목적

Cloudflare Stream 기본 썸네일을 Cloudflare Images Variants로 변환해 AVIF/WebP/JPEG을 자동 제공한다. 저장소에 여러 포맷을 저장하지 않고 CDN 변환을 사용한다.

## Cloudflare Image Variants 설정

Cloudflare Images에서 다음 Variants를 생성한다. (품질 설정 포함)

### 1) 사이즈 + 포맷 Variants

| Variant | Width | Format | Quality |
|---|---:|---|---:|
| thumbnail-sm-avif | 320 | avif | 75 |
| thumbnail-md-avif | 640 | avif | 75 |
| thumbnail-lg-avif | 1280 | avif | 75 |
| thumbnail-sm-webp | 320 | webp | 80 |
| thumbnail-md-webp | 640 | webp | 80 |
| thumbnail-lg-webp | 1280 | webp | 80 |
| thumbnail-sm-jpeg | 320 | jpeg | 85 |
| thumbnail-md-jpeg | 640 | jpeg | 85 |
| thumbnail-lg-jpeg | 1280 | jpeg | 85 |

### 2) 리사이즈 옵션

- Fit: cover
- Height: 비워둠 (원본 비율 유지)

## 환경 변수

API 서버와 Web 앱에 아래 값을 설정한다.

```
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_IMAGE_DELIVERY_HASH=...
```

- `CLOUDFLARE_ACCOUNT_ID`: Stream 썸네일 기본 URL 생성용
- `CLOUDFLARE_IMAGE_DELIVERY_HASH`: `imagedelivery.net` 도메인 계정 해시

## 백엔드 동작

- `CloudflareStreamService.getStreamThumbnailVariants()`가 Variant URL을 생성한다.
- 영상 응답에 `thumbnailVariants`가 포함된다.
- 기존 `thumbnailUrl`은 유지되어 하위 호환성을 보장한다.

### 응답 예시 (요약)

```
thumbnailVariants: {
  sizes: '(max-width: 640px) 320px, (max-width: 1024px) 640px, 1280px',
  sources: [
    { type: 'image/avif', srcSet: '... 320w, ... 640w, ... 1280w' },
    { type: 'image/webp', srcSet: '... 320w, ... 640w, ... 1280w' },
    { type: 'image/jpeg', srcSet: '... 320w, ... 640w, ... 1280w' },
  ],
  fallbackUrl: 'https://imagedelivery.net/.../thumbnail-md-jpeg'
}
```

## 프론트엔드 사용

- `ThumbnailPicture` 컴포넌트가 `<picture>` + `next/image` 조합으로 AVIF → WebP → JPEG 폴백을 제공한다.
- `thumbnailVariants`가 없으면 기존 `thumbnailUrl`로 fallback 한다.

## 마이그레이션 스크립트

Stream UID가 있는 레코드 중 `thumbnailUrl`이 비어있는 경우 기본 Stream 썸네일 URL을 채운다.

```
node scripts/migrate-stream-thumbnail-variants.js
```

## 검증 체크리스트

- Chrome/Edge: `image/avif` 응답 확인
- Firefox/Safari: `image/webp` 응답 확인
- Legacy 브라우저: `image/jpeg` 응답 확인
- 파일 크기 30~50% 감소 확인
- 시각적 품질 확인 (동일 프레임 비교)

### 자동 확인 스크립트

```
node scripts/test-thumbnail-variants.js --uid <streamUid>
```
