import { describe, it, expect } from 'vitest'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../src/utils/types'

describe('Types and Constants', () => {
  it('has expense categories', () => {
    expect(EXPENSE_CATEGORIES.length).toBeGreaterThan(0)
    expect(EXPENSE_CATEGORIES).toContain('Food & Dining')
    expect(EXPENSE_CATEGORIES).toContain('Transportation')
  })

  it('has income categories', () => {
    expect(INCOME_CATEGORIES.length).toBeGreaterThan(0)
    expect(INCOME_CATEGORIES).toContain('Salary')
    expect(INCOME_CATEGORIES).toContain('Freelance')
  })

  it('categories are unique', () => {
    const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]
    const uniqueCategories = new Set(allCategories)
    expect(uniqueCategories.size).toBe(allCategories.length)
  })
})
