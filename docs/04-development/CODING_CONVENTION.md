# 📏 코딩 컨벤션 (Coding Convention)

> **문서 버전**: 2026-01-19
> **기반**: Next.js 15 (Frontend) / NestJS 11 (Backend)

---

## 1️⃣ General

### Naming
*   **컴포넌트/클래스**: `PascalCase` (예: `UserProfile.tsx`, `AuthService.ts`)
*   **변수/함수**: `camelCase` (예: `getUserProfile`, `isActive`)
*   **상수**: `UPPER_SNAKE_CASE` (예: `MAX_RETRY_COUNT`)
*   **폴더**: `kebab-case` 권장 (단, Next.js App Router 폴더는 라우팅 규칙 따름)

### TypeScript
*   **any 사용 금지**: 명시적 타입 정의 필수 (`unknown` 사용 권장)
*   **Interface vs Type**: 확장 가능성이 있는 모델 정보는 `interface`, 유틸리티 타입은 `type` 권장
*   **Strict Mode**: `strict: true` 필수 설정

---

## 2️⃣ Frontend (Next.js 15 + React 19)

### Component Patterns
*   **Server Components 기본**: 가능한 모든 컴포넌트는 서버 컴포넌트로 작성
*   **Client Components 명시**: `useState`, `useEffect`가 필요한 경우 최상단에 `'use client'` 지시어 추가
*   **Hook 기반 아키텍처**: 비즈니스 로직은 `hooks/` 폴더로 분리

### State Management (Zustand)
*   스토어는 도메인 단위로 분리 (예: `useAuthStore`, `useProjectStore`)
*   Action과 State를 명확히 구분

### Data Fetching (TanStack Query)
*   직접 `fetch` 사용 지양 -> `libs/api-client` 래퍼 사용
*   Query Key는 `queryKeys` 상수로 관리

---

## 3️⃣ Backend (NestJS 11)

### Architecture (Module)
*   **Modules**: 도메인별 모듈 분리 (`AuthModule`, `UserModule`)
*   **Controller**: 라우팅 및 요청/응답 처리만 담당 (비즈니스 로직 금지)
*   **Service**: 순수 비즈니스 로직 구현
*   **Repository**: Prisma 접근 로직 캡슐화 (Service에서 직접 Prisma 호출 지양)

### DTO (Data Transfer Object)
*   `class-validator` 데코레이터를 사용하여 철저한 입력값 검증
*   Request/Response DTO 분리 (`CreateUserDto` vs `UserResponseDto`)

---

## 4️⃣ Styling (TailwindCSS)
*   `cx` 또는 `cn` 유틸리티 사용하여 클래스 병합
*   매직 넘버(임의 픽셀값) 지양, 디자인 시스템 토큰 사용
*   `className` 순서는 Layout -> Box Model -> Typography -> Visual 순 권장
