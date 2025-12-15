import { vi } from 'vitest';

// Mock the chart component to avoid canvas/context issues in jsdom
vi.mock('react-chartjs-2', () => ({ Bar: () => <div>Chart</div> }));
import { render, screen } from '@testing-library/react';
import Summary from './Summary';
import type { Transaction } from '../types';

describe('Summary', () => {
  const transactions: Transaction[] = [
    { id: '1', date: '2023-01-15', amount: 2000, category: 'Salary', description: 'Jan' },
    { id: '2', date: '2023-01-20', amount: -500, category: 'Groceries' },
    { id: '3', date: '2023-02-01', amount: 1000, category: 'Salary' },
    { id: '4', date: '2023-02-05', amount: -200, category: 'Entertainment' },
  ];

  test('renders totals and chart', () => {
    render(<Summary transactions={transactions} />);

    // totals text
    expect(screen.getByText(/Total Income:/)).toBeInTheDocument();
    expect(screen.getByText(/Total Expense:/)).toBeInTheDocument();

    // the chart renders a canvas element from chart.js
    // Chart is mocked to render a simple placeholder
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });
});
