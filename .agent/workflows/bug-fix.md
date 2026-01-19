---
trigger: /bug-fix
description: Bug Fix Workflow
turboAll: true
---

# 🐛 버그 수정 워크플로우 (Bug Fix SOP)

> 버그를 수정할 때 반드시 이 절차를 따르십시오.

---

## 1단계: 재현 (Reproduce)

### 수행 작업

- [ ] 버그 재현 경로 확보
- [ ] 재현 단계 문서화
- [ ] 스크린샷/로그 수집

### 체크

- 재현 가능한가? → 불가능하면 추가 정보 요청
- 영향 범위는? → Critical/High/Medium/Low

---

## 2단계: 분석 (Analyze)

### 수행 작업

- [ ] 원인 분석 (Root Cause Analysis)
- [ ] 관련 코드 탐색
- [ ] Sentry 에러 로그 확인

### 산출물

- 원인 분석 결과
- 수정 방안 (최소 2가지)

---

## 3단계: 테스트 케이스 작성 (Test First)

### 수행 작업

- [ ] 버그를 재현하는 **실패 테스트** 작성
// turbo
- [ ] `pnpm test` 실행하여 실패 확인

```typescript
// 예시: 버그를 증명하는 테스트
describe('Auth', () => {
  it('should not allow duplicate login', async () => {
    // 이 테스트는 버그 수정 전에는 실패해야 함
  });
});
```

---

## 4단계: 수정 (Fix)

### 수행 작업

- [ ] 최소한의 변경으로 수정
- [ ] `.agent/rules/style.md` 준수
// turbo
- [ ] `pnpm lint` 실행
// turbo
- [ ] `pnpm test` 통과 확인

### 커밋 메시지

```text
fix(module): 버그 설명

- 원인: [원인 설명]
- 해결: [해결 방법]

Closes #이슈번호
```

---

## 5단계: 검증 (Verify)

### 수행 작업

// turbo
- [ ] `pnpm build` 실행
- [ ] 수동 검증 (재현 경로 재테스트)
- [ ] 회귀 테스트

### 산출물

- `artifacts/verification/YYYY-MM-DD_bugfix-name/`

---

## 6단계: 문서화 (Document)

### 수행 작업

- [ ] 작업 로그 작성
- [ ] 필요시 문서 업데이트

### 산출물

- `docs/korean_logs/YYYY-MM-DD_bugfix-name.md`
