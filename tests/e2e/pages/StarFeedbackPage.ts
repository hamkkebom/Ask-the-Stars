import { Page, expect } from '@playwright/test';

export class StarFeedbackPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/stars/feedback');
    await expect(
      this.page.getByRole('heading', { name: '받은 피드백' })
    ).toBeVisible();
  }

  async expectFeedbackContent(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}
