import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map(tx => (
            <li key={tx.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <span className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
                <span className="ml-2 text-gray-600">{tx.category}</span>
                <span className="ml-2">{tx.description}</span>
                <span className="ml-2 text-sm text-gray-500">{tx.date}</span>
              </div>
              <button
                onClick={() => onDelete(tx.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}