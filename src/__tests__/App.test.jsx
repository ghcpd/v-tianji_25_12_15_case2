import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

vi.mock('react-chartjs-2', () => ({
  Bar: (props) => <div data-testid="mock-bar">bar</div>,
  Doughnut: (props) => <div data-testid="mock-doughnut">doughnut</div>,
  Line: (props) => <div />,
}))

test('adds a transaction via the form and displays it in the list', async () => {
  render(<App />)

  // find form elements
  const amount = screen.getByPlaceholderText('0.00')
  const desc = screen.getByPlaceholderText('Optional')
  const addBtn = screen.getByRole('button', { name: /add transaction/i })

  // fill and submit
  fireEvent.change(amount, { target: { value: '12.34' } })
  fireEvent.change(desc, { target: { value: 'Test purchase' } })
  fireEvent.click(addBtn)

  // Expect the new transaction to appear in the list
  const item = await screen.findByText(/Test purchase/i)
  expect(item).toBeInTheDocument()
})
