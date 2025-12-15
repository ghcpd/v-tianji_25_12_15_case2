import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TransactionList from './TransactionList';
import type { Transaction } from '../types';

describe('TransactionList', () => {
  const transactions: Transaction[] = [
    { id: '1', date: '2023-01-01', amount: 100, category: 'Salary', description: 'January' },
    { id: '2', date: '2023-01-02', amount: -50, category: 'Groceries', description: undefined },
  ];

  test('renders transactions and calls onDelete', () => {
    const handleDelete = vi.fn();
    render(<TransactionList transactions={transactions} onDelete={handleDelete} />);

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('delete-2'));
    expect(handleDelete).toHaveBeenCalledWith('2');
  });

  test('shows no transactions message when empty', () => {
    const handleDelete = vi.fn();
    render(<TransactionList transactions={[]} onDelete={handleDelete} />);
    expect(screen.getByText(/No transactions recorded/)).toBeInTheDocument();
  });
});
