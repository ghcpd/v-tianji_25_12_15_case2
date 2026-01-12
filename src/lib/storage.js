const KEY = 'pft_transactions_v1'

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.error('load error', e)
    return []
  }
}

export function saveTransactions(transactions) {
  try {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  } catch (e) {
    console.error('save error', e)
  }
}
