import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '../types';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function Charts({ transactions }: ChartsProps) {
  const expenses = transactions.filter(tx => tx.type === 'expense');

  // Pie chart data
  const categoryData = expenses.reduce((acc, tx) => {
    const existing = acc.find(item => item.category === tx.category);
    if (existing) {
      existing.value += tx.amount;
    } else {
      acc.push({ category: tx.category, value: tx.amount });
    }
    return acc;
  }, [] as { category: string; value: number }[]);

  // Bar chart data - monthly expenses
  const monthlyData = expenses.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7); // YYYY-MM
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.expenses += tx.amount;
    } else {
      acc.push({ month, expenses: tx.amount });
    }
    return acc;
  }, [] as { month: string; expenses: number }[]).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Spending Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="expenses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}