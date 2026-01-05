<template>
  <div id="app" class="app-container">
    <Sidebar :active-view="currentView" @view-change="currentView = $event" />
    <main class="main-content">
      <Dashboard v-if="currentView === 'dashboard'" />
      <Transactions v-else-if="currentView === 'transactions'" />
      <Analytics v-else-if="currentView === 'analytics'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'
import Transactions from './components/Transactions.vue'
import Analytics from './components/Analytics.vue'

const currentView = ref('dashboard')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  background: #f8f9fa;
  color: #333;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

.app-container {
  display: flex;
  height: 100vh;
  background: #f8f9fa;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: #f8f9fa;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
