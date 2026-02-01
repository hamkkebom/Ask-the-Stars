# 🛠️ 기술 스택 (Tech Stack)

> **최종 확정**: 2026-02-01
> **예산**: 월 $30 (현재 Free Tier 적용 중)
> **적용 현황 업데이트**: 2026-02-01
> **빌드 상태**: ✅ Vercel 배포 성공 (TypeScript 에러 0개)

---

## 📊 요약

| 분류 | 핵심 기술 | 버전 | 적용 |
|------|----------|------|:----:|
| 🎨 Frontend | Next.js + React | 16.1.6 / 19.2.3 | ✅ |
| 🔧 Backend | NestJS + Prisma | 11.1.12 / 6.3.1 | ✅ |
| 🎬 Video | Cloudflare Stream + R2 | Hybrid | ✅ |
| 🧠 AI/ML | OpenAI + pgvector | - | ✅ |
| 📊 Monitoring | Sentry | 무료 | ✅ |
| ☁️ Hosting | Vercel + Cloud Run | 서울 | ✅ |
| 🛡️ Type | Zod (v3.24.1 표준화) | - | ✅ |

---

## 🎨 Frontend

> **핵심 철학**: React 19의 Server Components와 Next.js App Router를 활용한 **하이브리드 렌더링** 전략
>
> SEO가 중요한 퍼블릭 페이지는 SSR, 대시보드는 CSR로 최적화

| 기술 | 버전 | 용도 | 상세 설명 |
|------|------|------|-----------|
| [Next.js](https://nextjs.org/) | 16.1.6 | React 프레임워크 | App Router 기반. `(public)`, `(dashboard)`, `(admin)` 라우트 그룹으로 레이아웃 분리 |
| [React](https://react.dev/) | 19.2.3 | UI 라이브러리 | Server Components로 번들 사이즈 40% 감소. `use client` 최소화 전략 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | 타입 안전성 | Zod 스키마와 연동하여 런타임 + 컴파일타임 이중 검증 |
| [TailwindCSS](https://tailwindcss.com/) | 4.1.18 | 유틸리티 CSS | v4의 Lightning CSS 엔진으로 빌드 속도 10x 향상. `@apply` 지양, 컴포넌트 기반 스타일링 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.10 | 클라이언트 상태 관리 | 모달, 토스트, 사이드바 토글 등 UI 상태 전용. 서버 상태는 TanStack Query로 분리 |
| [TanStack Query](https://tanstack.com/query) | 5.62.7 | 서버 상태 관리 | 자동 캐싱, 백그라운드 리패치, 낙관적 업데이트. `staleTime: 5분` 기본 설정 |
| [Plyr](https://plyr.io/) | 3.8.4 | 영상 플레이어 | ⚠️ Legacy - 단순 미리보기용. 메인 플레이어는 Cloudflare Stream으로 마이그레이션 완료 |
| [Cloudflare Stream](https://developers.cloudflare.com/stream/) | - | 메인 영상 플레이어 | React 컴포넌트 기반. 적응형 비트레이트, DRM 지원, 글로벌 CDN 자동 적용 |
| [HLS.js](https://github.com/video-dev/hls.js) | 1.6.15 | HLS 스트리밍 | Safari 외 브라우저에서 HLS 지원용. Stream 플레이어 fallback으로만 사용 |
| [Fabric.js](http://fabricjs.com/) | 6.9.1 | Canvas 마킹 | 영상 피드백 시 타임스탬프별 마킹/드로잉 기능 구현. JSON 직렬화로 피드백 저장 |
| [Socket.io Client](https://socket.io/) | 4.8.3 | 실시간 통신 | 알림, 피드백 실시간 동기화. 재연결 로직 + 연결 상태 UI 표시 |
| [Lucide React](https://lucide.dev/) | 0.469.0 | 아이콘 | Tree-shaking 지원으로 필요한 아이콘만 번들링. Heroicons 대비 50% 경량 |

### 🔍 SEO 최적화 전략

| 항목 | 구현 방식 | 적용 페이지 |
|------|-----------|------------|
| **JSON-LD** | Schema.org 구조화 데이터 (Organization, VideoObject) | 모든 퍼블릭 페이지 |
| **메타태그** | `generateMetadata()` 동적 생성 | 동적 라우트 (뉴스, 영상 상세) |
| **이미지 최적화** | AVIF/WebP 자동 변환 (Next/Image + R2 Image Resizing) | 전체 |
| **Sitemap** | `sitemap.ts` 동적 생성 + Google Search Console 연동 | `/sitemap.xml` |

---

## 🔧 Backend

> **핵심 철학**: NestJS의 모듈형 아키텍처로 **도메인 분리** 및 **확장성** 확보
>
> 동시 접속 500+ 사용자 대응을 위한 Redis 기반 수평 확장 아키텍처

| 기술 | 버전 | 용도 | 상세 설명 |
|------|------|------|-----------|
| [NestJS](https://nestjs.com/) | 11.1.12 | 서버 프레임워크 | DI 컨테이너 기반. Guards, Interceptors, Pipes로 횟단 관심사 분리 |
| [Node.js](https://nodejs.org/) | 22.x | 런타임 | Cloud Run에서 Fat Image로 빌드. Cold Start 최소화를 위해 alpine 대신 node:22 사용 |
| [Prisma](https://www.prisma.io/) | 6.3.1 | ORM | 타입 안전한 스키마 정의. `prisma generate` 로 타입 자동 생성 |
| [PostgreSQL](https://www.postgresql.org/) | 17 | 데이터베이스 | Supabase 호스팅. **pgvector** 확장으로 AI 임베딩 검색 (1536차원) |
| [OpenAI](https://openai.com/) | 4.x | AI 임베딩 | `text-embedding-3-small` 모델로 영상 메타데이터 벡터화. 의미 기반 검색 구현 |
| [Redis](https://redis.io/) | Upstash | 캐시/어댑터 | Socket.io 수평 확장용 Adapter. 세션 공유로 다중 인스턴스 간 실시간 동기화 |
| [BullMQ](https://docs.bullmq.io/) | 5.66.5 | 작업 큐 | 영상 업로드 후처리, 이메일 발송 등 비동기 작업. Dead Letter Queue 설정으로 실패 처리 |
| [Socket.io](https://socket.io/) | 4.8.3 | 실시간 통신 | 알림, 피드백 실시간 푸시. Redis Adapter로 Sticky Session 없이 수평 확장 |
| [class-validator](https://github.com/typestack/class-validator) | 0.14.1 | 유효성 검증 | DTO 데코레이터로 입력 검증. `whitelist: true`로 알려지지 않은 필드 자동 제거 |
| [Passport](https://www.passportjs.org/) | 0.7.0 | 인증 | JWT + Local Strategy. Access Token 15분, Refresh Token 7일 회전 정책 |

### 📦 모듈 구조

```txt
apps/api/src/modules/
├── auth/           # 인증/인가 (JWT, Guards)
├── users/          # 사용자 관리
├── projects/       # 프로젝트 CRUD
├── videos/         # 영상 메타데이터
├── uploads/        # R2/Stream 업로드
├── feedback/       # 피드백 시스템
├── settlements/    # 정산 관리
├── notifications/  # 실시간 알림
└── leads/          # 리드 수집 (설명회)
```

---

## ☁️ Infrastructure

> **핵심 철학**: **월 $30 예산** 내에서 프로덕션 급 서비스 구성
>
> Free Tier 최대 활용 + 서울 리전 우선으로 레이턴시 최소화

| 서비스 | 용도 | 리전 | 월 비용 | 적용 | 선택 이유 |
|--------|------|------|---------|:----:|----------|
| [Vercel](https://vercel.com/) | 프론트엔드 | 서울 PoP | $0 | ✅ | Next.js 공식 파트너. Edge Runtime + ISR 지원 |
| [Cloud Run](https://cloud.google.com/run) | 백엔드 | 서울 | $0 | ✅ | 스케일-투-제로. 3개월 $300 크레딧 적용 중 |
| [Supabase](https://supabase.com/) | DB + Auth | 서울 | $25 | ✅ | PostgreSQL + pgvector + Connection Pooling (6543 포트) |
| [Upstash](https://upstash.com/) | Redis | 도쿄 | $0 | ✅ | 서버리스 Redis. Free Tier 10K req/day |
| [Cloudflare R2](https://www.cloudflare.com/r2/) | 원본 스토리지 | 글로벌 | $0 | ✅ | S3 호환 + 이그레스 무료. Image Resizing 자동 적용 |
| [Cloudflare Stream](https://www.cloudflare.com/stream/) | 영상 CDN | 글로벌 | $5 | ✅ | 적응형 비트레이트, 자동 트랜스코딩, DRM 지원 |
| [Resend](https://resend.com/) | 이메일 | - | $0 | ✅ | 개발자 친화적 API. Free Tier 100 emails/day |

### 💰 비용 구조

```txt
월 총 비용: $30
├── Supabase Pro     : $25 (필수 - DB 연결 제한 해제)
├── Cloudflare Stream: $5  (1,000분 저장 포함)
├── 나머지           : $0  (Free Tier)
└── 향후 확장 예상    : Stream 사용량 증가 시 $1/1,000분 추가
```

---

## 📊 Monitoring (무료)

| 서비스 | 용도 | 무료 티어 | 적용 |
|--------|------|----------|:----:|
| [Sentry](https://sentry.io/) | 에러 추적 | 5,000 errors/월 | $0 ✅ |

---

## 🔧 개발 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| pnpm | 10.x | 패키지 매니저 |
| Turborepo | 2.7.5 | 모노레포 빌드 |
| ESLint | 9.39.2 | Flat Config (ESM) |
| Prettier | 3.8.0 | 포매터 |
| Vitest | 2.1.9 | 프론트엔드 테스트 |
| Jest | 29.7.0 | 백엔드 테스트 |
| Docker Compose | - | 로컬 환경 |

---

## 📁 프로젝트 구조

```
ask-the-stars/
├── apps/
│   ├── web/          # Next.js 15 (프론트엔드)
│   └── api/          # NestJS 11 (백엔드)
├── packages/
│   ├── ui/           # 공유 UI 컴포넌트
│   ├── types/        # TypeScript 타입
│   └── utils/        # 유틸리티 함수
├── docs/             # 문서
└── scripts/          # 스크립트
```

---

## 🏗️ 시스템 아키텍처 (System Architecture)

```mermaid
graph TD
    User([사용자]) -->|HTTPS| CDN[Cloudflare CDN]
    CDN -->|Next.js App| Vercel[Vercel Frontend\n(Seoul PoP)]
    CDN -->|Images/Videos| R2[Cloudflare R2 & Stream]
    
    Vercel -->|API Calls| CloudRun[Google Cloud Run\n(Backend API)]
    
    subgraph Data Layer
        CloudRun -->|ORM| DB[(Supabase PostgreSQL)]
        CloudRun -->|Cache| Redis[(Upstash Redis)]
    end
    
    subgraph Services
        CloudRun -->|Auth| Passport[Passport.js]
        CloudRun -->|Email| Resend[Resend API]
        CloudRun -->|Video| Uploads[UploadsService\n(R2/Stream)]
    end
```

---

## 🔐 보안 및 환경 설정 (Security & Config)

### 주요 보안 정책
*   **Authentication**: Passport.js + JWT (Access/Refresh Token Rotation)
*   **CORS**: `api.hamkkebom.com` <-> `hamkkebom.com` 간 엄격한 오리진 제한
*   **Rate Limiting**: Cloudflare & NestJS Throttler 적용

### 환경 변수 관리 (`.env`)
프로젝트 실행을 위해 다음 환경 변수가 필수적으로 요구됩니다. (상세 내용은 `README.md` 참조)

| 변수명 | 설명 | 위치 |
|--------|------|------|
| `DATABASE_URL` | Prisma DB 연결 주소 | Root |
| `NEXT_PUBLIC_API_URL` | 백엔드 API 엔드포인트 | Web |
| `JWT_SECRET` | 토큰 서명 키 | API |
| `RESEND_API_KEY` | 이메일 서비스 키 | API |
| `REDIS_URL` | Redis 연결 주소 (Socket.io Adapter 전용) | API |

---

## 🚀 빠른 시작

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 프론트엔드: http://localhost:3000
# 백엔드: http://localhost:4000
```

---

## 📚 관련 문서

- [DEPLOYMENT.md](../05-operations/DEPLOYMENT.md) - 배포 가이드
- [CONTRIBUTING.md](../04-development/CONTRIBUTING.md) - 기여 가이드
- [CODING_CONVENTION.md](../04-development/CODING_CONVENTION.md) - 코딩 컨벤션
