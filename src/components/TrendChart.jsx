import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

export default function TrendChart({ transactions }) {
  // group by month
  const map = {}
  transactions.forEach(t => {
    const m = new Date(t.date).toISOString().slice(0,7)
    map[m] = (map[m] || 0) + t.amount
  })
  const sorted = Object.keys(map).sort()
  const data = {
    labels: sorted,
    datasets: [{ label: 'Net per month', data: sorted.map(k => map[k]), backgroundColor: '#6366f1' }]
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Monthly Trends</h2>
      {sorted.length ? <Bar data={data} /> : <div className="text-sm text-slate-500">No data to show.</div>}
    </div>
  )
}
