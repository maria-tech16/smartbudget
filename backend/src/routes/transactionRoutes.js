const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

// ✅ Get all user transactions
router.get("/", auth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
  res.json({ transactions });
});

// ✅ Add transaction
router.post("/add", auth, async (req, res) => {
  const { title, amount, type, date } = req.body;

  if (!title || !amount || !type || !date)
    return res.status(400).json({ message: "All fields are required" });

  const newTransaction = await Transaction.create({
    title,
    amount,
    type,
    date,
    userId: req.user.id,
  });

  res.json({ message: "Transaction added", transaction: newTransaction });
});

// ✅ Delete transaction
router.delete("/delete/:id", auth, async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Transaction deleted" });
});


// ✅ Monthly summary (for logged-in user)
router.get("/monthly", auth, async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month is required" });

    // Get all transactions of the user
    const transactions = await Transaction.find({ userId: req.user.id });

    // Convert month name (e.g., "January") to month number (0–11)
    const monthNumber = new Date(`${month} 1, 2025`).getMonth();

    // Filter transactions by selected month
    const monthlyTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === monthNumber
    );

    // Calculate income, expense, remaining
    const income = monthlyTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const remaining = income - expense;

    // Find highest spending category (by title)
    const categoryTotals = {};
    monthlyTransactions.forEach((t) => {
      if (t.type === "expense" && t.title) {
        categoryTotals[t.title] = (categoryTotals[t.title] || 0) + t.amount;
      }
    });

    const highestCategory = Object.keys(categoryTotals).length
      ? Object.entries(categoryTotals).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0]
      : "N/A";

    res.json({ income, expense, remaining, highestCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

