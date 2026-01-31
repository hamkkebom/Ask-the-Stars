# 🔌 API 엔드포인트 (함께봄)

> **문서 버전**: 2026-01-29
> **플랫폼 비전**: 영상 갤러리 + 프리랜서 + 관리자

모든 요청은 `/api` 프리픽스를 사용하며, 인증이 필요한 경우 `Authorization` 헤더를 포함해야 합니다.

---

## 1️⃣ 인증 (Auth)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/auth/login` | 로그인 (Access/Refresh Token 발급) |
| POST | `/auth/signup` | 회원가입 |
| POST | `/auth/logout` | 로그아웃 (Refresh Token 무효화) |
| POST | `/auth/refresh` | 토큰 재발급 |
| POST | `/auth/forgot-password` | 비밀번호 재설정 링크 발송 |

---

## 2️⃣ 영상 (Videos) - Public

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/videos` | 영상 갤러리 목록 |
| GET | `/videos/:id` | 영상 상세 |
| GET | `/videos/category/:slug` | 카테고리별 영상 |
| POST | `/videos/:id/view` | 조회수 증가 |

---

## 3️⃣ 프리랜서 (Stars)

| Method | Endpoint | 설명 |
|--------|----------|------|
| **프로젝트** |||
| GET | `/stars/projects` | 제작 요청 게시판 조회 |
| GET | `/stars/projects/:id` | 프로젝트 상세 |
| POST | `/stars/projects/:id/apply` | 프로젝트 지원 |
| GET | `/stars/me/projects` | 내 참여 프로젝트 목록 |
| **영상 관리** |||
| GET | `/stars/me/videos` | 내 영상 목록 |
| GET | `/stars/me/videos/:id` | 영상 상세 |
| PUT | `/stars/me/videos/:id` | 영상 정보 수정 |
| PUT | `/stars/me/videos/:id/thumbnail` | 썸네일 변경 |
| PUT | `/stars/me/videos/:id/replace-file` | 파일 교체 |
| DELETE | `/stars/me/videos/:id` | 영상 삭제 요청 |
| POST | `/stars/videos/upload` | 영상 업로드 |
| **피드백 & 수입** |||
| GET | `/stars/me/feedback` | 받은 피드백 목록 |
| GET | `/stars/earnings` | 정산 내역 및 수익금 조회 |
| POST | `/stars/me/payout-request` | 정산 요청 |
| **프로필** |||
| GET | `/stars/me/profile` | 내 프로필 |
| PUT | `/stars/me/profile` | 프로필 수정 |
| GET | `/stars/me/performance` | 내 성과 |

---

## 4️⃣ 관리자 (Admin)

| Method | Endpoint | 설명 |
|--------|----------|------|
| **대시보드** |||
| GET | `/admin/dashboard` | 통합 매출 및 운영 지표 |
| GET | `/admin/activity-log` | 활동 로그 |
| **영상 관리** |||
| GET | `/admin/videos` | 전체 영상 목록 (R2) |
| PUT | `/admin/videos/:id` | 영상 정보 수정 |
| POST | `/admin/videos/:id/publish` | 갤러리에 공개 |
| DELETE | `/admin/videos/:id` | 영상 삭제 |
| **프리랜서 관리** |||
| GET | `/admin/stars` | 전체 프리랜서 목록 |
| PUT | `/admin/stars/:id` | 프리랜서 정보 수정 |
| GET | `/admin/stars/projects` | 전체 프로젝트 |
| POST | `/admin/stars/projects/:id/assign` | 프리랜서 배정 |
| GET | `/admin/stars/reviews` | 검토 대기 목록 |
| PUT | `/admin/stars/reviews/:id/approve` | ✅ 승인 → 정산 트리거 |
| PUT | `/admin/stars/reviews/:id/reject` | ❌ 반려 |
| **재무/정산** |||
| GET | `/admin/finance/summary` | 재무 요약 |
| GET | `/admin/finance/payouts` | 정산 대기 목록 |
| POST | `/admin/finance/payouts/:id/approve` | 정산 승인 💰 |
| **클라이언트** |||
| GET | `/admin/clients` | 클라이언트 목록 |
| GET | `/admin/clients/:id` | 클라이언트 상세 |
| **사용자** |||
| GET | `/admin/users` | 전체 사용자 관리 |
| PATCH | `/admin/users/:id/role` | 사용자 권한 수정 |

---

## 5️⃣ 미디어 업로드 (Media) - Hybrid

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/uploads/presigned-put-url` | R2 직접 업로드 URL 발급 (PUT) |
| POST | `/videos/import-stream` | R2 → Stream 복사 및 인코딩 |
| GET | `/uploads/presigned` | R2 비공개 파일 접근 URL 발급 |

---

## 6️⃣ 내부 서비스 (Internal)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/media/process` | 영상 최적화 작업 (Worker) |
| POST | `/emails/send` | 알림 메일 발송 (Resend) |

---

## 🔄 핵심 워크플로우: 승인 → 정산

```
프리랜서 업로드 → 관리자 검토
                      ↓
            PUT /admin/stars/reviews/:id/approve
                      ↓
            ┌─────────┴─────────┐
            ↓                   ↓
    POST /admin/videos/:id/publish    정산 트리거
            ↓                   ↓
      영상 갤러리 공개       💰 지급 처리
```

---

## 💡 참고 사항

- 상세 Request/Response 스키마: **Swagger UI** (`/api/docs`)
- 에러 응답 형식: `{ "statusCode": 4xx, "message": "...", "error": "..." }`
