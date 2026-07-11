const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStockById,
  searchStocks,
  getStockBySymbol,
} = require("../controllers/stockController");

router.get("/search", searchStocks);

router.get("/id/:id", getStockById);

router.get("/symbol/:symbol", getStockBySymbol);

router.get("/", getAllStocks);

module.exports = router;