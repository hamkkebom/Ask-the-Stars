# ⚡ 바로 시작하기 (Quick Start)

> **목표**: 5분 안에 로컬 개발 환경을 실행하고 "Hello World"를 확인합니다.  
> **기반**: Next.js 15 (Frontend) + NestJS 11 (Backend)

---

## 1️⃣ 사전 준비물 (Prerequisites)

*   **Node.js**: `v20.x` (LTS) - [다운로드](https://nodejs.org/)
*   **pnpm**: `v9.x` - `npm install -g pnpm`
*   **Git**: [다운로드](https://git-scm.com/)
*   **Docker** (선택): 로컬 DB/Redis 실행 시 필요

---

## 2️⃣ 실행 단계 (Steps)

### 1단계: 저장소 가져오기
```bash
git clone https://github.com/hamkkebom/Ask-the-Stars.git
cd ask-the-stars
```

### 2단계: 의존성 설치
**pnpm**을 사용하여 모노레포 전체 의존성을 한 번에 설치합니다.
```bash
pnpm install
```

### 3단계: 환경 변수 설정
기본 제공되는 예제 파일을 복사하여 설정을 완료합니다.
```bash
cp .env.example .env
```
> 💡 `.env` 값을 수정할 필요 없이, 기본값으로 로컬 개발이 가능하도록 설정되어 있습니다. (DB 제외)

### 4단계: 개발 서버 실행
프론트엔드와 백엔드를 동시에 실행합니다.
```bash
pnpm dev
```

---

## 3️⃣ 확인 (Verification)

브라우저를 열고 다음 주소로 접속하세요.

*   **Frontend**: [http://localhost:3000](http://localhost:3000)
    *   화면에 **"함께봄"** 로고가 보이면 성공!
*   **Backend API**: [http://localhost:4000/api/health](http://localhost:4000/api/health)
    *   `{"status":"ok"}` 응답이 오면 성공!

---

## 4️⃣ 다음 단계

*   [설치 가이드 (Detailed Installation)](./INSTALLATION.md): 문제가 생겼거나 상세 설정이 필요할 때
*   [로컬 환경 구성 (Local Setup)](./LOCAL_SETUP.md): DB, Docker 등 심화 설정
*   [기여 가이드 (Contributing)](../04-development/CONTRIBUTING.md): 코드 수정 규칙
