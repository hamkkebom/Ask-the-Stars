# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-01
**Commit:** 976cef4
**Branch:** main

## OVERVIEW

함께봄-스타(Hamkkebom-Star) — AI 영상 제작 인재 생태계 플랫폼. 교육 → 프리랜서 매칭 → 영상 제작 → 마케팅 대행의 순환 구조. Next.js 15 (App Router) + NestJS 11 모노레포, Turborepo 빌드 시스템.

## STRUCTURE

```
ask-the-stars/
├── apps/
│   ├── web/              # Next.js 15 프론트엔드 (47 pages, React 19)
│   │   ├── src/app/      # App Router: (admin), (dashboard), (public), auth
│   │   ├── src/components/  # 46 컴포넌트 (ui, sections, features, layout 등)
│   │   ├── src/lib/      # API 클라이언트, hooks, utils
│   │   └── src/store/    # Zustand 스토어
│   └── api/              # NestJS 11 백엔드 (75+ 소스파일)
│       └── src/modules/  # 18개 도메인 모듈
├── packages/
│   ├── database/         # Prisma ORM (PostgreSQL 17 스키마)
│   ├── types/            # 공유 타입 (entities, enums)
│   ├── ui/               # 공유 UI 컴포넌트
│   └── utils/            # 공유 유틸리티
├── docs/                 # 9개 카테고리 문서 (51 파일)
├── scripts/              # 인프라 자동화 스크립트 (55 파일)
└── supabase/             # Supabase 마이그레이션/시드
```

## WHERE TO LOOK

| 작업 | 위치 | 비고 |
|------|------|------|
| 페이지 추가 | `apps/web/src/app/` | Route Group별 layout 주의 |
| UI 컴포넌트 | `apps/web/src/components/ui/` | glass, skeleton 등 |
| 섹션 컴포넌트 | `apps/web/src/components/sections/` | Hero, Grid 등 |
| API 엔드포인트 | `apps/api/src/modules/` | module/controller/service 패턴 |
| DB 스키마 변경 | `packages/database/prisma/schema.prisma` | `pnpm db:generate` 후 `db:migrate` |
| 공유 타입 | `packages/types/src/` | entities/, enums/ |
| API 클라이언트 | `apps/web/src/lib/api/` | TanStack Query 래퍼 |
| 상태 관리 | `apps/web/src/store/` | Zustand 스토어 |
| 영상 플레이어 | `apps/web/src/components/player/` | Plyr + HLS.js |
| 피드백/마킹 | `apps/web/src/components/feedback/` | Fabric.js Canvas |
| 인증 | `apps/api/src/modules/auth/` | JWT + Passport |
| 배포 설정 | `.github/workflows/` | CI/CD (Vercel + Cloud Run) |
| 디자인 토큰 | `apps/web/src/app/globals.css` | Tailwind v4 @theme |

## CONVENTIONS

### 핵심 원칙 (반드시 준수)

1. **RSC 우선**: 모든 컴포넌트는 서버 컴포넌트 기본. `useState`/`useEffect` 필요시에만 `'use client'`
2. **Field Picking**: RSC→클라이언트 경계에서 필요한 필드만 전달. 전체 객체 직렬화 금지
3. **워터폴 제거**: 독립 fetch는 반드시 `Promise.all()`. 순차 await 금지
4. **after() 사용**: 로깅, 분석, 비중요 DB 업데이트는 `after()`로 비차단 처리
5. **깜빡임 없는 UI**: 테마/상태는 layout.tsx 인라인 스크립트로 하이드레이션 전 적용

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트/클래스 | PascalCase | `UserProfile.tsx` |
| 변수/함수 | camelCase | `getUserProfile` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 폴더 | kebab-case | `my-projects` |
| 내부 패키지 | `@ask-the-stars/*` | `@ask-the-stars/types` |

### 코드 스타일

- Prettier: 싱글 쿼트, 80자, ES5 trailing comma, LF
- `interface` (모델) vs `type` (유틸리티)
- `any` 금지 (프론트엔드). 백엔드는 DTO에서 예외적 허용
- Lucide 아이콘: `optimizePackageImports` 설정됨, 배럴 임포트 가능

### 상태 관리

- **Zustand**: 도메인별 스토어 분리 (`useAuthStore`, `useProjectStore`)
- **TanStack Query**: 서버 상태. `libs/api-client` 래퍼 사용, `queryKeys` 상수 관리
- **직접 fetch 금지** → API 래퍼 사용

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
- Controller에 비즈니스 로직 금지 → Service로 분리
- Service에서 직접 Prisma 호출 지양 → Repository 패턴 권장
- `localStorage` 직접 호출 지양 → 캐시 래퍼 사용
- 암시적 0 렌더링 (`{count && ...}`) 금지

## COMMANDS

```bash
# 개발
pnpm dev                    # 전체 앱 동시 실행 (web:3000, api:4000)
pnpm dev --filter=web       # 프론트엔드만
pnpm dev --filter=api       # 백엔드만

# 빌드 & 테스트
pnpm build                  # 전체 빌드 (Turborepo)
pnpm test                   # 전체 테스트
pnpm lint                   # 린트 (web은 현재 스킵 - ESLint 9 호환성)
pnpm format                 # Prettier 포맷

# 데이터베이스
pnpm db:generate            # Prisma 클라이언트 생성
pnpm db:migrate             # 마이그레이션 실행
pnpm db:studio              # Prisma Studio 열기

# Docker (로컬 DB)
docker-compose up -d        # PostgreSQL 17 + Redis 7.4
```

## INFRA

| 서비스 | 용도 | 리전 |
|--------|------|------|
| Vercel | 프론트엔드 호스팅 | 서울 PoP |
| Cloud Run | 백엔드 API | 서울 asia-northeast3 |
| Supabase | PostgreSQL + Auth | 서울 ap-northeast-2 |
| Upstash | Redis 캐시 | 도쿄 |
| Cloudflare Stream | 영상 스트리밍 | CDN |
| Cloudflare R2 | 오브젝트 스토리지 | CDN |
| Sentry | 에러 추적 | - |

## NOTES

- **Node 버전 불일치**: CI는 Node 20, cd-web/Dockerfile은 Node 22. 주의
- **웹 린트 스킵됨**: ESLint 9 + Next.js 16 호환성 이슈로 임시 비활성화
- **React Compiler**: next.config.ts에 주석 처리됨 (플러그인 미설치)
- **루트 Dockerfile**: 진단용 컨테이너. 프로덕션용 아님
- **수동 배포 스크립트**: `scripts/deploy-cloud-run.sh`는 GCR 사용 (워크플로우는 Artifact Registry)
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `refactor:` 등 사용
- 성능 최적화 상세 → `docs/04-development/react-performance-rules.md`
- 코드 리뷰 체크리스트 → `.agent/workflows/code-review.md`

---

*Stay Agentic. Optimize Everything.*
