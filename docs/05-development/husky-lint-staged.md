# Husky & Lint-Staged 설정 가이드

## 개요

이 프로젝트는 **Husky**와 **lint-staged**를 사용하여 커밋 전 자동 검증을 수행합니다.

- **Husky**: Git hooks 관리
- **lint-staged**: 변경된 파일만 검증
- **commitlint**: Conventional Commits 형식 검증

## 설정 구조

### 1. Husky Hooks

#### `.husky/pre-commit`
커밋 전 변경된 파일에 대해 린트, 포맷팅 실행:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

#### `.husky/commit-msg`
커밋 메시지가 Conventional Commits 형식을 따르는지 검증:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm commitlint --edit $1
```

### 2. lint-staged 설정 (package.json)

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

**동작:**
- TypeScript/TSX 파일: ESLint 자동 수정 → Prettier 포맷팅
- JSON/Markdown 파일: Prettier 포맷팅만

### 3. commitlint 설정 (commitlint.config.js)

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'test', 'chore', 'perf', 'ci', 'build', 'revert'
    ]],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],
  },
};
```

## 커밋 메시지 형식 (Conventional Commits)

### 유효한 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 예시

```bash
# 기본 형식
git commit -m "feat: add user authentication"

# Scope 포함
git commit -m "feat(auth): add JWT token validation"

# 여러 줄
git commit -m "fix(api): resolve database connection timeout

- Increased connection pool size
- Added retry logic
- Updated error handling

Closes #123"
```

### Type 목록

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 | `feat: add dark mode toggle` |
| `fix` | 버그 수정 | `fix: resolve memory leak in cache` |
| `docs` | 문서 수정 | `docs: update API documentation` |
| `style` | 코드 스타일 (포맷팅) | `style: format code with prettier` |
| `refactor` | 코드 리팩토링 | `refactor: simplify auth logic` |
| `test` | 테스트 추가/수정 | `test: add unit tests for utils` |
| `chore` | 빌드, 패키지 관리 | `chore: update dependencies` |
| `perf` | 성능 개선 | `perf: optimize image loading` |
| `ci` | CI/CD 설정 | `ci: add GitHub Actions workflow` |
| `build` | 빌드 시스템 | `build: update webpack config` |
| `revert` | 커밋 되돌리기 | `revert: undo previous commit` |

## 워크플로우

### 1. 파일 수정 및 스테이징

```bash
# 파일 수정
vim src/components/Button.tsx

# 변경사항 스테이징
git add src/components/Button.tsx
```

### 2. 커밋 시도

```bash
git commit -m "feat(ui): add button component"
```

### 3. Pre-commit Hook 실행

**자동으로 다음이 실행됩니다:**

1. **lint-staged** 실행
   - `src/components/Button.tsx`에 대해:
     - ESLint 자동 수정
     - Prettier 포맷팅
   - 수정된 파일 자동 스테이징

2. **Commit-msg Hook** 실행
   - 커밋 메시지 형식 검증
   - Conventional Commits 규칙 확인

### 4. 커밋 완료

모든 검증을 통과하면 커밋이 완료됩니다.

## 문제 해결

### 1. Hook이 실행되지 않음

**원인:** Husky가 초기화되지 않음

**해결:**
```bash
pnpm install
npx husky install
```

### 2. "Permission denied" 오류

**원인:** Hook 파일에 실행 권한이 없음

**해결:**
```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### 3. ESLint 오류로 커밋 실패

**원인:** 코드가 ESLint 규칙을 위반

**해결:**
```bash
# 자동 수정 가능한 오류는 자동으로 수정됨
# 수동 수정이 필요한 경우:
pnpm lint --fix

# 그 후 다시 커밋
git add .
git commit -m "feat: ..."
```

### 4. 커밋 메시지 형식 오류

**오류 메시지:**
```
✖   subject must not end with a period [subject-full-stop]
✖   type must be lower-case [type-case]
```

**해결:**
```bash
# 올바른 형식으로 다시 커밋
git commit -m "feat: add new feature"  # ✓ 올바름
git commit -m "Feat: add new feature." # ✗ 잘못됨
```

### 5. Hook 스킵 (긴급 상황만)

**경고:** 이 방법은 검증을 우회하므로 권장하지 않습니다.

```bash
# Pre-commit hook 스킵
git commit --no-verify -m "feat: emergency fix"

# Commit-msg hook 스킵
git commit --no-verify -m "feat: emergency fix"
```

## 설정 커스터마이징

### lint-staged 규칙 추가

`package.json`의 `lint-staged` 섹션을 수정:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ],
    "apps/api/src/**/*.ts": [
      "jest --bail --findRelatedTests"
    ]
  }
}
```

### commitlint 규칙 추가

`commitlint.config.js`를 수정:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'test', 'chore', 'perf', 'ci', 'build', 'revert',
      'custom-type'  // 새로운 타입 추가
    ]],
  },
};
```

## 성능 최적화

### 1. 변경된 파일만 검증

lint-staged는 자동으로 변경된 파일만 검증하므로 빠릅니다.

### 2. 테스트 제한

전체 테스트 스위트는 느리므로, 관련 테스트만 실행:

```json
{
  "lint-staged": {
    "apps/web/src/**/*.{ts,tsx}": [
      "vitest related --run"
    ]
  }
}
```

### 3. 병렬 실행

lint-staged는 기본적으로 병렬 실행을 지원합니다.

## 참고 자료

- [Husky 공식 문서](https://typicode.github.io/husky/)
- [lint-staged 공식 문서](https://github.com/okonet/lint-staged)
- [commitlint 공식 문서](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 체크리스트

- [x] Husky 설치 및 초기화
- [x] lint-staged 설치 및 설정
- [x] commitlint 설치 및 설정
- [x] Pre-commit hook 생성
- [x] Commit-msg hook 생성
- [x] Hook 파일 실행 권한 설정
- [x] 문서 작성

## 다음 단계

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
