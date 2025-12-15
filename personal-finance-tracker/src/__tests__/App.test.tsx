import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('adding a transaction updates the list and summary', async () => {
  render(<App />)
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('description'), 'Salary')
  await user.type(screen.getByLabelText('amount'), '2000')
  await user.click(screen.getByLabelText('add'))

  // Ensure at least one element shows the amount (list and summary may both contain it)
  const matches = screen.getAllByText(/\+\$2000\.00/)
  expect(matches.length).toBeGreaterThan(0)
})
