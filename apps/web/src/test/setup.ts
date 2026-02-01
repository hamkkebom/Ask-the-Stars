import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver
// @ts-ignore
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
// @ts-ignore
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock fetch with proper headers
// @ts-ignore
global.fetch = vi.fn((url: any, options: any) => {
  return Promise.resolve(
    new Response('{}', {
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
    })
  );
});
