import { useState } from 'react';
import { type Transaction, categories } from '../types';

interface AddTransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [form, setForm] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: categories[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.description) return;
    onAdd({
      type: form.type,
      amount: parseFloat(form.amount),
      category: form.category,
      description: form.description,
      date: form.date,
    });
    setForm({
      type: 'expense',
      amount: '',
      category: categories[0],
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
          <select
            id="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
            className="w-full p-2 border rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 border rounded"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <input
          id="description"
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Transaction
      </button>
    </form>
  );
}