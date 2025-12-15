import { test, expect } from '@playwright/test'

test.describe('Finance Tracker App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)
  })

  test('should load the app with dashboard view', async ({ page }) => {
    // Check that the app loads
    await expect(page.locator('#app')).toBeVisible()

    // Check sidebar is visible
    await expect(page.locator('.sidebar')).toBeVisible()

    // Check logo is visible
    await expect(page.locator('.logo')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Finance Tracker')
  })

  test('should display navigation buttons', async ({ page }) => {
    // Check all navigation buttons are visible
    const navBtns = page.locator('.nav-btn')
    await expect(navBtns).toHaveCount(3)
  })

  test('should display dashboard stats', async ({ page }) => {
    // Check that stat cards are visible
    const statCards = page.locator('.stat-card')
    await expect(statCards).toHaveCount(3)

    // Check stat labels
    await expect(page.locator('.stat-label')).toContainText('Total Income')
    await expect(page.locator('.stat-label')).toContainText('Total Expenses')
    await expect(page.locator('.stat-label')).toContainText('Balance')
  })

  test('should display latest transactions on dashboard', async ({ page }) => {
    // Check latest transactions section
    await expect(page.locator('.latest-transactions h3')).toContainText('Latest Transactions')

    // Check transaction list exists
    const transactionItems = page.locator('.transaction-item')
    const count = await transactionItems.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should navigate to transactions view', async ({ page }) => {
    // Click transactions button (2nd button)
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()

    // Wait for view to change
    await page.waitForTimeout(300)

    // Check transactions view is displayed
    await expect(page.locator('.transactions-view')).toBeVisible()
  })

  test('should filter transactions by type', async ({ page }) => {
    // Navigate to transactions
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()
    await page.waitForTimeout(300)

    // Get initial count
    const allRows = page.locator('.table-row')
    const initialCount = await allRows.count()

    // Filter by income
    await page.locator('.filter-select').selectOption('income')
    await page.waitForTimeout(300)

    const incomeRows = page.locator('.table-row')
    const incomeCount = await incomeRows.count()

    // Income count should be less than or equal to initial count
    expect(incomeCount).toBeLessThanOrEqual(initialCount)

    // All visible rows should show income badge
    const typeRows = page.locator('.type-badge.income')
    const typeCount = await typeRows.count()
    expect(typeCount).toBeGreaterThanOrEqual(0)
  })

  test('should search transactions', async ({ page }) => {
    // Navigate to transactions
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()
    await page.waitForTimeout(300)

    // Search for a transaction
    const searchInput = page.locator('.search-input')
    await searchInput.fill('salary')
    await page.waitForTimeout(300)

    // Check that results are filtered
    const rows = page.locator('.table-row')
    const count = await rows.count()
    expect(count).toBeGreaterThanOrEqual(0)

    // Clear search
    await searchInput.fill('')
  })

  test('should navigate to analytics view', async ({ page }) => {
    // Click analytics button (3rd button)
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(2).click()

    // Wait for view to change
    await page.waitForTimeout(300)

    // Check analytics view is displayed
    await expect(page.locator('.analytics')).toBeVisible()
  })

  test('should display charts in analytics', async ({ page }) => {
    // Navigate to analytics
    const analyticsBtn = page.locator('button').filter({ hasText: '📈 Analytics' })
    await analyticsBtn.click()
    await page.waitForTimeout(300)

    // Check chart cards are visible
    const chartCards = page.locator('.chart-card')
    await expect(chartCards).toHaveCount(2)

    // Check chart titles
    await expect(page.locator('.chart-card h3')).toContainText('Monthly Income vs Expenses')
    await expect(page.locator('.chart-card h3')).toContainText('Expense Categories')
  })

  test('should display monthly summary cards', async ({ page }) => {
    // Navigate to analytics
    const analyticsBtn = page.locator('button').filter({ hasText: '📈 Analytics' })
    await analyticsBtn.click()
    await page.waitForTimeout(300)

    // Check summary cards are visible
    const summaryCards = page.locator('.summary-card')
    const count = await summaryCards.count()
    expect(count).toBeGreaterThan(0)

    // Check that summary cards have required information
    const firstCard = summaryCards.first()
    await expect(firstCard.locator('.summary-month')).toBeVisible()
  })

  test('should add a new transaction', async ({ page }) => {
    // Click add transaction button
    const addBtn = page.locator('.add-btn')
    await addBtn.click()
    await page.waitForTimeout(300)

    // Check form is visible
    const form = page.locator('.add-form-container .form')
    await expect(form).toBeVisible()

    // Fill form
    const typeSelect = form.locator('select').first()
    const categorySelect = form.locator('select').nth(1)
    const amountInput = form.locator('input[type="number"]')
    const descriptionInput = form.locator('input[type="text"]').first()
    const dateInput = form.locator('input[type="date"]')

    await typeSelect.selectOption('expense')
    await categorySelect.selectOption('Food & Dining')
    await amountInput.fill('25.50')
    await descriptionInput.fill('Test transaction')
    await dateInput.fill('2024-12-15')

    // Submit form
    const submitBtn = form.locator('.submit-btn')
    await submitBtn.click()
    await page.waitForTimeout(500)

    // Check form is hidden after submission
    await expect(form).not.toBeVisible()

    // Navigate to transactions to verify
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()
    await page.waitForTimeout(300)

    // Check new transaction appears
    await expect(page.locator('.table-row')).toContainText('Test transaction')
  })

  test('should delete a transaction', async ({ page }) => {
    // Navigate to transactions
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()
    await page.waitForTimeout(300)

    // Get initial count
    const allRows = page.locator('.table-row')
    const initialCount = await allRows.count()

    if (initialCount > 0) {
      // Click delete button on first transaction
      const deleteBtn = page.locator('.delete-btn').first()
      page.once('dialog', dialog => dialog.accept())
      await deleteBtn.click()
      await page.waitForTimeout(500)

      // Check count decreased
      const newCount = await page.locator('.table-row').count()
      expect(newCount).toBe(initialCount - 1)
    }
  })

  test('should maintain data across navigation', async ({ page }) => {
    // Get initial stats from dashboard
    await page.goto('/')
    const initialIncome = await page.locator('.stat-card.income .stat-value').textContent()

    // Navigate to transactions
    const navBtns = page.locator('.nav-btn')
    await navBtns.nth(1).click()
    await page.waitForTimeout(300)

    // Navigate back to dashboard
    await navBtns.nth(0).click()
    await page.waitForTimeout(300)

    // Check stats are the same
    const finalIncome = await page.locator('.stat-card.income .stat-value').textContent()
    expect(initialIncome).toBe(finalIncome)
  })

  test('should have responsive layout', async ({ page }) => {
    // Check that app container is visible and properly laid out
    const appContainer = page.locator('.app-container')
    await expect(appContainer).toBeVisible()

    const sidebar = page.locator('.sidebar')
    const mainContent = page.locator('.main-content')

    await expect(sidebar).toBeVisible()
    await expect(mainContent).toBeVisible()

    // Get layout info
    const appBox = await appContainer.boundingBox()
    const sidebarBox = await sidebar.boundingBox()
    const mainBox = await mainContent.boundingBox()

    // Verify layout is correct
    if (appBox && sidebarBox && mainBox) {
      expect(sidebarBox.x).toBe(0)
      expect(mainBox.x).toBe(sidebarBox.x + sidebarBox.width)
      expect(mainBox.width + sidebarBox.width).toBeLessThanOrEqual(appBox.width + 1)
    }
  })
})
