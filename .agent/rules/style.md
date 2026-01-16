---
description: Coding Style Guidelines
alwaysOn: true
---

# 코딩 스타일 가이드 (Style Guide)

## 일반 원칙

### 명명 규칙

- 변수/함수: `camelCase`
- 클래스: `PascalCase`
- 상수: `UPPER_SNAKE_CASE`
- 파일: `kebab-case` 또는 `snake_case`

### 코드 품질

- 함수는 단일 책임 원칙 준수
- 매직 넘버 사용 금지 → 상수로 정의
- 중복 코드 최소화

## JavaScript/TypeScript

### JS/TS 스타일

- 세미콜론 사용
- 문자열은 작은따옴표 `'`
- 들여쓰기: 2칸

### JS/TS 타입

- `any` 사용 금지
- 명시적 타입 선언 권장

## Python

### Python 스타일

- PEP 8 준수
- 들여쓰기: 4칸
- 문자열은 큰따옴표 `"`

### Python 타입 힌트

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

## Shell

### Shell 스타일

```bash
#!/bin/bash
set -euo pipefail
```

## 주석 규칙

- 코드가 "무엇을" 하는지가 아니라 "왜" 하는지 설명
- TODO 주석 형식: `# TODO(username): 설명`
- 불필요한 주석 삭제
