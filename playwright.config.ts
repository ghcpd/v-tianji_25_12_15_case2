import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  // timeout for each test
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://127.0.0.1:5176',
    // Browser options
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30 * 1000,
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 5176 --host 127.0.0.1',
    port: 5176,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
