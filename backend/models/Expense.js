const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    category: String,
    description: String,
    type: {
      type: String,
      enum: ["income", "expense"]
    },
    date: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
