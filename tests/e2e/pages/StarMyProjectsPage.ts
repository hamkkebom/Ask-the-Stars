import { Page, expect } from '@playwright/test';

export class StarMyProjectsPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(
      this.page.getByRole('heading', { name: '내 프로젝트' })
    ).toBeVisible();
  }

  async openFirstProject() {
    await this.page.getByRole('link', { name: /E2E Test Project/ }).click();
  }
}
