---
name: Git Commit Strategy
description: Rules for writing semantic commit messages
---

# Git 커밋 전략 (Commit Strategy)

## 커밋 메시지 형식

```text
<type>(<scope>): <subject>

<body>

<footer>
```

## 타입 (Type)

| 타입 | 설명 |
| ---- | ---- |
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 변경 |
| style | 코드 형식 (기능 변경 없음) |
| refactor | 리팩토링 |
| test | 테스트 추가/수정 |
| chore | 빌드/설정 변경 |

## 규칙

1. 제목은 50자 이내
2. 제목은 명령형으로 작성 (Add, Fix, Update)
3. 본문은 72자에서 줄바꿈
4. "왜" 변경했는지 설명

## 예시

```text
feat(auth): 소셜 로그인 추가

- Google OAuth 연동
- 카카오 로그인 연동

Closes #123
```
