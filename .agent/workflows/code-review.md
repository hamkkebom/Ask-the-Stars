---
description: React/Next.js 코드 리뷰 체크리스트
---

# 코드 리뷰 워크플로우

React/Next.js 코드 리뷰 시 참조하는 체크리스트입니다.

## 1. 필수 확인 사항 (CRITICAL)

- [ ] **워터폴 패턴**: 독립적인 fetch가 순차 실행되고 있지 않은가?
  - `Promise.all()` 사용 권장
- [ ] **배럴 임포트**: lucide-react, @mui/material 등에서 직접 임포트 사용?
  - `optimizePackageImports` 설정 또는 서브경로 임포트
- [ ] **RSC 경계**: 클라이언트 컴포넌트에 불필요한 데이터 전달하지 않는가?
  - Field Picking 패턴 적용

## 2. 권장 확인 사항 (HIGH)

- [ ] **`after()` 사용**: 로깅/분석이 응답을 차단하지 않는가?
- [ ] **React.cache()**: 동일 요청 내 중복 fetch 방지
- [ ] **Suspense 경계**: 콘텐츠 스트리밍 활용

## 3. 검토 사항 (MEDIUM)

- [ ] **useEffect 의존성**: 객체 대신 원시 타입 사용
- [ ] **lazy state init**: `useState(() => ...)` 패턴
- [ ] **조건부 렌더링**: `&&` 대신 삼항 연산자 사용

## 4. 참조 문서

- [react-performance-rules.md](../docs/04-development/react-performance-rules.md)
- [code-patterns.md](../docs/code-patterns.md)
