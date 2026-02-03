import { Page, expect } from '@playwright/test';

export class StarProjectDetailPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(
      this.page.getByRole('heading', { name: /E2E Test Project/ })
    ).toBeVisible();
  }

  async startNewVersion(title: string) {
    await this.page.getByRole('button', { name: '+ 새 버전 추가' }).click();
    await this.page.getByPlaceholder(/버전 제목/).fill(title);
    await this.page.getByRole('button', { name: '영상 업로드' }).click();
  }
}
