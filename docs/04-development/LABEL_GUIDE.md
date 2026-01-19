# 🏷️ 라벨 관리 가이드 (Label Guide)

> **문서 버전**: 2026-01-19
> **대상**: 프로젝트 관리자 및 기여자

모노레포 환경에서 이슈와 Pull Request를 효율적으로 관리하기 위해 표준 라벨 시스템을 사용합니다.

---

## 🎨 라벨 체계 (Label Schema)

### 1. 유형 (Type) - `type:*`

작업의 성격을 정의합니다.

* `type:feat`: ✨ 새로운 기능 추가
* `type:fix`: 🐛 버그 수정
* `type:docs`: 📚 문서 수정
* `type:refactor`: ⚙️ 코드 리팩토링
* `type:style`: 🎨 UI/UX 디자인 수정
* `type:test`: 🧪 테스트 코드 추가

### 2. 영역 (Area) - `area:*`

영향을 받는 범위를 그룹화합니다. (모노레포 필수)

* `area:web`: 프론트엔드 (Next.js)
* `area:api`: 백엔드 (NestJS)
* `area:ui`: 공유 UI 패키지
* `area:infra`: 인프라 (Vercel, Cloud Run)
* `area:docs`: 공통 문서

### 3. 우선순위 (Priority) - `p:*`

수행 급박도를 나타냅니다.

* `p:critical`: 🚨 즉시 해결 필요 (Hotfix)
* `p:high`: 🚀 이번 스프린트 내 완료
* `p:medium`: 📅 일상적인 작업
* `p:low`: ☕ 시간 날 때 진행

---

## 🚀 라벨 적용 자동화 (Tips)

* **GitHub Actions**: PR 생성 시 파일 경로를 분석하여 `area:*` 라벨을 자동으로 부여할 예정입니다.
* **Issue Templates**: 제보 시 선택한 템플릿에 따라 `type:*` 라벨이 기본 부여됩니다.

---

> **관리자 확인**: GitHub 저장소 설정에서 위 라벨들을 생성하여 색상을 지정해 주세요.
