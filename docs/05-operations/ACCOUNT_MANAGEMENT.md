# 🔐 계정 및 서비스 관리 대장 (Account Management)

프로젝트 **'별들에게 물어봐 (Ask the Stars)'** 운영을 위해 생성된 외부 서비스 계정 및 비용 정보를 정리한 문서입니다.
모든 서비스는 초기 **Free Tier (무료 요금제)**를 기준으로 설정되었으나, 서비스 규모 성장에 따라 비용이 발생할 수 있습니다.

> **⚠️ 보안 주의**: 비밀번호나 API Key와 같은 민감 정보는 절대 이 문서에 직접 기록하지 마세요. 해당 정보는 `.env` 파일이나 비밀번호 관리 도구를 이용해야 합니다.

---

## 1. 인프라 및 호스팅 (Infrastructure)

| 서비스명 | 용도 | 사용 플랜 / 비용 구조 | 관리 콘솔 링크 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Google Cloud Platform (GCP)** | 백엔드 서버(Cloud Run), 컨테이너 저장소, 로깅 | **Pay-as-you-go**<br>- Cloud Run: 월 200만 요청 무료<br>- Artifact Registry: 저장 용량당 과금 | [GCP Console](https://console.cloud.google.com/) | 프로젝트 ID: `ask-the-stars-484712` |
| **Vercel** (오픈 예정) | 프론트엔드 웹 호스팅 | **Hobby (무료)**<br>- 비상업적 개인 사용 기준 무료 | [Vercel Dashboard](https://vercel.com/dashboard) | GitHub 계정 연동 예정 |
| **GitHub** | 소스 코드 저장소, 버전 관리 | **Free**<br>- 프라이빗 리포지토리 무료 | [Repository](https://github.com/leekyungsu/Ask-the-Stars) | |

## 2. 데이터베이스 및 스토리지 (Data & Storage)

| 서비스명 | 용도 | 사용 플랜 / 비용 구조 | 관리 콘솔 링크 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase** | 메인 데이터베이스 (PostgreSQL), 사용자 인증 (Auth) | **Free Plan**<br>- DB: 500MB 저장공간<br>- 월 5만 활성 사용자(MAU) | [Supabase Dasboard](https://supabase.com/dashboard/projects) | |
| **Cloudflare R2** | 이미지/파일 저장소 (AWS S3 대체) | **Free Tier**<br>- 월 10GB 저장 무료<br>- A/B Class 작업 요청 제한 있음 | [Cloudflare Dash](https://dash.cloudflare.com/) | 버킷명: `ask-the-stars-r2` |
| **Upstash** | Redis (작업 큐, 캐싱) | **Free Plan**<br>- 일일 10,000 명령 무료 | [Upstash Console](https://console.upstash.com/) | |

## 3. 기능형 서비스 (Features)

| 서비스명 | 용도 | 사용 플랜 / 비용 구조 | 관리 콘솔 링크 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **Cloudflare Stream** | 동영상 업로드, 인코딩, 스트리밍 | **Pay-as-you-go**<br>- 저장: 분당 $0.005/월 (약 6원)<br>- 시청: 분당 $0.001 (약 1.2원) | [Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream) | **비용 발생 주의**<br>영상 길이에 비례해 과금 |
| **Resend** | 트랜잭션 이메일 발송 (가입 환영, 알림) | **Free Plan**<br>- 월 3,000건 무료<br>- 일일 100건 제한 | [Resend Dashboard](https://resend.com/overview) | 도메인: `hamkkebom.com` |
| **Sentry** | 에러 모니터링 및 로깅 | **Developer (무료)**<br>- 개인 개발자용 무료 플랜 | [Sentry Projects](https://sentry.io/projects/) | |

---

## 📅 주요 결제 및 갱신 체크리스트

- [ ] **도메인 (hamkkebom.com)**: 매년 갱신 필요 (구매처 확인 필요)
- [ ] **Google Cloud**: 무료 크레딧 만료일 확인 (신규 가입 시 90일/$300)
- [ ] **Cloudflare Stream**: 선불 크레딧 충전 방식이 아닌 후불제이므로 카드 등록 상태 확인 필요

## 🔑 계정정보 관리 (메모용)

*이 곳에는 ID(이메일)만 기록하고, 비밀번호는 기록하지 마세요.*

- **대표 관리자 이메일**: `(사용자 이메일)`
- **GCP 계정**: `(사용자 이메일)`
- **GitHub 계정**: `leekyungsu`
