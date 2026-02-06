# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-06
**Branch:** main

## OVERVIEW

함께봄-스타(Hamkkebom-Star) — AI 영상 제작 인재 생태계 플랫폼. 교육 → 프리랜서 매칭 → 영상 제작 → 마케팅 대행의 순환 구조. Next.js 15 (App Router, React 19) + NestJS 11 모노레포, Turborepo + pnpm 빌드.

## STRUCTURE

```
ask-the-stars/
├── apps/
│   ├── web/              # Next.js 15 프론트엔드 (49 pages, 47 components)
│   │   ├── src/app/      # App Router: (admin), (dashboard), (public), auth
│   │   ├── src/components/  # ui, sections, features, layout, player, feedback, upload
│   │   ├── src/lib/      # API 클라이언트 (axios), hooks, supabase, validation
│   │   └── src/store/    # Zustand (useAuthStore)
│   └── api/              # NestJS 11 백엔드 (86+ 소스파일, 18 모듈)
│       ├── src/modules/  # 도메인 모듈 (auth~videos)
│       └── src/common/   # guards, decorators, adapters, filters
├── packages/
│   ├── database/         # Prisma ORM (929줄, 33 모델, pgvector)
│   ├── types/            # 공유 타입 (entities/, enums/, dto/)
│   ├── ui/               # 공유 UI (8 컴포넌트)
│   └── utils/            # 공유 유틸 (validation, date, video, currency)
├── tests/
│   ├── e2e/              # Playwright E2E (4 spec, Page Objects)
│   └── load/             # k6 부하테스트 (5 시나리오)
├── docs/                 # 9 카테고리, 62 문서
├── scripts/              # 65 인프라/마이그레이션 스크립트
└── supabase/             # 마이그레이션 + 시드
```

## WHERE TO LOOK

| 작업 | 위치 | 비고 |
|------|------|------|
| 페이지 추가 | `apps/web/src/app/` | Route Group별 layout 주의 |
| UI 컴포넌트 | `apps/web/src/components/ui/` | glass-card, skeleton, toast 등 |
| 섹션 컴포넌트 | `apps/web/src/components/sections/` | Hero, VideoGrid, Swimlane |
| API 엔드포인트 | `apps/api/src/modules/` | Controller→Service→Repository |
| DB 스키마 변경 | `packages/database/prisma/schema.prisma` | `pnpm db:generate` → `db:migrate` |
| 공유 타입 | `packages/types/src/` | entities/, enums/, dto/ |
| API 클라이언트 | `apps/web/src/lib/api/` | axios 래퍼, TanStack Query hooks |
| 상태 관리 | `apps/web/src/store/` | Zustand useAuthStore |
| 영상 플레이어 | `apps/web/src/components/player/` | Plyr + HLS.js (Stream signed URL) |
| 피드백/마킹 | `apps/web/src/components/feedback/` | Fabric.js Canvas (418줄) |
| 인증 | `apps/api/src/modules/auth/` | JWT + Passport + Supabase |
| 실시간 | `apps/api/src/modules/chat/`, `notifications/` | Socket.io + Redis adapter |
| 배포 설정 | `.github/workflows/` | ci, cd-api, cd-web, lighthouse, security |
| 디자인 토큰 | `apps/web/src/app/globals.css` | Tailwind v4 @theme (125줄) |
| E2E 테스트 | `tests/e2e/` | Playwright + Page Objects |
| 부하 테스트 | `tests/load/` | k6 (auth, videos, projects, admin, full) |

## CONVENTIONS

### 핵심 원칙 (반드시 준수)

1. **RSC 우선**: 모든 컴포넌트 서버 컴포넌트 기본. `useState`/`useEffect` 시에만 `'use client'`
2. **Field Picking**: RSC→클라이언트 경계에서 필요 필드만 전달. 전체 객체 직렬화 금지
3. **워터폴 제거**: 독립 fetch는 반드시 `Promise.all()`. 순차 await 금지
4. **after() 사용**: 로깅, 분석, 비중요 DB 업데이트는 `after()`로 비차단 처리
5. **깜빡임 없는 UI**: 테마/상태는 layout.tsx 인라인 스크립트로 하이드레이션 전 적용
6. **Controller 순수성**: Controller는 라우팅만. 비즈니스 로직 → Service
7. **Repository 패턴**: Service에서 직접 Prisma 호출 지양. Repository로 캡슐화

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트/클래스 | PascalCase | `UserProfile.tsx` |
| 변수/함수 | camelCase | `getUserProfile` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 폴더 | kebab-case | `my-projects` |
| 내부 패키지 | `@ask-the-stars/*` | `@ask-the-stars/types` |

### 코드 스타일

- Prettier: 싱글 쿼트, 80자, ES5 trailing comma, LF, arrowParens always
- `interface` (모델/엔티티) vs `type` (유틸리티)
- `any` 금지 (프론트엔드). 백엔드 DTO에서만 예외 허용
- Lucide, framer-motion, date-fns: `optimizePackageImports` 적용

### 상태 관리

- **Zustand**: 도메인별 스토어 분리 (`useAuthStore`)
- **TanStack Query**: 서버 상태. `src/lib/api/` 래퍼 사용
- **직접 fetch 금지** → axios API 래퍼 사용

### 스타일링

- Tailwind CSS v4 (`@theme` 디렉티브)
- 디자인 토큰: Deep Slate 배경, Trust Blue 프라이머리, Gold 세컨더리
- `.glass` / `.glass-hover`: 글래스모피즘 유틸리티
- `content-visibility: auto` 긴 리스트에 적용
- className 순서: Layout → Box Model → Typography → Visual

## ANTI-PATTERNS (금지 사항)

- `as any`, `@ts-ignore`, `@ts-expect-error` 사용 금지
- `{count && <Component />}` → `{count > 0 ? <Component /> : null}` 사용
- `useEffect` 의존성에 객체 전달 금지 → 원시 타입으로 좁히기
- Controller에 비즈니스 로직 금지 → Service 분리
- Service에서 직접 Prisma 호출 지양 → Repository 패턴
- `localStorage` 직접 호출 금지 → 캐시 래퍼 사용
- RSC에서 `.toSorted()`, `.filter()` 후 클라이언트 전달 금지 (중복 직렬화)
- SVG 직접 애니메이션 금지 → div 래퍼 사용
- Server Action 인증 체크 누락 금지
- NestJS field injection 금지 → constructor injection
- `DROP/TRUNCATE/DELETE FROM` (WHERE 없이) 프로덕션 금지

## COMMANDS

```bash
# 개발
pnpm dev                    # 전체 (web:3000, api:4000)
pnpm dev --filter=web       # 프론트엔드만
pnpm dev --filter=api       # 백엔드만

# 빌드 & 테스트
pnpm build                  # 전체 빌드 (Turborepo)
pnpm test                   # 전체 테스트 (turbo → Vitest + Jest)
pnpm test --filter=web      # 프론트엔드 (Vitest)
pnpm test --filter=api      # 백엔드 (Jest)
pnpm e2e                    # Playwright E2E
pnpm lint                   # 린트 (web은 스킵)
pnpm format                 # Prettier

# 데이터베이스
pnpm db:generate            # Prisma 클라이언트 생성
pnpm db:migrate             # 마이그레이션 실행
pnpm db:studio              # Prisma Studio

# Docker (로컬 DB)
docker-compose up -d        # PostgreSQL 17 + Redis 7.4
```

## INFRA

| 서비스 | 용도 | 리전 |
|--------|------|------|
| Vercel | 프론트엔드 호스팅 | 서울 PoP |
| Cloud Run | 백엔드 API | 서울 asia-northeast3 |
| Supabase | PostgreSQL 17 + Auth | 서울 ap-northeast-2 |
| Upstash | Redis 캐시 + Socket.io adapter | 도쿄 |
| Cloudflare Stream | 영상 스트리밍 (signed URL) | CDN |
| Cloudflare R2 | 오브젝트 스토리지 | CDN |
| Resend | 이메일 발송 | - |
| Sentry | 에러 추적 | - |

## COMPLEXITY HOTSPOTS

| 파일 | 줄수 | 비고 |
|------|------|------|
| `apps/api/.../videos/videos.service.ts` | 712 | Service 분리 필요 |
| `apps/web/src/lib/api/projects.ts` | 594 | API 클라이언트 분리 |
| `apps/web/.../advanced-video-grid.tsx` | 589 | 서브컴포넌트 추출 |
| `apps/api/.../cloudflare-stream.service.ts` | 544 | 어댑터 분리 |
| `packages/database/prisma/schema.prisma` | 929 | 33 모델 |

## TESTING

| 계층 | 프레임워크 | 커버리지 |
|------|-----------|---------|
| Frontend Unit | Vitest + jsdom | 94.72% |
| Backend Unit | Jest + @nestjs/testing | 93.57% |
| E2E | Playwright | 12 suites (6 skipped) |
| Load | k6 | 5 시나리오 |
| Performance | Lighthouse CI | PR마다 자동 |

## NOTES

- **Node 버전 불일치**: CI Node 20, cd-web Node 22
- **웹 린트 스킵**: ESLint 9 + Next.js 호환성 이슈
- **React Compiler**: next.config.ts 주석 처리 (미설치)
- **루트 Dockerfile**: 진단용. 프로덕션 아님
- **Conventional Commits**: Husky + commitlint 적용
- **Supabase Auth**: 미들웨어 세션 관리 (`src/middleware.ts`)
- **TODO**: videos controller→service 이동, auth refresh 미구현, settlements RoleGuard 미구현
- 성능 최적화 상세 → `docs/04-development/react-performance-rules.md`

---

*Stay Agentic. Optimize Everything.*
