# 🚀 Next-Level Agentic Engineering: `agent-skills-main` 통합 로드맵

## 1. 개요 (Philosophy)
`agent-skills-main` 디렉토리는 단순한 문서 모음이 아니라, **에이전트(AI)가 고품질 코드를 생산하기 위한 지식 베이스(Knowledge Base)**입니다. 사용자의 요청에 따라, 이 리소스를 "새로운 관점(Sequential Thinking)"으로 분석하였으며, 이를 `Hankaebom-Star` 프로젝트에 내재화하여 **"스스로 진화하는 에이전트 친화적 코드베이스"**를 구축하는 방안을 제안합니다.

## 2. 분석 결과 (Key Findings)

### A. `react-best-practices/test-cases.json` (The Core)
*   **발견**: 700라인 이상의 구체적인 **Bad vs Good 코드 패턴**이 포함되어 있습니다.
*   **가치**: 일반적인 문서보다 훨씬 실질적입니다. 특히 **RSC(React Server Components) 최적화**, **Hydration Mismatch 방지**, **Non-blocking 연산(`after`)** 등 Next.js 최신 기능 활용법이 포함되어 있습니다.
*   **현재 프로젝트 대비**: `React.memo` 등은 적용했으나, `Minimize Serialization`(직렬화 최소화)나 `Flash-free Dark Mode`(스크립트 주입) 같은 고급 패턴은 아직 적용되지 않았습니다.

### B. `web-design-guidelines` (Visual Excellence)
*   **발견**: Vercel의 디자인 가이드라인 리모트 소스.
*   **가치**: 접근성, 터치 인터랙션, 타이포그래피 등의 **Global Standard**를 제공합니다.
*   **활용**: 단순 기능 구현을 넘어, "느낌 좋은(Premium)" UI를 만들기 위한 Check-list로 활용해야 합니다.

### C. `vercel-deploy-claimable` (Operations)
*   **발견**: 인증 없이 즉시 배포 가능한 워크플로우.
*   **가치**: 빠른 프로토타이핑 및 협업 시 유용합니다.

---

## 3. 제안: 단계별 적용 계획 (Adoption Roadmap)

### Phase A: 지식 내재화 (Knowledge Ingestion)
**목표**: 외부의 지식을 프로젝트 내부의 표준으로 변환합니다.
1.  **Engineering Standards 문서화**: `test-cases.json`의 내용을 바탕으로 `docs/code-patterns.md`를 생성합니다. 개발자와 에이전트가 함께 참조하는 **살아있는 코딩 표준**이 됩니다.
2.  **Anti-pattern 스캐닝**: `grep` 등을 이용해 `test-cases.json`에 정의된 Bad Pattern(예: `useEffect` 내의 불필요한 의존성, RSC 경계에서의 과도한 데이터 전송)이 현재 코드에 존재하는지 전수 검사합니다.

### Phase B: UX/UI 품질 고도화 (Visual Excellence)
**목표**: `web-design-guidelines`를 적용하여 "단단한" UI를 만듭니다.
1.  **Flash-free Dark Mode**: `globals.css`와 `layout.tsx`를 수정하여 새로고침 시 테마 깜빡임을 원천 차단하는 스크립트 주입 기법을 적용합니다 (가이드라인 권장 사항).
2.  **RSC Payload 최적화**: 서버 컴포넌트에서 클라이언트로 데이터를 넘길 때 거대한 객체를 통째로 넘기는 것을 방지하고, 필요한 필드만 `Pick`하여 넘기도록 리팩토링합니다.

### Phase C: 에이전트 네이티브 아키텍처 (Agent-First Architecture)
**목표**: `Hankaebom-Star` 프로젝트 자체를 에이전트가 다루기 최적화된 구조로 만듭니다.
1.  **Project `AGENTS.md`**: 루트에 `AGENTS.md`를 생성하여, 에이전트가 이 프로젝트에 들어왔을 때 가장 먼저 읽어야 할 아키텍처 원칙, 디렉토리 구조 의미, 배포 규칙 등을 명시합니다.
2.  **Custom Skills 정의**: 자주 반복되는 작업(예: "Portfolio 아이템 추가", "새 리포트 페이지 생성")을 `scripts/` 또는 `.agent/skills/`에 스크립트화하여, 자연어 명령 하나로 복잡한 작업이 수행되도록 자동화합니다.

### Phase D: 최신 기술 도입 (Modernization)
1.  **Non-blocking Operations**: 비동기 로깅이나 분석 데이터 전송 등에 Next.js 15의 `after()` API (또는 이에 준하는 패턴)를 도입하여 사용자 응답 속도를 극대화합니다.

---

## 4. Next Step
이 제안에 동의하신다면, **Phase A: 지식 내재화**부터 시작하여 `test-cases.json`을 분석하고 `docs/code-patterns.md`를 작성하는 작업부터 착수하겠습니다.
