# CI Optimization Guide

## Goals

- Enable Turborepo Remote Caching via Vercel
- Reduce CI build time from 5-10 minutes to 2-3 minutes on cache hit
- Keep cache validation enabled and avoid caching node_modules

## Remote Caching Setup (Vercel)

1. Authenticate and link the repo (local or CI bootstrap shell):

```bash
pnpx turbo login
pnpx turbo link
```

2. Add secrets to GitHub:

- `TURBO_TOKEN`
- `TURBO_TEAM`

3. Ensure `turbo.json` has remote cache enabled:

```json
{
  "remoteCache": {
    "enabled": true,
    "signature": true
  }
}
```

## CI Workflow Changes

- Use `.github/actions/setup-turborepo` to inject Turborepo env vars
- Use `pnpm turbo run <task> --cache-dir=.turbo` for all tasks
- Keep `.turbo` cached in GitHub Actions (do not cache `node_modules`)

Example commands:

```bash
pnpm turbo run build --cache-dir=.turbo --summarize
pnpm turbo run test --cache-dir=.turbo --continue
```

## Performance Measurement

Record timings for the same commit:

- Baseline (no remote cache): 5-10 minutes
- Target (cache hit): 2-3 minutes

Suggested process:

1. Trigger CI without cache (first run after changes)
2. Trigger CI again on the same SHA to verify cache hit
3. Compare total job durations and Turbo cache hit stats

Expected result:

- Cache hit rate >= 90%
- Total CI time reduced by ~50%

## Cache Hit Verification

Use Turborepo summarize output:

```bash
pnpm turbo run build --summarize
```

Look for cache stats indicating remote hits and saved time.

## Troubleshooting

- Cache misses for build artifacts: verify `outputs` in `turbo.json`
- Frequent invalidation: check `globalDependencies` and environment vars
- Missing cache hits in CI: ensure `TURBO_TOKEN` and `TURBO_TEAM` are set
- Slow installs: confirm `node_modules` is not cached and pnpm cache is enabled
- Suspicious cache reuse: keep `remoteCache.signature=true` to prevent poisoning

## Cache Miss Patterns to Monitor

- Lockfile changes (pnpm-lock.yaml)
- Environment variable changes in build/test
- Next.js build cache churn (`.next/cache` excluded)
- Non-deterministic builds or tests
