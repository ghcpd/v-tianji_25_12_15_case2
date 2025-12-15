import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatDate,
  getMonthYear,
  calculateMonthlySummary,
  generateId
} from '../../src/utils/helpers'
import { Transaction } from '../../src/utils/types'

describe('Helper Functions', () => {
  describe('formatCurrency', () => {
    it('formats number as currency', () => {
      expect(formatCurrency(100)).toBe('$100.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
    })
  })

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2024-01-15')
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })
  })

  describe('getMonthYear', () => {
    it('returns month and year', () => {
      const result = getMonthYear('2024-01-15')
      expect(result).toContain('January')
      expect(result).toContain('2024')
    })
  })

  describe('calculateMonthlySummary', () => {
    it('groups transactions by month', () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          type: 'income',
          category: 'Salary',
          amount: 5000,
          description: 'Monthly salary',
          date: '2024-01-01'
        },
        {
          id: '2',
          type: 'expense',
          category: 'Food & Dining',
          amount: 100,
          description: 'Groceries',
          date: '2024-01-15'
        },
        {
          id: '3',
          type: 'expense',
          category: 'Food & Dining',
          amount: 50,
          description: 'Restaurant',
          date: '2024-01-20'
        },
        {
          id: '4',
          type: 'income',
          category: 'Salary',
          amount: 5000,
          description: 'Monthly salary',
          date: '2024-02-01'
        }
      ]

      const summaries = calculateMonthlySummary(transactions)

      expect(summaries.length).toBe(2)
      expect(summaries[0].month).toBe('2024-02')
      expect(summaries[1].month).toBe('2024-01')
    })

    it('calculates income and expenses correctly', () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          type: 'income',
          category: 'Salary',
          amount: 5000,
          description: 'Monthly salary',
          date: '2024-01-01'
        },
        {
          id: '2',
          type: 'expense',
          category: 'Food & Dining',
          amount: 100,
          description: 'Groceries',
          date: '2024-01-15'
        },
        {
          id: '3',
          type: 'expense',
          category: 'Transportation',
          amount: 50,
          description: 'Gas',
          date: '2024-01-20'
        }
      ]

      const summaries = calculateMonthlySummary(transactions)
      const january = summaries.find(s => s.month === '2024-01')

      expect(january?.income).toBe(5000)
      expect(january?.expenses).toBe(150)
      expect(january?.balance).toBe(4850)
    })

    it('categorizes expenses correctly', () => {
      const transactions: Transaction[] = [
        {
          id: '1',
          type: 'expense',
          category: 'Food & Dining',
          amount: 100,
          description: 'Groceries',
          date: '2024-01-15'
        },
        {
          id: '2',
          type: 'expense',
          category: 'Food & Dining',
          amount: 50,
          description: 'Restaurant',
          date: '2024-01-20'
        },
        {
          id: '3',
          type: 'expense',
          category: 'Transportation',
          amount: 50,
          description: 'Gas',
          date: '2024-01-20'
        }
      ]

      const summaries = calculateMonthlySummary(transactions)
      const january = summaries.find(s => s.month === '2024-01')

      expect(january?.byCategory.length).toBe(2)
      const foodCategory = january?.byCategory.find(c => c.category === 'Food & Dining')
      expect(foodCategory?.amount).toBe(150)
      expect(foodCategory?.percentage).toBe((150 / 200) * 100)
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(typeof id2).toBe('string')
    })
  })
})
