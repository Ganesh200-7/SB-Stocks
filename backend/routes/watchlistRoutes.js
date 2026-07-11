const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlistController");

router.post("/", authMiddleware, addToWatchlist);

router.get("/", authMiddleware, getWatchlist);

router.delete("/:stockId", authMiddleware, removeFromWatchlist);

module.exports = router;