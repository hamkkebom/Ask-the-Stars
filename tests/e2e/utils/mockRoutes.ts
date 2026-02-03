import { Page } from '@playwright/test';
import {
  mockAssignments,
  mockAssignmentDetail,
  mockFeedback,
  mockProjectRequests,
  mockSubmissions,
  mockVideoDetail,
  mockVideosList,
} from '../fixtures/testData';

export const mockExternalServices = async (page: Page) => {
  await page.route('**/cloudflarestream.com/**', (route) =>
    route.fulfill({ status: 204, body: '' })
  );
  await page.route('**/stream.cloudflare.com/**', (route) =>
    route.fulfill({ status: 204, body: '' })
  );
};

export const mockProjectEndpoints = async (page: Page) => {
  await page.route('**/api/projects/requests/board', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProjectRequests),
    })
  );

  await page.route('**/api/projects/my-assignments', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockAssignments),
    })
  );

  await page.route('**/api/project-assignments/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockAssignmentDetail),
    })
  );

  await page.route('**/api/submissions**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockSubmissions),
    })
  );

  await page.route('**/api/feedback', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockFeedback),
    })
  );

  await page.route('**/rest/v1/videos**', (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([{ id: 'video-upload-1' }]),
      });
    }
    return route.continue();
  });
};

export const mockVideoEndpoints = async (page: Page) => {
  await page.route(/\/api\/videos(\?.*)?$/, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockVideosList),
    })
  );

  await page.route(/\/api\/videos\/[^/]+\/recommendations/, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    })
  );

  await page.route(/\/api\/videos\/[^/]+$/, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockVideoDetail),
    })
  );
};
