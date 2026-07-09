const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStockById,
  searchStocks,
  getStockBySymbol,
} = require("../controllers/stockController");

// Search stocks
router.get("/search", searchStocks);

// Get stock by ID
router.get("/id/:id", getStockById);

// Get stock by symbol
router.get("/symbol/:symbol", getStockBySymbol);

// Get all stocks
router.get("/", getAllStocks);

module.exports = router;