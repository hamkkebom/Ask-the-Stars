# 🔐 권한 및 보안 정책 (Permissions & Security Policy)

> **Updated At**: 2026-01-19
> **Standard**: RBAC (Role-Based Access Control)

이 문서는 시스템의 사용자 권한 등급과 각 등급별 접근 가능 리소스를 정의합니다.
실제 코드(`packages/database/prisma/schema.prisma`)에 정의된 `Enum UserRole`을 기준으로 작성되었습니다.

## 👥 사용자 역할 (User Roles)

| 역할 코드 | 명칭 | 설명 | 비고 |
| :--- | :--- | :--- | :--- |
| **ADMIN** | 슈퍼 관리자 | 시스템의 모든 리소스에 대한 **완전한 접근 권한**을 가집니다. | Root 계정 |
| **MOON_MANAGER** | 달 관리자 (통합) | 광고, 피드백, 정산을 포함한 운영 전반을 관리합니다. | 운영 팀장급 |
| **MOON_FEEDBACK** | 피드백 관리자 | 영상 피드백 및 품질 관리를 전담합니다. | PD/QC팀 |
| **MOON_SETTLEMENT**| 정산 관리자 | 정산 데이터 조회 및 지급 처리를 담당합니다. | 재무팀 |
| **MOON_ADVERTISING**| 광고 관리자 | 광고 캠페인 생성 및 성과 분석을 담당합니다. | 마케팅팀 |
| **STAR** | 스타 (Creator) | 자신의 프로젝트 및 정산 내역만 조회 가능합니다. | 일반 회원 |
| **COUNSELOR** | 상담사 | 배정된 요청에 대한 상담 및 피드백을 제공합니다. | 협력 파트너 |

## 🛡️ 권한 매트릭스 (Access Control Matrix)

| 리소스 / 기능 | ADMIN/MANAGER | FEEDBACK/AD/SETTLE | STAR (User) | COUNSELOR |
| :--- | :---: | :---: | :---: | :---: |
| **사용자 관리** (계정 생성/삭제) | ✅ | ❌ | ❌ | ❌ |
| **프로젝트 생성** (공고 등록) | ✅ | ❌ | ❌ | ❌ |
| **프로젝트 지원** (제출물 업로드)| ❌ | ❌ | ✅ | ❌ |
| **피드백 작성** (영상 리뷰) | ✅ | ✅ (Feed/Mgr) | ❌ | ✅ |
| **정산 처리** (지급 승인) | ✅ | ✅ (Settle) | ❌ | ❌ |
| **정산 조회** (내 수익 확인) | ✅ | ✅ (Settle) | ✅ (본인만) | ❌ |
| **통계/대시보드** | ✅ | ✅ (담당 분야) | ❌ | ❌ |

## 🔒 보안 구현 (Security Implementation)

### 1. Backend Guard (`@Roles`)
NestJS의 `RolesGuard`를 통해 API 엔드포인트 레벨에서 접근을 제어합니다.

```typescript
// 예시: 관리자만 접근 가능
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MOON_MANAGER)
@Get('projects')
```

### 2. Frontend Protection
Next.js의 Layout 및 Protected Route 컴포넌트에서 클라이언트 측 접근을 제어합니다.
*   `/admin/*`: `ADMIN`, `MOON_*` 권한 보유자만 접근 가능
*   `/stars/*`: `STAR` 권한 보유자만 접근 가능

### 3. Data Scope
*   Prisma Query 시 `where: { userId: currentUser.id }` 조건을 강제하여, 본인의 데이터만 조회하도록 격리합니다.
