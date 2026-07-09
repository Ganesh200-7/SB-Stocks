const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
    type: {
      type: String,
      enum: ["BUY", "SELL"],
    },
    quantity: Number,
    price: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);