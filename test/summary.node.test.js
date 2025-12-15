import { test } from 'node:test'
import assert from 'node:assert/strict'

test('summary calculations', () => {
  const transactions = [
    { amount: 100 },
    { amount: -40 },
    { amount: -10 }
  ]
  const total = transactions.reduce((s,t)=>s+t.amount,0)
  const income = transactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0)
  const expense = transactions.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0)

  assert.strictEqual(total, 50)
  assert.strictEqual(income, 100)
  assert.strictEqual(expense, -50)
})
