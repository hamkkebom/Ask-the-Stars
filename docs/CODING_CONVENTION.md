# 📏 코딩 컨벤션 (Coding Convention)

---

## 1. TypeScript (General)

- **Strict Mode**: 항상 `strict: true`를 유지합니다.
- **Naming**:
    - 변수/함수: `camelCase`
    - 클래스/인터페이스: `PascalCase`
    - 상수: `UPPER_SNAKE_CASE`
- **Imports**: 절대 경로(`@/`) 사용을 지향합니다.

## 2. NestJS (Backend)

- **Modules**: 기능 단위로 모듈을 분리합니다 (`modules/auth`, `modules/users`).
- **Dependency Injection**: 생성자 주입을 명시적으로 사용합니다.
- **DTO**: 모든 요청 데이터는 `class-validator`를 적용한 DTO로 검증합니다.
- **Prisma**: 직접적인 DB 접근보다 Repository 패턴이나 Service 계층 내 캡슐화를 권장합니다.

## 3. Next.js (Frontend)

- **React Server Components**: 기본적으로 서버 컴포넌트를 사용하고, 상호작용이 필요한 경우에만 `"use client"`를 명시합니다.
- **Tailwind CSS**: 유틸리티 클래스 순서는 자동 정렬(Prettier Plugin)을 따릅니다.
- **Components**: `export function ComponentName() {}` 형태를 선호합니다 (Named Export).

## 4. Code Style

Prettier 설정(`.prettierrc.json`)을 따릅니다.
- **Indent**: 2 spaces
- **Semi**: true
- **Single Quote**: true
