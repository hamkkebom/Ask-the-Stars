import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { loginAsStar, logout } from './utils/auth';
import { getSignupUser } from './utils/testEnv';

test.describe('Authentication flow', () => {
  test('signup -> login -> logout', async ({ page }) => {
    test.skip(
      !process.env.E2E_STAR_EMAIL || !process.env.E2E_STAR_PASSWORD,
      'E2E_STAR_EMAIL and E2E_STAR_PASSWORD are required.'
    );
    const authPage = new AuthPage(page);
    const signupUser = getSignupUser();

    await authPage.gotoSignup();
    await authPage.startStarSignup();
    await authPage.fillStarSignupForm({
      name: 'E2E Star',
      email: signupUser.email,
      password: signupUser.password,
      confirmPassword: signupUser.password,
      agreeTerms: true,
    });
    await authPage.submitSignup();
    await authPage.expectSignupSuccess();

    await loginAsStar(page);

    await logout(page);
    await page.goto('/stars/dashboard');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('login validation and error states', async ({ page }) => {
    const authPage = new AuthPage(page);

    await authPage.gotoLogin();
    await page.getByRole('button', { name: '로그인' }).click();
    await expect(
      page.getByText('이메일과 비밀번호를 입력해주세요.')
    ).toBeVisible();

    await page.getByLabel('이메일').fill('invalid-email');
    await page.getByLabel('비밀번호').fill('short');
    await page.getByRole('button', { name: '로그인' }).click();

    const isEmailValid = await page
      .locator('#email')
      .evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isEmailValid).toBe(false);

    await page.getByLabel('이메일').fill('invalid@example.com');
    await page.getByLabel('비밀번호').fill('wrong-password');
    await page.getByRole('button', { name: '로그인' }).click();
    await expect(
      page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')
    ).toBeVisible();

    await authPage.gotoSignup();
    await authPage.startStarSignup();
    await authPage.fillStarSignupForm({
      name: 'E2E Star',
      email: 'e2e-short-pass@example.com',
      password: 'short',
      confirmPassword: 'short',
      agreeTerms: true,
    });
    await authPage.submitSignup();
    await expect(
      page.getByText('비밀번호는 8자 이상이어야 합니다.')
    ).toBeVisible();
  });
});
