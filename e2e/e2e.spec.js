import { test, expect } from '@playwright/test'

test('add transaction through UI (E2E)', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /Personal Finance Tracker/i })).toBeVisible()

  await page.fill('input[placeholder="0.00"]', '55.5')
  await page.fill('input[placeholder="Optional"]', 'E2E purchase')
  await page.click('button:has-text("Add Transaction")')

  await expect(page.locator('text=E2E purchase')).toBeVisible()
  await expect(page.locator('text=55.50').first()).toBeVisible()
})
