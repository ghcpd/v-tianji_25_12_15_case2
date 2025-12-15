<template>
  <div class="transactions-view">
    <div class="header">
      <h2>Transactions</h2>
      <div class="filters">
        <select v-model="filterType" class="filter-select">
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search transactions..."
          class="search-input"
        />
      </div>
    </div>

    <div v-if="filteredTransactions.length === 0" class="empty-state">
      No transactions found matching your filters.
    </div>

    <div v-else class="transactions-table">
      <div class="table-header">
        <div class="col-date">Date</div>
        <div class="col-category">Category</div>
        <div class="col-description">Description</div>
        <div class="col-type">Type</div>
        <div class="col-amount">Amount</div>
        <div class="col-actions">Actions</div>
      </div>

      <div v-for="tx in filteredTransactions" :key="tx.id" class="table-row">
        <div class="col-date">{{ formatDate(tx.date) }}</div>
        <div class="col-category">{{ tx.category }}</div>
        <div class="col-description">{{ tx.description }}</div>
        <div class="col-type">
          <span :class="['type-badge', tx.type]">{{ tx.type }}</span>
        </div>
        <div class="col-amount" :class="tx.type">
          {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
        </div>
        <div class="col-actions">
          <button class="edit-btn" @click="editTransaction(tx)">Edit</button>
          <button class="delete-btn" @click="deleteTransaction(tx.id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="selectedTransaction" class="modal-overlay" @click="closeEdit">
      <div class="modal" @click.stop>
        <h3>Edit Transaction</h3>
        <EditTransactionForm :transaction="selectedTransaction" @transaction-updated="handleTransactionUpdated" />
        <button class="close-btn" @click="closeEdit">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFinanceStore } from '../stores/finance'
import { formatCurrency, formatDate } from '../utils/helpers'
import { Transaction } from '../utils/types'
import EditTransactionForm from './EditTransactionForm.vue'

const store = useFinanceStore()
const filterType = ref('')
const searchQuery = ref('')
const selectedTransaction = ref<Transaction | null>(null)

const filteredTransactions = computed(() => {
  return store.transactions.filter(tx => {
    const typeMatch = filterType.value === '' || tx.type === filterType.value
    const searchMatch =
      tx.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return typeMatch && searchMatch
  })
})

function editTransaction(tx: Transaction) {
  selectedTransaction.value = { ...tx }
}

function closeEdit() {
  selectedTransaction.value = null
}

function handleTransactionUpdated() {
  closeEdit()
}

function deleteTransaction(id: string) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    store.deleteTransaction(id)
  }
}
</script>

<style scoped>
.transactions-view {
  padding: 30px;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  margin-bottom: 30px;
}

.header h2 {
  font-size: 28px;
  margin: 0 0 20px 0;
  color: #333;
}

.filters {
  display: flex;
  gap: 15px;
}

.filter-select,
.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.transactions-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 100px 150px 1fr 80px 120px 150px;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  font-weight: 600;
  color: #666;
  font-size: 13px;
  border-bottom: 2px solid #eee;
}

.table-row {
  display: grid;
  grid-template-columns: 100px 150px 1fr 80px 120px 150px;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.table-row:hover {
  background: #f8f9fa;
}

.col-amount {
  font-weight: 600;
  font-size: 14px;
}

.col-amount.income {
  color: #38ef7d;
}

.col-amount.expense {
  color: #ff6a00;
}

.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.type-badge.income {
  background: #e8f5e9;
  color: #11998e;
}

.type-badge.expense {
  background: #ffe8e8;
  color: #ee0979;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  margin-right: 5px;
}

.edit-btn {
  background: #667eea;
  color: white;
}

.edit-btn:hover {
  background: #5568d3;
}

.delete-btn {
  background: #ff6a00;
  color: white;
}

.delete-btn:hover {
  background: #e55a00;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ddd;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
}

.close-btn:hover {
  background: #ccc;
}
</style>
