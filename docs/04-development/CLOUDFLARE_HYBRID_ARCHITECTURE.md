# 🚀 Cloudflare Hybrid Video Architecture Roadmap

> **목표**: R2의 저렴한 스토리지 비용과 Cloudflare Stream의 강력한 전송/보안 기능을 결합한 하이브리드 영상 시스템 구축.

## 1. 개요 (Executive Summary)

*   **핵심 전략**:
    *   **R2 (Master)**: 원본 영상의 영구 보관(Cold Storage) 및 썸네일 이미지 호스팅.
    *   **Stream (Edge)**: 스트리밍 최적화 인코딩, 적응형 비트레이트(ABR) 전송, 보안 토큰(Signed Token) 적용.
*   **기대 효과**:
    *   벤더 락인 방지 (원본 소유권 확보)
    *   썸네일 트래픽 비용 절감 (R2 무료 Egress 활용)
    *   엔터프라이즈급 재생 품질 및 보안 확보

---

## 2. 시스템 역할 분담 (R2 vs Stream)

두 서비스를 중복해서 사용하는 것이 아니라, 철저한 역할 분리를 통해 효율을 극대화합니다.

| 구분 | Cloudflare R2 | Cloudflare Stream |
| :--- | :--- | :--- |
| **역할** | **자산 창고 (Asset Archive)** | **배송 및 보안 (Delivery & Security)** |
| **저장 데이터** | 원본 고화질 파일 (`.mp4`), 썸네일 이미지 | 인코딩된 스트리밍 파일 (`HLS`/`DASH`) |
| **서비스 활용** | 웹사이트/앱 내 이미지 표시 (Poster) | 실제 동영상 플레이어 재생 (Source) |
| **과금 구조** | 스토리지: 저렴 ($0.015/GB)<br>트래픽: **무료 (Egress Free)** | 스토리지: 분 단위 과금 ($5/1,000분)<br>트래픽: 분 단위 과금 ($1/1,000분) |
| **삭제 정책** | **영구 보관** (서비스 확장/이전 대비) | **유동적 관리** (안 보는 영상은 삭제 가능) |

---

## 3. 아키텍처 워크플로우 (Architecture)

### Phase 1: 마이그레이션 (현재 보유 데이터 처리)
> 이미 R2에 있는 데이터를 Stream으로 활성화하는 단계입니다.

1.  **Backend**: DB에서 영상 목록(R2 Key) 조회.
2.  **R2**: 해당 파일의 `Presigned URL`(임시 다운로드 주소) 생성.
3.  **Stream API**: `POST /copy` (Upload via Link) 호출하여 R2 URL 전달.
4.  **Database**: 응답받은 `stream_uid`를 DB에 업데이트.
    *   *Note: 썸네일은 이동시키지 않고 R2 URL을 그대로 사용합니다.*

### Phase 2: 서비스 재생 (Playback Flow)
1.  **Client**: 영상 재생 페이지 접속.
2.  **Backend**:
    *   사용자 권한 확인.
    *   Stream API Key를 사용해 **Signed Token** 생성.
    *   DB에서 `stream_uid`와 `r2_thumbnail_url`을 조회하여 반환.
3.  **Client**:
    *   `<Stream>` 플레이어 로드.
    *   `src = stream_uid` (영상 스트림)
    *   `poster = r2_thumbnail_url` (이미지 로딩 최적화)

---

## 4. 데이터베이스 스키마 수정안 (Draft)

기존 R2 데이터와 Stream 데이터를 매핑하기 위한 구조입니다.

```prisma
// Video Entity (Prisma 예시)
model VideoTechnicalSpec {
  id            String   @id @default(uuid())
  videoId       String   @unique
  video         Video    @relation(fields: [videoId], references: [id])
  
  // 1. R2 자산 정보 (원본 소유권)
  r2Bucket      String   @default("hankaebom-assets")
  r2Key         String   // 예: "courses/2024/intro.mp4"
  thumbnailUrl  String?  // 예: "https://pub-xxx.r2.dev/thumbs/intro.jpg"
  
  // 2. Stream 서비스 정보 (재생용)
  streamUid     String?  // 마이그레이션 후 발급된 ID
  streamStatus  String   // "PROCESSING" | "READY" | "ERROR"
  
  // 3. 메타데이터
  fileSize      BigInt?
  format        String?
  duration      Float?   // 재생 시간 (초)
}
```

---

## 5. 단계별 개발 계획 (Milestones)

### Step 1: 마이그레이션 스크립트 작성 (Backend)
*   **목표**: R2 영상을 Stream으로 복사(Import)하는 배치 프로그램 구현.
*   **핵심 기술**: AWS SDK (R2 접근), Axios (Stream API 호출).
*   **Check Point**: R2에서 가져온 영상이 Stream 대시보드에서 "Ready" 상태가 되는지 확인.

### Step 2: 보안 토큰(Signed Token) 발급 로직 (Backend)
*   **목표**: 아무나 영상을 볼 수 없도록 URL 서명 처리.
*   **구현**: Cloudflare 서명 키(PEM)를 이용한 JWK/JWT 생성.
*   **Check Point**: 토큰 없이 영상 URL에 접근했을 때 재생 차단(403) 확인.

### Step 3: 플레이어 연동 (Frontend)
*   **목표**: R2 썸네일과 Stream 영상을 결합한 UI 구축.
*   **기술**: `@cloudflare/stream-react` 라이브러리 사용.
*   **코드 전략**:
    ```tsx
    <Stream 
      src={video.streamUid} // 또는 Signed Token
      poster={video.thumbnailUrl} // R2 이미지 사용
      controls
    />
    ```

---

## 6. 예상 비용 및 운영 팁 (KPI)

*   **비용 효율성**:
    *   **썸네일 트래픽**은 R2(무료 Egress)가 처리하므로 Stream 트래픽 비용 대폭 절감.
    *   Stream에는 "실제 서비스 중인 영상"만 남기고, 오래된 영상은 Stream에서 지우고 R2에만 남겨두는 방식으로 Stream 저장 비용($5/1,000분) 제어 가능.
*   **확장성**:
    *   추후 다른 동영상 솔루션으로 이전하더라도 **R2에 원본이 살아있으므로** 데이터 손실 없음.
*   **실행 팁**:
    *   **Webhook 설정**: Stream 인코딩이 완료되면 Backend로 알림을 받도록 Webhook을 꼭 설정하세요. DB의 `streamStatus`를 `READY`로 바꾸는 트리거가 됩니다.
