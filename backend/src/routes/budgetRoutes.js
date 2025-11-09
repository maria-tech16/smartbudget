const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const auth = require("../middleware/auth");

// ✅ Set or Update Monthly Budget
router.post("/set", auth, async (req, res) => {
  try {
    const { monthlyBudget } = req.body;
    const userId = req.user.id;

    if (monthlyBudget == null) {
      return res.status(400).json({ message: "Budget amount required" });
    }

    let budget = await Budget.findOne({ userId });

    if (budget) {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();
    } else {
      budget = await Budget.create({ userId, monthlyBudget });
    }

    return res.json({
      message: "✅ Budget saved successfully",
      budget,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Monthly Budget
router.get("/get", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await Budget.findOne({ userId });

    if (!budget) {
      return res.json({ monthlyBudget: 0 });
    }

    return res.json(budget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
