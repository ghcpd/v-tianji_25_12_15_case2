import React from 'react'

export default function Summary({ summary }: { summary: Array<{ month: string; income: number; expense: number }> }) {
  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-medium mb-2">Monthly Summary</h3>
      <div className="space-y-2">
        {summary.length === 0 && <div className="text-gray-500">No data</div>}
        {summary.map((s) => (
          <div key={s.month} className="flex justify-between text-sm">
            <div>{s.month}</div>
            <div className="flex gap-2">
              <div className="text-green-600">+${s.income.toFixed(2)}</div>
              <div className="text-red-600">-${s.expense.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
