import { format, parseISO } from 'date-fns'

export const categories = [
  'Salary',
  'Groceries',
  'Rent',
  'Utilities',
  'Eating Out',
  'Entertainment',
  'Transport',
  'Other',
]

export const sampleData = [
  {
    id: 't1',
    type: 'income',
    amount: 4200,
    category: 'Salary',
    description: 'Monthly salary',
    date: '2025-12-01',
  },
  {
    id: 't2',
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    description: 'December rent',
    date: '2025-12-02',
  },
  {
    id: 't3',
    type: 'expense',
    amount: 150,
    category: 'Groceries',
    description: 'Supermarket',
    date: '2025-12-05',
  },
  {
    id: 't4',
    type: 'expense',
    amount: 60,
    category: 'Transport',
    description: 'Gas',
    date: '2025-11-28',
  },
]

export function computeSummary(transactions) {
  const totals = transactions.reduce(
    (acc, t) => {
      const month = format(parseISO(t.date), 'yyyy-MM')
      if (!acc.byMonth[month]) acc.byMonth[month] = { income: 0, expense: 0 }
      if (t.type === 'income') {
        acc.totalIncome += t.amount
        acc.byMonth[month].income += t.amount
      } else {
        acc.totalExpense += t.amount
        acc.byMonth[month].expense += t.amount
      }
      acc.byCategory[t.category] = (acc.byCategory[t.category] || 0) + t.amount
      return acc
    },
    { totalIncome: 0, totalExpense: 0, byMonth: {}, byCategory: {} }
  )

  const net = totals.totalIncome - totals.totalExpense

  return {
    ...totals,
    net,
  }
}
