# 기여 가이드

> 최종 수정일: YYYY-MM-DD

## 📌 개요

프로젝트에 기여하는 방법을 설명합니다.

## 🚀 시작하기

### 개발 환경 설정

1. **저장소 클론**

```bash
git clone [repository-url]
cd [project-name]
```

2. **의존성 설치**

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
./gradlew build
```

3. **환경변수 설정**

```bash
cp .env.example .env
# .env 파일 수정
```

4. **개발 서버 실행**

```bash
# Frontend
npm run dev

# Backend
./gradlew bootRun
```

## 🌿 브랜치 전략

### 브랜치 명명 규칙

| 타입 | 형식 | 예시 |
|------|------|------|
| 기능 | `feature/기능명` | `feature/user-login` |
| 버그 | `bugfix/버그명` | `bugfix/login-error` |
| 핫픽스 | `hotfix/이슈번호` | `hotfix/issue-123` |
| 릴리즈 | `release/버전` | `release/v1.0.0` |

### Git Flow

```
main ─────────────────────────────────► 운영
  │
  └─ develop ─────────────────────────► 개발
       │
       ├─ feature/xxx ────────────────► 기능 개발
       │
       └─ release/v1.0 ───────────────► 릴리즈 준비
```

## 📝 커밋 메시지 규칙

### 형식

```
<타입>(<범위>): <제목>

<본문>

<꼬리말>
```

### 타입

| 타입 | 설명 |
|------|------|
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅 |
| refactor | 코드 리팩토링 |
| test | 테스트 추가/수정 |
| chore | 빌드, 설정 변경 |

### 예시

```
feat(auth): 소셜 로그인 기능 추가

- Google OAuth 연동
- Kakao OAuth 연동
- 로그인 상태 유지 기능

Closes #123
```

## 🔄 Pull Request 프로세스

### 1. PR 생성 전 체크리스트

- [ ] 코드 컨벤션 준수
- [ ] 테스트 통과
- [ ] 빌드 성공
- [ ] 문서 업데이트 (필요시)

### 2. PR 제목 형식

```
[타입] 제목 (#이슈번호)
```

예: `[Feature] 사용자 로그인 기능 (#123)`

### 3. PR 템플릿

```markdown
## 📋 변경 사항
- 

## 🔗 관련 이슈
- Closes #

## 📸 스크린샷 (UI 변경 시)


## ✅ 체크리스트
- [ ] 테스트 완료
- [ ] 코드 리뷰 요청
```

### 4. 리뷰 프로세스

1. PR 생성 → 자동 빌드/테스트
2. 리뷰어 지정 (최소 1명)
3. 피드백 반영
4. 승인 후 머지

## 👥 역할 및 책임

| 역할 | 책임 |
|------|------|
| 개발자 | 기능 구현, 테스트 작성 |
| 리뷰어 | 코드 리뷰, 품질 검증 |
| 관리자 | 머지, 릴리즈 관리 |

## 📞 문의

- 기술 문의: 
- 프로젝트 관리: 
