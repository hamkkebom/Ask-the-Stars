const https = require('https');

const API_URL = 'https://ask-the-stars-api-w3nn3v2ejq-du.a.run.app';

function request(path, method, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(`${API_URL}${path}`, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runSmokeTest() {
  console.log('🚀 Starting Smoke Test on:', API_URL);

  // 1. Health Check
  try {
    const health = await request('/health', 'GET');
    console.log(`[GET /health] Status: ${health.statusCode}`);
    if (health.statusCode !== 200) throw new Error('Health check failed');
  } catch (e) {
    console.error('❌ Health check failed:', e.message);
    process.exit(1);
  }

  // 2. Signup Test
  const timestamp = Date.now();
  const testUser = {
    email: `smoke-test-${timestamp}@hankaebom.com`,
    password: 'SmokeTestPass123!',
    name: 'Smoke Tester',
    role: 'client'
  };

  try {
    const signup = await request('/api/auth/signup', 'POST', testUser);
    console.log(`[POST /api/auth/signup] Status: ${signup.statusCode}`);

    if (signup.statusCode === 201 || signup.statusCode === 200) {
      console.log('✅ Signup successful');
      if (signup.body.access_token) {
        console.log('🔑 Token received');
      }
    } else {
      console.error('❌ Signup failed:', signup.body);
      throw new Error(`Signup returned ${signup.statusCode}`);
    }
  } catch (e) {
    console.error('❌ Signup test failed:', e.message);
    process.exit(1);
  }

  console.log('\n✨ Smoke Test Passed Successfully!');
}

runSmokeTest();
