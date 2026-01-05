<template>
  <div class="analytics">
    <div class="header">
      <h2>Analytics & Spending Trends</h2>
    </div>

    <div class="charts-container">
      <div class="chart-card">
        <h3>Monthly Income vs Expenses</h3>
        <div v-if="store.monthlySummaries.length === 0" class="empty">
          No data available
        </div>
        <div v-else class="chart">
          <div class="mini-chart">
            <div
              v-for="month in store.monthlySummaries.slice(0, 6)"
              :key="month.month"
              class="month-column"
            >
              <div class="bars">
                <div
                  class="bar income"
                  :style="{ height: getBarHeight(month.income) }"
                  :title="`Income: ${formatCurrency(month.income)}`"
                />
                <div
                  class="bar expense"
                  :style="{ height: getBarHeight(month.expenses) }"
                  :title="`Expense: ${formatCurrency(month.expenses)}`"
                />
              </div>
              <div class="month-label">{{ month.month.substring(5) }}</div>
            </div>
          </div>
          <div class="legend">
            <div class="legend-item income">Income</div>
            <div class="legend-item expense">Expenses</div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>Expense Categories (Current Month)</h3>
        <div v-if="currentMonthSummary?.byCategory.length === 0" class="empty">
          No expense data
        </div>
        <div v-else class="pie-chart">
          <div class="pie-legend">
            <div
              v-for="cat in currentMonthSummary?.byCategory || []"
              :key="cat.category"
              class="legend-item"
            >
              <div class="color-box" :style="{ background: getCategoryColor(cat.category) }" />
              <div class="legend-text">
                <div class="category-name">{{ cat.category }}</div>
                <div class="category-amount">
                  {{ formatCurrency(cat.amount) }} ({{ Math.round(cat.percentage) }}%)
                </div>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 100 100" class="pie">
            <circle
              v-for="(slice, idx) in pieSlices"
              :key="idx"
              cx="50"
              cy="50"
              r="40"
              :fill="slice.color"
              :stroke-dasharray="slice.dasharray"
              :stroke-dashoffset="slice.offset"
              :style="{ transform: `rotate(${slice.rotate}deg)`, transformOrigin: '50px 50px' }"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="summary-section">
      <h3>Monthly Summary</h3>
      <div class="summary-grid">
        <div
          v-for="month in store.monthlySummaries.slice(0, 3)"
          :key="month.month"
          class="summary-card"
        >
          <div class="summary-month">{{ formatMonthYear(month.month) }}</div>
          <div class="summary-row">
            <span>Income:</span>
            <span class="income">{{ formatCurrency(month.income) }}</span>
          </div>
          <div class="summary-row">
            <span>Expenses:</span>
            <span class="expense">{{ formatCurrency(month.expenses) }}</span>
          </div>
          <div class="summary-row total">
            <span>Balance:</span>
            <span :class="month.balance >= 0 ? 'positive' : 'negative'">
              {{ formatCurrency(month.balance) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFinanceStore } from '../stores/finance'
import { formatCurrency } from '../utils/helpers'

const store = useFinanceStore()

const currentMonthSummary = computed(() => {
  const today = new Date()
  const monthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  return store.monthlySummaries.find(m => m.month === monthKey)
})

const maxAmount = computed(() => {
  if (store.monthlySummaries.length === 0) return 1
  return Math.max(
    ...store.monthlySummaries.map(m => Math.max(m.income, m.expenses))
  )
})

function getBarHeight(amount: number): string {
  const height = (amount / maxAmount.value) * 100
  return `${Math.max(height, 5)}%`
}

const categoryColors = [
  '#667eea',
  '#764ba2',
  '#f093fb',
  '#4facfe',
  '#00f2fe',
  '#ff6b6b',
  '#ffa500',
  '#39cccc'
]

function getCategoryColor(category: string): string {
  const hash = category.charCodeAt(0) + category.charCodeAt(category.length - 1)
  return categoryColors[hash % categoryColors.length]
}

const pieSlices = computed(() => {
  const categories = currentMonthSummary.value?.byCategory || []
  if (categories.length === 0) return []

  const slices = []
  let currentOffset = 0

  for (const cat of categories) {
    const circumference = 2 * Math.PI * 40
    const sliceLength = (cat.percentage / 100) * circumference
    const rotate = (currentOffset / circumference) * 360

    slices.push({
      color: getCategoryColor(cat.category),
      dasharray: `${sliceLength} ${circumference}`,
      offset: currentOffset,
      rotate
    })

    currentOffset += sliceLength
  }

  return slices
})

function formatMonthYear(monthStr: string): string {
  const [year, month] = monthStr.split('-')
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(new Date(parseInt(year), parseInt(month) - 1))
}
</script>

<style scoped>
.analytics {
  padding: 30px;
  background: #f8f9fa;
  min-height: 100vh;
}

.header h2 {
  font-size: 28px;
  margin: 0 0 30px 0;
  color: #333;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.chart-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.mini-chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 250px;
  margin-bottom: 20px;
  gap: 10px;
}

.month-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bars {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 200px;
}

.bar {
  width: 20px;
  border-radius: 4px 4px 0 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.bar:hover {
  opacity: 0.8;
}

.bar.income {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.bar.expense {
  background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
}

.month-label {
  font-size: 12px;
  color: #999;
  font-weight: 600;
}

.legend {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.legend-item {
  font-size: 12px;
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 20px;
  color: #666;
}

.pie-chart {
  position: relative;
  display: flex;
  gap: 30px;
  align-items: center;
}

.pie {
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.pie-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.category-name {
  font-weight: 600;
  color: #333;
}

.category-amount {
  color: #999;
  font-size: 11px;
}

.summary-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.summary-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.summary-month {
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  font-size: 14px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: #666;
}

.summary-row span:last-child {
  font-weight: 600;
}

.summary-row.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #ddd;
  color: #333;
  font-weight: 700;
}

.income {
  color: #38ef7d;
}

.expense {
  color: #ff6a00;
}

.positive {
  color: #38ef7d;
}

.negative {
  color: #ff6a00;
}
</style>
