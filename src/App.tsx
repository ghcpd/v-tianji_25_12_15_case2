import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import type { Transaction } from './types';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch {
        /* ignore parse errors */
      }
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(t: Omit<Transaction, 'id'>) {
    const tx: Transaction = { ...t, id: Date.now().toString() + Math.random().toString(36).substr(2, 5) };
    setTransactions((prev) => [tx, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app-container" style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onAdd={addTransaction} />
      <Summary transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App;
