import { useState, useEffect } from 'react';
import type { Transaction } from './types';
import { loadTransactions, saveTransactions } from './utils';
import Summary from './components/Summary';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = { ...tx, id: Date.now().toString() };
    setTransactions(prev => [...prev, newTx]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Personal Finance Tracker</h1>
        <Summary transactions={transactions} />
        <AddTransactionForm onAdd={addTransaction} />
        <Charts transactions={transactions} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}

export default App;
