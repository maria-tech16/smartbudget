const Transaction = require("../models/Transaction");

// ✅ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date } = req.body;

    // ✅ Check required fields
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Ensure user is available from auth middleware
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user token found" });
    }

    const newTransaction = new Transaction({
      user: userId,
      type,
      category,
      amount: Number(amount), // ensure number
      date,
    });

    await newTransaction.save();

    return res.json({
      message: "✅ Transaction added successfully",
      transaction: newTransaction,
    });

  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Transactions for Logged-in User
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user && req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const transactions = await Transaction.find({ user: userId })
      .sort({ date: -1 });

    return res.json(transactions);

  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

