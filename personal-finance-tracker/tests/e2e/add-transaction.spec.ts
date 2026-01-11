import { test, expect } from '@playwright/test'

test('add transaction updates list', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.waitForSelector('text=Personal Finance Tracker')
  await page.getByLabel('description').fill('E2E Test')
  await page.getByLabel('amount').fill('50')
  await page.getByRole('button', { name: 'Add' }).click()
  await expect(page.locator('text=E2E Test')).toBeVisible()
  await expect(page.locator('text=+$50.00').first()).toBeVisible()
})
