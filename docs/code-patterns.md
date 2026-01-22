# 한깨봄-스타(Hankaebom-Star) 엔지니어링 표준 및 코드 패턴

이 문서는 한깨봄-스타 프로젝트의 공식 코딩 표준을 정의합니다. `agent-skills-main` 저장소와 Vercel의 권장 사항을 기반으로 작성되었습니다. **AI 에이전트와 개발자는 반드시 이 패턴을 준수해야 합니다.**

## 1. 리액트 서버 컴포넌트(RSC) 및 성능

### API 라우트에서의 워터폴(Waterfall) 체인 방지
❌ **나쁜 예**: 서로 의존성이 없는 데이터를 순차적으로 기다리는 경우.
```typescript
const config = await fetchConfig()
const data = await fetchData(session.user.id) // config가 완료될 때까지 대기함
```

✅ **좋은 예**: 프로미스를 동시에 시작하거나 `Promise.all`을 사용함.
```typescript
const [config, data] = await Promise.all([
  fetchConfig(),
  fetchData(session.user.id)
])
```

### RSC 경계에서의 직렬화 최소화
❌ **나쁜 예**: 몇 개의 필드만 필요한데 클라이언트 컴포넌트로 거대한 객체를 전달하는 경우.
```typescript
// 서버 컴포넌트
const user = await fetchUser() // 50개 이상의 필드 포함
return <Profile user={user} />
```

✅ **좋은 예**: 원시 타입(primitives)이나 필요한 필드만 전달함 (Field Picking).
```typescript
// 서버 컴포넌트
const user = await fetchUser()
return <Profile name={user.name} />
```

### `after()`를 이용한 비차단(Non-Blocking) 작업
❌ **나쁜 예**: 중요하지 않은 부수 효과(로깅, 분석 등) 때문에 응답을 차단하는 경우.
```typescript
await updateDatabase(request)
await logUserAction() // 응답을 차단함
return Response.json(...)
```

✅ **좋은 예**: `after()` (Next.js 15+) 또는 백그라운드 워커를 사용함.
```typescript
import { after } from 'next/server'
await updateDatabase(request)
after(() => logUserAction()) // 응답이 전송된 후 실행됨
return Response.json(...)
```

## 2. 리액트 렌더링 및 하이드레이션(Hydration)

### 하이드레이션 불일치 방지 (깜빡임 제거)
❌ **나쁜 예**: 초기 렌더링이나 `useEffect`에서 `localStorage`를 읽어오는 경우 (화면 깜빡임 발생).
```tsx
const [theme, setTheme] = useState('light')
useEffect(() => { setTheme(localStorage.getItem('theme')) }, [])
// 'light'가 보였다가 'dark'로 바뀜
```

✅ **좋은 예**: 즉각적인 적용을 위해 스크립트 주입(Script Injection)을 사용함.
```tsx
<script dangerouslySetInnerHTML={{ __html: `...localstorage에서 클래스 설정...` }} />
```

### 명시적 조건부 렌더링
❌ **나쁜 예**: 숫자의 falsy 동작에 의존하는 경우 (`0`이 렌더링됨).
```tsx
{count && <span>{count}</span>} // count가 0일 때 "0"이 화면에 나타남
```

✅ **좋은 예**: 명시적인 비교 연산 사용.
```tsx
{count > 0 ? <span>{count}</span> : null}
```

## 3. 상태 관리 및 이펙트(Effects)

### 지연 상태 초기화 (Lazy State Initialization)
❌ **나쁜 예**: 렌더링할 때마다 비용이 큰 계산을 수행하는 경우.
```tsx
const [state] = useState(heavyComputation()) // 매 렌더링마다 실행됨!
```

✅ **좋은 예**: `useState`에 함수를 전달함.
```tsx
const [state] = useState(() => heavyComputation()) // 최초 1회만 실행됨
```

### 이펙트 의존성 범위 좁히기
❌ **나쁜 예**: 객체 전체를 의존성으로 설정하는 경우.
```tsx
useEffect(() => console.log(user.id), [user]) // user 객체의 어떤 필드라도 바뀌면 실행됨
```

✅ **좋은 예**: 원시 타입 필드만 의존성으로 설정함.
```tsx
useEffect(() => console.log(user.id), [user.id])
```

## 4. 현대적인 자바스크립트 및 최적화

### O(1) 조회를 위해 `Set`/`Map` 사용
❌ **나쁜 예**: 루프 안에서 `Array.includes` 사용 (O(N^2)).
```typescript
items.filter(item => allowedIds.includes(item.id))
```

✅ **좋은 예**: Set을 미리 생성함 (O(N)).
```typescript
const allowedSet = new Set(allowedIds)
items.filter(item => allowedSet.has(item.id))
```

### 배럴 파일(Barrel File) 임포트 피하기
❌ **나쁜 예**: 라이브러리의 루트에서 임포트하는 경우 (트리 쉐이킹이 깨질 수 있음).
```typescript
import { Check } from 'lucide-react'
```

✅ **좋은 예**: 서브경로에서 직접 임포트함 (SWC 자동 최적화를 사용하지 않는 경우).
```typescript
import Check from 'lucide-react/dist/esm/icons/check'
```

---

*이 문서는 살아있는 표준입니다. 새로운 패턴이 도입될 때마다 업데이트하세요.*
