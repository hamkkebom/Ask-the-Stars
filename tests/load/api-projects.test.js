import http from 'k6/http';
import { check, sleep } from 'k6';
import { buildSummary } from './summary.js';

const apiBaseUrl = __ENV.API_BASE_URL || 'http://localhost:4000/api';
const password = __ENV.PROJECTS_PASSWORD || 'password123!';
const name = __ENV.PROJECTS_NAME || 'Load Tester';
const role = __ENV.PROJECTS_ROLE || 'STAR';

function buildEmail() {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return `projects.${suffix}@example.com`;
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
  const email = __ENV.PROJECTS_EMAIL || buildEmail();
  const payload = JSON.stringify({ email, password, name, role });

  if (!__ENV.PROJECTS_EMAIL) {
    const signupRes = http.post(`${apiBaseUrl}/auth/signup`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(signupRes, {
      'signup status is 201 or 409': (res) =>
        res.status === 201 || res.status === 409,
    });
  }

  const loginRes = http.post(
    `${apiBaseUrl}/auth/login`,
    JSON.stringify({ email, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'login status is 200': (res) => res.status === 200,
  });

  return {
    accessToken: loginRes.json('access_token'),
  };
}

export default function (data) {
  const res = http.get(`${apiBaseUrl}/projects`, {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return buildSummary({ data, name: 'api-projects' });
}
