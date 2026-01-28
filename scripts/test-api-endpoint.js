
// Native fetch used
// const fetch = require('node-fetch');

async function testApi() {
  const url = 'http://localhost:4000/api/videos';
  console.log(`📡 Fetching from: ${url}`);

  try {
    const response = await fetch(url);
    console.log(`✅ Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`📦 Data Type: ${Array.isArray(data) ? 'Array' : typeof data}`);

    if (Array.isArray(data)) {
        console.log(`🔢 Count: ${data.length}`);
        if (data.length > 0) {
            console.log('📝 First Item Sample:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('⚠️ Array is empty!');
        }
    } else {
        console.log('⚠️ Response is not an array:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ Fetch Failed:', error.message);
    if (error.cause) console.error(error.cause);
  }
}

testApi();
