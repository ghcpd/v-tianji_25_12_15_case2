import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrendChart({ summary }: { summary: Array<{ month: string; income: number; expense: number }> }) {
  const data = summary
    .slice()
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((s) => ({ month: s.month, net: s.income - s.expense }))

  return (
    <div className="p-4 border rounded bg-white h-48">
      <h3 className="font-medium mb-2">Trend</h3>
      {data.length === 0 ? (
        <div className="text-gray-500">No data for chart</div>
      ) : (
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="net" stroke="#2563EB" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
