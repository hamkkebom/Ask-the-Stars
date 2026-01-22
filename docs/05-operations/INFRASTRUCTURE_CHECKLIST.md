# 🛠️ 인프라 세팅 가이드 (Step-by-Step)

> **목적**: 함께봄 플랫폼 인프라를 처음부터 설정하거나 검증하는 상세 가이드
> ### 보안 및 백업
: Vercel DNS (가비아에서 마이그레이션 완료)
> **예상 소요 시간**: 신규 세팅 ~2시간 / 검증만 ~30분
> **마지막 업데이트**: 2026-01-20

---

## 📋 목차 (작업 순서)

1. [Vercel DNS 설정](#1-vercel-dns-설정) - 10분 ✅
2. [Vercel 프론트엔드](#2-vercel-프론트엔드) - 15분 ✅
3. [Firebase Hosting](#3-firebase-hosting-api-프록시) - 10분 ✅
4. [Google Cloud Run](#4-google-cloud-run-백엔드) - 20분
5. [Supabase Database](#5-supabase-database) - 10분 ✅
6. [Cloudflare R2/Stream](#6-cloudflare-r2stream) - 15분 ✅
7. [Upstash Redis](#7-upstash-redis) - 5분 ✅
8. [Resend Email](#8-resend-email) - 10분 ✅
9. [Sentry Monitoring](#9-sentry-monitoring) - 10분

---

## 1. Vercel DNS 설정

> ⏱️ **예상 시간**: 10분
> ✅ **현재 상태**: Vercel DNS로 마이그레이션 완료

### 1-1. Vercel Domains 접속

1. [https://vercel.com/dashboard](https://vercel.com/dashboard) 접속
2. 상단 메뉴에서 **[Domains]** 클릭 (프로젝트 밖에서)
3. `hamkkebom.com` 선택

### 1-2. 현재 DNS Records (2026-01-20 확인)

**Domains > hamkkebom.com > DNS Records**

| 타입 | 이름 | 값 | 용도 | 상태 |
|:----:|------|---|------|:----:|
| ALIAS | `@` | `2e690f5ceb2f61df.vercel-dns-017.com` | 루트 도메인 | ✅ 자동 |
| ALIAS | `*` | `cname.vercel-dns-017.com` | 와일드카드 | ✅ 자동 |
| A | `api` | `64.29.17.65` | Firebase API | ✅ |
| CAA | `@` | `0 issue "letsencrypt.org"` | SSL 인증서 | ✅ 자동 |
| TXT | `resend._domainkey` | DKIM 키 | 이메일 인증 | ✅ |
| MX | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` (Priority: 10) | 이메일 수신 | ✅ |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF | ✅ |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | DMARC | ✅ |

### 1-3. 레코드 설명

#### 웹사이트 (Vercel 자동 관리)
- `@` ALIAS → 루트 도메인 `hamkkebom.com`
- `*` ALIAS → 와일드카드 (모든 서브도메인)
- CAA → SSL 인증서 발급 권한

#### API (Firebase → Cloud Run)
- `api` A → Firebase Hosting IP

#### 이메일 (Resend via Amazon SES)
- `resend._domainkey` TXT → DKIM 서명
- `send` MX → 이메일 수신 서버
- `send` TXT → SPF 인증
- `_dmarc` TXT → DMARC 정책
|:----:|------|---|
| TXT | `resend._domainkey` | Resend에서 제공한 DKIM 키 |
| TXT | `@` | `v=spf1 include:_spf.resend.com ~all` |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

### 1-5. DNS 전파 확인

```bash
# 네임서버 확인 (Vercel 확인)
nslookup -type=NS hamkkebom.com

# 예상 결과
# ns1.vercel-dns.com
# ns2.vercel-dns.com
```

---

## 2. Vercel 프론트엔드

> ⏱️ **예상 시간**: 15분
> ✅ **현재 상태**: 프로젝트 연결됨, 도메인 설정됨

### 2-1. 프로젝트 접속

1. [https://vercel.com/dashboard](https://vercel.com/dashboard) 접속
2. `ask-the-stars` 프로젝트 클릭

### 2-2. 도메인 확인 ✅

**Settings > Domains**

| 도메인 | 상태 | 설명 |
|--------|:----:|------|
| `www.hamkkebom.com` | ✅ Production | 메인 도메인 |
| `hamkkebom.com` | ✅ 307 Redirect | www로 리다이렉트 |
| `ask-the-stars-kappa.vercel.app` | ✅ Production | Vercel 기본 |

### 2-3. 환경변수 설정

**Settings > Environment Variables**

| 변수명 | 값 | 환경 | 상태 |
|--------|---|------|:----:|
| `NEXT_PUBLIC_API_URL` | `https://api.hamkkebom.com` | All | 🔲 |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | All | 🔲 |
| `DATABASE_URL` | Supabase 연결 문자열 | All | 🔲 |

### 2-4. 배포

```bash
# Git push로 자동 배포
git push origin main

# 또는 수동 배포
vercel --prod
```

### 2-5. 검증

```bash
curl -I https://www.hamkkebom.com
# HTTP/2 200 이면 성공
```

---

## 3. Firebase Hosting (API 프록시)

> ⏱️ **예상 시간**: 10분
> ✅ **현재 상태**: 프로젝트 존재, Rewrite 설정됨

### 3-1. Firebase Console 로그인

1. [https://console.firebase.google.com/](https://console.firebase.google.com/) 접속
2. `ask-the-stars-484712` 프로젝트 선택

### 3-2. Hosting 상태 확인

**빌드 > Hosting**

| 도메인 | 상태 |
|--------|:----:|
| `ask-the-stars-484712.web.app` | ✅ |
| `api.hamkkebom.com` | 🔲 커스텀 도메인 연결 확인 |

### 3-3. 커스텀 도메인 연결 (api.hamkkebom.com)

> [!NOTE]
> Vercel DNS를 사용하므로 Firebase에서 제공하는 DNS 레코드를 **Vercel DNS Records**에 추가해야 합니다.

1. Firebase Hosting > **커스텀 도메인 추가**
2. `api.hamkkebom.com` 입력
3. Firebase가 제공하는 레코드를 복사
4. **Vercel > Domains > hamkkebom.com > DNS Records**에 추가

### 3-4. firebase.json 확인 ✅

```json
{
  "hosting": {
    "rewrites": [{
      "source": "**",
      "run": {
        "serviceId": "ask-the-stars-api",
        "region": "asia-northeast3"
      }
    }]
  }
}
```

### 3-5. 배포

```bash
firebase deploy --only hosting
```

---

## 4. Google Cloud Run 백엔드

> ⏱️ **예상 시간**: 20분

### 4-1. GCP Console 접속

1. [https://console.cloud.google.com/run](https://console.cloud.google.com/run) 접속
2. 프로젝트: `ask-the-stars-484712`

### 4-2. 서비스 상태

| 항목 | 기대값 | 상태 |
|------|--------|:----:|
| 서비스 | `ask-the-stars-api` | 🔲 |
| 리전 | `asia-northeast3` (서울) | ✅ |

### 4-3. 환경변수

| 변수 | 설명 | 상태 |
|------|------|:----:|
| `DATABASE_URL` | Supabase | ✅ (로컬) |
| `JWT_SECRET` | 토큰 서명 | ✅ (로컬) |
| `RESEND_API_KEY` | 이메일 | ✅ (로컬) |
| `REDIS_URL` | Upstash | ✅ (로컬) |

### 4-4. 배포

```bash
# Docker 빌드 및 배포
gcloud builds submit --tag gcr.io/ask-the-stars-484712/api
gcloud run deploy ask-the-stars-api \
  --image gcr.io/ask-the-stars-484712/api \
  --region asia-northeast3
```

---

## 5. Supabase Database

> ⏱️ **예상 시간**: 10분
> ✅ **현재 상태**: 서울 리전 설정됨

### 5-1. Dashboard 접속

[https://supabase.com/dashboard](https://supabase.com/dashboard)

### 5-2. 연결 정보

**Settings > Database > Connection string**

- 리전: `ap-northeast-2` (서울) ✅
- Pooler URL: 환경변수에 설정됨 ✅

### 5-3. Prisma 마이그레이션

```bash
npx prisma migrate status
npx prisma migrate deploy
```

---

## 6. Cloudflare R2/Stream

> ⏱️ **예상 시간**: 15분
> ✅ **현재 상태**: 설정됨

### 6-1. Dashboard 접속

[https://dash.cloudflare.com/](https://dash.cloudflare.com/)

### 6-2. R2 버킷

| 항목 | 값 | 상태 |
|------|---|:----:|
| 버킷명 | `hamkkebom-uploads` | ✅ |
| CORS | `hamkkebom.com` 허용 | ✅ |

### 6-3. Stream

| 항목 | 상태 |
|------|:----:|
| API Token | ✅ 환경변수 설정됨 |

---

## 7. Upstash Redis

> ⏱️ **예상 시간**: 5분
> ✅ **현재 상태**: 도쿄 리전 설정됨

### Dashboard

[https://console.upstash.com/](https://console.upstash.com/)

| 항목 | 상태 |
|------|:----:|
| 리전 | Tokyo ✅ |
| `REDIS_URL` | ✅ 환경변수 설정됨 |

---

## 8. Resend Email

> ⏱️ **예상 시간**: 10분
> ✅ **현재 상태**: 계정 존재

### 8-1. Dashboard 접속

[https://resend.com/overview](https://resend.com/overview)

### 8-2. DNS 레코드 (Vercel DNS에 추가)

**Vercel > Domains > hamkkebom.com > DNS Records**

| 타입 | 이름 | 값 |
|:----:|------|---|
| TXT | `resend._domainkey` | Resend 제공 DKIM |
| TXT | `@` | `v=spf1 include:_spf.resend.com ~all` |

### 8-3. 테스트

```bash
cd apps/api && node verify-email.js
```

---

## 9. Sentry Monitoring

> ⏱️ **예상 시간**: 10분

### Dashboard

[https://sentry.io/](https://sentry.io/)

| 항목 | 상태 |
|------|:----:|
| Backend DSN | ✅ 환경변수 설정됨 |
| Frontend DSN | 🔲 확인 필요 |

---

## 📊 전체 상태 요약

| 서비스 | 상태 | 비고 |
|--------|:----:|------|
| Vercel DNS | ✅ | 마이그레이션 완료 |
| Vercel Frontend | ✅ | 도메인 연결됨 |
| Firebase Hosting | ✅ | Rewrite 설정됨 |
| Cloud Run | 🔲 | 배포 필요 |
| Supabase | ✅ | 서울 리전 |
| Cloudflare | ✅ | R2/Stream 설정됨 |
| Upstash | ✅ | 도쿄 리전 |
| Resend | ✅ | API 키 설정됨 |
| Sentry | 🔲 | DSN 확인 필요 |

---

## ✅ 완료 체크리스트

- [x] Vercel DNS로 마이그레이션
- [x] 프론트엔드 도메인 연결
- [ ] `api.hamkkebom.com` CNAME 설정 확인
- [ ] Resend DNS 레코드 Vercel에 추가
- [ ] Cloud Run 배포
- [ ] 전체 통합 테스트

---

**검증자**: ________________  
**검증일**: ____년 __월 __일
