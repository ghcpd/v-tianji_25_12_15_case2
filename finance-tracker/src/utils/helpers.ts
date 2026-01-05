import { Transaction, MonthlySummary, CategoryBalance } from './types'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

export function getMonthYear(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(new Date(date))
}

export function calculateMonthlySummary(transactions: Transaction[]): MonthlySummary[] {
  const byMonth: Record<string, Transaction[]> = {}

  transactions.forEach(tx => {
    const monthKey = new Date(tx.date).toISOString().slice(0, 7)
    if (!byMonth[monthKey]) byMonth[monthKey] = []
    byMonth[monthKey].push(tx)
  })

  return Object.entries(byMonth)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, txs]) => {
      const income = txs
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0)

      const expenses = txs
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0)

      const byCategory: CategoryBalance[] = []
      const categoryMap: Record<string, number> = {}

      txs.forEach(tx => {
        if (tx.type === 'expense') {
          categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount
        }
      })

      const totalExpenses = Object.values(categoryMap).reduce((a, b) => a + b, 0)

      Object.entries(categoryMap).forEach(([category, amount]) => {
        byCategory.push({
          category,
          amount,
          percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
        })
      })

      byCategory.sort((a, b) => b.amount - a.amount)

      return {
        month,
        income,
        expenses,
        balance: income - expenses,
        byCategory
      }
    })
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
