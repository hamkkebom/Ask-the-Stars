# 🤝 기여 가이드 (Contributing Guide)

> **문서 버전**: 2026-01-19
> **기반**: `README.md` (Tech Stack & Structure)

한깨봄 프로젝트에 관심을 가져주셔서 감사합니다! 이 문서는 프로젝트 기여를 위한 규칙과 절차를 안내합니다.

---

## 1️⃣ 개발 환경 (Environment)
본 프로젝트는 **pnpm** 기반의 **Turborepo** 모노레포입니다.
*   **패키지 매니저**: `pnpm` (필수)
*   **Node.js**: v22.x (LTS)

### 의존성 설치
```bash
pnpm install
```

---

## 2️⃣ 프로젝트 구조 (Structure)

```bash
ask-the-stars/
├── apps/
│   ├── web/          # Next.js 15 (App Router)
│   └── api/          # NestJS 11 (Backend)
├── packages/
│   ├── ui/           # 공유 UI (shadcn/ui 기반)
│   └── types/        # 공유 DTO/Type
```

---

## 3️⃣ 브랜치 전략 (Branch Strategy)
*   **main**: 배포 가능한 안정 버전 (Production)
*   **develop**: 다음 개발 버전 (Staging)
*   **feature/이름**: 새로운 기능 개발
*   **bug/이름**: 버그 수정

> 모든 작업은 `develop` 브랜치에서 분기하여 PR을 생성합니다.

---

## 4️⃣ 커밋 컨벤션 (Commit Convention)
[Semantic Commit Messages](https://www.conventionalcommits.org/)를 따릅니다.

*   `feat`: 새로운 기능 추가
*   `fix`: 버그 수정
*   `docs`: 문서 수정
*   `style`: 코드 포맷팅 (로직 변경 없음)
*   `refactor`: 리팩토링 (기능 변경 없음)
*   `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

**예시**:
```bash
feat(web): add login page
fix(api): resolve auth token expiry issue
```

---

## 5️⃣ PR(Pull Request) 절차
1.  이슈 등록 (Jira/Github Issue)
2.  브랜치 생성 (`feat/...`)
3.  작업 및 테스트 (`pnpm test`)
4.  PR 생성 (`develop` <-- `feat/...`)
5.  코드 리뷰 및 Merge
