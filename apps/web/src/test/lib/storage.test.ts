import { describe, it, expect, beforeEach, vi } from 'vitest';
import { safeLocalStorage } from '@/lib/storage';

describe('safeLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Storage interface implementation', () => {
    it('should implement the Storage interface', () => {
      expect(safeLocalStorage).toHaveProperty('length');
      expect(safeLocalStorage).toHaveProperty('clear');
      expect(safeLocalStorage).toHaveProperty('getItem');
      expect(safeLocalStorage).toHaveProperty('key');
      expect(safeLocalStorage).toHaveProperty('removeItem');
      expect(safeLocalStorage).toHaveProperty('setItem');
    });

    it('should have correct method signatures', () => {
      expect(typeof safeLocalStorage.clear).toBe('function');
      expect(typeof safeLocalStorage.getItem).toBe('function');
      expect(typeof safeLocalStorage.key).toBe('function');
      expect(typeof safeLocalStorage.removeItem).toBe('function');
      expect(typeof safeLocalStorage.setItem).toBe('function');
      expect(typeof safeLocalStorage.length).toBe('number');
    });
  });

  describe('Browser environment (localStorage available)', () => {
    it('should delegate getItem to localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(safeLocalStorage.getItem('test-key')).toBe('test-value');
    });

    it('should delegate setItem to localStorage', () => {
      safeLocalStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');
    });

    it('should delegate removeItem to localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      safeLocalStorage.removeItem('test-key');
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should delegate clear to localStorage', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      safeLocalStorage.clear();
      expect(localStorage.length).toBe(0);
    });

    it('should delegate key to localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(safeLocalStorage.key(0)).toBe('test-key');
    });

    it('should reflect length property', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      expect(safeLocalStorage.length).toBe(2);
    });
  });

  describe('SSR safety', () => {
    it('should return null for getItem when key does not exist', () => {
      expect(safeLocalStorage.getItem('non-existent-key')).toBeNull();
    });

    it('should handle multiple operations without errors', () => {
      expect(() => {
        safeLocalStorage.setItem('key1', 'value1');
        safeLocalStorage.getItem('key1');
        safeLocalStorage.removeItem('key1');
        safeLocalStorage.clear();
      }).not.toThrow();
    });

    it('should work with Zustand createJSONStorage pattern', () => {
      // Simulate Zustand's usage pattern
      const storage = safeLocalStorage;
      const key = 'zustand-test';
      const value = JSON.stringify({ state: { count: 42 } });

      storage.setItem(key, value);
      const retrieved = storage.getItem(key);
      expect(retrieved).toBe(value);

      if (retrieved) {
        const parsed = JSON.parse(retrieved);
        expect(parsed.state.count).toBe(42);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string values', () => {
      safeLocalStorage.setItem('empty', '');
      expect(safeLocalStorage.getItem('empty')).toBe('');
    });

    it('should handle special characters in keys', () => {
      const specialKey = 'key-with-special_chars.123';
      safeLocalStorage.setItem(specialKey, 'value');
      expect(safeLocalStorage.getItem(specialKey)).toBe('value');
    });

    it('should handle JSON stringified objects', () => {
      const obj = { foo: 'bar', nested: { value: 123 } };
      const serialized = JSON.stringify(obj);
      safeLocalStorage.setItem('json-key', serialized);
      const retrieved = safeLocalStorage.getItem('json-key');
      expect(retrieved).toBe(serialized);
      expect(JSON.parse(retrieved!)).toEqual(obj);
    });
  });
});
