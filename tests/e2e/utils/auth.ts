import { Page, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { getAdminUser, getStarUser } from './testEnv';

export const loginAsStar = async (page: Page) => {
  const authPage = new AuthPage(page);
  const user = getStarUser();
  await authPage.gotoLogin();
  await authPage.login(user.email, user.password);
  await expect(page).toHaveURL(/\/stars\/dashboard/);
};

export const loginAsAdmin = async (page: Page) => {
  const authPage = new AuthPage(page);
  const user = getAdminUser();
  await authPage.gotoLogin();
  await authPage.login(user.email, user.password);
  await expect(page).toHaveURL(/\/(stars\/dashboard|admin)/);
};

export const logout = async (page: Page) => {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.context().clearCookies();
};
