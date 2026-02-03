import { Page, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

export class StarUploadPage {
  constructor(private readonly page: Page) {}

  async uploadVideo() {
    await expect(
      this.page.getByRole('heading', { name: '영상 업로드' })
    ).toBeVisible();

    const fileInput = this.page.locator('input[type="file"][accept^="video"]');
    await fileInput.setInputFiles({
      name: 'sample.mp4',
      mimeType: 'video/mp4',
      buffer: Buffer.from('e2e-sample-video'),
    });

    await this.page.getByRole('combobox').selectOption('타로');
    await this.page.getByRole('button', { name: '업로드' }).click();
    await expect(
      this.page.getByRole('heading', { name: '업로드 완료!' })
    ).toBeVisible();
  }
}
