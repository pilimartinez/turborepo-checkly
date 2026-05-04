import { test } from '@playwright/test'
import { navigateTo, waitForPageReady, openBookDetail, verifyCatalogLoaded } from '@turbo-demo/shared-helpers'

/**
 * CI test promoted to monitor via @p1 tag.
 * Composes building blocks: openBookDetail, verifyCatalogLoaded
 */
test.describe('Book Catalog Browsing', { tag: ['@telehealth', '@p1'] }, () => {
  test('should list all books on homepage', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await verifyCatalogLoaded(page)
  })

  test('should navigate between book details', async ({ page }) => {
    await navigateTo(page, '/')
    await waitForPageReady(page)
    await openBookDetail(page, 0)

    await page.goBack()
    await waitForPageReady(page)

    await openBookDetail(page, 1)
  })
})
