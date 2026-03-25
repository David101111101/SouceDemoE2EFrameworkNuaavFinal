import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'html',
  outputDir: 'test-results/',
  globalSetup: './global.setup.ts',
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storage/storageState.json',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 45000,
    actionTimeout: 15000
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
