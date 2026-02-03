# Husky & Lint-Staged 설정 완료

## ✅ 설정 현황

### 1. 설치된 패키지

```
✓ husky@9.1.7          - Git hooks 관리
✓ lint-staged@16.2.7   - 변경된 파일만 검증
✓ @commitlint/cli@20.4.1
✓ @commitlint/config-conventional@20.4.1
```

### 2. 생성된 파일

```
✓ .husky/pre-commit      - 커밋 전 lint-staged 실행
✓ .husky/commit-msg      - 커밋 메시지 검증
✓ commitlint.config.js   - Conventional Commits 규칙
✓ docs/05-development/husky-lint-staged.md - 상세 가이드
```

### 3. 설정 내용

#### package.json - lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

#### commitlint.config.js - Conventional Commits

```javascript
{
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build', 'revert'],
    'type-case': 'lower-case',
    'type-empty': false,
    'subject-empty': false,
    'subject-full-stop': false,
    'subject-case': 'lower-case',
  }
}
```

## 🚀 사용 방법

### 기본 커밋 워크플로우

```bash
# 1. 파일 수정
vim src/components/Button.tsx

# 2. 변경사항 스테이징
git add src/components/Button.tsx

# 3. 커밋 (자동 검증 실행)
git commit -m "feat(ui): add button component"
```

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

**예시:**

```bash
# 기본
git commit -m "feat: add user authentication"

# Scope 포함
git commit -m "feat(auth): add JWT token validation"

# 여러 줄
git commit -m "fix(api): resolve database timeout

- Increased connection pool
- Added retry logic

Closes #123"
```

### Type 목록

| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일 (포맷팅) |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 패키지 관리 |
| `perf` | 성능 개선 |
| `ci` | CI/CD 설정 |
| `build` | 빌드 시스템 |
| `revert` | 커밋 되돌리기 |

## 🔍 자동 검증 프로세스

### Pre-commit Hook 실행 순서

```
git commit
  ↓
.husky/pre-commit 실행
  ↓
lint-staged 실행
  ├─ *.{ts,tsx} 파일
  │  ├─ eslint --fix (자동 수정)
  │  └─ prettier --write (포맷팅)
  └─ *.{json,md} 파일
     └─ prettier --write (포맷팅)
  ↓
변경된 파일 자동 스테이징
  ↓
커밋 진행
```

### Commit-msg Hook 실행 순서

```
git commit
  ↓
.husky/commit-msg 실행
  ↓
commitlint 검증
  ├─ type 확인 (feat, fix, docs, ...)
  ├─ scope 확인 (선택사항)
  ├─ subject 확인 (소문자, 마침표 없음)
  └─ 형식 검증
  ↓
✓ 통과 → 커밋 완료
✗ 실패 → 커밋 중단
```

## ⚠️ 문제 해결

### Hook이 실행되지 않음

```bash
# Husky 재초기화
pnpm install
npx husky install
```

### "Permission denied" 오류

```bash
# 실행 권한 부여
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### ESLint 오류로 커밋 실패

```bash
# 자동 수정 가능한 오류는 자동으로 수정됨
# 수동 수정이 필요한 경우:
pnpm lint --fix
git add .
git commit -m "feat: ..."
```

### 커밋 메시지 형식 오류

```bash
# ✗ 잘못된 형식
git commit -m "Feat: add new feature."

# ✓ 올바른 형식
git commit -m "feat: add new feature"
```

### 긴급 상황 (Hook 스킵)

```bash
# ⚠️ 권장하지 않음 - 검증 우회
git commit --no-verify -m "feat: emergency fix"
```

## 📚 상세 가이드

더 자세한 정보는 다음 문서를 참조하세요:

- **[Husky & Lint-Staged 완전 가이드](./docs/05-development/husky-lint-staged.md)**
  - 설정 커스터마이징
  - 성능 최적화
  - 팀 협업 가이드

## 🎯 다음 단계

1. **첫 커밋 테스트**
   ```bash
   git add .
   git commit -m "chore: add husky and lint-staged configuration"
   ```

2. **Hook 동작 확인**
   - 파일이 자동으로 포맷팅되는지 확인
   - 커밋 메시지가 검증되는지 확인

3. **팀 공유**
   - 이 문서를 팀과 공유
   - 커밋 메시지 규칙 준수 안내

## 📋 체크리스트

- [x] Husky 설치 및 초기화
- [x] lint-staged 설치 및 설정
- [x] commitlint 설치 및 설정
- [x] Pre-commit hook 생성 및 권한 설정
- [x] Commit-msg hook 생성 및 권한 설정
- [x] 문서 작성

## 🔗 참고 자료

- [Husky 공식 문서](https://typicode.github.io/husky/)
- [lint-staged 공식 문서](https://github.com/okonet/lint-staged)
- [commitlint 공식 문서](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**설정 완료 일시:** 2026-02-03
**설정자:** AI Assistant
