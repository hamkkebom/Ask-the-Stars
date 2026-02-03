import { Page, expect } from '@playwright/test';

export class StarProjectBoardPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/stars/project-board');
    await expect(
      this.page.getByRole('heading', { name: '프로젝트 보드' })
    ).toBeVisible();
  }

  async openProject(title: string) {
    await this.page
      .getByRole('link', { name: new RegExp(title) })
      .first()
      .click();
  }

  async acceptProject() {
    await this.page.getByRole('button', { name: '제작 수락하기' }).click();
  }
}
