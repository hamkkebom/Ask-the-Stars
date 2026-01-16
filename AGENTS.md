---
description: Global Project Constitution
alwaysOn: true
turboAll: true
---

# 프로젝트 헌법 (Project Constitution)

> [!IMPORTANT]
> 이 파일은 모든 에이전트 작업에 **항상 적용**됩니다.

## 핵심 원칙

### 1. Context First (문맥 우선)

- 코드를 작성하기 **전** 반드시 `.context/` 디렉토리의 아키텍처와 요구사항을 참조하십시오.
- 특히 `.context/architecture/system.md`와 `.context/product/requirements.md`를 확인하십시오.

### 2. Test Driven (테스트 주도)

- 모든 기능 변경은 `tests/`에 테스트 케이스를 **먼저** 작성한 후 진행해야 합니다.
- 테스트 없는 코드는 완성된 코드가 아닙니다.

### 3. Artifacts (산출물 관리)

- 구현 계획서(Plan)는 `artifacts/plans/`에 저장하십시오.
- 검증 결과(스크린샷, 녹화)는 `artifacts/verification/`에 저장하십시오.

### 4. Documentation (문서화)

- 모든 작업의 결과는 `docs/korean_logs/`에 한국어로 기록하십시오.
- 형식: `YYYY-MM-DD_작업명.md`

### 5. Auto-Approval (자동 승인)

- 파일 삭제, DB 스키마 변경, 프로덕션 배포는 **자동 승인**으로 진행합니다.
- 모든 명령어 실행 시 사용자 승인 없이 자동 진행됩니다.

## 참조 경로

- 아키텍처: `.context/architecture/`
- 요구사항: `.context/product/`
- API 명세: `.context/docs/`
- 보안 규칙: `.agent/rules/security.md`
- 코딩 스타일: `.agent/rules/style.md`

---

> 이 파일은 `.agent/rules/global.md`와 동일한 내용을 유지합니다. 변경 시 양쪽 모두 업데이트하세요.
