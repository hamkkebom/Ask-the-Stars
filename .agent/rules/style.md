---
description: Coding Style Guidelines
alwaysOn: true
---

# 📐 코딩 스타일 가이드 (Style Guide)

> **별들에게 물어봐** 프로젝트 코딩 스타일

## 일반 원칙

### 명명 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | `camelCase` | `userName`, `handleClick` |
| 컴포넌트/클래스 | `PascalCase` | `UserProfile`, `AuthService` |
| 상수 | `SCREAMING_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| 파일 (컴포넌트) | `kebab-case` | `video-player.tsx` |
| Prisma 모델 | `PascalCase` | `User`, `Project` |

### 코드 품질

- 함수는 단일 책임 원칙 준수
- 매직 넘버 사용 금지 → 상수로 정의
- 중복 코드 최소화

---

## TypeScript/JavaScript

### 스타일

| 규칙 | 설정 |
|------|------|
| 세미콜론 | ✅ 사용 |
| 문자열 | 작은따옴표 `'` |
| 들여쓰기 | 2 spaces |
| 줄 길이 | 최대 100자 |
| 후행 쉼표 | ES5 |

### 타입

- ❌ `any` 사용 금지
- ✅ 명시적 타입 선언
- ✅ 인터페이스 > 타입 (확장 가능한 경우)

### 예시

```typescript
// ✅ 좋은 예
interface UserProfile {
  id: string;
  name: string;
  role: 'STAR' | 'COUNSELOR' | 'MOON';
}

function getUserById(id: string): Promise<UserProfile> {
  // ...
}

// ❌ 나쁜 예
function getUser(id: any): any {
  // ...
}
```

---

## React/Next.js

### 컴포넌트 구조

```typescript
// 1. imports
import { useState } from 'react';

// 2. 타입 정의
interface Props {
  title: string;
}

// 3. 컴포넌트
export function MyComponent({ title }: Props) {
  // 3-1. 상태
  const [count, setCount] = useState(0);
  
  // 3-2. 핸들러
  const handleClick = () => {};
  
  // 3-3. 렌더링
  return <div>{title}</div>;
}
```

### 훅 규칙

- `use` 접두사 필수
- 최상위에서만 호출
- 조건문/반복문 내에서 호출 금지

---

## NestJS

### 모듈 구조

```
modules/auth/
├── auth.module.ts
├── auth.controller.ts
├── auth.service.ts
├── dto/
└── guards/
```

### 의존성 주입

```typescript
// ✅ 생성자 주입 (권장)
constructor(private readonly authService: AuthService) {}

// ❌ 필드 주입 (금지)
@Inject(AuthService) authService: AuthService;
```

---

## Prisma

### 모델 명명

```prisma
model User {
  id    String @id @default(uuid())
  email String @unique
  
  @@map("users")  // 테이블명은 snake_case
}
```

---

## 주석 규칙

```typescript
// 한 줄 주석: 왜 이 코드가 필요한지 설명

/**
 * 함수 설명
 * @param id - 사용자 ID
 * @returns 사용자 정보
 */

// TODO: 나중에 구현
// FIXME: 수정 필요
// HACK: 임시 해결책
```

---

## 도구

### Prettier

```bash
pnpm format  # 전체 포맷팅
```

### ESLint

```bash
pnpm lint      # 검사
pnpm lint:fix  # 자동 수정
```
