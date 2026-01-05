import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFinanceStore } from '../../src/stores/finance'

describe('Finance Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default transactions', () => {
    const store = useFinanceStore()
    expect(store.transactions.length).toBeGreaterThan(0)
  })

  it('calculates total income correctly', () => {
    const store = useFinanceStore()
    const expectedIncome = store.transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)
    expect(store.totalIncome).toBe(expectedIncome)
  })

  it('calculates total expenses correctly', () => {
    const store = useFinanceStore()
    const expectedExpenses = store.transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)
    expect(store.totalExpenses).toBe(expectedExpenses)
  })

  it('calculates balance correctly', () => {
    const store = useFinanceStore()
    expect(store.totalBalance).toBe(store.totalIncome - store.totalExpenses)
  })

  it('adds a transaction', () => {
    const store = useFinanceStore()
    const initialCount = store.transactions.length

    store.addTransaction('expense', 'Food & Dining', 50, 'Lunch', '2024-01-15')

    expect(store.transactions.length).toBe(initialCount + 1)
    expect(store.transactions[store.transactions.length - 1]).toMatchObject({
      type: 'expense',
      category: 'Food & Dining',
      amount: 50,
      description: 'Lunch'
    })
  })

  it('deletes a transaction', () => {
    const store = useFinanceStore()
    const txToDelete = store.transactions[0]
    const initialCount = store.transactions.length

    store.deleteTransaction(txToDelete.id)

    expect(store.transactions.length).toBe(initialCount - 1)
    expect(store.transactions.find(tx => tx.id === txToDelete.id)).toBeUndefined()
  })

  it('updates a transaction', () => {
    const store = useFinanceStore()
    const txToUpdate = store.transactions[0]

    store.updateTransaction(
      txToUpdate.id,
      'income',
      'Salary',
      1000,
      'Updated description',
      '2024-02-01'
    )

    const updated = store.transactions.find(tx => tx.id === txToUpdate.id)
    expect(updated).toMatchObject({
      type: 'income',
      category: 'Salary',
      amount: 1000,
      description: 'Updated description',
      date: '2024-02-01'
    })
  })

  it('retrieves transactions by month', () => {
    const store = useFinanceStore()
    const monthStr = new Date().toISOString().slice(0, 7)

    const monthTransactions = store.getTransactionsByMonth(monthStr)

    expect(Array.isArray(monthTransactions)).toBe(true)
    monthTransactions.forEach(tx => {
      expect(tx.date.startsWith(monthStr)).toBe(true)
    })
  })

  it('calculates monthly summaries', () => {
    const store = useFinanceStore()

    expect(Array.isArray(store.monthlySummaries)).toBe(true)
    expect(store.monthlySummaries.length).toBeGreaterThan(0)

    store.monthlySummaries.forEach(summary => {
      expect(summary).toHaveProperty('month')
      expect(summary).toHaveProperty('income')
      expect(summary).toHaveProperty('expenses')
      expect(summary).toHaveProperty('balance')
      expect(summary).toHaveProperty('byCategory')
      expect(summary.balance).toBe(summary.income - summary.expenses)
    })
  })
})
