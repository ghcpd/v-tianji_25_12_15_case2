import React from 'react'

function fmt(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export default function Summary({ summary = {} }) {
  const { totalIncome = 0, totalExpense = 0, net = 0 } = summary

  return (
    <div className="card summary">
      <h2>Monthly Summary</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <div className="label">Income</div>
          <div className="value income">{fmt(totalIncome)}</div>
        </div>
        <div className="summary-item">
          <div className="label">Expenses</div>
          <div className="value expense">{fmt(totalExpense)}</div>
        </div>
        <div className="summary-item net">
          <div className="label">Net</div>
          <div className="value">{fmt(net)}</div>
        </div>
      </div>
    </div>
  )
}
