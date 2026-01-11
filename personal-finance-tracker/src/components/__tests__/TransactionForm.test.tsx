import { render, screen, fireEvent } from '@testing-library/react'
import TransactionForm from '../TransactionForm'

test('submits valid transaction', () => {
  const handle = vi.fn()
  render(<TransactionForm onAdd={handle} />)

  fireEvent.change(screen.getByLabelText('description'), { target: { value: 'Test' } })
  fireEvent.change(screen.getByLabelText('amount'), { target: { value: '100' } })
  fireEvent.click(screen.getByLabelText('add'))

  expect(handle).toHaveBeenCalledTimes(1)
  const arg = handle.mock.calls[0][0]
  expect(arg.description).toBe('Test')
  expect(arg.amount).toBe(100)
})
