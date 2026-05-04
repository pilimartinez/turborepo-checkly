import { test } from '@playwright/test'
import { navigateTo, waitForPageReady, openBookDetail, addToCart, verifyBookDetail } from '@turbo-demo/shared-helpers'

/**
 * CI test promoted to monitor via @p0 tag.
 * Composes building blocks: openBookDetail, addToCart, verifyBookDetail
 */
test.describe('Cart and Checkout Flow', { tag: ['@telehealth', '@p0'] }, () => {
  test('should add a book to the cart', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await openBookDetail(page)
    await addToCart(page)
  })

  test('should view book details and verify add-to-cart button', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await openBookDetail(page)
    await verifyBookDetail(page)
    await addToCart(page)
  })
})
