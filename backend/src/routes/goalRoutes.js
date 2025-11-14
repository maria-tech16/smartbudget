const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Goal = require("../models/Goal");

// ✅ Get all user goals
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ deadline: 1 });
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add a new goal
router.post("/add", auth, async (req, res) => {
  const { title, targetAmount, deadline } = req.body;

  if (!title || !targetAmount || !deadline)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const newGoal = await Goal.create({
      title,
      targetAmount,
      deadline,
      userId: req.user.id,
    });

    res.json({ message: "Goal added successfully", goal: newGoal });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update saved amount (progress)
router.put("/update/:id", auth, async (req, res) => {
  const { savedAmount } = req.body;

  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.savedAmount = savedAmount;

    if (goal.savedAmount >= goal.targetAmount) {
      goal.status = "Completed";
      goal.savedAmount = goal.targetAmount;
    }

    await goal.save();
    res.json({ message: "Goal updated", goal });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete goal
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
