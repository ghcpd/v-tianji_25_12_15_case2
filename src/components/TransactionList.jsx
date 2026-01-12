import React from 'react'

function fmt(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export default function TransactionList({ transactions = [], onRemove = () => {} }) {
  return (
    <div className="card list" aria-label="transaction-list">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p className="muted">No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id} className={"tx " + (t.type === 'income' ? 'income' : 'expense')}>
              <div className="tx-left">
                <div className="tx-desc">{t.description || t.category}</div>
                <div className="tx-meta">{t.category} • {t.date}</div>
              </div>
              <div className="tx-right">
                <div className="tx-amount">{t.type === 'income' ? '+' : '-'}{fmt(t.amount)}</div>
                <button className="btn ghost" onClick={() => onRemove(t.id)} aria-label={`remove-${t.id}`}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
