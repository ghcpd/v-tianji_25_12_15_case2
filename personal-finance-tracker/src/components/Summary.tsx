import type { Transaction } from '../types';

interface SummaryProps {
  transactions: Transaction[];
}

export default function Summary({ transactions }: SummaryProps) {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const monthlyTx = transactions.filter(tx => tx.date.startsWith(currentMonth));

  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  const monthlyIncome = monthlyTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const monthlyExpense = monthlyTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          <p>Total Income</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
          <p>Total Expenses</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
          <p>Balance</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">This Month</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-green-600">${monthlyIncome.toFixed(2)}</p>
          <p>Income</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-red-600">${monthlyExpense.toFixed(2)}</p>
          <p>Expenses</p>
        </div>
      </div>
    </div>
  );
}