const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlistController");

// Add stock to watchlist
router.post("/", authMiddleware, addToWatchlist);

// Get user's watchlist
router.get("/", authMiddleware, getWatchlist);

// Remove stock from watchlist
router.delete("/:stockId", authMiddleware, removeFromWatchlist);

module.exports = router;