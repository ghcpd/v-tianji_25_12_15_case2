cd "c:\Users\v-tianji\Desktop\ghcpd\Claude-haiku-4.5\finance-tracker"
Write-Host "Running Playwright E2E Tests..."
npx playwright test 2>&1 | Tee-Object -FilePath e2e-test-results.txt
Write-Host "E2E Tests Complete!"
