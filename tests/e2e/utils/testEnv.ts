export type TestUser = {
  email: string;
  password: string;
};

export const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:3000';

const assertEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`${name} is required for E2E tests.`);
  }
  return value;
};

export const getStarUser = (): TestUser => ({
  email: assertEnv(process.env.E2E_STAR_EMAIL, 'E2E_STAR_EMAIL'),
  password: assertEnv(process.env.E2E_STAR_PASSWORD, 'E2E_STAR_PASSWORD'),
});

export const getAdminUser = (): TestUser => ({
  email: assertEnv(process.env.E2E_ADMIN_EMAIL, 'E2E_ADMIN_EMAIL'),
  password: assertEnv(process.env.E2E_ADMIN_PASSWORD, 'E2E_ADMIN_PASSWORD'),
});

export const getSignupUser = (): TestUser => ({
  email:
    process.env.E2E_SIGNUP_EMAIL || `e2e-user-${Date.now()}@localhost.test`,
  password: process.env.E2E_SIGNUP_PASSWORD || 'E2E-TempPass-1234',
});
