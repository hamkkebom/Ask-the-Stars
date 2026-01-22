# 🚀 React 성능 최적화 룰

> **출처**: [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills)
> **적용 대상**: Next.js 15+ / React 19
> **업데이트**: 2026-01-22

---

## 🔴 CRITICAL 우선순위 (반드시 적용)

### 1. 워터폴(Waterfall) 제거: `Promise.all()` 사용

독립적인 비동기 작업은 순차 실행 대신 **병렬 실행**합니다.

```typescript
// ❌ 나쁜 예: 순차 실행 (3번의 왕복)
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()

// ✅ 좋은 예: 병렬 실행 (1번의 왕복)
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

**효과**: 2~10배 성능 향상

---

### 2. 배럴 파일(Barrel Import) 회피

`index.js`에서 re-export하는 형태(배럴 파일)는 불필요한 모듈을 로드합니다.

```typescript
// ❌ 나쁜 예: 전체 라이브러리 로드 (1,583개 모듈)
import { Check, X, Menu } from 'lucide-react'

// ✅ 좋은 예: 필요한 모듈만 로드
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
```

**대안** (Next.js 13.5+):
```javascript
// next.config.ts
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}
```

**효과**: 콜드 스타트 40% 개선, 빌드 28% 단축

---

## 🟠 HIGH 우선순위

### 3. RSC 경계에서 직렬화 최소화 (Field Picking)

서버-클라이언트 경계에서는 필요한 필드만 전달합니다.

```typescript
// ❌ 나쁜 예: 50개 필드 전체 전달
async function Page() {
  const user = await fetchUser() // 50개 필드
  return <Profile user={user} />
}

// ✅ 좋은 예: 필요한 필드만 전달
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}
```

**효과**: HTML 페이로드 크기 감소

---

### 4. 비차단 부수효과: `after()` 사용 (Next.js 15+)

로깅, 분석 등은 응답 후에 실행합니다.

```typescript
// ❌ 나쁜 예: 응답 차단
export async function POST(request: Request) {
  await updateDatabase(request)
  await logUserAction({ userAgent }) // 응답 지연
  return Response.json({ status: 'success' })
}

// ✅ 좋은 예: 응답 후 실행
import { after } from 'next/server'

export async function POST(request: Request) {
  await updateDatabase(request)
  after(() => logUserAction({ userAgent })) // 응답 후 실행
  return Response.json({ status: 'success' })
}
```

**용도**: 분석, 로깅, 캐시 무효화, 알림

---

## 🟡 MEDIUM 우선순위

### 5. 이펙트 의존성 좁히기

객체 전체 대신 필요한 필드만 의존성으로 설정합니다.

```typescript
// ❌ 나쁜 예
useEffect(() => console.log(user.id), [user])

// ✅ 좋은 예
useEffect(() => console.log(user.id), [user.id])
```

### 6. 지연 상태 초기화

비용이 큰 계산은 함수로 전달합니다.

```typescript
// ❌ 나쁜 예: 매 렌더링마다 실행
const [state] = useState(heavyComputation())

// ✅ 좋은 예: 최초 1회만 실행
const [state] = useState(() => heavyComputation())
```

### 7. 명시적 조건부 렌더링

`&&`의 falsy 동작 주의 (`0`이 렌더링됨).

```tsx
// ❌ 나쁜 예
{count && <span>{count}</span>}

// ✅ 좋은 예
{count > 0 ? <span>{count}</span> : null}
```

---

## 📚 참조

- [Vercel Blog: Package Imports Optimization](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [Next.js Docs: after()](https://nextjs.org/docs/app/api-reference/functions/after)
- 전체 룰: `agent-skills-main/skills/react-best-practices/rules/`
