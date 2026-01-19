const { Resend } = require('resend');

// 사용자가 제공한 API Key
const resend = new Resend('re_U7pYhgxa_6rzLNVwRuxPiiaaPofnKhzxi');

(async function() {
  console.log('Sending test email to rudtn466@gmail.com...');
  try {
    const data = await resend.emails.send({
      from: 'noreply@send.hamkkebom.com', // 도메인 인증이 완료되었다고 가정
      to: 'rudtn466@gmail.com',
      subject: '🚀 한깨봄 (Hankaebom) 이메일 테스트',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>테스트 이메일 도착! 🎉</h1>
          <p>한깨봄 시스템에서 보낸 테스트 이메일입니다.</p>
          <p>Resend 연동이 정상적으로 완료되었습니다.</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">Sent via Ask-The-Stars API</p>
        </div>
      `
    });

    if (data.error) {
      console.error('❌ Failed:', data.error);

      // 도메인 인증 실패 시 fallback 시도
      if (data.error.message && data.error.message.includes('domain')) {
        console.log('⚠️ Domain not verified yet. Retrying with onboarding@resend.dev...');
        const retryData = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'rudtn466@gmail.com',
          subject: '[Fallback] 한깨봄 이메일 테스트',
          html: '<p>도메인 인증 전 테스트 발송입니다 (Sandbox).</p>'
        });

        if (retryData.error) {
           console.error('❌ Retry Failed:', retryData.error);
        } else {
           console.log('✅ Retry Success! Email ID:', retryData.data.id);
        }
      }
    } else {
      console.log('✅ Success! Email ID:', data.data.id);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
