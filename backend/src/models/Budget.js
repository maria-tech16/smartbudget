const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Budget", budgetSchema);
