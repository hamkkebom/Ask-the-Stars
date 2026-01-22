# 🚀 Vercel Agent Skills 통합 계획서 (최종본)

> **작성일**: 2026-01-22  
> **대상 프로젝트**: 별들에게 물어봐 (Ask the Stars)  
> **분석 기반**: `agent-skills-main/skills/react-best-practices` (45규칙) + `web-design-guidelines` (100+규칙)  
> **분석 방법**: Sequential Thinking을 활용한 체계적 분석

---

## 📋 Executive Summary

Vercel Labs의 Agent Skills 저장소를 철저히 분석하고 현재 프로젝트와 비교한 결과, **즉시 적용해야 할 CRITICAL 이슈 3건**과 **점진적 개선이 필요한 항목 15건**을 식별했습니다.

### 🔴 즉시 조치 필요 (CRITICAL)

| 항목 | 영향도 | 현재 상태 | 예상 개선 효과 |
|------|:------:|:---------:|---------------|
| `optimizePackageImports` 설정 | CRITICAL | ❌ 미적용 | Cold Start 40% 단축 |
| `prefers-reduced-motion` 지원 | HIGH | ❌ 0건 | 접근성 준수 |
| Icon 버튼 `aria-label` | HIGH | ⚠️ 1건만 | 스크린리더 호환 |

---

## 📊 분석 결과: 현재 프로젝트 상태

### ✅ 이미 잘 되어 있는 것

| 항목 | 발견 건수 | 평가 |
|------|:---------:|:----:|
| `focus-visible` 스타일 | 16+ | ✅ 양호 |
| `alt` 속성 (이미지) | 다수 | ✅ 양호 |
| Next.js Image 컴포넌트 | 다수 | ✅ 양호 |

### ❌ 개선이 필요한 것

| 항목 | 발견 건수 | 권장 조치 |
|------|:---------:|----------|
| `lucide-react` barrel import | 56+ 파일 | `optimizePackageImports` 설정 |
| `prefers-reduced-motion` | 0건 | 글로벌 CSS 추가 |
| `content-visibility` | 0건 | 긴 리스트에 적용 |
| `tabular-nums` | 0건 | 숫자 테이블에 적용 |
| `aria-label` (아이콘 버튼) | 1건 | 모든 아이콘 버튼에 추가 |
| `next/dynamic` 사용 | 0건 | 무거운 컴포넌트에 적용 |

---

## 🎯 Phase 1: 즉시 적용 (CRITICAL) - 1일

### 1.1 Bundle Size 최적화: `optimizePackageImports`

**문제**: 56개 이상의 파일에서 `lucide-react`를 barrel 방식으로 import 중

```typescript
// ❌ 현재: 1,583개 모듈 로드 (200-800ms 추가)
import { Check, X, Menu, Settings, User } from 'lucide-react'
```

**해결책**: `apps/web/next.config.ts` 수정

```typescript
const nextConfig: NextConfig = {
  // 기존 설정 유지
  images: {
    formats: ['image/avif', 'image/webp'],
    // ...
  },
  
  // 추가
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
      '@radix-ui/react-icons',
    ],
  },
};
```

**예상 효과**:
- 개발 서버 부팅: 15-70% 빨라짐
- 프로덕션 Cold Start: 40% 단축
- HMR 속도: 눈에 띄게 개선

**관련 규칙**: `bundle-barrel-imports.md`

---

### 1.2 접근성: `prefers-reduced-motion` 지원

**문제**: 애니메이션 민감 사용자를 위한 모션 감소 설정 미지원

**해결책**: `apps/web/src/app/globals.css`에 추가

```css
/* 모션 감소 선호 사용자를 위한 스타일 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**관련 규칙**: `web-design-guidelines > Animation`

---

### 1.3 접근성: 아이콘 버튼 `aria-label`

**문제**: 현재 1개 버튼에만 aria-label 적용됨

**점검 대상 컴포넌트**:
- 사이드바 토글 버튼
- 모달 닫기 버튼 (X)
- 삭제/편집/설정 아이콘 버튼

**해결책 예시**:

```tsx
// ❌ 현재
<button onClick={onClose}>
  <X className="h-4 w-4" />
</button>

// ✅ 수정
<button onClick={onClose} aria-label="닫기">
  <X className="h-4 w-4" />
</button>
```

**관련 규칙**: `web-design-guidelines > Anti-patterns`

---

## 🔧 Phase 2: 성능 최적화 (HIGH) - 1주

### 2.1 Dynamic Import 적용

**대상**: 초기 로딩에 필수가 아닌 무거운 컴포넌트

| 컴포넌트 | 추정 크기 | 적용 방법 |
|----------|:---------:|----------|
| `framer-motion` 애니메이션 | ~50KB | `next/dynamic` |
| 차트 컴포넌트 | ~100KB | 조건부 로드 |
| 모달/다이얼로그 | 다양 | 사용자 액션 시 로드 |
| 에디터 (있다면) | ~300KB | `next/dynamic` with `ssr: false` |

**구현 예시**:

```tsx
import dynamic from 'next/dynamic';

// 무거운 모션 컴포넌트 lazy load
const AnimatedSection = dynamic(
  () => import('@/components/animated-section'),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse h-64 bg-muted rounded" />
  }
);

// 차트 컴포넌트 (사용자 액션 시)
const Chart = dynamic(
  () => import('recharts').then(m => m.AreaChart),
  { ssr: false }
);
```

**관련 규칙**: `bundle-dynamic-imports.md`, `bundle-defer-third-party.md`

---

### 2.2 긴 리스트 최적화: `content-visibility`

**대상 페이지**:
- `/admin/stars` (프리랜서 목록)
- `/videos` (영상 목록)
- `/news` (뉴스 목록)

**구현**:

```css
/* globals.css 또는 컴포넌트 CSS */
.list-item-optimized {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px; /* 예상 높이 */
}
```

```tsx
// 사용 예시
{items.map(item => (
  <div key={item.id} className="list-item-optimized">
    <ItemCard {...item} />
  </div>
))}
```

**예상 효과**: 1000개 아이템 → 990개 off-screen 렌더링 스킵 (10배 빠른 초기 렌더)

**관련 규칙**: `rendering-content-visibility.md`

---

### 2.3 Suspense Boundaries 전략적 배치

**현재**: 전체 페이지 단위 로딩 상태

**개선**: 섹션별 독립 로딩

```tsx
// ❌ 현재 패턴
async function DashboardPage() {
  const data = await fetchAllData(); // 전체 블로킹
  return <Dashboard data={data} />;
}

// ✅ 개선된 패턴
function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartSection />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RecentActivitySection />
      </Suspense>
    </div>
  );
}
```

**관련 규칙**: `async-suspense-boundaries.md`

---

### 2.4 Promise.all을 통한 병렬 데이터 페칭

**점검 대상**: 데이터 페칭이 많은 페이지

```typescript
// ❌ 순차 실행 (느림)
const user = await fetchUser();
const projects = await fetchProjects();
const notifications = await fetchNotifications();

// ✅ 병렬 실행 (빠름)
const [user, projects, notifications] = await Promise.all([
  fetchUser(),
  fetchProjects(),
  fetchNotifications(),
]);
```

**관련 규칙**: `async-parallel.md`, `async-api-routes.md`

---

## 🎨 Phase 3: Re-render 최적화 (MEDIUM) - 2주

### 3.1 Lazy State Initialization

**점검 대상**: `useState`에서 복잡한 초기값 사용하는 경우

```typescript
// ❌ 매 렌더마다 실행
const [data, setData] = useState(expensiveComputation());
const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings') || '{}'));

// ✅ 초기화 시 한 번만 실행
const [data, setData] = useState(() => expensiveComputation());
const [settings, setSettings] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('settings') || '{}');
  } catch {
    return {};
  }
});
```

**관련 규칙**: `rerender-lazy-state-init.md`

---

### 3.2 Functional setState 패턴

**stale closure 방지 및 안정적인 콜백**:

```typescript
// ❌ items 변경 시 콜백 재생성
const addItem = useCallback((item: Item) => {
  setItems([...items, item]);
}, [items]);

// ✅ 안정적인 콜백 (의존성 없음)
const addItem = useCallback((item: Item) => {
  setItems(prev => [...prev, item]);
}, []);
```

**관련 규칙**: `rerender-functional-setstate.md`

---

### 3.3 숫자 표시 최적화: `tabular-nums`

**대상**: 통계, 가격, 카운터 등 숫자가 나열되는 곳

```css
/* globals.css */
.tabular-numbers {
  font-variant-numeric: tabular-nums;
}
```

```tsx
<td className="tabular-numbers">{formatPrice(amount)}</td>
<span className="tabular-numbers">{count}</span>
```

**관련 규칙**: `web-design-guidelines > Typography`

---

## ♿ Phase 4: 웹 접근성 & UX 감사 (지속)

### 4.1 폼 최적화

| 체크 항목 | 설명 |
|----------|------|
| `autocomplete` 속성 | 이메일, 이름, 전화번호 등에 적절한 값 |
| `inputmode` 속성 | 숫자 입력에 `numeric`, 이메일에 `email` |
| 에러 메시지 | 인라인으로 필드 옆에 표시 |
| `spellCheck={false}` | 이메일, 코드, 사용자명 입력 필드 |

```tsx
<input
  type="email"
  inputMode="email"
  autoComplete="email"
  spellCheck={false}
  aria-describedby="email-error"
/>
{errors.email && <p id="email-error" className="text-red-500">{errors.email}</p>}
```

**관련 규칙**: `web-design-guidelines > Forms`

---

### 4.2 터치 & 인터랙션

```css
/* 권장 설정 */
button, a {
  touch-action: manipulation; /* 더블탭 줌 방지 */
  -webkit-tap-highlight-color: transparent;
}

.modal, .drawer, .sheet {
  overscroll-behavior: contain; /* 스크롤 전파 방지 */
}
```

**관련 규칙**: `web-design-guidelines > Touch & Interaction`

---

### 4.3 다크 모드 최적화

```tsx
// layout.tsx
<html className="dark" style={{ colorScheme: 'dark' }}>
  <head>
    <meta name="theme-color" content="#0a0a0a" />
  </head>
  ...
</html>
```

**관련 규칙**: `web-design-guidelines > Dark Mode & Theming`

---

### 4.4 Anti-patterns 점검 리스트

프로젝트에서 다음 패턴을 찾아 수정:

| Anti-pattern | 점검 방법 |
|--------------|----------|
| `outline-none` without focus replacement | `grep -r "outline-none"` |
| `transition: all` | `grep -r "transition: all"` |
| `onPaste` + `preventDefault` | `grep -r "onPaste"` |
| Images without dimensions | `<img>` 태그에 width/height 확인 |
| Icon buttons without `aria-label` | 아이콘만 있는 버튼 점검 |
| Large arrays without virtualization | 50개 이상 아이템 `.map()` |

---

## 📁 권장 프로젝트 구조

### Agent Skills를 프로젝트에 통합

```
.agent/
├── skills/
│   ├── react-best-practices/  ← agent-skills-main에서 복사
│   │   ├── SKILL.md
│   │   ├── AGENTS.md
│   │   └── rules/
│   │       ├── async-parallel.md
│   │       ├── bundle-barrel-imports.md
│   │       └── ... (53개 규칙)
│   └── web-design-guidelines/
│       └── SKILL.md
└── workflows/
    ├── bug-fix.md
    └── feature-dev.md
```

**복사 명령**:
```bash
mkdir -p .agent/skills
cp -r agent-skills-main/skills/react-best-practices .agent/skills/
cp -r agent-skills-main/skills/web-design-guidelines .agent/skills/
```

---

## ✅ 실행 체크리스트

### Phase 1: 즉시 (CRITICAL) - 1일
- [x] `next.config.ts`에 `optimizePackageImports` 추가
- [x] `globals.css`에 `prefers-reduced-motion` 미디어 쿼리 추가
- [x] 주요 아이콘 버튼에 `aria-label` 추가

### Phase 2: 성능 최적화 (HIGH) - 1주
- [x] `PortfolioGrid`의 Modal 등 무거운 컴포넌트에 `next/dynamic` 적용
- [x] 긴 리스트에 `content-visibility: auto` 적용 (advanced-video-grid.tsx)
- [x] 대시보드 페이지에 `loading.tsx` (Suspense) 추가
- [x] 대규모 Mock 데이터 분리 및 컴포넌트 경량화 (`AdvancedVideoGrid` 리팩토링)

### Phase 3: Re-render 최적화 (MEDIUM) - 2주
- [x] 숫자 표시에 `tabular-nums` 적용 (PortfolioCard, earnings)
- [x] `useState` lazy initialization 점검 (대상 없음 확인)
- [x] 리스트 컴포넌트(`CompactVideoCard`, `PortfolioCard`)에 `React.memo()` 및 커스텀 비교 적용
- [x] `useCallback` 의존성 최적화 (`React.memo` 비교 함수 활용으로 대체)

### Phase 4: 접근성 & UX (지속)
- [x] 폼 `autocomplete`, `inputmode` 추가 (Login, Signup, Search)
- [x] 터치 최적화 CSS 적용 (`touch-action: manipulation`)
- [x] Anti-patterns 점검 및 수정 (완료)
- [ ] Lighthouse 접근성 점수 90+ 달성 (추후 검증)

---

## 📚 참조 자료

### React Best Practices
- **전체 규칙 (69KB)**: `agent-skills-main/skills/react-best-practices/AGENTS.md`
- **개별 규칙**: `agent-skills-main/skills/react-best-practices/rules/*.md`
- **규칙 목록**: `agent-skills-main/skills/react-best-practices/SKILL.md`

### Web Design Guidelines
- **스킬 정의**: `agent-skills-main/skills/web-design-guidelines/SKILL.md`
- **원본 가이드라인**: https://github.com/vercel-labs/web-interface-guidelines

### Vercel 공식 자료
- [How We Optimized Package Imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [How We Made the Vercel Dashboard Twice as Fast](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
- [Introducing React Best Practices](https://vercel.com/blog/introducing-react-best-practices)

---

## 📈 예상 성과

| 메트릭 | 현재 (추정) | 목표 | 개선율 |
|--------|:-----------:|:----:|:------:|
| Dev 서버 부팅 | 8초 | 4초 | 50% ↓ |
| Cold Start | 2초 | 1.2초 | 40% ↓ |
| LCP | 2.5초 | 1.8초 | 28% ↓ |
| Lighthouse 접근성 | 80점 | 95점 | 19% ↑ |
| Bundle Size | 500KB | 350KB | 30% ↓ |
