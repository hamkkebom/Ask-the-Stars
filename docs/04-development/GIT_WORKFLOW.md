# 🌿 Git 워크플로우 (Git Workflow)

> **문서 버전**: 2026-01-19
> **기반**: `docs/04-development/CONTRIBUTING.md`

이 프로젝트는 **GitHub Flow**를 기본으로 하되, 모노레포 환경에 맞춘 협업 방식을 따릅니다.

---

## 1️⃣ 브랜치 구조 (Branch Structure)

| 브랜치 명 | 성격 | 대상 서버 | 권한 |
|---|---|---|---|
| **main** | 운영 (Production) | Vercel / Cloud Run | Admin Only (PR 필수) |
| **develop** | 스테이징 (Staging) | Preview / Staging | Collaborator (PR 필수) |
| **feature/** | 기능 개발 | 로컬 환경 | 개발자 자유 |
| **fix/** | 버그 수정 | 로컬 환경 | 개발자 자유 |
| **hotfix/** | 긴급 수정 | 운영/스테이징 | Admin/Lead |

---

## 2️⃣ 개발 사이클 (Standard Flow)

### 1단계: 브랜치 생성
작업 시작 전 `develop` 브랜치를 최신 상태로 유지하고 새로운 작업 브랜치를 생성합니다.
```bash
git checkout develop
git pull origin develop
git checkout -b feature/user-profile
```

### 2단계: 코드 수정 및 커밋
[코딩 컨벤션](./CODING_CONVENTION.md)과 [커밋 컨벤션](./CONTRIBUTING.md#4-커밋-컨벤션-commit-convention)을 준수하며 작업합니다.
```bash
git add .
git commit -m "feat(web): add profile image upload section"
```

### 3단계: 작업 브랜치 푸시
```bash
git push origin feature/user-profile
```

### 4단계: Pull Request 생성
GitHub에서 `develop` 브랜치를 대상으로 PR을 생성합니다.
*   **Template**: 작업 배경, 주요 변경 사항, 테스트 완료 여부 포함
*   **Reviewers**: 최소 1명 이상의 리뷰어 지정
*   **CI**: 빌드 및 테스트 자동화 통과 필수

### 5단계: Merge 및 배포
리뷰 승인 후 `develop` 브랜치로 머지됩니다. 
`main` 브랜치로의 머지는 정기 배포 일정에 맞춰 관리자가 수행합니다.

---

## 3️⃣ 유의사항 (Best Practices)

1.  **동기화**: 작업 브랜치가 오래되었다면 주기적으로 `develop`을 머지하거나 리베이스(Rebase) 하세요.
2.  **커밋 단위**: 하나의 커밋은 하나의 논리적 작업 단위만 포함해야 합니다.
3.  **Conflict**: 충돌 발생 시 로컬에서 해결 후 푸시하세요.
```bash
git checkout develop
git pull origin develop
git checkout feature/user-profile
git merge develop
# 충돌 해결 후
git commit
git push origin feature/user-profile
```
