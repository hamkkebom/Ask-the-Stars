# 🌐 hamkkebom.com 도메인 연결 마스터 체크리스트 (0 to 100)

도메인 연결을 처음부터 끝까지 하나씩 검토하실 수 있도록 "0단계"부터 정리했습니다. 이 리스트를 보면서 빠진 부분이 있는지 확인해 보세요.

---

### 1단계: 도메인 구입 및 소유권 확인
- [x] **도메인 구매**: 가비아(Gabia) 등에서 `hamkkebom.com` 구매 완료.
- [ ] **도메인 상태 확인**: 가비아 관리 콘솔에서 도메인이 '정상' 상태이며 네임서버 변경이 가능한 상태인지 확인.

### 2단계: Vercel 프로젝트 설정
- [ ] **도메인 추가**: Vercel Dashboard > `ask-the-stars` 프로젝트 > Settings > **Domains** 메뉴 진입.
- [ ] **등록**: `hamkkebom.com` 입력 후 **Add** 클릭.
- [ ] **Redirect 설정**: `www.hamkkebom.com`을 추가하고 `hamkkebom.com`을 그쪽으로 리다이렉트할지 묻는 팝업이 뜨면 **"Add both"** (권장) 선택.

### 3단계: 네임서버 교체 (가비아 콘솔) ⬅️ **가장 중요한 단계 (이걸 해야 Vercel에 입력창이 생김!!)**
도메인에 대한 "권한"을 가비아에서 Vercel로 넘겨주는 과정입니다. **이 작업을 완료해야 4단계의 Vercel DNS 입력창이 나타납니다.**
- [ ] **네임서버 정보 복사**: Vercel Domains 페이지에서 `ns1.vercel-dns.com`, `ns2.vercel-dns.com` 등 Vercel이 준 2~4개의 주소를 확인.
- [ ] **가비아 설정 변경**: My가비아 > [도메인 관리] > [네임서버 설정] > Vercel 주소들을 1차, 2차 등에 입력.
- [ ] **삭제**: 가비아 자체적으로 설정되어 있던 기존 네임서버(예: `ns.gabia.co.kr` 등)는 사라지고 Vercel 주소만 남아야 합니다.

### 4단계: API용 서브도메인 연결 (api.hamkkebom.com)
백엔드(`api`)는 Firebase 커스텀 도메인 기능을 통해 연결합니다.
- [ ] **Firebase 콘솔**: 빌드 > Hosting > [커스텀 도메인 추가] 클릭.
- [ ] **도메인 입력**: `api.hamkkebom.com` 입력.
- [ ] **레코드 확인**: Firebase가 생성해준 **A 레코드(IP 주소들)**를 메모.
- [ ] **Vercel DNS에 입력**: Vercel Dashboard > Domains > `hamkkebom.com` 옆의 **Edit** > **DNS Records** 클릭.
  - 이름(Name): `api`
  - 유형(Type): `A`
  - 값(Value): 메모한 Firebase IP 입력 (IP가 여러 개면 각각 추가)

### 5단계: 대기 및 SSL 발급 확인 (Final Check)
- [ ] **DNS 전파**: [whatsmydns.net](https://www.whatsmydns.net/#A/hamkkebom.com)에서 `hamkkebom.com`을 검색했을 때 Vercel/Firebase IP가 전 세계적으로 뜨는지 확인.
- [ ] **Vercel 상태**: "Invalid Configuration" 빨간불이 사라지고 파란색 **"Valid Configuration"**으로 변하는지 확인.
- [ ] **SSL 인증서**: HTTPS 접속(`https://hamkkebom.com`)이 에러 없이 잘 되는지 확인.

---

### ⚠️ 자주 하는 실수 (체크포인트)
1. **네임서버를 안 바꿈**: 가비아에서 "DNS/A 레코드 설정"만 건드리고 "네임서버" 자체는 안 바꾸는 경우가 많습니다. 네임서버가 Vercel 주소여야만 Vercel이 SSL을 자동으로 발급해 줍니다.
2. **이전 레코드의 잔재**: 가비아 네임서버를 그대로 쓰면서 A 레코드를 설정할 경우, 가비아가 기본으로 걸어놓은 IP(가비아 파킹 페이지 등)를 지우지 않으면 접속이 오락가락합니다. (네임서버를 통째로 Vercel로 옮기면 이 문제는 해결됩니다.)

---
**함께 보기:**
- [가비아 DNS 이슈 해결 상세 가이드](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/docs/05-operations/GABIA_DNS_FIX.md)
- [Vercel DNS 설정 가이드](file:///c:/Users/이경수/OneDrive/바탕 화면/Hankaebom-Star/docs/05-operations/VERCEL_DNS_SETUP.md)
