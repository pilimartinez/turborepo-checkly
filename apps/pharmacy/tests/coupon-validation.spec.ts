import { test, expect } from '@playwright/test'
import { navigateTo, waitForPageReady, openBookDetail, addToCart } from '@turbo-demo/shared-helpers'

/**
 * Intentionally failing test to demonstrate how Checkly surfaces
 * assertion failures in the dashboard with traces and screenshots.
 */
test.describe('Coupon Validation', { tag: ['@pharmacy', '@p1'] }, () => {
  test('should apply a discount coupon at checkout', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await openBookDetail(page)
    await addToCart(page)

    // This element doesn't exist — will fail with a clear assertion error
    await expect(page.getByRole('textbox', { name: /coupon code/i })).toBeVisible({ timeout: 5_000 })
  })
})
