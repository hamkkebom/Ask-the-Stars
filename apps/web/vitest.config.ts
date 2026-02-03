import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/ui/{card,modal,glass-card,skeleton,toast,breadcrumb,file-dropzone}.tsx',
        'src/lib/api/{auth,videos,projects,users,axios}.ts',
        'src/hooks/useChat.ts',
        'src/hooks/use-toast.ts',
        'src/store/useAuthStore.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
