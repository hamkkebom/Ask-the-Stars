# 🔌 API Reference

> Ask the Stars 플랫폼 REST API 문서

## 기본 정보

| 항목 | 값 |
|------|-----|
| Base URL | `http://localhost:3001/api` (개발) |
| 인증 | Bearer Token (JWT) |
| Content-Type | `application/json` |

---

## 🔐 인증 (Auth)

### `POST /auth/register`

회원가입

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "홍길동",
  "role": "STAR"
}
```

**Response:** `201 Created`
```json
{
  "id": "cuid123",
  "email": "user@example.com",
  "name": "홍길동",
  "role": "STAR",
  "accessToken": "eyJhbGci..."
}
```

### `POST /auth/login`

로그인

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": {
    "id": "cuid123",
    "email": "user@example.com",
    "name": "홍길동",
    "role": "STAR"
  }
}
```

### `POST /auth/refresh`

토큰 갱신

**Request Body:**
```json
{
  "refreshToken": "eyJhbGci..."
}
```

---

## 📋 제작요청 (Project Requests)

### `GET /project-requests`

제작요청 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| status | string | OPEN, FULL, CLOSED |
| category | string | 카테고리 필터 |
| assignmentType | string | SINGLE, MULTIPLE |
| page | number | 페이지 (기본: 1) |
| limit | number | 개수 (기본: 20) |

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "req123",
      "title": "신년운세 × 김태희 상담사 홍보",
      "description": "...",
      "categories": ["신년운세", "사주"],
      "deadline": "2026-01-31T23:59:59Z",
      "assignmentType": "MULTIPLE",
      "maxAssignees": 3,
      "currentAssignees": 1,
      "status": "OPEN",
      "estimatedBudget": 150000
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "limit": 20
  }
}
```

### `POST /project-requests`

제작요청 생성 (Moon 전용)

**Request Body:**
```json
{
  "title": "신년운세 × 김태희 상담사 홍보",
  "description": "상세 설명...",
  "categories": ["신년운세", "사주"],
  "deadline": "2026-01-31",
  "assignmentType": "MULTIPLE",
  "maxAssignees": 3,
  "estimatedBudget": 150000
}
```

### `POST /project-requests/:id/accept`

제작요청 수락 (Star 전용)

**Response:** `201 Created`
```json
{
  "assignmentId": "assign123",
  "requestId": "req123",
  "freelancerId": "user123",
  "status": "ACCEPTED"
}
```

---

## 📤 제출물 (Submissions)

### `POST /submissions`

영상 제출

**Request Body:** (multipart/form-data)
| 필드 | 타입 | 설명 |
|------|------|------|
| file | File | 영상 파일 |
| assignmentId | string | 수락 ID |
| versionSlot | number | 버전 슬롯 (1-5) |
| versionTitle | string | 버전 제목 (선택) |
| notes | string | 메모 (선택) |

**Response:** `201 Created`
```json
{
  "id": "sub123",
  "videoUrl": "https://r2.../video.mp4",
  "thumbnailUrl": "https://r2.../thumb.jpg",
  "versionSlot": 1,
  "status": "PENDING"
}
```

### `GET /submissions/:id`

제출물 상세 조회

### `PATCH /submissions/:id/status`

제출물 상태 변경 (Moon 전용)

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

---

## 💬 피드백 (Feedbacks)

### `POST /feedbacks`

피드백 생성

**Request Body:**
```json
{
  "submissionId": "sub123",
  "content": "자막 위치 조정 필요",
  "startTime": 15.5,
  "endTime": 20.0,
  "feedbackType": "자막",
  "priority": "HIGH",
  "annotations": {
    "shapes": [{"type": "rect", "x": 100, "y": 200, "width": 50, "height": 30}]
  }
}
```

### `GET /feedbacks?submissionId=:id`

제출물별 피드백 목록

### `PATCH /feedbacks/:id/resolve`

피드백 해결 처리

---

## 💰 정산 (Settlements)

### `GET /settlements`

정산 목록 조회

**Query Parameters:**
| 파라미터 | 타입 | 설명 |
|---------|------|------|
| userId | string | 사용자 ID |
| round | string | PRIMARY, SECONDARY |
| status | string | PENDING, COMPLETED |
| quarter | string | 2026-Q1 형식 |

### `POST /settlements/batch-approve`

일괄 정산 승인 (Moon 전용)

**Request Body:**
```json
{
  "settlementIds": ["set1", "set2", "set3"]
}
```

---

## 📣 캠페인 (Campaigns)

### `GET /campaigns`

캠페인 목록

### `POST /campaigns`

캠페인 생성

**Request Body:**
```json
{
  "name": "신년운세 대박 캠페인",
  "submissionId": "sub123",
  "platform": ["YouTube", "Instagram"],
  "budget": 500000,
  "startDate": "2026-01-01",
  "endDate": "2026-01-31"
}
```

### `GET /campaigns/:id/analytics`

캠페인 성과 분석

---

## 🎬 영상 업로드

### `POST /uploads/presigned-url`

Presigned URL 발급

**Request Body:**
```json
{
  "filename": "video.mp4",
  "contentType": "video/mp4"
}
```

**Response:**
```json
{
  "uploadUrl": "https://r2.../presigned...",
  "fileKey": "videos/uuid123.mp4",
  "expiresIn": 3600
}
```

### `POST /uploads/complete`

업로드 완료 알림

---

## ❌ 에러 응답

모든 API는 다음 형식의 에러를 반환합니다:

```json
{
  "statusCode": 400,
  "message": "유효하지 않은 요청입니다",
  "error": "Bad Request"
}
```

| 코드 | 설명 |
|------|------|
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 리소스 없음 |
| 500 | 서버 에러 |
