# 변경 이력 (Changelog)

이 문서는 프로젝트의 주요 변경 사항을 기록합니다.  
형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따릅니다.

## [Unreleased]

### 추가 (Added)
- 

### 변경 (Changed)
- 

### 삭제 (Removed)
- 

### 수정 (Fixed)
- 

---

## [1.0.0] - YYYY-MM-DD

### 추가 (Added)
- 초기 릴리즈
- 사용자 인증 기능 (로그인/회원가입)
- 콘텐츠 관리 기능 (CRUD)
- 관리자 대시보드

### 변경 (Changed)
- 

### 삭제 (Removed)
- 

### 수정 (Fixed)
- 

---

## 변경 이력 작성 가이드

### 카테고리 설명

| 카테고리 | 설명 |
|----------|------|
| Added | 새로운 기능 추가 |
| Changed | 기존 기능 변경 |
| Deprecated | 곧 삭제될 기능 |
| Removed | 삭제된 기능 |
| Fixed | 버그 수정 |
| Security | 보안 취약점 수정 |

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
