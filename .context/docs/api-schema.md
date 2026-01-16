# API 명세서

> 최종 수정일: YYYY-MM-DD  
> API 버전: v1.0

## 📌 개요

API 명세에 대한 개요를 작성합니다.

## 🌐 기본 정보

| 항목 | 값 |
|------|-----|
| Base URL (개발) | `http://localhost:8080/api` |
| Base URL (운영) | `https://api.example.com/api` |
| 인증 방식 | Bearer Token (JWT) |
| Content-Type | application/json |

## 🔐 인증

### 인증 헤더

```
Authorization: Bearer {access_token}
```

### 인증이 필요 없는 API

- `POST /auth/login`
- `POST /auth/register`
- `GET /health`

---

## 📋 API 목록

### 인증 (Auth)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|:----:|
| POST | /auth/login | 로그인 | ❌ |
| POST | /auth/register | 회원가입 | ❌ |
| POST | /auth/logout | 로그아웃 | ✅ |
| GET | /auth/me | 내 정보 조회 | ✅ |

### 사용자 (Users)

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|:----:|
| GET | /users | 사용자 목록 | ✅ |
| GET | /users/{id} | 사용자 상세 | ✅ |
| PUT | /users/{id} | 사용자 수정 | ✅ |
| DELETE | /users/{id} | 사용자 삭제 | ✅ |

---

## 📖 API 상세

### POST /auth/login

로그인하여 액세스 토큰을 발급받습니다.

**Request**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

**Error Response (401 Unauthorized)**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다."
  }
}
```

---

### GET /users

사용자 목록을 조회합니다.

**Query Parameters**

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|:----:|--------|------|
| page | integer | ❌ | 1 | 페이지 번호 |
| size | integer | ❌ | 20 | 페이지 크기 |
| sort | string | ❌ | createdAt,desc | 정렬 기준 |

**Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "email": "user@example.com",
        "name": "홍길동",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "page": 1,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  }
}
```

---

## ⚠️ 에러 코드

| 코드 | HTTP Status | 설명 |
|------|-------------|------|
| AUTH_FAILED | 401 | 인증 실패 |
| AUTH_EXPIRED | 401 | 토큰 만료 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| VALIDATION_ERROR | 400 | 유효성 검사 실패 |
| INTERNAL_ERROR | 500 | 서버 내부 오류 |

## 📝 참고사항

- 모든 날짜/시간은 ISO 8601 형식 (UTC)
- 페이지네이션은 0-based가 아닌 1-based
- Rate Limit: 분당 100 요청
