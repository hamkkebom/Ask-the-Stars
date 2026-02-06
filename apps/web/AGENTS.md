# Frontend (Next.js 15)

## OVERVIEW
Next.js 15 App Router + React 19 프론트엔드. 49 페이지, 47 컴포넌트, Tailwind CSS v4.

## ROUTING

Route Group 레이아웃 구조:

| Group | 경로 | Layout | 용도 |
|-------|------|--------|------|
| `(public)` | /videos, /stars, /about | SimpleHeader + MainFooter + FloatingCTA | 공개 페이지 |
| `(dashboard)` | /stars/* | Sidebar + Header | 프리랜서 대시보드 |
| `(admin)` | /admin/* | AdminSidebar + Breadcrumbs | 관리자 |
| `auth` | /auth/* | Centered card + gradient | 인증 (login, signup, reset) |
| root | / | VibrantHero + VideoGrid | 홈 |

동적 라우트: `/videos/[id]`, `/stars/my-projects/detail/[id]`, `/admin/stars/reviews/[id]`, `/videos/category/[slug]`

## COMPONENTS

```
src/components/
├── ui/            # 16개: button, card, glass-card, modal, skeleton, toast, breadcrumb, file-uploader, stream-uploader...
├── sections/      # 8개: vibrant-hero, advanced-video-grid (589줄), category-swimlane, filterable-video-grid, testimonials...
├── features/      # portfolio (Card, Grid, EditorModal, DetailModal), leads (lead-form)
├── layout/        # simple-header, main-footer, award-header (451줄), page-transition
├── player/        # StreamPlayer (Plyr + HLS.js)
├── feedback/      # feedback-panel, annotation-canvas (418줄, Fabric.js)
├── upload/        # StreamUploader (Cloudflare Stream tus 업로드)
├── video/         # video-player
├── dashboard/     # star-dashboard
├── notifications/ # NotificationBell (Socket.io)
├── providers/     # auth-provider (Supabase 세션)
├── studio/        # StudioHeader, StudioSidebar
├── seo/           # json-ld (구조화 데이터)
└── common/        # EmptyState, file-uploader
```

## DATA LAYER

```
src/lib/
├── api/           # axios 기반 API 래퍼 (14 모듈: auth, videos, projects, admin, earnings...)
│   ├── axios.ts   # baseURL, 인터셉터, 토큰 주입
│   └── index.ts   # 전체 export
├── hooks/         # TanStack Query 커스텀 훅 (useAuth, useVideos, useProjects, useNotifications)
├── supabase/      # client.ts, server.ts, middleware.ts (세션 관리)
├── validation/    # Zod 스키마
└── utils/         # video-url 등
```

## WHERE TO LOOK

| 작업 | 위치 |
|------|------|
| API 호출 추가 | `src/lib/api/` → 새 모듈 파일 + hooks에 Query 래퍼 |
| Zustand 스토어 | `src/store/useAuthStore.ts` (현재 auth만) |
| Supabase 클라이언트 | `src/lib/supabase/` (client, server, middleware) |
| 글로벌 Provider | `src/app/providers.tsx` (QueryClient, MotionConfig) |
| 페이지 전환 | `src/app/template.tsx` (PageTransition) |
| 에러 처리 | `src/app/error.tsx`, `not-found.tsx` |
| 미들웨어 | `src/middleware.ts` (Supabase 세션 refresh) |
| 글로벌 CSS | `src/app/globals.css` (Tailwind v4 @theme, 125줄) |

## ANTI-PATTERNS (웹 전용)

- Sequential await 금지 → `Promise.all()` 사용
- RSC에서 `.toSorted()`, `.filter()` 후 클라이언트 전달 금지 (중복 직렬화)
- `{count && <Component />}` 금지 → 삼항 연산자 사용
- SVG 직접 애니메이션 금지 → div 래퍼 사용
- `localStorage` 직접 호출 금지 → 캐시 래퍼 사용
- Server Action 인증 체크 누락 금지

## NOTES

- **린트 비활성화**: ESLint 9 + Next.js 호환성 이슈로 임시 스킵
- **React Compiler**: 주석 처리 (babel-plugin-react-compiler 미설치)
- **테스트**: Vitest + jsdom. `src/test/setup.ts`. 커버리지 94.72%
- **이미지 최적화**: AVIF/WebP, remotePatterns: R2/Stream/Supabase/DiceBear/Unsplash
- **패키지 최적화**: lucide-react, framer-motion, date-fns, @radix-ui, socket.io-client
- **transpilePackages**: @ask-the-stars/ui, types, utils
- **serverExternalPackages**: @supabase/supabase-js
