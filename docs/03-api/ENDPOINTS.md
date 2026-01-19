# 🔌 엔드포인트 목록 (API Endpoints)

> **문서 버전**: 2026-01-19
> **기반**: `docs/02-architecture/SITEMAP.md` (Functional Modules)

한깨봄 백엔드 서비스의 주요 API 엔드포인트 목록입니다. 모든 요청은 `/api` 프리픽스를 사용하며, 인증이 필요한 경우 `Authorization` 헤더를 포함해야 합니다.

---

## 1️⃣ 인증 (Auth)
*   `POST /auth/login`: 로그인 (Access/Refresh Token 발급)
*   `POST /auth/signup`: 회원가입
*   `POST /auth/logout`: 로그아웃 (Refresh Token 무효화)
*   `POST /auth/refresh`: 토큰 재발급
*   `POST /auth/forgot-password`: 비밀번호 재설정 링크 발송

---

## 2️⃣ 프리랜서 (Stars)
*   `GET /stars/projects`: 전체 제작 요청 게시판 조회
*   `GET /stars/projects/:id`: 특정 프로젝트 상세 조회
*   `POST /stars/projects/:id/apply`: 프로젝트 지원
*   `GET /stars/me/projects`: 내 참여 프로젝트 목록
*   `POST /stars/videos/upload`: 제작 완료 영상 업로드
*   `GET /stars/earnings`: 정산 내역 및 수익금 조회

---

## 3️⃣ 교육 (Education)
*   `GET /education/courses`: 등록된 교육 과정 목록
*   `POST /education/apply`: 수강 신청
*   `GET /education/me/assignments`: 내 과제 제출 현황
*   `POST /education/assignments/submit`: 과제 제출 (LMS)

---

## 4️⃣ 공모전 (Contests)
*   `GET /contests`: 공모전 목록
*   `POST /contests/entry`: 작품 출품

---

## 5️⃣ 관리자 (Admin)
*   `GET /admin/dashboard`: 통합 매출 및 운영 지표
*   `GET /admin/users`: 전체 사용자 관리
*   `PATCH /admin/users/:id/role`: 사용자 권한 수정
*   `GET /admin/finance/payouts`: 정산 승인 대기 목록
*   `POST /admin/finance/payouts/:id/approve`: 정산 승인

---

## 6️⃣ 외부 서비스 호출 (Internal)
*   `POST /media/process`: 영상 최적화 작업 (Cloud Run Worker)
*   `POST /emails/send`: 알림 메일 발송 (Resend)

---

## 💡 참고 사항
*   상세한 Request/Response 스키마는 **Swagger UI** (`/api/docs`)를 통해 확인하시기 바랍니다.
*   에러 응답 형식: `{ "statusCode": 4xx, "message": "error msg", "error": "Bad Request" }`
