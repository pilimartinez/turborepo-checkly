import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'https://danube-web.shop'

/**
 * Standalone production monitor.
 *
 * Self-contained: no shared-helpers imports. BrowserChecks run in
 * isolation on Checkly infra without access to workspace packages.
 * This also means CI test refactors can't break this monitor.
 */
test('Telehealth UI is healthy', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page.locator('.shop-content')).toBeVisible({ timeout: 10_000 })

  // Open first book detail
  await page.locator('.preview-title').first().click()
  await expect(page.getByText(/Price: \$/)).toBeVisible()
  await expect(page.getByText(/by /)).toBeVisible()
  await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible()
})
