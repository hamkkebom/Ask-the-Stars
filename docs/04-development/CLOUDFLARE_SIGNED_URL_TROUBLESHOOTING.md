# Cloudflare Stream 서명된 URL 401 오류 해결 가이드

## 문제 개요

| 항목 | 내용 |
|------|------|
| **오류** | 썸네일 로드 시 `401 Unauthorized` |
| **영향** | 모든 비디오 썸네일이 표시되지 않음 |
| **원인** | Cloudflare Stream 서명 토큰이 거부됨 |

---

## 1단계: 환경변수 확인

### 필수 환경변수

`apps/api/.env` 파일에 다음 변수들이 올바르게 설정되어 있는지 확인하세요:

```bash
# Cloudflare 계정 정보
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Signing Key (서명 토큰 생성용) - 중요!
CLOUDFLARE_SIGNING_KEY_ID=your_signing_key_id
CLOUDFLARE_SIGNING_KEY_PEM=your_signing_key_pem_base64
```

### 확인 방법

```powershell
# API 폴더에서 .env 파일 내용 확인 (민감 정보 주의)
cd apps/api
Get-Content .env | Select-String "CLOUDFLARE"
```

---

## 2단계: Signing Key 생성 (없는 경우)

Cloudflare Dashboard에서 Signing Key를 생성해야 합니다.

### 2.1 대시보드에서 생성

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
2. **Stream** > **Settings** 이동
3. **Signing Keys** 섹션 찾기
4. **Create a new signing key** 클릭
5. 생성된 정보 복사:
   - **Key ID** → `CLOUDFLARE_SIGNING_KEY_ID`
   - **Private Key (PEM)** → `CLOUDFLARE_SIGNING_KEY_PEM`

### 2.2 API로 생성

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream/keys" \
  -H "Authorization: Bearer {API_TOKEN}" \
  -H "Content-Type: application/json"
```

**응답 예시:**
```json
{
  "result": {
    "id": "abc123def456",
    "pem": "-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----",
    "jwk": {...}
  },
  "success": true
}
```

---

## 3단계: PEM 키 형식 확인

### 올바른 형식

PEM 키는 다음 두 가지 형식 중 하나로 저장할 수 있습니다:

**방법 A: 원본 형식 (줄바꿈 유지)**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(여러 줄)
-----END RSA PRIVATE KEY-----
```

**방법 B: Base64 인코딩 (권장)**
```bash
# PEM 파일을 Base64로 인코딩
cat private_key.pem | base64 -w 0
```

### .env 파일 설정 예시

```bash
# 방법 A: \\n으로 줄바꿈 표현
CLOUDFLARE_SIGNING_KEY_PEM="-----BEGIN RSA PRIVATE KEY-----\\nMIIEpAI...\\n-----END RSA PRIVATE KEY-----"

# 방법 B: Base64 인코딩 (더 안전)
CLOUDFLARE_SIGNING_KEY_PEM="LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQo..."
```

---

## 4단계: 코드에서 PEM 처리 확인

`cloudflare-stream.service.ts`에서 PEM 키가 올바르게 파싱되는지 확인하세요:

```typescript
// 현재 코드 (apps/api/src/modules/cloudflare/cloudflare-stream.service.ts)
let rawKey = this.configService.get<string>('CLOUDFLARE_SIGNING_KEY_PEM') || '';

// Base64로 저장된 경우 디코딩
if (rawKey && !rawKey.trim().startsWith('-----')) {
    try {
        rawKey = Buffer.from(rawKey, 'base64').toString('utf8');
    } catch (e) {
        console.error('❌ Failed to decode Base64 PEM key');
    }
}

// \\n을 실제 줄바꿈으로 변환
this.signingKeyPem = rawKey.replace(/\\n/g, '\n');
```

---

## 5단계: 토큰 생성 테스트

### 테스트 스크립트 생성

`apps/api/scripts/test-signed-token.js` 파일을 생성하고 실행:

```javascript
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const keyId = process.env.CLOUDFLARE_SIGNING_KEY_ID;
let pem = process.env.CLOUDFLARE_SIGNING_KEY_PEM || '';

// Base64 디코딩 (필요시)
if (pem && !pem.startsWith('-----')) {
    pem = Buffer.from(pem, 'base64').toString('utf8');
}
pem = pem.replace(/\\n/g, '\n');

console.log('=== Signing Key 진단 ===');
console.log('Key ID:', keyId ? '✅ 설정됨' : '❌ 없음');
console.log('PEM 시작:', pem.substring(0, 40) || '❌ 없음');
console.log('PEM 길이:', pem.length, 'bytes');

if (!keyId || !pem) {
    console.error('\n❌ 환경변수가 설정되지 않았습니다.');
    process.exit(1);
}

// 토큰 생성 테스트
try {
    const testUid = 'test-video-uid';
    const header = { alg: 'RS256', kid: keyId, typ: 'JWT' };
    const payload = {
        sub: testUid,
        kid: keyId,
        exp: Math.floor(Date.now() / 1000) + 3600,
        nbf: Math.floor(Date.now() / 1000) - 5,
        accessRules: [{ type: 'any', action: 'allow' }]
    };

    const base64url = (str) => Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(pem, 'base64url');

    const token = `${signatureInput}.${signature}`;
    
    console.log('\n✅ 토큰 생성 성공!');
    console.log('토큰 길이:', token.length);
    console.log('토큰 미리보기:', token.substring(0, 50) + '...');
    
    // 테스트 URL 출력
    console.log('\n📎 테스트 URL:');
    console.log(`https://videodelivery.net/${token}/thumbnails/thumbnail.jpg`);
    
} catch (error) {
    console.error('\n❌ 토큰 생성 실패:', error.message);
    console.error('PEM 키 형식을 확인하세요.');
}
```

### 실행

```powershell
cd apps/api
node scripts/test-signed-token.js
```

---

## 6단계: 일반적인 오류 및 해결

| 오류 메시지 | 원인 | 해결 방법 |
|------------|------|----------|
| `401 Unauthorized` | 잘못된 서명 또는 만료된 토큰 | Key ID와 PEM 확인 |
| `error:0909006C:PEM routines` | PEM 형식 오류 | `\n` 줄바꿈 확인 |
| `Key not found` | Key ID가 잘못됨 | Cloudflare 대시보드에서 ID 재확인 |
| `Token expired` | 토큰 유효기간 만료 | `exp` 클레임 확인 |

---

## 7단계: 빠른 해결 체크리스트

- [ ] `CLOUDFLARE_SIGNING_KEY_ID`가 .env에 설정됨
- [ ] `CLOUDFLARE_SIGNING_KEY_PEM`이 .env에 설정됨
- [ ] PEM 키가 올바른 형식 (Base64 또는 줄바꿈 포함)
- [ ] API 서버 재시작 (`npm run dev`)
- [ ] 브라우저 캐시 및 하드 새로고침 (Ctrl+Shift+R)
- [ ] Cloudflare 대시보드에서 키가 활성화 상태인지 확인

---

## 추가 참고자료

- [Cloudflare Stream Signed URLs 공식 문서](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/)
- [JWT 디버거](https://jwt.io/) - 생성된 토큰 검증용

---

## 문의

문제가 지속되면 Cloudflare 대시보드의 **Analytics > Stream** 섹션에서 요청 로그를 확인하세요.
