# AGENTS.md

안녕하세요, 에이전트님. 이 문서는 **한깨봄-스타(Hankaebom-Star)** 프로젝트를 작업할 때 필요한 맥락과 기술 표준을 제공합니다. 높은 코드 품질과 성능을 유지하기 위해 다음 규칙을 준수해 주세요.

## 프로젝트 비전
한깨봄-스타는 "사주청궁"을 위한 고성능 영상 협업 플랫폼입니다. 프리미엄 UX와 에이전트 친화적인 아키텍처를 지향합니다.

## 엔지니어링 표준
상세한 구현 규칙은 [code-patterns.md](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/docs/code-patterns.md)를 참조하세요.

### 성능 최적화 상세 룰
CRITICAL/HIGH 우선순위 룰은 [react-performance-rules.md](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/docs/04-development/react-performance-rules.md)를 참조하세요.

### 워크플로우
- [코드 리뷰 체크리스트](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/.agent/workflows/code-review.md)
- [성능 감사 가이드](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/.agent/workflows/performance-audit.md)

### 핵심 원칙
1. **RSC 우선**: 리액트 서버 컴포넌트를 우선적으로 사용합니다. "Field Picking"을 통해 경계에서의 직렬화를 최소화하세요.
2. **깜빡임 없는 UI**: 하이드레이션 전에 적용되어야 하는 테마/상태는 `layout.tsx`의 스크립트 주입을 사용합니다.
3. **렌더링 최적화**: 
   - 무거운 리스트 아이템에는 `memo()`를 사용합니다.
   - 암시적인 0 렌더링(`{count && ...}`)을 피하세요.
   - 이펙트 의존성은 원시 타입으로 범위를 좁힙니다.
4. **비차단 부수 효과**: 로깅, 분석, 비중요 DB 업데이트에는 Next.js 15의 `after()`를 사용합니다.
5. **현대적 JS**: 성능이 중요한 루프에서는 O(1) 조회를 위해 `Set`/`Map`을 사용합니다.

## 기술 스택
- **프레임워크**: Next.js 15+ (App Router)
- **UI**: React 19, Tailwind CSS 4, Framer Motion
- **상태 관리**: Zustand, TanStack Query
- **아이콘**: Lucide React (서브경로 임포트 권장)

## 작업 현황
진행 상황은 [task.md](file:///C:/Users/이경수/.gemini/antigravity/brain/1aec2539-3c3f-4c59-82e8-ead2fe041541/task.md)에서 확인하세요.

---
*Stay Agentic. Optimize Everything.*
