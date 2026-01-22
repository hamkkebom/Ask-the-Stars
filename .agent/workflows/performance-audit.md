---
description: 성능 감사 수행 가이드
---

# 성능 감사 워크플로우

프로덕션 배포 전 또는 성능 이슈 발생 시 수행하는 체크리스트입니다.

## 1. 번들 사이즈 점검

```bash
# Next.js 번들 분석
pnpm build && pnpm analyze
```

- [ ] **메인 번들**: 200KB gzip 이하 유지
- [ ] **거대 라이브러리**: dynamic import 적용 여부
- [ ] **배럴 임포트**: `lucide-react`, `date-fns` 등 직접 임포트

## 2. 워터폴 패턴 스캔

```bash
# 코드베이스에서 순차 await 패턴 검색
grep -rn "await.*\nawait" apps/web/src/
```

- [ ] 독립적인 fetch에 `Promise.all()` 적용
- [ ] Suspense 경계로 스트리밍 활용

## 3. RSC 페이로드 점검

- [ ] 클라이언트 컴포넌트에 전체 객체 전달 피하기
- [ ] Field Picking 패턴 확인

## 4. 런타임 성능

- [ ] `useEffect` 의존성 배열 점검
- [ ] 불필요한 리렌더링 확인 (React DevTools)
- [ ] `memo()` 활용 여부

## 5. 참조

- [react-performance-rules.md](../docs/04-development/react-performance-rules.md)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
