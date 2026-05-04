import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.BASE_URL ?? 'https://danube-web.shop',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
})
