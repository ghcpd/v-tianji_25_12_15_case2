import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    exclude: ['e2e/**', 'playwright.config.cjs'],
    globals: true,
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
