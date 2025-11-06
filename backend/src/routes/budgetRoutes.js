const express = require("express");
const User = require("../models/User");
const verifyToken = require("../middleware/auth"); // ✅ correct

const router = express.Router();

// ✅ Save / Update Monthly Budget
router.post("/set", verifyToken, async (req, res) => {
  try {
    const { monthlyBudget } = req.body;

    if (!monthlyBudget) {
      return res.status(400).json({ message: "Budget value required" });
    }

    await User.findByIdAndUpdate(req.user.id, { monthlyBudget });
    res.json({ message: "✅ Monthly Budget Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving budget" });
  }
});

// ✅ Get Monthly Budget
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("monthlyBudget");
    res.json({ monthlyBudget: user.monthlyBudget || 0 });
  } catch {
    res.status(500).json({ message: "Error fetching budget" });
  }
});

module.exports = router;
