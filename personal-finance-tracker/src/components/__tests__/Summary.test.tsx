import { render, screen } from '@testing-library/react';
import Summary from '../Summary';
import type { Transaction } from '../../types';

describe('Summary', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 1000,
      category: 'Salary',
      description: 'Monthly salary',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: '2',
      type: 'expense',
      amount: 200,
      category: 'Food',
      description: 'Groceries',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: '3',
      type: 'expense',
      amount: 100,
      category: 'Transport',
      description: 'Bus fare',
      date: '2023-01-01', // Different month
    },
  ];

  it('calculates totals correctly', () => {
    render(<Summary transactions={mockTransactions} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('$1000.00')).toBeInTheDocument(); // Total Income
    expect(screen.getByText('$300.00')).toBeInTheDocument(); // Total Expenses
    expect(screen.getByText('$700.00')).toBeInTheDocument(); // Balance
  });

  it('calculates monthly correctly', () => {
    render(<Summary transactions={mockTransactions} />);
    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getAllByText('$1000.00')).toHaveLength(2); // Income total and monthly
    expect(screen.getByText('$200.00')).toBeInTheDocument(); // Monthly Expenses
  });
});