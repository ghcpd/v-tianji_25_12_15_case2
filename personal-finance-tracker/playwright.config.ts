import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 }
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
})
