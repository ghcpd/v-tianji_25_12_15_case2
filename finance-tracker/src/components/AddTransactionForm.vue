<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-group">
      <label>Type</label>
      <select v-model="formData.type" required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>

    <div class="form-group">
      <label>Category</label>
      <select v-model="formData.category" required>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>Amount</label>
      <input v-model.number="formData.amount" type="number" step="0.01" min="0" required />
    </div>

    <div class="form-group">
      <label>Description</label>
      <input v-model="formData.description" type="text" placeholder="Enter description" required />
    </div>

    <div class="form-group">
      <label>Date</label>
      <input v-model="formData.date" type="date" required />
    </div>

    <button type="submit" class="submit-btn">Add Transaction</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFinanceStore } from '../stores/finance'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/types'

const store = useFinanceStore()

const formData = ref({
  type: 'expense' as 'income' | 'expense',
  category: EXPENSE_CATEGORIES[0],
  amount: 0,
  description: '',
  date: new Date().toISOString().split('T')[0]
})

const categories = computed(() => {
  return formData.value.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
})

watch(
  () => formData.value.type,
  () => {
    formData.value.category = categories.value[0]
  }
)

function submitForm() {
  store.addTransaction(
    formData.value.type,
    formData.value.category,
    formData.value.amount,
    formData.value.description,
    formData.value.date
  )

  formData.value = {
    type: 'expense',
    category: EXPENSE_CATEGORIES[0],
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  }

  emit('transaction-added')
}

const emit = defineEmits<{
  'transaction-added': []
}>()
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-btn {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: scale(1.02);
}
</style>
