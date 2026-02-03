import { test, expect } from '@playwright/test';
import { mockExternalServices, mockVideoEndpoints } from './utils/mockRoutes';
import { VideoBrowserPage } from './pages/VideoBrowserPage';

test.describe('Video browsing flow', () => {
  test('browse -> filter -> watch -> back', async ({ page }) => {
    await mockExternalServices(page);
    await mockVideoEndpoints(page);

    const videosPage = new VideoBrowserPage(page);
    await videosPage.goto();
    await videosPage.search('E2E');
    await videosPage.openVideo('E2E Featured Video');

    await expect(page.locator('video')).toBeVisible();
    await expect(page.getByText('E2E video detail description.')).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/videos/);
  });
});
