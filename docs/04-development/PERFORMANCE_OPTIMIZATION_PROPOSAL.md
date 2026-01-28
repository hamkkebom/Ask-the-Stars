# ⚡ 고속 영상 그리드 로딩 성능 최적화 제안서

현재 "함께봄" 서비스의 영상 그리드는 약 370여 개의 항목을 한 번에 불러오며, 매 요청마다 **R2 Presigned URL을 실시간 생성**하고 있어 로딩 속도와 서버 부하 면에서 개선이 필요합니다. 이를 해결하고 "압도적 속도"를 구현하기 위한 3단계 전략을 제안합니다.

---

## 1. 그리드 데이터 효율화 (Pagination)

현재 모든 비디오(377개)를 한 번에 API로 호출하고 있습니다. 이는 데이터 전송량뿐만 아니라 클라이언트의 DOM 렌더링 부하를 초래합니다.

- **제안 사항**:
    - **무한 스크롤 (Infinite Scroll)** 도입: 초기 로딩 시 24~30개 항목만 노출하고, 스크롤에 맞춰 추가 로드.
    - **NestJS + Prisma Cursor Pagination**: 데이터베이스 수준에서 오프셋이 아닌 커서 기반 페이징을 적용해 조회 성능 최적화.
    - **필수 필드만 전송 (Selective Fetching)**: 그리드의 썸네일 노출에 불필요한 상세 기술 사양(TechnicalSpec 상세 등)을 제거하여 JSON 페이로드 크기 축소.

## 2. 콘텐츠 전송 최적화 (Public R2 + Cloudflare CDN)

현재 사용하는 Presigned URL 방식은 매번 주소가 바뀌어 **브라우저 캐시 및 CDN 캐시를 전혀 활용할 수 없습니다.**

- **제안 사항**:
    - **Public R2 Bucket 노출**: R2 버킷에 특정 도메인(`assets.hamkkebom.com` 등)을 연결하고 Public Read 권한 부여.
    - **정적 URL 사용**: `https://assets.hamkkebom.com/path/to/thumb.jpg` 형태의 고정 주소를 사용하여 CDN 캐싱(Edge Caching) 활성화.
    - **Cloudflare Image Resizing 활용**:
        - 원본 이미지를 호출하는 대신 Cloudflare 변환 옵션 사용 (예: `/cdn-cgi/image/width=400,format=avif/image.jpg`).
        - 사용자의 디바이스 환경에 맞춰 자동으로 WebP/AVIF로 변환 및 리사이징하여 전송량 70% 이상 절감.

## 3. 캐싱 및 하이브리드 전략

서버 부하를 줄이고 유저 체감 속도를 높이기 위한 전략입니다.

- **제안 사항**:
    - **Redis API Response Caching**: 비디오 목록 API 결과를 Redis에 캐싱 (TTL 5~10분). 새로운 영상 업로드 시에만 캐시 무효화.
    - **Next.js SWR/React Query 최적화**: `stale-while-revalidate` 전략을 통해 유저가 페이지 진입 시 즉시 이전 데이터를 보여주고 백그라운드에서 갱신.
    - ~~**플레이어 지연 로딩 (Lazy Loading)**~~: [적용 완료] 그리드 상의 영상 썸네일은 순수 이미지로 보여주고, 마우스 오버 시에만 비디오 URL을 서버에서 동적으로 가져오도록(On-Demand) 구현 완료. 377개 영상을 한 번에 서명하던 부하를 제거함.

---

## 예상 성능 개선 효과

| 항목 | 현재 (Current) | 목표 (Target) | 개선 효과 |
| :--- | :--- | :--- | :--- |
| **초기 API 응답 시간** | ~2.5s (Presigning 부하) | **< 200ms** | **90% 단축** |
| **메인 페이지 전송량** | ~40MB (원본 이미지 위주) | **~3MB** | **92% 절감** |
| **LCP (최대 콘텐츠 페인팅)** | 4.0s 이상 | **1.2s 이하** | **사용자 경험 혁신** |

---

> [!IMPORTANT]
> 특히 **Cloudflare Image Resizing**과 **Public Domain** 적용이 가장 빠른 체감 성능 향상을 가져올 수 있습니다. 승인해 주시면 해당 아키텍처 반영을 위한 환경 설정부터 시작하겠습니다.
