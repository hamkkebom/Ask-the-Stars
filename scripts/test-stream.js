const axios = require('axios');
require('dotenv').config({ path: '../apps/api/.env' });

async function testStream() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const streamToken = process.env.CLOUDFLARE_STREAM_TOKEN;

  console.log('--- STREAM CONFIG ---');
  console.log('Account ID:', accountId);
  console.log('Stream Token:', streamToken ? 'OK' : 'MISSING');

  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`,
      {
        headers: {
          Authorization: `Bearer ${streamToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      console.log('✅ SUCCESS! Cloudflare Stream is accessible.');
      console.log('Videos count:', response.data.result ? response.data.result.length : 0);
      if (response.data.result) {
        response.data.result.slice(0, 5).forEach(v => {
          console.log(` - UID: ${v.uid}, Status: ${v.status.state}, Meta: ${JSON.stringify(v.meta)}`);
        });
      }
    } else {
      console.error('❌ Cloudflare Stream API failed:', response.data.errors);
    }
  } catch (err) {
    console.error('❌ FAILED to access Stream:');
    if (err.response) {
      console.error(err.response.status, err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

testStream();
