import React, { useState } from "react";
import type { Transaction } from "../types";

interface Props {
  onAdd: (transaction: Omit<Transaction, "id">) => void;
}

export default function TransactionForm({ onAdd }: Props) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !amount || !category) return;
    const num = parseFloat(amount);
    if (isNaN(num)) return;
    onAdd({
      date,
      amount: num,
      category,
      description: description || undefined,
    });
    // reset
    setDate("");
    setAmount("");
    setCategory("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} aria-label="transaction-form">
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="date-input"
            data-testid="date-input"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="amount-input"
            data-testid="amount-input"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="category-input"
            data-testid="category-input"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="description-input"
            data-testid="description-input"
          />
        </label>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}
