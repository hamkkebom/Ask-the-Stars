# 🔐 인증 (Authentication) 및 보안 정책 (함께봄)

> **문서 버전**: 2026-01-19
> **기반**: `docs/06-security/SECURITY_POLICY.md`

이 문서는 함께봄 API의 인증 및 인가 메커니즘을 상세히 설명합니다.

---

## 1️⃣ 인증 메커니즘 (JWT)

본 프로젝트는 **JWT (JSON Web Token)**를 사용하여 사용자를 인증합니다.

### 토큰 종류
1.  **Access Token**: 모든 요청의 `Authorization` 헤더에 담아 전송합니다.
    *   형식: `Bearer {TOKEN}`
2.  **Refresh Token**: Access Token 만료 시 재발급을 위해 사용합니다.
    *   형식: `HttpOnly` 쿠키로 자동 전송

---

## 2️⃣ 로그인 및 토큰 갱신 플로우

### 1. 로그인 (Login)
*   **Endpoint**: `POST /auth/login`
*   **Request**: `{ email, password }`
*   **Response**: 
    *   Body: `{ accessToken, user info }`
    *   Cookie: `refreshToken={TOKEN}; HttpOnly; Secure;`

### 2. 토큰 갱신 (Token Refresh)
*   **Endpoint**: `POST /auth/refresh`
*   **Process**: 쿠키에 담긴 `refreshToken`을 검증하여 새로운 `accessToken`과 `refreshToken`을 발급합니다. (Refresh Token Rotation 적용)

---

## 3️⃣ 인가 (Authorization)

API 요청 시 사용자의 역할(Role)에 따라 접근을 제한합니다.

### NestJS Guards
*   `JwtAuthGuard`: JWT 유효성 검사
*   `RolesGuard`: `@Roles('ADMIN', 'STAR')` 데코레이터를 통한 역할 검사

### 권한 계층
(상세 내용은 [보안 정책](../06-security/SECURITY_POLICY.md) 참조)

---

## 4️⃣ 프론트엔드 연동 (Zustand + TanStack Query)

1.  로그인 성공 시 `accessToken`을 메모리(Zustand 스토어)에 저장합니다.
2.  Axios 인터셉터를 통해 모든 요청 헤더에 토큰을 주입합니다.
3.  `401 Unauthorized` 발생 시 자동으로 `/auth/refresh`를 호출하여 토큰을 갱신합니다.
