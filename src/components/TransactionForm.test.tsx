import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TransactionForm from './TransactionForm';

describe('TransactionForm', () => {
  test('submits valid data', () => {
    const handleAdd = vi.fn();
    render(<TransactionForm onAdd={handleAdd} />);

    fireEvent.change(screen.getByLabelText(/date:/i), { target: { value: '2023-06-01' } });
    fireEvent.change(screen.getByLabelText(/amount:/i), { target: { value: '123.45' } });
    fireEvent.change(screen.getByLabelText(/category:/i), { target: { value: 'Rent' } });
    fireEvent.change(screen.getByLabelText(/description:/i), { target: { value: 'June rent' } });

    fireEvent.click(screen.getByText(/add/i));

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith({
      date: '2023-06-01',
      amount: 123.45,
      category: 'Rent',
      description: 'June rent',
    });
  });

  test('does not submit when required fields missing', () => {
    const handleAdd = vi.fn();
    render(<TransactionForm onAdd={handleAdd} />);

    // only date filled
    fireEvent.change(screen.getByLabelText(/date:/i), { target: { value: '2023-06-01' } });
    fireEvent.click(screen.getByText(/add/i));

    expect(handleAdd).not.toHaveBeenCalled();
  });
});
