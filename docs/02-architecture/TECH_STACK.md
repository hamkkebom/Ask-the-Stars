# 🛠️ 기술 스택 (Tech Stack)

> **최종 확정**: 2026-01-19
> **예산**: 월 $30 (현재 Free Tier 적용 중)
> **적용 현황 업데이트**: 2026-01-23

---

## 📊 요약

| 분류 | 핵심 기술 | 버전 | 적용 |
|------|----------|------|:----:|
| 🎨 Frontend | Next.js + React | 15.5.9 / 19.0.0 | ✅ |
| 🔧 Backend | NestJS + Prisma | 11.1.12 / 6.3.1 | ✅ |
| 🎬 Video | Plyr + HLS.js | 3.8.4 / 1.6.15 | ✅ |
| 📊 Monitoring | Sentry | 무료 | ✅ |
| ☁️ Hosting | Vercel + Cloud Run | 서울 | ✅ |
| 🛡️ Type | Zod (v3.24.1 표준화) | - | ✅ |

---

## 🎨 Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| [Next.js](https://nextjs.org/) | 15.5.9 | React 프레임워크 (App Router) |
| [React](https://react.dev/) | 19.0.0 | UI 라이브러리 |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | 타입 안전성 |
| [TailwindCSS](https://tailwindcss.com/) | 4.0.8 | 유틸리티 CSS |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.10 | 상태 관리 |
| [TanStack Query](https://tanstack.com/query) | 5.62.7 | 서버 상태 관리 |
| [Plyr](https://plyr.io/) | 3.8.4 | 영상 플레이어 |
| [HLS.js](https://github.com/video-dev/hls.js) | 1.6.15 | HLS 스트리밍 |
| [Fabric.js](http://fabricjs.com/) | 6.9.1 | Canvas 마킹 |
| [Socket.io Client](https://socket.io/) | 4.8.3 | WebSocket |
| [Lucide React](https://lucide.dev/) | 0.469.0 | 아이콘 |
| **SEO** | JSON-LD | 구조화 데이터 (Schema.org) |
| **Performance** | AVIF/WebP | 차세대 이미지 포맷 |

---

## 🔧 Backend

| 기술 | 버전 | 용도 |
|------|------|------|
| [NestJS](https://nestjs.com/) | 11.1.12 | Node.js 프레임워크 |
| [Node.js](https://nodejs.org/) | 22.x (Current) | 런타임 (Fat Image Build) |
| [Prisma](https://www.prisma.io/) | 6.3.1 | ORM |
| [PostgreSQL](https://www.postgresql.org/) | 17 | 데이터베이스 |
| [Redis](https://redis.io/) | - | Socket.io Adapter (Horizontal Scaling) |
| [BullMQ](https://docs.bullmq.io/) | 5.66.5 | 작업 큐 |
| [Socket.io](https://socket.io/) | 4.8.3 | WebSocket 서버 (+ Redis Adapter) |
| [class-validator](https://github.com/typestack/class-validator) | 0.14.1 | 유효성 검증 |
| [Passport](https://www.passportjs.org/) | 0.7.0 | 인증 |

---

## ☁️ Infrastructure

| 서비스 | 용도 | 리전 | 월 비용 | 적용 |
|--------|------|------|---------|:----:|
| [Vercel](https://vercel.com/) | 프론트엔드 호스팅 | 서울 PoP | $0 | ✅ |
| [Google Cloud Run](https://cloud.google.com/run) | 백엔드 호스팅 | 서울 (asia-northeast3) | $0 (3개월 무료) | ✅ |
| [Supabase](https://supabase.com/) | PostgreSQL + Auth | 서울 (ap-northeast-2) | $25 | ✅ |
| [Upstash](https://upstash.com/) | Redis 캐시 | 도쿄 | $0 (Free Tier) | ✅ |
| [Cloudflare R2](https://www.cloudflare.com/r2/) | 영상 스토리지 | CDN | $0 | ✅ |
| [Cloudflare Stream](https://www.cloudflare.com/stream/) | 영상 스트리밍 | CDN | $5 | ✅ |
| [Resend](https://resend.com/) | 이메일 발송 | - | $0 (Free Tier) | ✅ |

**총 월 비용: $30 (예상)** ✅

---

## 📊 Monitoring (무료)

| 서비스 | 용도 | 무료 티어 | 적용 |
|--------|------|----------|:----:|
| [Sentry](https://sentry.io/) | 에러 추적 | 5,000 errors/월 | $0 ✅ |

---

## 🔧 개발 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| pnpm | 9.x | 패키지 매니저 |
| Turborepo | 2.7.5 | 모노레포 빌드 |
| ESLint | 9.17.0 | `.eslintrc.cjs` (ESM 호환) |
| Prettier | 3.8.0 | 포매터 |
| Vitest | 2.1.8 | 프론트엔드 테스트 |
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
