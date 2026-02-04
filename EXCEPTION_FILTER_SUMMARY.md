# Global Exception Filter Implementation

## ✅ Completed

### 1. Created Exception Filter
**File**: `apps/api/src/common/filters/http-exception.filter.ts`

**Features**:
- ✅ `@Catch()` decorator catches ALL exceptions (HttpException + unknown)
- ✅ Standardized error response format:
  ```json
  {
    "statusCode": 400,
    "message": "User-friendly error message",
    "error": "BadRequestException",
    "timestamp": "2026-02-04T10:30:00.000Z",
    "path": "/api/v1/users"
  }
  ```
- ✅ Sentry integration:
  - Server errors (5xx) → `Sentry.captureException()` with tags & context
  - Client errors (4xx) → Logger warning (no Sentry spam)
- ✅ Different handling:
  - `HttpException` → Extract status code & message from response
  - Standard `Error` → Use error.message & error.name
  - Unknown exceptions → Default 500 with generic message
- ✅ JSDoc comments with usage example
- ✅ Logger for development debugging

### 2. Registered in main.ts
**File**: `apps/api/src/main.ts`

**Changes**:
- ✅ Imported `AllExceptionsFilter`
- ✅ Registered globally: `app.useGlobalFilters(new AllExceptionsFilter())`
- ✅ Placed BEFORE validation pipe (correct order)

## Usage Example

```typescript
// Any thrown exception will be caught and formatted:

// HttpException
throw new BadRequestException('Invalid email format');
// Response: { statusCode: 400, message: 'Invalid email format', error: 'BadRequestException', ... }

// Unknown error
throw new Error('Database connection failed');
// Response: { statusCode: 500, message: 'Database connection failed', error: 'Error', ... }

// Unhandled exception
throw 'Something went wrong';
// Response: { statusCode: 500, message: 'Something went wrong', error: 'UnknownError', ... }
```

## Sentry Integration

### Server Errors (5xx)
```typescript
Sentry.captureException(exception, {
  tags: {
    statusCode: '500',
    errorType: 'InternalServerError'
  },
  contexts: {
    http: {
      method: 'POST',
      url: '/api/v1/users',
      status_code: 500
    }
  }
});
```

### Client Errors (4xx)
Logged to console/logger only (no Sentry spam):
```
[POST] /api/v1/users - 400 BadRequestException: Invalid email format
```

## Verification

✅ TypeScript compilation: No errors
✅ Filter file: 113 lines, fully typed
✅ main.ts: Updated with import & registration
✅ No breaking changes to existing code
✅ Follows NestJS best practices

## Next Steps (Optional)

1. Test with actual requests to verify response format
2. Monitor Sentry dashboard for error tracking
3. Adjust Sentry sampling rates if needed (currently 0.1 for production, 1.0 for dev)
