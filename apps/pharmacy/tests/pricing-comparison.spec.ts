import { test, expect } from '@playwright/test'
import { navigateTo, waitForPageReady, openBookDetail, verifyBookDetail } from '@turbo-demo/shared-helpers'

/**
 * CI test promoted to monitor via @p1 tag.
 * Composes building blocks: openBookDetail, verifyBookDetail
 */
test.describe('Book Details and Pricing', { tag: ['@pharmacy', '@p1'] }, () => {
  test('should display book details with price', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await openBookDetail(page)
    await verifyBookDetail(page)
  })

  test('should verify books API returns valid data', async ({ page }) => {
    const response = await page.request.get('https://danube-web.shop/api/books')
    expect(response.status()).toBe(200)

    const books = await response.json()
    expect(books.length).toBeGreaterThan(0)
    expect(books[0]).toHaveProperty('title')
    expect(books[0]).toHaveProperty('price')
    expect(books[0]).toHaveProperty('author')
  })
})
