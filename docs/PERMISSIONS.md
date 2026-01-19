# 🔒 권한 및 역할

> Ask the Stars 플랫폼 RBAC (Role-Based Access Control) 문서

---

## 👥 역할 정의

| 역할 | 코드 | 설명 |
|------|------|------|
| 슈퍼 관리자 | `ADMIN` | 모든 기능 접근 가능 |
| 달 관리자 (통합) | `MOON_MANAGER` | 제작요청, 프리랜서 관리 |
| 광고 관리자 | `MOON_ADVERTISING` | 광고 캠페인 관리 |
| 피드백 관리자 | `MOON_FEEDBACK` | 영상 검수, 피드백 |
| 정산 관리자 | `MOON_SETTLEMENT` | 정산 처리, 승인 |
| 프리랜서 | `STAR` | 영상 제작, 제출 |
| 상담사 | `COUNSELOR` | 영상 요청, 통계 조회 |

---

## 🔐 역할별 권한 매트릭스

### 제작요청 (ProjectRequest)

| 권한 | ADMIN | MOON_MANAGER | STAR | COUNSELOR |
|------|:-----:|:------------:|:----:|:---------:|
| 목록 조회 | ✓ | ✓ | ✓ | - |
| 상세 조회 | ✓ | ✓ | ✓ | - |
| 생성 | ✓ | ✓ | - | - |
| 수정 | ✓ | ✓ | - | - |
| 삭제 | ✓ | ✓ | - | - |
| 수락 | - | - | ✓ | - |

---

### 제출물 (Submission)

| 권한 | ADMIN | MOON_FEEDBACK | STAR | COUNSELOR |
|------|:-----:|:-------------:|:----:|:---------:|
| 목록 조회 | ✓ | ✓ | 본인 | 본인 영상 |
| 상세 조회 | ✓ | ✓ | 본인 | 본인 영상 |
| 생성 (업로드) | - | - | ✓ | - |
| 수정 | - | - | 본인 | - |
| 상태 변경 | ✓ | ✓ | - | - |
| 승인/반려 | ✓ | ✓ | - | - |

---

### 피드백 (Feedback)

| 권한 | ADMIN | MOON_FEEDBACK | STAR | COUNSELOR |
|------|:-----:|:-------------:|:----:|:---------:|
| 목록 조회 | ✓ | ✓ | 본인 제출물 | - |
| 생성 | ✓ | ✓ | - | - |
| 수정 | ✓ | 본인 | - | - |
| 삭제 | ✓ | 본인 | - | - |
| 해결 처리 | ✓ | ✓ | - | - |

---

### 정산 (Settlement)

| 권한 | ADMIN | MOON_SETTLEMENT | STAR | COUNSELOR |
|------|:-----:|:---------------:|:----:|:---------:|
| 전체 조회 | ✓ | ✓ | - | - |
| 본인 조회 | - | - | ✓ | - |
| 생성 | ✓ | ✓ | - | - |
| 승인 | ✓ | ✓ | - | - |
| 일괄 처리 | ✓ | ✓ | - | - |

---

### 캠페인 (Campaign)

| 권한 | ADMIN | MOON_ADVERTISING | STAR | COUNSELOR |
|------|:-----:|:----------------:|:----:|:---------:|
| 목록 조회 | ✓ | ✓ | 본인 영상 | 본인 영상 |
| 생성 | ✓ | ✓ | - | - |
| 수정 | ✓ | ✓ | - | - |
| 통계 조회 | ✓ | ✓ | 본인 | 본인 |

---

## 🛡️ 가드 구현 (NestJS)

### RolesGuard

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // 역할 지정 없으면 통과
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

### Roles 데코레이터

```typescript
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

### 사용 예시

```typescript
@Controller('project-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectRequestsController {
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MOON_MANAGER)
  create(@Body() dto: CreateProjectRequestDto) {
    return this.service.create(dto);
  }

  @Post(':id/accept')
  @Roles(UserRole.STAR)
  accept(@Param('id') id: string, @User() user: UserEntity) {
    return this.service.accept(id, user.id);
  }
}
```

---

## 🌐 프론트엔드 권한 체크

### useAuth Hook

```typescript
export function useAuth() {
  const user = useAuthStore((state) => state.user);

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isMoon = () => hasRole([
    'MOON_MANAGER',
    'MOON_ADVERTISING',
    'MOON_FEEDBACK',
    'MOON_SETTLEMENT',
  ]);

  return { user, hasRole, isMoon };
}
```

### 조건부 렌더링

```tsx
function NavMenu() {
  const { hasRole } = useAuth();

  return (
    <nav>
      {hasRole(['STAR']) && (
        <Link href="/stars/dashboard">내 작업</Link>
      )}
      {hasRole(['MOON_MANAGER', 'MOON_FEEDBACK']) && (
        <Link href="/moon/feedback/review-queue">검수 대기열</Link>
      )}
    </nav>
  );
}
```

---

## 📍 라우트 보호

### Middleware (Next.js)

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  // 보호된 라우트
  const protectedPaths = ['/stars', '/moon', '/counselor'];

  if (protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}
```

---

## 📋 역할 변경 정책

1. **초기 가입**: 기본 역할 `STAR`
2. **상담사 등록**: 관리자가 `COUNSELOR`로 변경
3. **Moon 팀 추가**: 관리자가 해당 역할 부여
4. **복수 역할**: 현재 미지원 (단일 역할만)

### 역할 변경 API

```http
PATCH /users/:id/role
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "role": "MOON_FEEDBACK"
}
```
