import React, { useState } from 'react'
import { Transaction } from '../types'
import { v4 as uuid } from 'uuid'

type Props = { onAdd: (t: Transaction) => void }

const defaultCategories = ['Salary', 'Groceries', 'Rent', 'Utilities', 'Entertainment', 'Other']

export default function TransactionForm({ onAdd }: Props) {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(defaultCategories[0])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const a = Number(amount)
    if (Number.isNaN(a) || !description) return
    onAdd({ id: uuid(), date, description, amount: a, category })
    setDescription('')
    setAmount('')
  }

  return (
    <form onSubmit={submit} className="p-4 border rounded mb-4 bg-gray-50">
      <div className="flex gap-2 flex-wrap">
        <input aria-label="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded p-2" />
        <input aria-label="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 flex-1" />
        <input aria-label="amount" placeholder="Amount (use negative for expense)" value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded p-2 w-40" />
        <select aria-label="category" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2">
          {defaultCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button aria-label="add" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
    </form>
  )
}
