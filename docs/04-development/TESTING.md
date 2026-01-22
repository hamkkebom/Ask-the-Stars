# 🧪 테스트 가이드 (Testing Guide)

> **문서 버전**: 2026-01-19
> **기반**: `docs/02-architecture/TECH_STACK.md` (Testing Tools)

함께봄 프로젝트의 코드 품질을 유지하기 위한 테스트 전략과 실행 방법을 안내합니다.

---

## 1️⃣ 테스트 도구 (Testing Tools)

| 레이어 | 도구 (Tool) | 용도 |
|---|---|---|
| **Frontend** | [Vitest](https://vitest.dev/) | 컴포넌트 단위 및 로직 테스트 |
| **Backend** | [Jest](https://jestjs.io/) | API 엔드포인트 및 비즈니스 로직 테스트 |
| **Monorepo** | [Turborepo](https://turbo.build/repo) | 전체 테스트 파이프라인 관리 |

---

## 2️⃣ 테스트 실행 방법 (Execution)

### 전체 테스트 실행 (Monorepo)
```bash
pnpm test
```

### 개별 앱 테스트 실행
```bash
# Frontend 테스트
pnpm test --filter=web

# Backend 테스트
pnpm test --filter=api
```

---

## 3️⃣ 테스트 전략 (Strategy)

### Unit Testing (단위 테스트)
*   **적용**: 유틸리티 함수, 순수 비즈니스 로직(Service), UI 컴포넌트(State-less)
*   **규칙**: 의존성(DB, External API)은 반드시 Mocking 처리합니다.

### Integration Testing (통합 테스트)
*   **적용**: API 엔드포인트, DB 연동 로직(Prisma)
*   **규칙**: 실제 (또는 테스트 전용) 데이터베이스와 통신하여 데이터 정합성을 검증합니다.

### CI (Continuous Integration)
*   GitHub PR 생성 시 자동으로 `pnpm test`가 실행됩니다.
*   테스트 실패 시 머지(Merge)가 차단됩니다.

---

## 4️⃣ 작성 규칙 (Conventions)

*   **파일 위치**: `[filename].spec.ts` 또는 `[filename].test.ts` 형식을 따르며, 대상 파일과 동일한 위치 또는 `__tests__` 폴더에 배치합니다.
*   **구조**: `describe` (대상) -> `it/test` (상황) -> `expect` (기대 결과) 순서로 작성합니다.

```typescript
describe('AuthService', () => {
  it('should generate a valid JWT token', () => {
    // ... test code
    expect(token).toBeDefined();
  });
});
```
