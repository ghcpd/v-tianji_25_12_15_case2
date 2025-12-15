<template>
  <div class="sidebar">
    <div class="logo">
      <span class="icon">💰</span>
      <h1>Finance Tracker</h1>
    </div>
    <nav class="nav-menu">
      <button
        :class="['nav-btn', { active: activeView === 'dashboard' }]"
        @click="$emit('view-change', 'dashboard')"
      >
        📊 Dashboard
      </button>
      <button
        :class="['nav-btn', { active: activeView === 'transactions' }]"
        @click="$emit('view-change', 'transactions')"
      >
        📝 Transactions
      </button>
      <button
        :class="['nav-btn', { active: activeView === 'analytics' }]"
        @click="$emit('view-change', 'analytics')"
      >
        📈 Analytics
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeView: string
}>()

defineEmits<{
  'view-change': [view: string]
}>()
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.icon {
  font-size: 32px;
}

.logo h1 {
  font-size: 20px;
  margin: 0;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  text-align: left;
  font-weight: 500;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(5px);
}

.nav-btn.active {
  background: white;
  color: #667eea;
  border-color: white;
}
</style>
