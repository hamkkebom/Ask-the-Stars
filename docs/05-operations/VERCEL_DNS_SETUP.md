# 🚀 Vercel 대시보드 도메인 최종 설정 가이드

가비아에서 **네임서버(NS)**를 Vercel로 변경하셨다면, 이제 모든 설정은 **Vercel**에서 진행해야 합니다. 가비아에 입력하신 레코드들을 Vercel로 옮겨오는 과정이 필요합니다.

---

## 1️⃣ Vercel에 도메인 추가하기
1.  [Vercel Dashboard](https://vercel.com/dashboard) -> 프로젝트 선택 -> **[Settings]** -> **[Domains]**
2.  `hamkkebom.com`을 입력하고 **[Add]** 클릭
3.  Vercel이 `www.hamkkebom.com`도 함께 추가할지 물어보면 **[Add]**를 선택하세요. (자동으로 `www` -> 루트 리다이렉트가 설정됩니다.)
4.  잠시 후 **"Valid Configuration" (녹색 체크)**이 뜨면 기본 연결 성공!

---

## 2️⃣ 기존 레코드(이메일, Resend 등) 이관하기
가비아에 있던 중요 레코드들을 Vercel DNS 설정으로 그대로 옮겨와야 합니다. 

**Vercel Domains 페이지**에서 해당 도메인의 **[Edit]** -> **[DNS Records]**를 클릭하여 아래 내용을 추가하세요:

### ✉️ 이메일 및 발송 서비스 (Resend/SES)
*   **MX 레코드**: `send` | `feedback-smtp.ap-northeast-1.amazonses.com.` (우선순위 10)
*   **TXT 레코드**: `send` | `v=spf1 include:amazonses.com ~all`
*   **TXT 레코드 (DKIM)**: `resend._domainkey` | (가비아에 있던 긴 암호화 값 붙여넣기)

### 🔍 서비스 인증
*   **TXT 레코드**: `@` | `google-site-verification=...` (가비아에 있던 값)
*   **TXT 레코드**: `_dmarc` | `v=DMARC1; p=none;`

---

## 🧐 왜 이렇게 해야 하나요?
네임서버를 옮기는 것은 **"내 집 주소 관리소를 가비아에서 Vercel로 통째로 이사"**시킨 것과 같습니다. 이사했으니 가구(기존 레코드)들도 새 집(Vercel)으로 옮겨와야 종전처럼 이메일도 받고 사이트 인증도 유지됩니다.

> [!TIP]
> **A 레코드 충돌**이나 **CNAME 설정**은 이제 Vercel이 자동으로 관리해 주므로 직접 만드실 필요가 없습니다! 오직 **이메일(MX)**과 **인증용(TXT)** 레코드만 옮겨주시면 끝입니다.
