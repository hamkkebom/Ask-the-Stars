# 🧪 Testing Guide

> **Last Updated**: 2026-02-03  
> **Coverage**: Frontend (94.72%), Backend (93.57%), E2E (12 tests)  
> **Tech Stack**: Vitest + React Testing Library + Jest + Playwright

Complete testing guide for the Hankaebom-Star project covering unit tests, integration tests, and end-to-end tests.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Frontend Unit Tests (Vitest)](#frontend-unit-tests-vitest)
3. [Backend Unit Tests (Jest)](#backend-unit-tests-jest)
4. [E2E Tests (Playwright)](#e2e-tests-playwright)
5. [Running Tests](#running-tests)
6. [Coverage Reports](#coverage-reports)
7. [Writing Tests](#writing-tests)
8. [Best Practices](#best-practices)
9. [CI/CD Integration](#cicd-integration)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### Test Coverage Summary

| Layer | Framework | Coverage | Test Files | Status |
|-------|-----------|----------|------------|--------|
| **Frontend** | Vitest + RTL | 94.72% lines, 81.89% branches | 17 files | ✅ |
| **Backend** | Jest + @nestjs/testing | 93.57% lines, 80.08% branches | 13 files | ✅ |
| **E2E** | Playwright | 12 tests (6 passed, 6 skipped) | 5 flows | ⚠️ |

### Testing Stack

- **Frontend**: [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/react)
- **Backend**: [Jest](https://jestjs.io/) + [@nestjs/testing](https://docs.nestjs.com/fundamentals/testing)
- **E2E**: [Playwright](https://playwright.dev/)
- **Monorepo**: [Turborepo](https://turbo.build/) for parallel test execution

---

## Frontend Unit Tests (Vitest)

### Directory Structure

```
apps/web/src/test/
├── components/         # Component tests
│   ├── button.test.tsx
│   ├── card.test.tsx
│   ├── modal.test.tsx
│   └── ...
├── lib/api/           # API client tests
│   ├── auth.test.ts
│   ├── videos.test.ts
│   └── ...
├── hooks/             # Custom hook tests
│   ├── useChat.test.tsx
│   └── use-toast.test.tsx
├── store/             # Zustand store tests
│   └── useAuthStore.test.ts
└── setup.ts           # Test setup & global mocks
```

### Configuration

**File**: `apps/web/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/components/ui/**/*.{ts,tsx}',
        'src/lib/api/**/*.ts',
        'src/hooks/**/*.ts',
        'src/store/**/*.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Example: Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies variant prop correctly', () => {
    const { container } = render(<Button variant="destructive">Destructive</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-destructive');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    screen.getByText('Click Me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Example: API Client Test

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { loginUser } from '@/lib/api/auth';

vi.mock('axios');

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loginUser sends correct request', async () => {
    const mockResponse = { data: { accessToken: 'token123', user: { id: 1 } } };
    (axios.post as any).mockResolvedValue(mockResponse);

    const result = await loginUser({ email: 'test@example.com', password: 'pass123' });

    expect(axios.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: 'pass123',
    });
    expect(result).toEqual(mockResponse.data);
  });
});
```

---

## Backend Unit Tests (Jest)

### Directory Structure

```
apps/api/src/modules/
├── auth/
│   ├── auth.service.spec.ts
│   ├── auth.controller.spec.ts
│   └── strategies/jwt.strategy.spec.ts
├── users/
│   ├── users.service.spec.ts
│   └── users.controller.spec.ts
├── videos/
│   ├── videos.service.spec.ts
│   ├── videos.controller.spec.ts
│   └── webhook.controller.spec.ts
└── ... (other modules)

apps/api/test/
└── utils/
    ├── prisma.mock.ts       # Prisma client mock factory
    └── validation.ts        # DTO validation helpers
```

### Configuration

**File**: `apps/api/jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    'src/modules/**/*.{service,controller}.ts',
    '!src/modules/**/*.dto.ts',
    '!src/modules/**/*.entity.ts',
  ],
  coverageThresholds: {
    global: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
};
```

### Example: Service Test

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);
  });

  describe('refresh', () => {
    it('should return both new access and refresh tokens', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'STAR' };
      jest.spyOn(jwt, 'verify').mockReturnValue({ userId: 1 });
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser as any);
      jest.spyOn(jwt, 'sign').mockReturnValue('new-token');

      const result = await service.refresh('old-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(jwt.sign).toHaveBeenCalledTimes(2); // Access + Refresh
    });
  });
});
```

### Example: Controller Test

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { SettlementsController } from './settlements.controller';
import { SettlementsService } from './settlements.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

describe('SettlementsController', () => {
  let controller: SettlementsController;
  let service: SettlementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettlementsController],
      providers: [
        {
          provide: SettlementsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SettlementsController>(SettlementsController);
    service = module.get<SettlementsService>(SettlementsService);
  });

  it('should create settlement (ADMIN only)', async () => {
    const dto = { projectId: 1, amount: 100000, type: 'PRIMARY' };
    const mockResult = { id: 1, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(mockResult as any);

    const result = await controller.create(dto, { user: { id: 1, role: 'ADMIN' } } as any);

    expect(result).toEqual(mockResult);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
```

---

## E2E Tests (Playwright)

### Directory Structure

```
tests/e2e/
├── auth.spec.ts           # Authentication flow tests
├── freelancer.spec.ts     # Star (freelancer) workflow tests
├── admin.spec.ts          # Admin panel tests
├── video-browsing.spec.ts # Video grid & detail tests
├── public-pages.spec.ts   # Public pages (home, about, session)
├── fixtures/              # Test data & utilities
│   └── mock-data.ts
└── helpers/               # Reusable helpers
    └── auth.ts            # Login/logout helpers
```

### Configuration

**File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev --filter=web',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Example: E2E Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should signup, login, and logout successfully', async ({ page }) => {
    // Signup
    await page.goto('/auth/signup');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="name"]', 'Test User');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/stars/dashboard');

    // Logout
    await page.click('button[aria-label="User menu"]');
    await page.click('text=Logout');
    await expect(page).toHaveURL('/');

    // Login
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/stars/dashboard');
  });
});
```

---

## Running Tests

### All Tests (Monorepo)

```bash
# Run all tests in parallel
pnpm test

# Run all tests with coverage
pnpm test:coverage
```

### Frontend Tests

```bash
# Run frontend tests
pnpm test --filter=web

# Run in watch mode (development)
pnpm test --filter=web -- --watch

# Run with coverage
pnpm test --filter=web -- --coverage

# Run specific test file
pnpm test --filter=web -- button.test.tsx

# Run tests matching pattern
pnpm test --filter=web -- --grep "Button"
```

### Backend Tests

```bash
# Run backend tests
pnpm test --filter=api

# Run with coverage
pnpm test --filter=api -- --coverage

# Run specific test file
pnpm test --filter=api -- auth.service.spec.ts

# Run tests matching pattern
pnpm test --filter=api -- --testNamePattern="refresh"
```

### E2E Tests

```bash
# Run all E2E tests (headless)
pnpm e2e

# Run with UI (headed mode)
pnpm e2e:headed

# Run specific test file
pnpm exec playwright test auth.spec.ts

# Run in debug mode
pnpm exec playwright test --debug

# View HTML report
pnpm exec playwright show-report
```

---

## Coverage Reports

### Generating Coverage

```bash
# Frontend coverage
pnpm test --filter=web -- --coverage

# Backend coverage
pnpm test --filter=api -- --coverage

# Both (monorepo)
pnpm test:coverage
```

### Coverage Thresholds

| Project | Lines | Branches | Functions | Statements |
|---------|-------|----------|-----------|------------|
| Frontend | 80% | 80% | 80% | 80% |
| Backend | 80% | 80% | 80% | 80% |

### Current Coverage (as of 2026-02-03)

**Frontend**:
- **Statements**: 94.72% ✅
- **Branches**: 81.89% ✅
- **Functions**: 97.33% ✅
- **Lines**: 94.72% ✅

**Backend**:
- **Statements**: 93.57% ✅
- **Branches**: 80.08% ✅
- **Functions**: 92.30% ✅
- **Lines**: 93.62% ✅

### Viewing Coverage

Coverage reports are generated in:
- Frontend: `apps/web/coverage/`
- Backend: `apps/api/coverage/`

Open `coverage/index.html` in a browser to view detailed coverage report.

---

## Writing Tests

### Test Structure (AAA Pattern)

Use the **Arrange-Act-Assert** pattern:

```typescript
describe('Feature', () => {
  it('should behave correctly', () => {
    // Arrange: Set up test data and dependencies
    const input = { value: 'test' };
    const expectedOutput = 'TEST';
    
    // Act: Execute the function/component
    const result = transformInput(input);
    
    // Assert: Verify the result
    expect(result).toBe(expectedOutput);
  });
});
```

### Naming Conventions

```typescript
// ✅ Good: Descriptive and behavior-focused
describe('AuthService', () => {
  describe('login', () => {
    it('should return tokens when credentials are valid', () => {});
    it('should throw UnauthorizedException when password is incorrect', () => {});
  });
});

// ❌ Bad: Vague or implementation-focused
describe('AuthService', () => {
  it('test1', () => {});
  it('should call prisma.user.findUnique', () => {}); // Testing implementation, not behavior
});
```

### Mocking Patterns

#### Axios Mocking (Frontend)

```typescript
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

it('should fetch videos', async () => {
  (axios.get as any).mockResolvedValue({ data: [{ id: 1, title: 'Video 1' }] });
  
  const videos = await fetchVideos();
  
  expect(axios.get).toHaveBeenCalledWith('/videos');
  expect(videos).toHaveLength(1);
});
```

#### Prisma Mocking (Backend)

Use the shared mock factory:

```typescript
import { createPrismaMock } from '../../../test/utils/prisma.mock';

const prisma = createPrismaMock();

prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com' });
```

#### External Services

```typescript
// Mock Cloudflare Stream Service
const mockCloudflareService = {
  generateSignedToken: jest.fn().mockReturnValue('signed-token-123'),
  uploadVideo: jest.fn().mockResolvedValue({ streamId: 'abc123' }),
};
```

### Test Utilities

#### Frontend: Custom Render

```typescript
// apps/web/src/test/utils/render.tsx
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}
```

#### Backend: Validation Helper

```typescript
// apps/api/test/utils/validation.ts
import { validate } from 'class-validator';

export async function validateDto(dto: any) {
  const errors = await validate(dto);
  return errors.map(err => Object.values(err.constraints || {})).flat();
}
```

---

## Best Practices

### ✅ DO

1. **Write tests before fixing bugs** (TDD for bug fixes)
2. **Test behavior, not implementation** (avoid testing private methods)
3. **Use descriptive test names** (`it('should reject invalid email format')`)
4. **Mock external dependencies** (APIs, databases, third-party services)
5. **Keep tests isolated** (each test should be independent)
6. **Use setup/teardown hooks** (`beforeEach`, `afterEach`)
7. **Test error cases** (not just happy paths)
8. **Use test data factories** for consistent mock data

### ❌ DON'T

1. **Don't test framework code** (Next.js, NestJS internals)
2. **Don't test third-party libraries** (axios, prisma internals)
3. **Don't use real databases/APIs in unit tests** (use mocks)
4. **Don't skip tests with `.skip()`** without a good reason
5. **Don't hardcode sensitive data** in test files
6. **Don't share state between tests** (causes flaky tests)
7. **Don't test implementation details** (CSS classes, internal state)
8. **Don't write tests that depend on execution order**

### What to Test

| Test Type | What to Test | What NOT to Test |
|-----------|--------------|------------------|
| **Unit** | Business logic, utilities, pure functions | Framework internals, third-party libs |
| **Integration** | API endpoints, database queries, external services | UI rendering, CSS styles |
| **E2E** | Critical user journeys, authentication flows | Every single page/feature |

### When to Use Each Test Type

```
Unit Tests (80%)
└─ Fast, isolated, test logic

Integration Tests (15%)
└─ API endpoints, DB queries

E2E Tests (5%)
└─ Critical user flows only
```

---

## CI/CD Integration

### GitHub Actions

**File**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./apps/web/coverage/coverage-final.json,./apps/api/coverage/coverage-final.json
```

### Pre-commit Hook

**File**: `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm type-check && pnpm lint && pnpm test
```

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module '@/...' " (Frontend)

**Solution**: Check `vitest.config.ts` has path alias configured:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

#### 2. "Timeout of 5000ms exceeded" (Backend)

**Solution**: Increase timeout for async tests:

```typescript
it('should fetch large dataset', async () => {
  // ...
}, 10000); // 10 second timeout
```

#### 3. Playwright tests hanging in CI

**Solution**: Ensure `webServer.reuseExistingServer` is false in CI:

```typescript
webServer: {
  reuseExistingServer: !process.env.CI,
}
```

#### 4. Flaky E2E tests

**Common causes**:
- Race conditions (use `await page.waitForLoadState()`)
- Timing issues (use Playwright's auto-waiting, avoid `setTimeout`)
- Shared state between tests (ensure proper cleanup in `afterEach`)

**Solution**:
```typescript
// ✅ Good: Use built-in waiting
await page.click('button');
await page.waitForSelector('.success-message');

// ❌ Bad: Manual timeouts
await page.click('button');
await page.waitForTimeout(1000); // Flaky!
```

#### 5. Jest "Cannot use import statement outside a module"

**Solution**: Add to `jest.config.js`:

```javascript
transform: {
  '^.+\\.tsx?$': 'ts-jest',
},
transformIgnorePatterns: [
  'node_modules/(?!(module-to-transform)/)',
],
```

#### 6. Missing environment variables in tests

**Solution**: Create `.env.test` or mock them:

```typescript
beforeAll(() => {
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
});
```

### Windows-Specific Issues

#### Playwright Installation

If Playwright browsers fail to install on Windows:

```bash
# Install system dependencies
pnpm exec playwright install --with-deps chromium
```

#### Line Ending Issues

Configure Git to handle CRLF/LF:

```bash
git config core.autocrlf true
```

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Last Updated**: 2026-02-03  
**Maintained by**: Development Team  
**Questions?**: Open an issue or contact the team on Slack
