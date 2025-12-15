export interface Transaction {
  id: string;
  date: string; // ISO date string
  amount: number; // positive for income, negative for expense
  category: string;
  description?: string;
}
