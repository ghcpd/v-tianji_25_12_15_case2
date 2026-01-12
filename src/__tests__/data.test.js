import { computeSummary } from '../data'

describe('computeSummary', () => {
  test('computes totals correctly', () => {
    const transactions = [
      { id: 'a', type: 'income', amount: 100, category: 'Salary', date: '2025-12-01' },
      { id: 'b', type: 'expense', amount: 30, category: 'Groceries', date: '2025-12-02' },
      { id: 'c', type: 'expense', amount: 20, category: 'Transport', date: '2025-11-30' },
    ]

    const s = computeSummary(transactions)
    expect(s.totalIncome).toBe(100)
    expect(s.totalExpense).toBe(50)
    expect(s.net).toBe(50)
    expect(Object.keys(s.byMonth).length).toBeGreaterThanOrEqual(2)
  })
})
