# 📦 설치 가이드 (Installation)

> **문서 버전**: 2026-01-19 (기반: `docs/02-architecture/TECH_STACK.md`)

이 문서는 한깨봄 프로젝트의 개발 환경을 구축하기 위한 상세 설치 가이드입니다. 

---

## 1️⃣ 필수 도구 설치

모노레포 환경을 위해 다음 도구들이 필수적으로 요구됩니다.

### Node.js (LTS v22.x)
최신 LTS 버전을 사용합니다.
*   **Windows/Mac**: [Node.js 공식 홈페이지에서 다운로드](https://nodejs.org/)
*   **Linux (Ubuntu)**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
*   **버전 확인**:
    ```bash
    node -v
    # v22.x.x 출력 확인
    ```

### pnpm (Package Manager)
Turborepo와의 호환성 및 속도를 위해 `pnpm`을 사용합니다.
```bash
npm install -g pnpm
pnpm -v
# 9.x.x 확인
```

---

## 2️⃣ 프로젝트 클론 및 의존성

### 저장소 가져오기
```bash
git clone https://github.com/hankaebom/ask-the-stars.git
cd ask-the-stars
```

### 의존성 설치
루트 디렉토리에서 실행하면 `apps`와 `packages`의 모든 의존성이 설치됩니다.
```bash
pnpm install
```

---

## 3️⃣ 문제 해결 (Common Installation Issues)

### `EACCES` 오류 (권한 문제)
`npm install -g` 시 권한 오류가 발생하면 `sudo`를 사용하거나 `nvm` 사용을 권장합니다.

### Turborepo 캐시 문제
빌드가 꼬였을 때는 캐시를 삭제하고 다시 시도하세요.
```bash
rm -rf node_modules
rm -rf apps/web/node_modules
rm -rf apps/api/node_modules
pnpm install
```
