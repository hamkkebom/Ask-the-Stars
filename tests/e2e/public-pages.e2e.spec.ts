import { test } from '@playwright/test';
import { PublicPages } from './pages/PublicPages';

test.describe('Public pages', () => {
  test('home -> about -> session info', async ({ page }) => {
    const publicPages = new PublicPages(page);
    await publicPages.gotoHome();
    await publicPages.gotoAbout();
    await publicPages.gotoSessionInfo();
  });
});
