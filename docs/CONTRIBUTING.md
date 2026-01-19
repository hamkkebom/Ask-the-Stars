# 🤝 기여 가이드 (Contributing Guide)

이 프로젝트에 기여해 주셔서 감사합니다!

---

## 1. 개발 환경 설정

### 1.1 필수 도구
- **Node.js**: v22 (LTS) - `.nvmrc` 참조
- **pnpm**: v9.x (패키지 매니저)
- **Docker**: DB 실행용

### 1.2 설치 및 실행
```bash
# 의존성 설치
pnpm install

# 데이터베이스 실행
docker-compose up -d

# 초기 데이터 세팅
pnpm db:push
pnpm db:seed

# 개발 서버 실행 (Frontend + Backend)
pnpm dev
```

---

## 2. 프로젝트 구조 (Monorepo)

Turborepo를 사용하여 관리됩니다.

- `apps/web`: Next.js 프론트엔드
- `apps/api`: NestJS 백엔드
- `packages/database`: Prisma 스키마 및 클라이언트
- `packages/ui`: 공통 UI 컴포넌트 (shadcn/ui)

---

## 3. 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다.

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (로직 변경 없음)
- `refactor`: 코드 리팩토링
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

예시: `feat(api): add settlements module`

---

## 4. PR (Pull Request) 절차

1. Issue 생성 또는 할당
2. `feature/이슈번호-설명` 브랜치 생성
3. 작업 및 테스트 (`pnpm test`)
4. PR 생성 (Reviewer 지정)
5. Squash & Merge
