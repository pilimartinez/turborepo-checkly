import { type Page, expect } from '@playwright/test'

/**
 * Click the "Add to Cart" button on a book detail page.
 */
export async function addToCart(page: Page) {
  await page.getByRole('button', { name: /add to cart/i }).click()
  await expect(page.locator('#cart')).toBeVisible()
}

/**
 * Verify the cart icon is visible (indicates items in cart).
 */
export async function verifyCartVisible(page: Page) {
  await expect(page.locator('#cart')).toBeVisible()
}
