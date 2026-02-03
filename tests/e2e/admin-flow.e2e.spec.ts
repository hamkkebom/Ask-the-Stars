import { test, expect } from '@playwright/test';
import { loginAsAdmin, logout } from './utils/auth';
import { AdminPage } from './pages/AdminPage';

const hasAdminCredentials = Boolean(
  process.env.E2E_ADMIN_EMAIL && process.env.E2E_ADMIN_PASSWORD
);

test.describe('Admin flow', () => {
  test.skip(
    !hasAdminCredentials,
    'E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD are required.'
  );
  test('login -> dashboard -> projects -> submissions', async ({ page }) => {
    await loginAsAdmin(page);

    const adminPage = new AdminPage(page);
    await adminPage.gotoDashboard();
    await adminPage.gotoProjects();
    await adminPage.gotoVideos();

    await logout(page);
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
