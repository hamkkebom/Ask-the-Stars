# 🛠️ 기술 스택 (Tech Stack)

> **최종 확정**: 2026-01-17  
> **예산**: 월 $67 / $70  
> **적용 현황 업데이트**: 2026-01-18

---

## 📊 요약

| 분류 | 핵심 기술 | 버전 | 적용 |
|------|----------|------|:----:|
| 🎨 Frontend | Next.js + React | 15.5.9 / 19.0.0 | ✅ |
| 🔧 Backend | NestJS + Prisma | 11.1.12 / 6.3.1 | ✅ |
| 🎬 Video | Plyr + HLS.js | 3.7.8 / 1.5.15 | ✅ |
| 📊 Monitoring | Sentry + BetterStack | 무료 | ✅ |
| ☁️ Hosting | Vercel + Cloud Run | 서울 | ⚙️ |

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
| [Plyr](https://plyr.io/) | 3.7.8 | 영상 플레이어 |
| [HLS.js](https://github.com/video-dev/hls.js) | 1.5.15 | HLS 스트리밍 |
| [Fabric.js](http://fabricjs.com/) | 6.5.1 | Canvas 마킹 |
| [Socket.io Client](https://socket.io/) | 4.8.3 | WebSocket |
| [Lucide React](https://lucide.dev/) | 0.469.0 | 아이콘 |

---

## 🔧 Backend

| 기술 | 버전 | 용도 |
|------|------|------|
| [NestJS](https://nestjs.com/) | 11.1.12 | Node.js 프레임워크 |
| [Node.js](https://nodejs.org/) | 22 LTS | 런타임 |
| [Prisma](https://www.prisma.io/) | 6.3.1 | ORM |
| [PostgreSQL](https://www.postgresql.org/) | 17 | 데이터베이스 |
| [BullMQ](https://docs.bullmq.io/) | 5.66.5 | 작업 큐 |
| [Socket.io](https://socket.io/) | 4.8.3 | WebSocket 서버 |
| [class-validator](https://github.com/typestack/class-validator) | 0.14.1 | 유효성 검증 |
| [Passport](https://www.passportjs.org/) | 0.7.0 | 인증 |

---

## ☁️ Infrastructure

| 서비스 | 용도 | 리전 | 월 비용 | 적용 |
|--------|------|------|---------|:----:|
| [Vercel](https://vercel.com/) | 프론트엔드 호스팅 | 서울 PoP | $0 | ⚙️ |
| [Google Cloud Run](https://cloud.google.com/run) | 백엔드 호스팅 | 서울 (asia-northeast3) | $25 | ⚙️ |
| [Supabase](https://supabase.com/) | PostgreSQL + Auth | 서울 (ap-northeast-2) | $25 | ✅ |
| [Upstash](https://upstash.com/) | Redis 캐시 | 도쿄 | $10 | ✅ |
| [Cloudflare R2](https://www.cloudflare.com/r2/) | 영상 스토리지 | CDN | $0 | ✅ |
| [Cloudflare Stream](https://www.cloudflare.com/stream/) | 영상 스트리밍 | CDN | $5 | ✅ |

**총 월 비용: $67** ✅

---

## 📊 Monitoring (무료)

| 서비스 | 용도 | 무료 티어 | 적용 |
|--------|------|----------|:----:|
| [Sentry](https://sentry.io/) | 에러 추적 | 5,000 errors/월 | ✅ |
| [BetterStack](https://betterstack.com/) | 로그 모니터링 | 5GB logs/월 | ❌ |

---

## 🔧 개발 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| pnpm | 9.x | 패키지 매니저 |
| Turborepo | 2.7.5 | 모노레포 빌드 |
| ESLint | 9.17.0 | 린터 |
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

- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 기여 가이드
- [CODING_CONVENTION.md](./CODING_CONVENTION.md) - 코딩 컨벤션
