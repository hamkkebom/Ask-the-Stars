const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testUpload() {
  const API_URL = 'http://localhost:4000/api';

  // 2. Upload Video (Skipping Auth)
  console.log('📤 Uploading video (No Auth)...');
  const form = new FormData();
  form.append('file', fs.createReadStream('test_video.mp4'));

  try {
    const uploadRes = await axios.post(`${API_URL}/uploads`, form, {
      headers: {
        ...form.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('✅ Upload Success!');
    console.log('📄 Response:', JSON.stringify(uploadRes.data, null, 2));

    if (uploadRes.data.streamId) {
        console.log('\n🎉 SUCCESS: Cloudflare Stream ID returned:', uploadRes.data.streamId);
        console.log('👉 Check your Cloudflare Dashboard Media tab!');
    } else {
        console.log('\n⚠️ WARNING: Upload worked but no streamId returned. Check logs.');
    }

  } catch (error) {
    console.error('❌ Error during test:');
    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
    } else {
        console.error(error.message);
    }
  }
}

testUpload();
