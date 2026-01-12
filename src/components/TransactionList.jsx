import React from 'react'

function prettyDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString()
}

export default function TransactionList({ transactions, onRemove }) {
  if (!transactions.length) return <div>No transactions yet.</div>

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map(tx => (
          <li key={tx.id} className="flex justify-between items-start border p-2 rounded">
            <div>
              <div className="font-semibold">{tx.category} <span className="text-sm text-slate-500">· {tx.note}</span></div>
              <div className="text-sm text-slate-500">{prettyDate(tx.date)}</div>
            </div>
            <div className="text-right">
              <div className={"font-medium " + (tx.amount < 0 ? 'text-rose-600' : 'text-emerald-600')}>{tx.amount.toFixed(2)}</div>
              <button onClick={() => onRemove(tx.id)} className="mt-2 text-xs text-slate-500">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
