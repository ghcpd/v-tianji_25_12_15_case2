<template>
  <div class="dashboard">
    <div class="header">
      <h2>Dashboard</h2>
      <button class="add-btn" @click="showAddForm = !showAddForm">
        ➕ Add Transaction
      </button>
    </div>

    <div v-if="showAddForm" class="add-form-container">
      <AddTransactionForm @transaction-added="handleTransactionAdded" />
    </div>

    <div class="stats-grid">
      <div class="stat-card income">
        <div class="stat-label">Total Income</div>
        <div class="stat-value">{{ formatCurrency(store.totalIncome) }}</div>
      </div>
      <div class="stat-card expense">
        <div class="stat-label">Total Expenses</div>
        <div class="stat-value">{{ formatCurrency(store.totalExpenses) }}</div>
      </div>
      <div class="stat-card balance">
        <div class="stat-label">Balance</div>
        <div :class="['stat-value', store.totalBalance >= 0 ? 'positive' : 'negative']">
          {{ formatCurrency(store.totalBalance) }}
        </div>
      </div>
    </div>

    <div class="latest-transactions">
      <h3>Latest Transactions</h3>
      <div v-if="latestTransactions.length === 0" class="empty-state">
        No transactions yet. Add one to get started!
      </div>
      <div v-else class="transaction-list">
        <div v-for="tx in latestTransactions" :key="tx.id" class="transaction-item">
          <div class="tx-info">
            <div class="tx-category">{{ tx.category }}</div>
            <div class="tx-description">{{ tx.description }}</div>
          </div>
          <div class="tx-amount" :class="tx.type">
            {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from '../stores/finance'
import { formatCurrency } from '../utils/helpers'
import AddTransactionForm from './AddTransactionForm.vue'

const store = useFinanceStore()
const showAddForm = ref(false)

const latestTransactions = computed(() => {
  return [...store.transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  }).slice(0, 5)
})

function handleTransactionAdded() {
  showAddForm.value = false
}
</script>

<style scoped>
.dashboard {
  padding: 30px;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 28px;
  margin: 0;
  color: #333;
}

.add-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s;
}

.add-btn:hover {
  transform: scale(1.05);
}

.add-form-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  padding: 20px;
  border-radius: 12px;
  color: white;
}

.stat-card.income {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.stat-card.expense {
  background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
}

.stat-card.balance {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
}

.stat-value.positive {
  color: #38ef7d;
}

.stat-value.negative {
  color: #ff6a00;
}

.latest-transactions {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.latest-transactions h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.tx-info {
  flex: 1;
}

.tx-category {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.tx-description {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.tx-amount {
  font-weight: 700;
  font-size: 14px;
}

.tx-amount.income {
  color: #38ef7d;
}

.tx-amount.expense {
  color: #ff6a00;
}
</style>
