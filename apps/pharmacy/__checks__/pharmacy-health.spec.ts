import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'https://danube-web.shop'

/**
 * Standalone production monitor.
 *
 * Self-contained: no shared-helpers imports. BrowserChecks run in
 * isolation on Checkly infra without access to workspace packages.
 * This also means CI test refactors can't break this monitor.
 */
test('Homepage is healthy', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page.locator('.shop-content')).toBeVisible({ timeout: 10_000 })
  await expect(page).toHaveTitle(/Danube WebShop/)
  await expect(page.locator('.preview-title').first()).toBeVisible()

  // Search for a book
  await page.getByRole('textbox').fill('Haben')
  await page.keyboard.press('Enter')
  await expect(page.locator('.preview-title').first()).toBeVisible()
})
