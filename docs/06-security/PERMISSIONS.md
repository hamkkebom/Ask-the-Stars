# 🔐 권한 및 보안 정책 (Permissions & Security Policy)

> **Updated At**: 2026-01-29
> **Standard**: RBAC (Role-Based Access Control)
> **플랫폼 비전**: 영상 갤러리 + 프리랜서 + 관리자

이 문서는 시스템의 사용자 권한 등급과 각 등급별 접근 가능 리소스를 정의합니다.

---

## 👥 사용자 역할 (User Roles)

| 역할 코드 | 명칭 | 설명 | 비고 |
| :--- | :--- | :--- | :--- |
| **ADMIN** | 관리자 | 시스템의 모든 리소스에 대한 **완전한 접근 권한** | Root 계정 |
| **STAR** | 프리랜서 | 자신의 프로젝트, 영상, 정산만 조회/관리 가능 | 영상 제작자 |
| **CLIENT** | 클라이언트 | 의뢰 요청 (관리자에게 연락) | 일반 회원 |

---

## 🛡️ 권한 매트릭스 (Access Control Matrix)

| 리소스 / 기능 | ADMIN | STAR | CLIENT |
| :--- | :---: | :---: | :---: |
| **영상 갤러리** (조회) | ✅ | ✅ | ✅ |
| **사용자 관리** (계정 생성/삭제) | ✅ | ❌ | ❌ |
| **프로젝트 생성** (의뢰 등록) | ✅ | ❌ | ❌ |
| **프로젝트 지원** (수락/제작) | ❌ | ✅ | ❌ |
| **영상 업로드** | ❌ | ✅ | ❌ |
| **영상 수정** (제목/썸네일/파일) | ❌ | ✅ (본인만) | ❌ |
| **피드백 작성** (영상 리뷰) | ✅ | ❌ | ❌ |
| **검수/승인** | ✅ | ❌ | ❌ |
| **정산 처리** (지급 승인) | ✅ | ❌ | ❌ |
| **정산 조회** (수익 확인) | ✅ | ✅ (본인만) | ❌ |
| **통계/대시보드** | ✅ | ✅ (본인만) | ❌ |

---

## 🔒 보안 구현 (Security Implementation)

### 1. Backend Guard (`@Roles`)

NestJS의 `RolesGuard`를 통해 API 엔드포인트 레벨에서 접근을 제어합니다.

```typescript
// 예시: 관리자만 접근 가능
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin/stars')
findAllStars() { ... }

// 예시: 프리랜서만 접근 가능
@Roles(UserRole.STAR)
@Get('stars/me/videos')
getMyVideos() { ... }
```

### 2. Frontend Protection

Next.js의 Layout 및 Protected Route 컴포넌트에서 클라이언트 측 접근을 제어합니다.

| 경로 | 접근 가능 역할 |
|------|---------------|
| `/admin/*` | ADMIN |
| `/stars/*` | STAR |
| `/videos/*` | 모든 사용자 |

### 3. Data Scope

Prisma Query 시 본인 데이터만 조회하도록 격리합니다.

```typescript
// 프리랜서: 본인 영상만 조회
this.prisma.video.findMany({
  where: { uploaderId: currentUser.id }
})
```

---

## 🔄 승인 → 정산 플로우

```
프리랜서 업로드 → 관리자 검토
                      ↓
          PUT /admin/stars/reviews/:id/approve (ADMIN만)
                      ↓
            ┌─────────┴─────────┐
            ↓                   ↓
    영상 갤러리 공개        정산 트리거
            ↓                   ↓
       방문자 시청         💰 지급 처리
```
