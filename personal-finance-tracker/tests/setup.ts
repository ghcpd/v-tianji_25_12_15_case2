import '@testing-library/jest-dom'

// Polyfill ResizeObserver for Recharts in jsdom environment
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore
global.ResizeObserver = ResizeObserver
