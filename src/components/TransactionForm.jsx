import React, { useState } from 'react'

const defaultCategories = ['Groceries','Utilities','Salary','Entertainment','Transport','Other']

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ amount: '', type: 'expense', category: 'Other', note: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!amount || !form.category) return
    const tx = {
      id: Date.now().toString(),
      amount: form.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      type: form.type,
      category: form.category,
      note: form.note,
      date: new Date().toISOString()
    }
    onAdd(tx)
    setForm({ amount: '', type: 'expense', category: 'Other', note: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Amount</label>
        <input className="w-full mt-1 p-2 border rounded" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} placeholder="0.00" />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm">Type</label>
          <select className="w-full mt-1 p-2 border rounded" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm">Category</label>
          <select className="w-full mt-1 p-2 border rounded" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            {defaultCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm">Note</label>
        <input className="w-full mt-1 p-2 border rounded" value={form.note} onChange={e => setForm({...form, note: e.target.value})} placeholder="Optional note" />
      </div>

      <div className="text-right">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" type="submit">Add</button>
      </div>
    </form>
  )
}
