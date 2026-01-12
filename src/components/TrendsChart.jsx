import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, LineElement, PointElement } from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { format, parseISO } from 'date-fns'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, LineElement, PointElement)

function groupByMonth(transactions) {
  const map = {}
  transactions.forEach((t) => {
    const m = format(parseISO(t.date), 'MMM yyyy')
    if (!map[m]) map[m] = 0
    map[m] += t.type === 'income' ? t.amount : -t.amount
  })
  // sort months by date (parse back)
  const entries = Object.keys(map)
    .map((k) => ({ k, time: parseISO(transactions.find((t) => format(parseISO(t.date), 'MMM yyyy') === k).date), v: map[k] }))
    .sort((a, b) => a.time - b.time)
  return entries.reduce((acc, e) => {
    acc.labels.push(e.k)
    acc.data.push(Math.round(e.v * 100) / 100)
    return acc
  }, { labels: [], data: [] })
}

function byCategory(transactions) {
  const map = {}
  transactions.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount
  })
  const labels = Object.keys(map)
  const data = labels.map((l) => map[l])
  return { labels, data }
}

export default function TrendsChart({ transactions = [] }) {
  const month = groupByMonth(transactions)
  const cat = byCategory(transactions)

  const barData = {
    labels: month.labels,
    datasets: [
      {
        label: 'Net by month',
        data: month.data,
        backgroundColor: month.data.map((v) => (v >= 0 ? 'rgba(34,197,94,0.7)' : 'rgba(239,68,68,0.7)')),
      },
    ],
  }

  const doughnutData = {
    labels: cat.labels,
    datasets: [
      {
        label: 'Spending by category',
        data: cat.data,
        backgroundColor: [
          '#6366f1',
          '#06b6d4',
          '#f59e0b',
          '#ef4444',
          '#10b981',
          '#8b5cf6',
          '#f97316',
          '#64748b',
        ],
      },
    ],
  }

  return (
    <div className="card charts">
      <h2>Trends</h2>
      <div className="charts-row">
        <div className="chart-card">
          <Bar data={barData} />
        </div>
        <div className="chart-card small">
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  )
}
