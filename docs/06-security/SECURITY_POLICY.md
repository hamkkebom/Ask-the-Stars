# 🔐 보안 정책 (Security Policy)

> **문서 버전**: 2026-01-19
> **기반**: `docs/02-architecture/TECH_STACK.md` (Auth Layer)

---

## 1️⃣ 인증 (Authentication)

### 시스템 기준
*   **프레임워크**: [Passport.js](https://www.passportjs.org/)
*   **방식**: JWT (JSON Web Token)
*   **저장소**: Supabase Auth (PostgreSQL)

### 토큰 정책 (Token Policy)
*   **Access Token**: 수명 1시간 (Memory/Header)
*   **Refresh Token**: 수명 14일 (HttpOnly Cookie)
*   **Rotation**: Refresh Token 사용 시 새로운 Access/Refresh Token 발급 (One-time use)

---

## 2️⃣ 권한 관리 (RBAC)

시스템은 **역할 기반 접근 제어 (Role-Based Access Control)**를 엄격히 따릅니다.

### 사용자 역할 (User Roles)
| 역할 (Role) | 설명 | 접근 범위 |
|---|---|---|
| **Guest** | 비회원 | 메인, 소개, 공모전(보기), 교육(보기) |
| **User** | 일반 회원 | 마이페이지, 교육 신청, 공모전 참가 |
| **Student** | 수강생 | **LMS 접근**, 과제 제출 |
| **Star** | 프리랜서 | **Stars** (제작, 정산, 포트폴리오) |
| **Admin** | 관리자 | **Admin 패널** (모듈별 권한 분리) |

### 관리자 세부 권한 (Admin Permissions)
관리자는 담당 업무에 따라 접근 모듈이 제한됩니다.
*   **System Admin**: 전체 접근
*   **Stars Manager**: `/admin/stars`
*   **Education Manager**: `/admin/education`
*   (상세 내용은 `SITEMAP.md` 참조)

---

## 3️⃣ 데이터 보안 및 컴플라이언스

### 개인정보 처리
*   비밀번호는 **Argon2** 또는 **Bcrypt**로 단방향 암호화 저장
*   개인정보(전화번호, 이메일)는 전송 시 **TLS 1.2+** 암호화 필수

### CORS 정책
*   **Allowed Origins**: `https://hamkkebom.com`, `http://localhost:3000`
*   **Credentials**: `true` (쿠키 허용)

---

## 4️⃣ 보안 취약점 리보트
보안 관련 이슈 발견 시 `security@hamkkebom.com`으로 제보해 주시면 즉시 검토하겠습니다.
