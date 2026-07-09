const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      default: 1000,
    },
    priceHistory: {
  type: [Number],
  default: [],
},
  },
  { timestamps: true }
);

module.exports = mongoose.models.Stock || mongoose.model("Stock", stockSchema);