# 코딩 컨벤션

> 최종 수정일: YYYY-MM-DD

## 📌 개요

프로젝트에서 따르는 코딩 규칙을 정의합니다.

## 📁 공통 규칙

### 파일 및 폴더 명명

| 대상 | 규칙 | 예시 |
|------|------|------|
| 폴더 | kebab-case | `user-profile/` |
| 컴포넌트 파일 | PascalCase | `UserProfile.tsx` |
| 유틸리티 파일 | camelCase | `formatDate.ts` |
| 상수 파일 | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |
| 스타일 파일 | 컴포넌트명.module.css | `UserProfile.module.css` |

### 들여쓰기 및 포맷팅

- 들여쓰기: 2 spaces
- 최대 줄 길이: 100자
- 세미콜론: 필수 (TypeScript/JavaScript)
- 따옴표: 작은따옴표 (`'`)

---

## ⚛️ Frontend (TypeScript/React)

### 변수 및 함수 명명

```typescript
// 변수: camelCase
const userName = 'John';
const isLoggedIn = true;

// 상수: SCREAMING_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// 함수: camelCase, 동사로 시작
function getUserById(id: number) {}
const handleSubmit = () => {};
const fetchUserData = async () => {};

// 컴포넌트: PascalCase
function UserProfile() {}
const LoginButton: React.FC = () => {};

// 훅: use 접두사
function useAuth() {}
function useUserData(userId: string) {}

// 타입/인터페이스: PascalCase
interface UserProfile {
  id: number;
  name: string;
}

type ButtonVariant = 'primary' | 'secondary';
```

### 컴포넌트 구조

```typescript
// 1. imports
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import type { User } from '@/types';

// 2. 타입 정의
interface Props {
  user: User;
  onSave: (user: User) => void;
}

// 3. 컴포넌트
export function UserCard({ user, onSave }: Props) {
  // 3-1. 상태
  const [isEditing, setIsEditing] = useState(false);

  // 3-2. 훅
  const { data } = useUserData(user.id);

  // 3-3. 이벤트 핸들러 (handle 접두사)
  const handleClick = () => {};

  // 3-4. 렌더링
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### 금지 사항

- ❌ `any` 타입 사용 금지
- ❌ `!` 비null 단언 연산자 남용 금지
- ❌ 인라인 스타일 사용 금지
- ❌ 콘솔 로그 프로덕션 코드에 남기기 금지

---

## ☕ Backend (Java/Spring)

### 변수 및 함수 명명

```java
// 변수: camelCase
String userName = "John";
boolean isActive = true;

// 상수: SCREAMING_SNAKE_CASE
private static final int MAX_RETRY_COUNT = 3;
public static final String API_VERSION = "v1";

// 메서드: camelCase, 동사로 시작
public User getUserById(Long id) {}
private void validatePassword(String password) {}

// 클래스: PascalCase
public class UserService {}
public interface UserRepository {}

// 패키지: 소문자
package com.example.userservice;
```

### 클래스 구조

```java
@Service
@RequiredArgsConstructor
public class UserService {
    // 1. 상수
    private static final int MAX_LOGIN_ATTEMPTS = 5;
    
    // 2. 의존성 (final)
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // 3. public 메서드
    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
    
    // 4. private 메서드
    private UserDto toDto(User user) {
        // ...
    }
}
```

### 어노테이션 순서

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    // ...
}
```

### 금지 사항

- ❌ `@Autowired` 필드 주입 금지 (생성자 주입 사용)
- ❌ `System.out.println` 사용 금지 (Logger 사용)
- ❌ 하드코딩된 설정값 금지 (application.yml 사용)
- ❌ 예외 무시 금지 (catch 블록 비우기)

---

## 📝 주석 규칙

### 코드 주석

```typescript
// 한 줄 주석은 이렇게

/**
 * 여러 줄 주석은 이렇게
 * 복잡한 로직 설명할 때 사용
 */

// TODO: 나중에 구현할 기능
// FIXME: 수정이 필요한 부분
// NOTE: 참고할 내용
```

### JSDoc / JavaDoc

```typescript
/**
 * 사용자 정보를 조회합니다.
 * @param id - 사용자 ID
 * @returns 사용자 정보
 * @throws 사용자가 존재하지 않으면 예외 발생
 */
function getUserById(id: number): User {}
```

---

## 🧪 테스트 코드 규칙

### 테스트 파일 명명

- `*.test.ts` (유닛 테스트)
- `*.spec.ts` (통합 테스트)
- `*Test.java` (Java)

### 테스트 메서드 명명

```typescript
// TypeScript - describe/it 패턴
describe('UserService', () => {
  it('사용자 ID로 조회 시 사용자 정보를 반환한다', () => {});
  it('존재하지 않는 ID로 조회 시 예외를 던진다', () => {});
});
```

```java
// Java - @DisplayName 사용
@Test
@DisplayName("사용자 ID로 조회 시 사용자 정보를 반환한다")
void getUserById_ReturnsUser_WhenUserExists() {}
```

---

## ✅ 코드 리뷰 체크리스트

- [ ] 네이밍 규칙 준수
- [ ] 중복 코드 없음
- [ ] 적절한 에러 처리
- [ ] 테스트 코드 작성
- [ ] 주석 및 문서 업데이트
