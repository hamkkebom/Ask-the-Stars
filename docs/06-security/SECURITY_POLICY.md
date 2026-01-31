# 🔐 보안 정책 (Security Policy)

> **문서 버전**: 2026-01-29
> **플랫폼 비전**: 영상 갤러리 + 프리랜서 + 관리자

---

## 1️⃣ 인증 (Authentication)

### 시스템 기준
| 항목 | 설정 |
|------|------|
| 프레임워크 | Passport.js |
| 방식 | JWT (JSON Web Token) |
| 저장소 | Supabase Auth (PostgreSQL) |

### 토큰 정책 (Token Policy)

| 토큰 | 수명 | 저장 위치 |
|------|------|----------|
| Access Token | 1시간 | Memory/Header |
| Refresh Token | 14일 | HttpOnly Cookie |

- **Rotation**: Refresh Token 사용 시 새로운 Access/Refresh Token 발급 (One-time use)

---

## 2️⃣ 권한 관리 (RBAC)

시스템은 **역할 기반 접근 제어 (Role-Based Access Control)**를 따릅니다.

### 사용자 역할 (User Roles)

| 역할 | 설명 | 접근 범위 |
|------|------|----------|
| **Guest** | 비회원 | 영상 갤러리 시청 |
| **CLIENT** | 클라이언트 | 의뢰 요청 (관리자 통해) |
| **STAR** | 프리랜서 | `/stars/*` (업로드, 수정, 정산) |
| **ADMIN** | 관리자 | `/admin/*` (검수, 승인, 재무) |

### 경로별 접근 권한

| 경로 | 접근 가능 역할 |
|------|---------------|
| `/videos/*` | 모든 사용자 |
| `/stars/*` | STAR |
| `/admin/*` | ADMIN |

---

## 3️⃣ 데이터 보안

### 비밀번호 처리
- **암호화**: Argon2 또는 Bcrypt (단방향)
- **최소 요구사항**: 8자 이상, 숫자/특수문자 포함

### 전송 보안
- **TLS**: 1.2+ 필수
- **HTTPS**: 모든 프로덕션 통신

---

## 4️⃣ CORS 정책

| 설정 | 값 |
|------|-----|
| Allowed Origins | `https://hamkkebom.com`, `https://www.hamkkebom.com`, `http://localhost:3000` |
| Credentials | `true` (쿠키 허용) |
| Methods | `GET, POST, PUT, PATCH, DELETE` |

---

## 5️⃣ 영상 보안 (Cloudflare Stream)

| 기능 | 설정 |
|------|------|
| Signed URL | 5분 만료 토큰 |
| IP 제한 | 선택적 적용 |
| 다운로드 방지 | Stream 기본 설정 |

---

## 6️⃣ 보안 취약점 리포트

보안 관련 이슈 발견 시 `security@hamkkebom.com`으로 제보해 주세요.
