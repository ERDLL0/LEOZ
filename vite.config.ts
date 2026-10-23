import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

if (process.env.VERCEL_ENV === 'production' || process.env.LEOZ_RELEASE === 'production') {
  throw new Error(
    'Leoz production release is blocked. Run npm run check:release and resolve the outstanding approvals and launch review before a production deployment.',
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
