import { type Page, expect } from '@playwright/test'

/**
 * Search for a book using the search bar.
 */
export async function searchBook(page: Page, query: string) {
  await page.getByRole('textbox').fill(query)
  await page.keyboard.press('Enter')
  await expect(page.locator('.preview-title').first()).toBeVisible()
}

/**
 * Click a book from the catalog listing by index (default: first).
 */
export async function openBookDetail(page: Page, index = 0) {
  await page.locator('.preview-title').nth(index).click()
  await expect(page.getByText(/Price: \$/)).toBeVisible()
}

/**
 * Verify the book detail page shows expected elements.
 */
export async function verifyBookDetail(page: Page) {
  await expect(page.getByText(/Price: \$/)).toBeVisible()
  await expect(page.getByText(/by /)).toBeVisible()
  await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible()
}

/**
 * Verify books are listed on the page.
 */
export async function verifyCatalogLoaded(page: Page) {
  await expect(page.locator('.preview-title').first()).toBeVisible()
}
