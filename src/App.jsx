import React, { useMemo, useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import TrendsChart from './components/TrendsChart'
import { sampleData, categories, computeSummary } from './data'

export default function App() {
  const [transactions, setTransactions] = useState(sampleData)

  const addTransaction = (tx) => {
    setTransactions((s) => [tx, ...s])
  }

  const removeTransaction = (id) => {
    setTransactions((s) => s.filter((t) => t.id !== id))
  }

  const summary = useMemo(() => computeSummary(transactions), [transactions])

  return (
    <div className="app">
      <header className="header">
        <h1>Personal Finance Tracker</h1>
        <p className="subtitle">Record income & expenses, categorize transactions, and visualize trends.</p>
      </header>

      <main className="container">
        <section className="left">
          <Summary summary={summary} />
          <TrendsChart transactions={transactions} />
        </section>

        <section className="right">
          <TransactionForm onAdd={addTransaction} categories={categories} />
          <TransactionList transactions={transactions} onRemove={removeTransaction} />
        </section>
      </main>

      <footer className="footer">Made with care — Personal Finance Tracker</footer>
    </div>
  )
}
