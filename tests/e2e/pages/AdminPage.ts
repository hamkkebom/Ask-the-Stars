import { Page, expect } from '@playwright/test';

export class AdminPage {
  constructor(private readonly page: Page) {}

  async gotoDashboard() {
    await this.page.goto('/admin');
    await expect(this.page.getByText('전체 영상')).toBeVisible();
  }

  async gotoProjects() {
    await this.page.goto('/admin/stars/projects');
    await expect(
      this.page.getByRole('heading', { name: '프로젝트 관리' })
    ).toBeVisible();
  }

  async gotoVideos() {
    await this.page.goto('/admin/videos');
    await expect(
      this.page.getByRole('heading', { name: '영상 자산' })
    ).toBeVisible();
  }
}
