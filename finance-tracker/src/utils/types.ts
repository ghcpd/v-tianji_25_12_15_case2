export interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: string
}

export interface CategoryBalance {
  category: string
  amount: number
  percentage: number
}

export interface MonthlySummary {
  month: string
  income: number
  expenses: number
  balance: number
  byCategory: CategoryBalance[]
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Education',
  'Other Expense'
]

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Bonus',
  'Other'
]
