import React from 'react'
import { Transaction } from '../types'

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium mb-2">Transactions</h2>
      <div className="space-y-2">
        {transactions.length === 0 && <div className="text-gray-500">No transactions yet.</div>}
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <div className="font-medium">{t.description}</div>
              <div className="text-sm text-gray-500">{t.category} • {new Date(t.date).toLocaleDateString()}</div>
            </div>
            <div className={t.amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {(t.amount >= 0 ? '+' : '-')}${Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
