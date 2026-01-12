import React from 'react'

export default function Summary({ transactions }) {
  const total = transactions.reduce((s, t) => s + t.amount, 0)
  const income = transactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0)
  const expense = transactions.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0)

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-slate-50 rounded text-center">
          <div className="text-sm text-slate-500">Income</div>
          <div className="text-lg font-semibold text-emerald-600">{income.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded text-center">
          <div className="text-sm text-slate-500">Expense</div>
          <div className="text-lg font-semibold text-rose-600">{Math.abs(expense).toFixed(2)}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded text-center">
          <div className="text-sm text-slate-500">Net</div>
          <div className="text-lg font-semibold">{total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
