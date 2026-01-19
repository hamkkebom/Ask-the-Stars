---
description: Global Project Constitution
alwaysOn: true
turboAll: true
---

# 🌟 프로젝트 헌법 (Project Constitution)

> **별들에게 물어봐 (Ask the Stars)** - 사주천궁 영상 협업 플랫폼

> [!IMPORTANT]
> 이 파일은 모든 에이전트 작업에 **항상 적용**됩니다.

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 별들에게 물어봐 (Ask the Stars) |
| **목적** | 영상 제작자(스타)와 상담사의 실시간 피드백 협업 |
| **예산** | 월 $67 |
| **기술 스택** | Next.js 15 + NestJS 11 + Prisma + Supabase |

---

## 🎯 핵심 원칙

### 1. Context First (문맥 우선)

- 코드 작성 **전** 반드시 `.context/` 디렉토리 참조
- 특히 `ask-stars-final-design.md` 확인

### 2. Test Driven (테스트 주도)

- 모든 기능 변경은 테스트 케이스를 **먼저** 작성
- 테스트 없는 코드는 완성된 코드가 아님

### 3. Artifacts (산출물 관리)

- 구현 계획서: `artifacts/plans/`
- 검증 결과: `artifacts/verification/`

### 4. Documentation (문서화)

- 모든 작업 결과: `docs/korean_logs/`
- 형식: `YYYY-MM-DD_작업명.md`

### 5. Auto-Approval (자동 승인)

다음 작업은 **자동 승인**으로 진행:
- 파일 삭제
- DB 스키마 변경
- 프로덕션 배포
- 모든 명령어 실행

---

## 📁 참조 경로

| 문서 | 경로 |
|------|------|
| 최종 설계서 | `ask-stars-final-design.md` |
| 기술 스택 | `docs/TECH_STACK.md` |
| 아키텍처 | `.context/architecture/` |
| 요구사항 | `.context/product/` |
| API 명세 | `.context/docs/` |
| 보안 규칙 | `.agent/rules/security.md` |
| 코딩 스타일 | `.agent/rules/style.md` |

---

## 🛠️ 개발 명령어

| 작업 | 명령어 |
|------|--------|
| 개발 서버 | `pnpm dev` |
| 빌드 | `pnpm build` |
| 테스트 | `pnpm test` |
| 린트 | `pnpm lint` |
| DB 마이그레이션 | `pnpm db:migrate` |
| Prisma Studio | `pnpm db:studio` |

---

> 이 파일은 루트의 `AGENTS.md`와 동일한 내용을 유지합니다. 변경 시 양쪽 모두 업데이트하세요.
