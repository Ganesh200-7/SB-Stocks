const express = require("express");
const router = express.Router();

const { buyStock, sellStock } = require("../controllers/tradeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/buy", authMiddleware, buyStock);
router.post("/sell", authMiddleware, sellStock);
console.log("TRADE ROUTES FILE LOADED AGAIN");
module.exports = router;