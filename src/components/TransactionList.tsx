// React import removed for automatic JSX runtime
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  if (transactions.length === 0) return <p>No transactions recorded.</p>;

  return (
    <table aria-label="transaction-list">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.category}</td>
            <td>{t.description ?? "-"}</td>
            <td style={{ color: t.amount < 0 ? "red" : "green" }}>
              {t.amount.toFixed(2)}
            </td>
            <td>
              <button onClick={() => onDelete(t.id)} aria-label={`delete-${t.id}`}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
