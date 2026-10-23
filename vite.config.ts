import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const isProduction = process.env.VERCEL_ENV === 'production';
const releaseApproved = process.env.LEOZ_RELEASE === 'approved';

if (isProduction && !releaseApproved) {
  throw new Error(
    'LEOZ production release is blocked. Set LEOZ_RELEASE=approved after final release approval.',
  );
}

const src = fileURLToPath(new URL('./src', import.meta.url));
const data = fileURLToPath(new URL('./data', import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': src,
      '@data': data,
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
  },
});
