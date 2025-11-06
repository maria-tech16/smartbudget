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

module.exports = router;
