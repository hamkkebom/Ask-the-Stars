const axios = require('axios');

async function testApi() {
  try {
    const res = await axios.get('http://localhost:4000/api/videos');
    console.log('API Status:', res.status);
    console.log('Video Count:', res.data.length);
    if (res.data.length > 0) {
      console.log('First Video Sample:', JSON.stringify(res.data[0], null, 2));
    }
  } catch (err) {
    console.error('API Error:', err.message);
  }
}

testApi();
