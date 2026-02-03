import {
  htmlReport,
  textSummary,
} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function buildSummary({ data, name }) {
  return {
    [`reports/load/${name}.html`]: htmlReport(data),
    [`reports/load/${name}.json`]: JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
