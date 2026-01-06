import { test, expect } from '@playwright/test';

test('should add a transaction and update summary', async ({ page }) => {
  await page.goto('/');

  // Check initial state
  await expect(page.locator('text=No transactions yet')).toBeVisible();

  // Fill form
  await page.selectOption('select', 'expense');
  await page.fill('input[type="number"]', '50');
  await page.selectOption('select', 'Food');
  await page.fill('input[type="text"]', 'Lunch');
  await page.fill('input[type="date"]', new Date().toISOString().split('T')[0]);
  await page.click('button:has-text("Add Transaction")');

  // Check transaction added
  await expect(page.locator('text=Lunch')).toBeVisible();
  await expect(page.locator('text=-$50.00')).toBeVisible();

  // Check summary updated
  await expect(page.locator('text=$0.00')).toBeVisible(); // Income
  await expect(page.locator('text=$50.00')).toBeVisible(); // Expenses
  await expect(page.locator('text=-$50.00')).toBeVisible(); // Balance
});