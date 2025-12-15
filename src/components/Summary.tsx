// React import removed for automatic JSX runtime
import type { Transaction } from "../types";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  transactions: Transaction[];
}

export default function Summary({ transactions }: Props) {
  const monthly = new Map<string, { income: number; expense: number }>();
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    const current = monthly.get(month) ?? { income: 0, expense: 0 };
    if (t.amount >= 0) current.income += t.amount;
    else current.expense += -t.amount;
    monthly.set(month, current);
  });

  const labels = Array.from(monthly.keys()).sort();
  const incomeData = labels.map((m) => monthly.get(m)?.income ?? 0);
  const expenseData = labels.map((m) => monthly.get(m)?.expense ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Monthly Income vs Expenses" },
    },
  };

  const totalIncome = incomeData.reduce((a, b) => a + b, 0);
  const totalExpense = expenseData.reduce((a, b) => a + b, 0);

  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income: {totalIncome.toFixed(2)}</p>
      <p>Total Expense: {totalExpense.toFixed(2)}</p>
      <Bar options={options} data={data} />
    </div>
  );
}
