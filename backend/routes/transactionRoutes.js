const express = require("express");
const Transaction = require("../models/transaction");
const Stock = require("../models/stock");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .populate("stockId", "symbol name")
      .sort({ createdAt: -1 });

    const enrichedTransactions = await Promise.all(
      transactions.map(async (tx) => {
        const stock = tx.stockId;
        const fallbackName =
          tx.stockId?.name ||
          tx.stockId?.symbol ||
          "Unknown stock";

        const stockDetails = stock && typeof stock === "object"
          ? stock
          : await Stock.findById(tx.stockId).select("symbol name").catch(() => null);

        return {
          ...tx.toObject(),
          stockName: stockDetails?.name || fallbackName,
          stockSymbol: stockDetails?.symbol || "",
        };
      })
    );

    res.json(enrichedTransactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;