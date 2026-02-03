import http from 'k6/http';
import { check, sleep } from 'k6';
import { buildSummary } from './summary.js';

const apiBaseUrl = __ENV.API_BASE_URL || 'http://localhost:4000/api';
const password = __ENV.AUTH_PASSWORD || 'password123!';
const name = __ENV.AUTH_NAME || 'Load Tester';
const role = __ENV.AUTH_ROLE || 'STAR';

function buildEmail() {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return `load.${suffix}@example.com`;
}

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
  const email = __ENV.AUTH_EMAIL || buildEmail();
  const payload = JSON.stringify({ email, password, name, role });

  if (!__ENV.AUTH_EMAIL) {
    const signupRes = http.post(`${apiBaseUrl}/auth/signup`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(signupRes, {
      'signup status is 201 or 409': (res) =>
        res.status === 201 || res.status === 409,
    });
  }

  return { email, password };
}

export default function (data) {
  const loginRes = http.post(
    `${apiBaseUrl}/auth/login`,
    JSON.stringify({ email: data.email, password: data.password }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'status is 200': (res) => res.status === 200,
    'has access token': (res) => res.json('access_token') !== undefined,
  });

  sleep(1);
}

export function handleSummary(data) {
  return buildSummary({ data, name: 'api-auth' });
}
