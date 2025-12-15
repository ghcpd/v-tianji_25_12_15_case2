import { test } from 'node:test'
import assert from 'node:assert/strict'
import { saveTransactions, loadTransactions } from '../src/lib/storage.js'

test('save and load transactions', () => {
  global.localStorage = (function () {
    let store = {}
    return {
      getItem(k) { return store[k] ?? null },
      setItem(k, v) { store[k] = String(v) },
      clear() { store = {} }
    }
  })()

  const tx = [{ id: 'x', amount: 10 }]
  saveTransactions(tx)
  const got = loadTransactions()
  assert.deepStrictEqual(got, tx)
})
