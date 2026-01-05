# Finance Tracker - Personal Finance Management Web App

A modern, visually polished personal finance tracker web application built with Vue 3, Pinia, and TypeScript.

## Features

- 📊 **Dashboard** - Overview of income, expenses, and balance
- 📝 **Transaction Management** - Record, categorize, and manage transactions
- 📈 **Analytics & Trends** - Monthly summaries and spending visualizations
- 🎨 **Modern UI/UX** - Clean, responsive, gradient-based design
- ✅ **Full Test Coverage** - Comprehensive unit and E2E tests

## Project Structure

```
finance-tracker/
├── src/
│   ├── components/
│   │   ├── Sidebar.vue           # Navigation sidebar
│   │   ├── Dashboard.vue          # Dashboard view
│   │   ├── Transactions.vue       # Transactions management
│   │   ├── Analytics.vue          # Analytics & trends view
│   │   ├── AddTransactionForm.vue # Add transaction form
│   │   └── EditTransactionForm.vue # Edit transaction form
│   ├── stores/
│   │   └── finance.ts             # Pinia store for finance data
│   ├── utils/
│   │   ├── types.ts               # TypeScript type definitions
│   │   └── helpers.ts             # Utility functions
│   ├── App.vue                    # Root component
│   └── main.ts                    # Application entry point
├── tests/
│   ├── unit/
│   │   ├── finance.spec.ts        # Store unit tests
│   │   ├── helpers.spec.ts        # Helper functions unit tests
│   │   └── types.spec.ts          # Type constants unit tests
│   └── e2e/
│       └── app.spec.ts            # End-to-end tests
├── public/
│   └── index.html                 # HTML entry point
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── vitest.config.ts               # Vitest configuration
└── playwright.config.ts           # Playwright E2E configuration
```

## Technology Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Build Tool**: Vite
- **Language**: TypeScript
- **Testing**: Vitest (Unit Tests) + Playwright (E2E Tests)
- **Styling**: Scoped CSS with modern gradients

## Installation

```bash
# Navigate to project directory
cd finance-tracker

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui
```

### End-to-End Tests
```bash
# Run E2E tests
npm run e2e
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Features in Detail

### Dashboard
- Real-time income and expense statistics
- Quick overview of financial status
- Latest transactions feed
- Easy access to add transactions

### Transactions Management
- View all transactions in a table format
- Filter by transaction type (income/expense)
- Search by category or description
- Edit transaction details
- Delete transactions with confirmation
- Date-based transaction tracking

### Analytics & Trends
- Monthly income vs expenses comparison
- Expense breakdown by category
- Monthly summaries with balance calculations
- Spending trends visualization
- Category percentage breakdown

## Data Management

The application uses Pinia for state management with the following capabilities:
- Local state persistence
- Real-time calculations
- Monthly aggregations
- Category-based analysis

## Styling & Design

- **Color Scheme**: Purple-blue gradients with accent colors
- **Typography**: System fonts for optimal performance
- **Responsive Design**: Adapts to different screen sizes
- **Modern Effects**: Smooth transitions and hover states

## Test Coverage

### Unit Tests (17 tests)
- Store state management
- Currency formatting
- Date formatting
- Monthly summary calculations
- Transaction CRUD operations
- Helper function validation

### E2E Tests (12 tests)
- App initialization and loading
- Navigation between views
- Dashboard statistics display
- Transaction filtering and searching
- Transaction creation and deletion
- Analytics view rendering
- Data persistence across navigation
- Layout responsiveness

## Default Data

The application comes with sample data:
- 1 income transaction (Salary: $5000)
- 2 expense transactions (Food: $250, Transportation: $100)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- Local storage persistence
- Export data to CSV/PDF
- Budget planning and alerts
- Recurring transactions
- Multiple accounts/wallets
- Advanced charting with Chart.js integration
- Mobile app version

## Development Notes

- All components are single-file Vue components with scoped styles
- TypeScript strict mode is enabled
- State management follows Pinia best practices
- Tests follow AAA (Arrange-Act-Assert) pattern

## License

MIT

## Author

Created as a comprehensive web application project demonstrating Vue 3, modern development practices, and full test coverage.
