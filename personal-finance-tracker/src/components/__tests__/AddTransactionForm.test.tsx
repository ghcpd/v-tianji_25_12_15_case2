import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTransactionForm from '../AddTransactionForm';

describe('AddTransactionForm', () => {
  const mockOnAdd = vi.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it('renders the form', () => {
    render(<AddTransactionForm onAdd={mockOnAdd} />);
    expect(screen.getByRole('heading', { name: 'Add Transaction' })).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    const user = userEvent.setup();
    render(<AddTransactionForm onAdd={mockOnAdd} />);

    await user.type(screen.getByLabelText('Amount'), '100');
    await user.type(screen.getByLabelText('Description'), 'Test transaction');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));

    expect(mockOnAdd).toHaveBeenCalledWith({
      type: 'expense',
      amount: 100,
      category: 'Food',
      description: 'Test transaction',
      date: expect.any(String),
    });
  });

  it('resets form after submit', async () => {
    const user = userEvent.setup();
    render(<AddTransactionForm onAdd={mockOnAdd} />);

    const amountInput = screen.getByLabelText('Amount');
    const descInput = screen.getByLabelText('Description');

    await user.type(amountInput, '50');
    await user.type(descInput, 'Another test');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));

    expect(amountInput).toHaveValue(null);
    expect(descInput).toHaveValue('');
  });
});