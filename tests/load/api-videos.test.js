import http from 'k6/http';
import { check, sleep } from 'k6';
import { buildSummary } from './summary.js';

const apiV1BaseUrl = __ENV.API_V1_BASE_URL || 'http://localhost:4000/api/v1';

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

export default function () {
  const res = http.get(`${apiV1BaseUrl}/videos?page=1&limit=25&sort=latest`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return buildSummary({ data, name: 'api-videos' });
}
