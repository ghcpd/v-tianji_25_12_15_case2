import React, { useState } from 'react'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function TransactionForm({ onAdd, categories = [] }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Other')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!value || value <= 0) return
    const tx = {
      id: uid(),
      type,
      amount: Math.round(value * 100) / 100,
      category,
      description,
      date,
    }
    onAdd(tx)
    setAmount('')
    setDescription('')
  }

  return (
    <form className="card form" onSubmit={handleSubmit} aria-label="new-transaction-form">
      <h2>New Transaction</h2>

      <div className="row">
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Amount
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>
      </div>

      <div className="row">
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      <label>
        Description
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
      </label>

      <div className="actions">
        <button className="btn primary" type="submit">Add Transaction</button>
      </div>
    </form>
  )
}
