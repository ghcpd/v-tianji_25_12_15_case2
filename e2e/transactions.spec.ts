import { test, expect } from '@playwright/test';

/*
  E2E tests for the Personal Finance Tracker app.
  These tests verify that the user can add and delete transactions and that
  the summary updates accordingly.
*/

test.beforeEach(async ({ page }) => {
  // ensure a clean state
  await page.evaluate(() => localStorage.clear());
});

test('can add a transaction and see it in list and summary', async ({ page }) => {
  await page.goto('/');

  // wait for the form inputs to render
  await page.getByTestId('date-input').waitFor({ state: 'visible', timeout: 30000 });
  await page.getByTestId('amount-input').waitFor({ state: 'visible', timeout: 30000 });
  await page.getByTestId('category-input').waitFor({ state: 'visible', timeout: 30000 });
  await page.getByTestId('description-input').waitFor({ state: 'visible', timeout: 30000 });

  await page.getByTestId('date-input').fill('2023-06-01');
  await page.getByTestId('amount-input').fill('123.45');
  await page.getByTestId('category-input').fill('Rent');
  await page.getByTestId('description-input').fill('June rent');

  await page.getByRole('button', { name: /add/i }).click();

  // Should see the new transaction in the table
  await expect(page.getByText('Rent')).toBeVisible();
  await expect(page.getByText('June rent')).toBeVisible();
  await expect(page.getByText('123.45')).toBeVisible();

  // Summary totals should reflect transaction
  await expect(page.getByText(/Total Income:/)).toContainText('123.45');
  await expect(page.getByText(/Total Expense:/)).toContainText('0.00');
});

test('delete a transaction', async ({ page }) => {
  await page.goto('/');

  // add a transaction that will be deleted
  await page.getByTestId('date-input').fill('2023-06-01');
  await page.getByTestId('amount-input').fill('-50');
  await page.getByTestId('category-input').fill('Groceries');
  await page.getByRole('button', { name: /add/i }).click();

  // delete the transaction using the aria-label
  await page.locator('tr').filter({ hasText: 'Groceries' }).getByRole('button', { name: /Delete/i }).click();

  await expect(page.getByText('Groceries')).not.toBeVisible();
});
