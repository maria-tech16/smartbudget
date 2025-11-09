const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  monthlyBudget: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);
