import { Page, expect } from '@playwright/test';

export class AuthPage {
  constructor(private readonly page: Page) {}

  async gotoLogin() {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
  }

  async gotoSignup() {
    await this.page.goto('/auth/signup', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('이메일').fill(email);
    await this.page.getByLabel('비밀번호').fill(password);
    await this.page.getByRole('button', { name: '로그인' }).click();
  }

  async startStarSignup() {
    await this.page.getByRole('link', { name: /프리랜서 \(Star\)/ }).click();
    await this.page.waitForURL('**/auth/signup/stars');
    await expect(
      this.page.getByRole('heading', { name: '프리랜서 가입' })
    ).toBeVisible();
  }

  async fillStarSignupForm(options: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
  }) {
    await this.page.getByLabel('이름 *').fill(options.name);
    await this.page.getByLabel('이메일 *').fill(options.email);
    await this.page.getByLabel('비밀번호 *').fill(options.password);
    await this.page.getByLabel('비밀번호 확인 *').fill(options.confirmPassword);
    if (options.agreeTerms) {
      await this.page.getByRole('checkbox').check();
    }
  }

  async submitSignup() {
    await this.page.getByRole('button', { name: '가입하기' }).click();
  }

  async expectSignupSuccess() {
    await expect(
      this.page.getByRole('heading', { name: '가입 완료!' })
    ).toBeVisible();
  }
}
