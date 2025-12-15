import React, { useEffect, useMemo, useState } from 'react'
import { Transaction } from './types'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import TrendChart from './components/TrendChart'
import dayjs from 'dayjs'

const STORAGE_KEY = 'pft_transactions_v1'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (t: Transaction) => {
    setTransactions((s) => [t, ...s])
  }

  const monthlySummary = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>()
    transactions.forEach((t) => {
      const m = dayjs(t.date).format('YYYY-MM')
      const cur = map.get(m) || { income: 0, expense: 0 }
      if (t.amount >= 0) cur.income += t.amount
      else cur.expense += -t.amount
      map.set(m, cur)
    })
    return Array.from(map.entries()).map(([month, v]) => ({ month, ...v }))
  }, [transactions])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Personal Finance Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TransactionForm onAdd={addTransaction} />
            <TransactionList transactions={transactions} />
          </div>
          <div className="space-y-4">
            <Summary summary={monthlySummary} />
            <TrendChart summary={monthlySummary} />
          </div>
        </div>
      </div>
    </div>
  )
}
