import { Page, expect } from '@playwright/test';

export class VideoBrowserPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/videos', { waitUntil: 'domcontentloaded' });
    await expect(
      this.page.getByRole('heading', { name: '모든 영상 찾아보기' })
    ).toBeVisible();
  }

  async filterByCategory(label: string) {
    const filterButton = this.page.getByRole('button', { name: '카테고리' });
    await filterButton.scrollIntoViewIfNeeded();
    await expect(filterButton).toBeVisible();
    await filterButton.click({ force: true });
    const option = this.page
      .getByRole('button', { name: new RegExp(label) })
      .first();
    await expect(option).toBeVisible({ timeout: 15_000 });
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await expect(
      this.page.getByRole('button', { name: new RegExp(`카테고리.*${label}`) })
    ).toBeVisible();
  }

  async changeSort(label: string) {
    const sortButton = this.page
      .getByRole('button', {
        name: /최신순|오래된순|조회수순|좋아요순/,
      })
      .first();
    await sortButton.scrollIntoViewIfNeeded();
    await sortButton.click({ force: true });

    const option = this.page.getByRole('button', { name: label }).first();
    await expect(option).toBeVisible({ timeout: 10_000 });
    await option.click();
    await expect(sortButton).toContainText(label);
  }

  async search(query: string) {
    const searchInput = this.page.getByPlaceholder(
      '영상 검색 (제목, 카테고리, 상담사...)'
    );
    await searchInput.scrollIntoViewIfNeeded();
    await expect(searchInput).toBeVisible();
    await searchInput.fill(query);
  }

  async openVideo(title: string) {
    await this.page
      .getByRole('link', { name: new RegExp(title) })
      .first()
      .click();
  }
}
