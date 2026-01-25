# 🛠️ 라이브 환경 연동 오류 및 배포 문제 분석 보고서

**작성일**: 2026-01-23 21:48
**상태**: ✅ 해결 완료 (정상 작동 중)

---

## 1. 라이브 사이트 장애 분석 (Videos Grid)

### 발생 현황
- `https://www.hamkkebom.com/videos` 접속 시 영상 목록이 "Total 0 / 542"로 표시되며 데이터 로드 실패.
- 브라우저 콘솔에서 DNS 및 CORS 관련 에러 메시지 다수 발생.

### 실제 오류 원인
1. **API 도메인 오타 (DNS Error)**:
   - **현상**: 프론트엔드가 `api.hamkaebom.com` (k 하나)으로 요청을 보내고 있으나 실제 도메인은 `api.hamkkebom.com`임.
   - **결과**: `net::ERR_NAME_NOT_RESOLVED` 발생.
2. **CORS 헤더 구성 오류**:
   - **현상**: 서버가 `Access-Control-Allow-Origin` 헤더에 허용된 모든 오리진을 쉼표로 구분하여 응답함.
   - **결과**: 브라우저 보안 정책에 따라 다중 값 전달이 거부되어 통신 차단.

### 조치 사항
- [x] 프론트엔드 내 하드코딩된 오타 수정 및 Vercel 환경 변수(`NEXT_PUBLIC_API_URL`) 수정 안내.
- [x] 백엔드 CORS 설정을 '함수 기반 오리진 매칭'으로 변경하여 요청된 단일 도메인만 응답하도록 수정.
- [x] 버전 범프(v1.0.1)를 통한 전체 빌드 트리거.

---

## 2. 수동 배포 과정 및 빌드 오류

### 진행 상황
- 자동 배포(GitHub Actions) 지연으로 인해 `Google Cloud Run` 수동 배포(`gcloud run deploy`) 시도.

### 의심되는 빌드 오류 및 실제 로그 분석
현재 Cloud Run 빌드(`gcloud builds`) 단계에서 **Exit Code 1**로 실패 발생.

#### 의심 원인 (Hypothesis)
1. **Dockerfile 의존성 누락**: `pnpm install` 단계에서 모노레포(`packages/*`)의 로컬 종속성 참조가 빌드 컨테이너 내에서 깨졌을 가능성.
2. **Prisma Client 생성 실패**: 스키마 파일 경로가 컨테이너 빌드 환경에서 소스 코드 상의 경로와 다를 수 있음.
3. **Node.js 버전 불일치**: `node:22` 이미지를 사용 중이나, 특정 패키지가 하위 버전의 Node.js를 요구하여 충돌 가능성.

#### 실제 로그 확인 내용 (원인 파악 완료)
- **1차 고비 (빌드 실패)**: `pnpm-lock.yaml` 누락 -> 루트 디렉토리 빌드로 해결.
- **2차 고비 (실행 실패)**: `Error: Cannot find module '/app/apps/api/dist/main'`
  - **상세 원인**: NestJS 모노레포 빌드 시 결과물 경로와 Dockerfile의 `WORKDIR` 및 `CMD` 경로가 불일치하여 발생.
  - **조치**: Dockerfile의 `WORKDIR`을 `apps/api`로 변경하고 `CMD`를 상대 경로(`dist/apps/api/src/main.js`)로 수정하여 배포 성공.

---

## 3. 최종 검증 결과
- **백엔드**: `https://api.hamkkebom.com/api/videos` 정상 데이터 반환 (Status 200).
- **프론트엔드**: `https://www.hamkkebom.com/videos` 접속 시 리스트 정상 출력 및 CORS 오류 해결 확인.
- **영상 데이터**: 현재 DB 내 "FINAL" 상태인 영상(1개)이 정상적으로 렌더링됨.
