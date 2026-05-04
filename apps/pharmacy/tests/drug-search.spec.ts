import { test, expect } from '@playwright/test'
import { navigateTo, waitForPageReady, searchBook, verifyCatalogLoaded } from '@turbo-demo/shared-helpers'

/**
 * CI test promoted to monitor via @p0 tag.
 * Composes building blocks: navigateTo, searchBook, verifyCatalogLoaded
 * Verifies core search functionality for pharmacy app
 */
test.describe('Book Search', { tag: ['@pharmacy', '@p0'] }, () => {
  test('should display the catalog with books', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await expect(page).toHaveTitle(/Danube WebShop/)
    await verifyCatalogLoaded(page)
  })

  test('should search for a book and display results', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await searchBook(page, 'Haben')
  })
})
