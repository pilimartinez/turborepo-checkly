import { type Page, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL ?? 'https://danube-web.shop'

/**
 * Shared login helper — the "LEGO brick" that both CI tests and production
 * monitors can use. Production monitors pass real credentials via env vars;
 * CI tests pass test credentials.
 */
export async function login(page: Page, options?: { username?: string; password?: string }) {
  const username = options?.username ?? process.env.APP_USERNAME ?? 'user@email.com'
  const password = options?.password ?? process.env.APP_PASSWORD ?? 'supersecure1'

  await page.goto(BASE_URL)
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByPlaceholder('Email').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await expect(page.getByText('Welcome back')).toBeVisible({ timeout: 10_000 })
}
