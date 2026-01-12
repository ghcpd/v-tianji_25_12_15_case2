import React, { useEffect, useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import TrendChart from './components/TrendChart'
import { loadTransactions, saveTransactions } from './lib/storage'

export default function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions())

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const addTransaction = (tx) => setTransactions((t) => [tx, ...t])
  const removeTransaction = (id) => setTransactions((t) => t.filter(x => x.id !== id))

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Personal Finance Tracker</h1>
          <p className="text-sm text-slate-600">Record income and expenses, categorize them, and track trends.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card">
              <TransactionForm onAdd={addTransaction} />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="card mb-6">
              <Summary transactions={transactions} />
            </div>

            <div className="card mb-6">
              <TrendChart transactions={transactions} />
            </div>

            <div className="card">
              <TransactionList transactions={transactions} onRemove={removeTransaction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
