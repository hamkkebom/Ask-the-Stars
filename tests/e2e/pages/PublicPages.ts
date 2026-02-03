import { Page, expect } from '@playwright/test';

export class PublicPages {
  constructor(private readonly page: Page) {}

  async gotoHome() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(
      this.page.getByRole('heading', { name: '모든 영상 찾아보기' })
    ).toBeVisible();
  }

  async gotoAbout() {
    await this.page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(
      this.page.getByRole('heading', { name: 'About Hankaebom' })
    ).toBeVisible();
  }

  async gotoSessionInfo() {
    await this.page.goto('/education/session', {
      waitUntil: 'domcontentloaded',
    });
    await expect(
      this.page.getByRole('heading', { name: 'Session Information' })
    ).toBeVisible();
  }
}
