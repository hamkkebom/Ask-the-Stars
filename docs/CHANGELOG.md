# 변경 이력 (Changelog)

이 문서는 프로젝트의 주요 변경 사항을 기록합니다.
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따릅니다.

## [Unreleased]

### 추가 (Added)

- 추가된 기능 없음

### 변경 (Changed)

- 변경된 기능 없음

---

## [0.2.0] - 2026-01-17

### 추가됨 (Added)

- **기술 스택 문서**: `docs/TECH_STACK.md` 생성
- **문서 인덱스**: `docs/README.md` 생성
- **Sentry 연동**: 프론트엔드/백엔드 에러 추적
- **BetterStack 연동**: 로그 모니터링
- **Prisma ORM**: 데이터베이스 스키마 및 서비스
- **VideoPlayer 컴포넌트**: Plyr + HLS.js 기반
- **Health Check API**: Cloud Run 연동

### 변경됨 (Changed)

- **모니터링**: Datadog → Sentry + BetterStack (비용 $50+ 절감)
- **ORM 유지**: Prisma 6.3.1 채택 (Drizzle 대체)
- **버전 업그레이드**:
  - Next.js: 15.1.3 → 15.5.9
  - React: 19.2.0 → 19.0.0 (설계서 일치)
  - Zustand: 5.0.2 → 5.0.10
  - TailwindCSS: 4.0.0 → 4.0.8
  - BullMQ: 5.26.2 → 5.66.5
  - Socket.io: 4.8.1 → 4.8.3
- **배포 가이드**: Vercel + Cloud Run 구성으로 업데이트
- **README.md**: 프로젝트 소개 전면 개편

### 삭제됨 (Removed)

- Datadog 패키지 (`dd-trace`, `@datadog/browser-rum`)
- Drizzle ORM 관련 코드

---

## [0.1.0] - 2026-01-16

### 추가됨 (Added)

- **Turborepo 모노레포 구조** 설정
- **Next.js 15** 프론트엔드 앱 (`apps/web`)
- **NestJS 11** 백엔드 앱 (`apps/api`)
- **공유 패키지**: `packages/ui`, `packages/types`, `packages/utils`
- **GitHub Actions CI/CD** 워크플로우
- **Docker Compose** 로컬 환경 설정
- **문서**: CONTRIBUTING, CODING_CONVENTION, DEPLOYMENT 등
- **PR Template** 및 **CODEOWNERS**
- **Dependabot** 자동 업데이트 설정

---

## 변경 이력 작성 가이드

### 카테고리 설명

| 카테고리   | 설명                 |
| ---------- | -------------------- |
| Added      | 새로운 기능 추가     |
| Changed    | 기존 기능 변경       |
| Deprecated | 곧 삭제될 기능       |
| Removed    | 삭제된 기능          |
| Fixed      | 버그 수정            |
| Security   | 보안 취약점 수정     |

### 작성 규칙

1. 각 버전에 날짜 기록 (YYYY-MM-DD 형식)
2. 변경 사항은 사용자 관점에서 작성
3. 가장 최근 변경이 위에 오도록 정렬
4. Unreleased 섹션에 개발 중인 내용 기록
5. 배포 시 Unreleased → 버전 번호로 변경

### 버전 번호 규칙 (Semantic Versioning)

- **MAJOR**: 호환되지 않는 API 변경
- **MINOR**: 하위 호환성 있는 기능 추가
- **PATCH**: 하위 호환성 있는 버그 수정

예: `1.2.3` → Major.Minor.Patch
