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

## 3️⃣ 기타 문의

해결되지 않는 문제는 GitHub [Issues](https://github.com/hankaebom/ask-the-stars/issues)에 제보해주세요.
제보 전 **검색**을 통해 유사한 이슈가 있는지 먼저 확인 부탁드립니다.
