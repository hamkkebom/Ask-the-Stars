# 🔧 문제 해결 (Troubleshooting)

> **문서 버전**: 2026-01-19

개발 중 자주 발생하는 문제와 해결 방법을 정리했습니다.

---

## 1️⃣ 설치 및 실행 오류

### `EACCES: permission denied`
*   **원인**: npm 전역 설치 시 권한 부족
*   **해결**:
    ```bash
    # 방법 1: sudo 사용 (Mac/Linux)
    sudo npm install -g pnpm

    # 방법 2: nvm 사용 (권장)
    # nvm으로 Node.js를 설치하면 사용자 권한으로 실행됩니다.
    ```

### `command not found: pnpm`
*   **원인**: pnpm이 PATH에 등록되지 않음
*   **해결**: `npm install -g pnpm` 재실행 또는 쉘 설정 파일(`.bashrc`, `.zshrc`) 확인

### `P1001: Can't reach database server` (Prisma)
*   **원인**: DB 컨테이너가 실행되지 않았거나 포트가 막힘
*   **해결**:
    1. `docker ps`로 `postgres` 컨테이너 실행 여부 확인
    2. `docker-compose up -d`로 재실행
    3. `.env`의 `DATABASE_URL` 포트(5432) 확인

---

## 2️⃣ 빌드 및 의존성 오류

### Turborepo 캐시 충돌
*   **증상**: 코드 변경이 반영되지 않거나 이상한 타입 에러 발생
*   **해결**:
    ```bash
    # 전체 초기화 및 재설치
    rm -rf node_modules
    rm -rf apps/*/node_modules
    pnpm install
    ```

### Hydration Mismatch (Next.js)
*   **증상**: `Text content does not match server-rendered HTML` 경고
*   **원인**: 서버(SSR)와 클라이언트(CSR)의 렌더링 결과가 다름 (예: `Date.now()`, `Math.random()`)
*   **해결**: `useEffect`에서만 랜덤 값을 사용하거나, `suppressHydrationWarning` 속성 사용

---

## 3️⃣ 배포 및 인프라 오류

### Vercel 배포 후 404 에러 (Routes Manifest)
*   **증상**: 빌드는 성공했으나 접속 시 Vercel 404 발생
*   **원인**: 
    1.  Root Directory 설정과 `vercel.json`의 `outputDirectory` 경로가 중복됨 (예: `apps/web/apps/web/.next`)
    2.  Vercel 프로젝트 설정에 도메인이 연결되지 않음
*   **해결**: 
    1.  루트의 `vercel.json` 삭제 (UI 설정 사용 권장)
    2.  **Root Directory**를 `apps/web`으로 설정할 경우, **Output Directory**는 `Default`로 두어야 함
    3.  "Include files outside of the root directory..." 옵션 활성화

### `ERR_IMPORT_ATTRIBUTE_MISSING` (Node v22)
*   **증상**: GitHub Actions에서 `.eslintrc.json` 임포트 시 에러 발생
*   **원인**: Node.js v22부터 ESM 모델에서 JSON 임포트 시 명시적인 `type: "json"` 속성이 필수임
*   **해결**: 
    1.  Node.js 버전을 우리 프로젝트 권장 버전인 **v20 (LTS)**으로 하향 조정
    2.  또는 `.eslintrc.json`을 `.eslintrc.cjs`로 변환하여 모듈 형식으로 사용

### Vercel 'Root Directory' 공백 에러
*   **증상**: `Directory not found` 에러 발생
*   **원인**: Vercel UI에서 Root Directory 입력 시 앞뒤에 공백(Space)이 포함된 경우
*   **해결**: 입력 칸에서 모든 공백을 제거하고 `apps/web`만 입력

---

## 4️⃣ 기타 문의

해결되지 않는 문제는 GitHub [Issues](https://github.com/hamkkebom/Ask-the-Stars/issues)에 제보해주세요.
제보 전 **검색**을 통해 유사한 이슈가 있는지 먼저 확인 부탁드립니다.
