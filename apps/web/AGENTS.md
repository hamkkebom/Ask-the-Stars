# Frontend (Next.js 15)

## OVERVIEW
Next.js 15 App Router + React 19 프론트엔드. 47 페이지, 46 컴포넌트, Tailwind CSS v4.

## ROUTING

Route Group 레이아웃 구조:

| Group | 경로 | Layout | 용도 |
|-------|------|--------|------|
| `(public)` | /videos, /stars | SimpleHeader + MainFooter + FloatingCTA | 공개 페이지 |
| `(dashboard)` | /stars/* | Sidebar + Header | 프리랜서 대시보드 |
| `(admin)` | /admin/* | AdminSidebar + Breadcrumbs | 관리자 |
| `auth` | /auth/* | Centered card + gradient | 인증 |
| root | / | VibrantHero + VideoGrid | 홈 |

주요 동적 라우트: `/videos/[id]`, `/stars/my-projects/detail/[id]`, `/admin/stars/reviews/[id]`, `/videos/category/[slug]`

## COMPONENTS

```
src/components/
├── ui/          # 16개: button, card, glass-card, modal, skeleton, toast, breadcrumb...
├── sections/    # 8개: vibrant-hero, advanced-video-grid, category-swimlane, testimonials...
├── features/    # portfolio (Card, Grid, EditorModal, DetailModal), leads (lead-form)
├── layout/      # simple-header, main-footer, award-header, page-transition
├── player/      # StreamPlayer (Plyr + HLS.js)
├── feedback/    # feedback-panel, annotation-canvas (Fabric.js)
├── upload/      # StreamUploader (Cloudflare Stream 직접 업로드)
├── video/       # video-player
├── dashboard/   # star-dashboard
├── notifications/ # NotificationBell
├── providers/   # auth-provider
├── studio/      # StudioHeader, StudioSidebar
├── seo/         # json-ld
└── common/      # EmptyState, file-uploader
```

## CONVENTIONS

- **RSC 기본**: `'use client'`는 useState/useEffect 필요시에만
- **Field Picking**: RSC→Client 경계에서 필요 필드만 전달
- **Providers**: `src/app/providers.tsx`에서 QueryClient, MotionConfig 제공
- **Template**: `src/app/template.tsx`에서 PageTransition 래핑
- **글로벌 에러**: `error.tsx` + `not-found.tsx`
- **테마**: layout.tsx 인라인 스크립트로 FOUC 방지
- **영상 플레이어**: Plyr + HLS.js (Cloudflare Stream signed URL)
- **Canvas 마킹**: Fabric.js 기반 피드백 시스템
- **디자인 시스템**: `.glass`, `.glass-hover` 글래스모피즘, Deep Slate 배경

## WHERE TO LOOK

| 작업 | 위치 |
|------|------|
| API 호출 | `src/lib/api/` (TanStack Query 래퍼) |
| 커스텀 훅 | `src/hooks/` |
| Zustand 스토어 | `src/store/` |
| Supabase 클라이언트 | `src/lib/supabase/` |
| 유틸리티 | `src/lib/utils/` |
| 타입 정의 | `src/types/` |
| 글로벌 CSS/토큰 | `src/app/globals.css` |
| 미들웨어 | `src/middleware.ts` (Supabase 세션) |

## ANTI-PATTERNS

- Sequential await 금지 → `Promise.all()` 사용
- RSC에서 `.toSorted()`, `.filter()` 후 클라이언트 전달 금지 (중복 직렬화)
- `useEffect` 의존성에 객체 전달 금지 → 원시 타입 좁히기
- `{count && <Component />}` 금지 → 삼항 연산자 사용
- SVG 직접 애니메이션 금지 → div 래퍼 사용
- `localStorage` 직접 호출 금지 → 캐시 래퍼 사용
- Server Action에 인증 체크 누락 금지

## NOTES

- **린트 비활성화**: ESLint 9 + Next.js 16 호환성 이슈로 임시 스킵
- **React Compiler**: 주석 처리됨 (babel-plugin-react-compiler 미설치)
- **테스트**: Vitest + jsdom. 테스트 파일 거의 없음 (인프라만 구축)
- **이미지 최적화**: AVIF/WebP, Cloudflare R2/Stream/Supabase/DiceBear/Unsplash 허용
- **패키지 최적화**: lucide-react, framer-motion, date-fns optimizePackageImports 설정됨
