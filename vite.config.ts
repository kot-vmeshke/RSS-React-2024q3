/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    remix({
      ignoredRouteFiles: ['**/*.css'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    reporters: 'verbose',
    coverage: {
      provider: 'v8',
    },
  },
});
