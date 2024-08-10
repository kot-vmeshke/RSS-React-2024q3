/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from '@remix-run/dev';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), remix()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src/') }],
  },
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
