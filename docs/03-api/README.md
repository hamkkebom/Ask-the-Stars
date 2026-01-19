# 📡 API 명세서 (API Reference)

> **Updated At**: 2026-01-19
> **Base URL**: `https://api.hamkkebom.com/api`
> **Format**: JSON

이 문서는 NestJS 컨트롤러 코드(`apps/api/src/**/*.controller.ts`)를 기반으로 작성된 **실제 API 명세**입니다.

## 🔐 Authentication (인증)

모든 인증은 `Bearer Token` 방식을 사용합니다. (회원가입/로그인 제외)

```bash
Authorization: Bearer <ACCESS_TOKEN>
```

### Endpoints

#### `POST /auth/signup`
새로운 사용자를 등록합니다.

*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "secureUnknown",
      "name": "홍길동",
      "role": "STAR"
    }
    ```

#### `POST /auth/login`
이메일과 비밀번호로 로그인하여 토큰을 발급받습니다.

*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
*   **Response**: `accessToken`, `refreshToken` 포함

#### `POST /auth/logout`
현재 사용자의 리프레시 토큰을 무효화하여 로그아웃합니다.

#### `POST /auth/refresh`
만료된 액세스 토큰을 갱신합니다.

#### `GET /auth/me`
현재 로그인한 사용자의 프로필 정보를 조회합니다.

---

## 👤 Users (사용자)

#### `GET /users/profile`
자신의 상세 프로필 정보를 조회합니다.

#### `PATCH /users/profile`
자신의 프로필 정보(이름, 바이오, 프로필 이미지 등)를 수정합니다.

---

## 📁 Projects (제작 요청)

#### `POST /projects`
(관리자 전용) 새로운 프로젝트/제작 요청을 생성합니다.

#### `GET /projects`
사용 가능한 프로젝트 목록을 조회합니다. 필터링 쿼리 파라미터를 지원합니다.

#### `GET /projects/:id`
특정 프로젝트의 상세 정보를 조회합니다.

---

## 🎬 Submissions (제출물)

#### `POST /submissions`
프로젝트에 대한 영상 제출물을 업로드합니다.

*   **Body**:
    ```json
    {
      "assignmentId": "cl...",
      "videoUrl": "https://cdn...",
      "versionSlot": 1
    }
    ```

#### `GET /submissions`
내가 제출한(혹은 관리하는) 제출물 목록을 조회합니다.

#### `PATCH /submissions/:id`
제출물의 상태를 변경하거나 버전을 업데이트합니다.

---

## 💬 Feedback (피드백)

#### `POST /feedbacks`
제출물에 대한 피드백(타임스탬프 포함)을 생성합니다.

#### `GET /feedbacks`
특정 제출물에 달린 피드백 목록을 조회합니다.

#### `PATCH /feedbacks/:id`
피드백 내용을 수정하거나 해결(RESOLVED) 처리합니다.
