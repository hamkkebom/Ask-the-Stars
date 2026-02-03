# API Versioning Guide

This document describes the API versioning policy for the Hamkkebom
backend (NestJS). The API uses URI versioning to preserve backwards
compatibility while allowing incremental updates.

## Versioning Strategy

- Versioning type: URI
- Base prefix: `/api`
- Current default version: `v1`
- Versioned base path: `/api/v1`

Example:

```http
POST /api/v1/auth/login
```

## Legacy Support

Legacy (unversioned) routes under `/api/*` are redirected to the
current default version. For example:

```http
POST /api/auth/login  ->  POST /api/v1/auth/login
```

The redirect uses HTTP 308 to preserve the HTTP method and body.

## Swagger Docs

- v1 Swagger UI: `/api/v1/docs`
- Legacy docs: `/api/docs` redirects to `/api/v1/docs`

## Version Policy

- **Major version (v1, v2, ...)**: Breaking changes only.
- **Minor/patch**: Backwards compatible improvements within a version.
- **Deprecation**: Old endpoints are announced before removal and
  remain available during a defined deprecation window.

## Migration Guide (v1)

If your client currently calls `/api/*`, update it to `/api/v1/*`.

1. Update the base URL to include the version.
2. Re-run integration tests.
3. Validate Swagger documentation for v1 endpoints.

Frontend example:

```typescript
const API_VERSION = 'v1';
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}`;
```

## Adding a New Version

1. Implement the new controllers or DTO changes.
2. Tag controllers with `@Controller({ path: '...', version: '2' })`.
3. Add a new Swagger document at `/api/v2/docs`.
4. Keep the previous version active until the deprecation window ends.
