import { createServer } from 'vite'
import { chromium } from 'playwright'

async function main() {
  // Start Vite dev server programmatically so we can control lifecycle reliably
  const server = await createServer({
    configFile: 'vite.config.mjs',
    server: { host: '127.0.0.1', port: 5173 },
  })

  await server.listen()
  console.log('Vite dev server started at http://127.0.0.1:5173')

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'load' })

    // Fill form and submit
    await page.fill('input[placeholder="0.00"]', '55.50')
    await page.fill('input[placeholder="Optional"]', 'E2E purchase')
    await page.click('button:has-text("Add Transaction")')

    // Wait for the new item to appear
    await page.waitForSelector('text=E2E purchase', { timeout: 5000 })

    console.log('E2E: success - new transaction visible')
  } finally {
    await browser.close()
    await server.close()
    console.log('Server and browser closed')
  }
}

main().catch((e) => {
  console.error('E2E runner failed:')
  console.error(e)
  process.exit(1)
})
