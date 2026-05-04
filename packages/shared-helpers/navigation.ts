import { type Page, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'https://danube-web.shop'

/**
 * Navigate to a path relative to the base URL.
 * Shared across CI tests and production monitors.
 */
export async function navigateTo(page: Page, path: string) {
  await page.goto(`${BASE_URL}${path}`)
}

/**
 * Wait for the page to be fully loaded — avoids flaky networkidle waits.
 * Instead, waits for the shop content to be visible.
 */
export async function waitForPageReady(page: Page) {
  await expect(page.locator('.shop-content')).toBeVisible({ timeout: 10_000 })
}
