import { test, expect } from '@playwright/test';
import { loginAsStar } from './utils/auth';
import { mockExternalServices, mockProjectEndpoints } from './utils/mockRoutes';
import { StarProjectBoardPage } from './pages/StarProjectBoardPage';
import { StarMyProjectsPage } from './pages/StarMyProjectsPage';
import { StarProjectDetailPage } from './pages/StarProjectDetailPage';
import { StarUploadPage } from './pages/StarUploadPage';
import { StarFeedbackPage } from './pages/StarFeedbackPage';

const hasStarCredentials = Boolean(
  process.env.E2E_STAR_EMAIL && process.env.E2E_STAR_PASSWORD
);

test.describe('Star flow', () => {
  test.skip(
    !hasStarCredentials,
    'E2E_STAR_EMAIL and E2E_STAR_PASSWORD are required.'
  );
  test('browse -> apply -> upload -> feedback', async ({ page }) => {
    await mockExternalServices(page);
    await mockProjectEndpoints(page);

    await loginAsStar(page);

    const projectBoard = new StarProjectBoardPage(page);
    await projectBoard.goto();
    await projectBoard.openProject('E2E Test Project');
    await projectBoard.acceptProject();
    await expect(page).toHaveURL(/\/stars\/my-projects/);

    const myProjects = new StarMyProjectsPage(page);
    await myProjects.expectLoaded();
    await myProjects.openFirstProject();

    const detailPage = new StarProjectDetailPage(page);
    await detailPage.expectLoaded();
    await detailPage.startNewVersion('E2E Revision');
    await expect(page).toHaveURL(/\/stars\/upload/);

    const uploadPage = new StarUploadPage(page);
    await uploadPage.uploadVideo();

    const feedbackPage = new StarFeedbackPage(page);
    await feedbackPage.goto();
    await feedbackPage.expectFeedbackContent(
      'Please adjust subtitle position.'
    );
  });
});
