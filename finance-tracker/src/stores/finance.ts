import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Transaction } from '../utils/types'
import { calculateMonthlySummary, generateId } from '../utils/helpers'

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref<Transaction[]>([
    {
      id: generateId(),
      type: 'income',
      category: 'Salary',
      amount: 5000,
      description: 'Monthly salary',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
    },
    {
      id: generateId(),
      type: 'expense',
      category: 'Food & Dining',
      amount: 250,
      description: 'Groceries',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: generateId(),
      type: 'expense',
      category: 'Transportation',
      amount: 100,
      description: 'Gas',
      date: new Date().toISOString().split('T')[0]
    }
  ])

  const monthlySummaries = computed(() => calculateMonthlySummary(transactions.value))

  const totalIncome = computed(() =>
    transactions.value
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)
  )

  const totalExpenses = computed(() =>
    transactions.value
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)
  )

  const totalBalance = computed(() => totalIncome.value - totalExpenses.value)

  function addTransaction(
    type: 'income' | 'expense',
    category: string,
    amount: number,
    description: string,
    date: string
  ): void {
    transactions.value.push({
      id: generateId(),
      type,
      category,
      amount,
      description,
      date
    })
  }

  function deleteTransaction(id: string): void {
    const index = transactions.value.findIndex(tx => tx.id === id)
    if (index > -1) {
      transactions.value.splice(index, 1)
    }
  }

  function updateTransaction(
    id: string,
    type: 'income' | 'expense',
    category: string,
    amount: number,
    description: string,
    date: string
  ): void {
    const tx = transactions.value.find(t => t.id === id)
    if (tx) {
      tx.type = type
      tx.category = category
      tx.amount = amount
      tx.description = description
      tx.date = date
    }
  }

  function getTransactionsByMonth(monthStr: string): Transaction[] {
    return transactions.value.filter(tx => tx.date.startsWith(monthStr))
  }

  return {
    transactions,
    monthlySummaries,
    totalIncome,
    totalExpenses,
    totalBalance,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionsByMonth
  }
})
