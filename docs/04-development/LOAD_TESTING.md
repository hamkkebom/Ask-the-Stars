# Load Testing (k6)

## Goals

- Validate API performance under load.
- Enforce thresholds: p95 < 200ms, error rate < 1%.
- Produce HTML + JSON reports for each scenario.

## Install k6

Windows (Scoop):

```bash
scoop install k6
```

Or via pnpm (local binary):

```bash
pnpm add -D k6
```

## Test Scripts

Location: `tests/load/`

- `api-auth.test.js` login throughput
- `api-videos.test.js` videos list
- `api-projects.test.js` projects list (auth required)
- `api-admin.test.js` admin dashboard (auth required)
- `full-scenario.test.js` combined flow (videos + projects)

## Environment Variables

Base URLs:

- `API_BASE_URL` (default: `http://localhost:4000/api`)
- `API_V1_BASE_URL` (default: `http://localhost:4000/api/v1`)

Auth for signup/login flows:

- `AUTH_EMAIL`, `AUTH_PASSWORD`, `AUTH_NAME`, `AUTH_ROLE`
- `PROJECTS_EMAIL`, `PROJECTS_PASSWORD`, `PROJECTS_NAME`, `PROJECTS_ROLE`
- `FULL_EMAIL`, `FULL_PASSWORD`, `FULL_NAME`, `FULL_ROLE`

Admin scenario:

- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (required)
- `ADMIN_PATH` (default: `/admin/dashboard`)

## Run

```bash
pnpm load:auth
pnpm load:videos
pnpm load:projects
pnpm load:admin
pnpm load:full
```

## Thresholds

All scenarios enforce:

- `http_req_duration`: `p(95) < 200ms`
- `http_req_failed`: `rate < 1%`

If thresholds are not met, record the bottleneck in the report notes and
capture DB + API logs to identify slow queries or cache misses.

## Reports

Each run writes:

- `reports/load/<scenario>.html`
- `reports/load/<scenario>.json`

## CI/CD Integration (Optional)

- Do NOT run load tests in GitHub Actions (cost).
- Prefer a manual workflow in a dedicated environment with seeded data.

## Safety

- Never run against production without explicit approval.
- Keep realistic load stages (expected peak: 1,000 concurrent users).
