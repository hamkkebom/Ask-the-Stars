import http from 'k6/http';
import { check, sleep } from 'k6';
import { buildSummary } from './summary.js';

const apiBaseUrl = __ENV.API_BASE_URL || 'http://localhost:4000/api';
const adminPath = __ENV.ADMIN_PATH || '/admin/dashboard';
const adminEmail = __ENV.ADMIN_EMAIL;
const adminPassword = __ENV.ADMIN_PASSWORD;

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 40 },
    { duration: '1m', target: 40 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
  if (!adminEmail || !adminPassword) {
    return { accessToken: null };
  }

  const loginRes = http.post(
    `${apiBaseUrl}/auth/login`,
    JSON.stringify({ email: adminEmail, password: adminPassword }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'admin login status is 200': (res) => res.status === 200,
  });

  return { accessToken: loginRes.json('access_token') };
}

export default function (data) {
  if (!data.accessToken) {
    sleep(1);
    return;
  }

  const res = http.get(`${apiBaseUrl}${adminPath}`, {
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
  return buildSummary({ data, name: 'api-admin' });
}
