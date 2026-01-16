---
trigger: /feature-dev
description: Feature Development Workflow
turboAll: true
---

# 기능 개발 워크플로우 (Feature Development SOP)

> 새로운 기능을 개발할 때 반드시 이 절차를 따르십시오.

## 1단계: 분석 (Analyze)

### 수행 작업

- [ ] 사용자 요청 분석
- [ ] `.context/product/requirements.md` 참조
- [ ] `.context/architecture/system.md`에서 영향 범위 파악
- [ ] 기존 코드베이스 탐색

### 산출물

- 영향받는 파일 목록
- 예상 작업 범위

---

## 2단계: 계획 (Plan)

### 수행 작업 (Plan)

- [ ] 구현 계획서 작성
- [ ] 테스트 전략 수립
- [ ] 롤백 계획 준비

### 산출물 (Plan)

- `artifacts/plans/YYYY-MM-DD_feature-name.md`
- 자동 승인 후 진행

---

## 3단계: 구현 (Implement)

### 수행 작업 (Implement)

- [ ] 테스트 케이스 먼저 작성 (TDD)
- [ ] 코드 구현
- [ ] `.agent/rules/style.md` 준수
- [ ] 단위 테스트 실행

### 커밋 규칙

- `.agent/skills/git-commit/SKILL.md` 참조
- 작은 단위로 자주 커밋

---

## 4단계: 검증 (Verify)

### 수행 작업 (Verify)

- [ ] 전체 테스트 스위트 실행
- [ ] 브라우저 에이전트로 UI 검증 (해당 시)
- [ ] 스크린샷 캡처

### 산출물 (Verify)

- `artifacts/verification/YYYY-MM-DD_feature-name/`
  - 스크린샷
  - 테스트 결과 로그

---

## 5단계: 문서화 (Document)

### 수행 작업 (Document)

- [ ] 변경 사항 기록
- [ ] API 문서 업데이트 (해당 시)
- [ ] 작업 로그 작성

### 산출물 (Document)

- `docs/korean_logs/YYYY-MM-DD_feature-name.md`
- 관련 `.context/` 문서 업데이트
