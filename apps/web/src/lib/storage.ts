/**
 * SSR-safe localStorage wrapper.
 * Returns a no-op storage on the server, real localStorage in the browser.
 * Implements the full Storage interface for Zustand compatibility.
 */

const isServer = typeof window === 'undefined';

const noopStorage: Storage = {
  length: 0,
  clear(): void {},
  getItem(_key: string): string | null {
    return null;
  },
  key(_index: number): string | null {
    return null;
  },
  removeItem(_key: string): void {},
  setItem(_key: string, _value: string): void {},
};

export const safeLocalStorage: Storage = isServer ? noopStorage : localStorage;
