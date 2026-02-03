# 📋 Cloudflare Image Variants 설정 가이드

**소요 시간**: 5분  
**목적**: 썸네일 최적화 (30-50% 크기 감소)  
**예상 효과**: 대역폭 절감 + 로딩 속도 개선

---

## 왜 Image Variants가 필요한가?

### 현재 상태 (Variants 없음)
```
모바일 디바이스 (375px 너비)
  ↓
원본 이미지 다운로드 (1920x1080, 2MB) ← 낭비!
```

### Variants 사용 후
```
모바일 디바이스 (375px 너비)
  ↓
thumbnail-sm (320w, 150KB) ← 93% 절감!

태블릿 (768px 너비)
  ↓
thumbnail-md (640w, 400KB) ← 80% 절감!

데스크탑 (1920px 너비)
  ↓
thumbnail-lg (1280w, 800KB) ← 60% 절감!
```

---

## Step 1: Cloudflare Dashboard 접속 (1분)

1. **Cloudflare 로그인**
   - URL: https://dash.cloudflare.com/
   - 계정으로 로그인

2. **Images 서비스로 이동**
   - 왼쪽 메뉴 → **Images**
   - 또는 직접 URL: https://dash.cloudflare.com/{account_id}/images

3. **Variants 탭 클릭**
   - 상단 메뉴 → **Variants**

---

## Step 2: Variant 3개 생성 (3분)

### Variant 1: `thumbnail-sm` (모바일용)

1. **"Create Variant" 버튼 클릭**

2. **설정 입력**:
   ```
   Variant Name:    thumbnail-sm
   Width:           320
   Height:          (blank - auto)
   Fit:             Scale down
   Metadata:        None
   Format:          Auto (WebP/AVIF)
   Quality:         80
   ```

3. **"Create" 클릭**

---

### Variant 2: `thumbnail-md` (태블릿/데스크탑용)

1. **"Create Variant" 버튼 클릭**

2. **설정 입력**:
   ```
   Variant Name:    thumbnail-md
   Width:           640
   Height:          (blank - auto)
   Fit:             Scale down
   Metadata:        None
   Format:          Auto (WebP/AVIF)
   Quality:         80
   ```

3. **"Create" 클릭**

---

### Variant 3: `thumbnail-lg` (고해상도 디스플레이용)

1. **"Create Variant" 버튼 클릭**

2. **설정 입력**:
   ```
   Variant Name:    thumbnail-lg
   Width:           1280
   Height:          (blank - auto)
   Fit:             Scale down
   Metadata:        None
   Format:          Auto (WebP/AVIF)
   Quality:         85
   ```

3. **"Create" 클릭**

---

## Step 3: 환경 변수 설정 (1분)

### 프로젝트 루트의 `.env` 파일에 추가

```bash
# Cloudflare Image Variants
CLOUDFLARE_IMAGES_VARIANT_SM="thumbnail-sm"
CLOUDFLARE_IMAGES_VARIANT_MD="thumbnail-md"
CLOUDFLARE_IMAGES_VARIANT_LG="thumbnail-lg"
```

**⚠️ 주의**: 
- Variant 이름은 Cloudflare Dashboard에서 생성한 이름과 **정확히** 일치해야 함
- 대소문자 구분 (Case-sensitive)
- 따옴표 포함

---

## Step 4: 검증 (1분)

### 방법 A: 검증 스크립트 실행 (권장)

```bash
# Cloudflare 계정 정보 필요 (.env에 설정되어 있어야 함)
node scripts/test-thumbnail-variants.js
```

**예상 출력**:
```
🔍 Testing Cloudflare Image Variants...

Testing thumbnail-sm (320w)...
  ✅ URL: https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-sm
  ✅ Status: 200 OK
  ✅ Content-Type: image/webp
  ✅ File Size: 152KB (93% smaller than original)

Testing thumbnail-md (640w)...
  ✅ URL: https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-md
  ✅ Status: 200 OK
  ✅ Content-Type: image/webp
  ✅ File Size: 408KB (80% smaller than original)

Testing thumbnail-lg (1280w)...
  ✅ URL: https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-lg
  ✅ Status: 200 OK
  ✅ Content-Type: image/avif
  ✅ File Size: 785KB (61% smaller than original)

🎉 All variants working correctly!
```

---

### 방법 B: 수동 테스트 (브라우저)

1. **Cloudflare Images 대시보드에서 이미지 1개 업로드**
   - Images → Upload
   - 아무 이미지나 업로드

2. **이미지 ID 복사**
   - 업로드된 이미지 클릭
   - Image ID 복사 (예: `abc123-def456-ghi789`)

3. **브라우저에서 URL 테스트**
   ```
   # Account Hash는 Dashboard → Images → Overview에서 확인
   
   # Original
   https://imagedelivery.net/{account_hash}/{image_id}/public
   
   # Variant: thumbnail-sm
   https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-sm
   
   # Variant: thumbnail-md
   https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-md
   
   # Variant: thumbnail-lg
   https://imagedelivery.net/{account_hash}/{image_id}/thumbnail-lg
   ```

4. **결과 확인**
   - ✅ 모든 URL이 이미지를 로드하는가?
   - ✅ thumbnail-sm이 가장 작은가?
   - ✅ 이미지 품질이 허용 가능한가?

---

## Step 5: 프론트엔드에서 사용하기 (참고)

### Next.js Image 컴포넌트에서 사용

```tsx
import Image from 'next/image';

export default function VideoCard({ video }) {
  const cloudflareAccountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
  const imageId = video.thumbnailId; // Cloudflare Image ID

  return (
    <Image
      src={`https://imagedelivery.net/${cloudflareAccountHash}/${imageId}/public`}
      alt={video.title}
      width={640}
      height={360}
      sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1280px"
      // Next.js가 자동으로 적절한 Variant 선택 (srcSet 생성)
    />
  );
}
```

### Responsive Image with srcSet

```tsx
<img
  src={`https://imagedelivery.net/${accountHash}/${imageId}/thumbnail-md`}
  srcSet={`
    https://imagedelivery.net/${accountHash}/${imageId}/thumbnail-sm 320w,
    https://imagedelivery.net/${accountHash}/${imageId}/thumbnail-md 640w,
    https://imagedelivery.net/${accountHash}/${imageId}/thumbnail-lg 1280w
  `}
  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1280px"
  alt="Thumbnail"
/>
```

---

## 트러블슈팅

### ❌ "Variant not found" (404 에러)

**원인**: Variant 이름 불일치 또는 생성 실패

**해결**:
1. Cloudflare Dashboard → Images → Variants에서 이름 확인
2. `.env` 파일의 이름과 정확히 일치하는지 확인
3. 대소문자 구분 (`thumbnail-sm` ≠ `Thumbnail-SM`)

---

### ❌ 이미지 품질이 너무 낮음

**원인**: Quality 설정이 너무 낮음 (< 70)

**해결**:
1. Cloudflare Dashboard → Images → Variants
2. 해당 Variant 클릭 → Edit
3. Quality를 80-90으로 상향 조정
4. "Save" 클릭

---

### ❌ 이미지 크기가 줄어들지 않음

**원인**: 
- Format이 `Original`로 설정됨 (WebP/AVIF 미사용)
- 원본 이미지가 이미 최적화되어 있음

**해결**:
1. Variant 설정 확인: Format → `Auto` 설정
2. 원본 이미지가 PNG/BMP라면 WebP로 변환 시 효과 큼
3. 이미 WebP라면 추가 압축 효과 제한적

---

### ❌ 검증 스크립트 실행 시 "Account ID not found"

**원인**: `.env` 파일에 Cloudflare 설정 누락

**해결**:
```bash
# .env 파일에 추가
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_IMAGES_ACCOUNT_HASH="your-account-hash"

# Account Hash 찾기:
# Cloudflare Dashboard → Images → Overview → "Account Hash" 복사
```

---

## 예상 성능 개선

### 이미지 크기 비교 (1920x1080 원본 기준)

| Variant | Width | 원본 크기 | 최적화 후 | 절감률 |
|---------|-------|----------|----------|--------|
| Original | 1920px | 2.1 MB | - | - |
| thumbnail-lg | 1280px | 2.1 MB | 785 KB | **62%** |
| thumbnail-md | 640px | 2.1 MB | 408 KB | **81%** |
| thumbnail-sm | 320px | 2.1 MB | 152 KB | **93%** |

### 페이지 로딩 속도 개선

- **Before**: 12개 썸네일 × 2MB = 24MB
- **After**: 12개 썸네일 × 408KB (md) = 4.8MB
- **절감**: **19.2MB (80%)**

### 월 대역폭 절감 (예상)

- 일일 방문자: 1,000명
- 평균 썸네일 조회: 20개/방문
- 월 대역폭 절감: **11.5TB → 2.8TB (76% 절감)**
- 비용 절감: **$115 → $28 (월 $87 절약)**

---

## 완료 체크리스트

- [ ] Step 1: Cloudflare Dashboard 접속 완료
- [ ] Step 2: Variant 3개 생성 완료
  - [ ] `thumbnail-sm` (320w, quality 80)
  - [ ] `thumbnail-md` (640w, quality 80)
  - [ ] `thumbnail-lg` (1280w, quality 85)
- [ ] Step 3: `.env` 파일에 환경 변수 3개 추가 완료
- [ ] Step 4: 검증 스크립트 실행하여 200 OK 확인

**완료 시**: ✅ Cloudflare Image Variants 설정 완료!

---

## 참고 문서

- **상세 가이드**: `docs/04-development/THUMBNAIL_OPTIMIZATION.md`
- **마이그레이션 스크립트**: `scripts/migrate-stream-thumbnail-variants.js`
- **Cloudflare 공식 문서**: https://developers.cloudflare.com/images/image-resizing/

---

**다음 단계**: k6 설치 및 부하 테스트 (선택 사항)
