const express = require("express");
const router = express.Router();
console.log("ADMIN ROUTES LOADED");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const User = require("../models/User");
const {
  createStock,
  updateStock,
  deleteStock,
} = require("../controllers/adminStockController");
const {
  getAllUsers,
  getAllOrders,
  getStockAnalytics
} = require("../controllers/adminController");
// All admin routes protected
router.post("/stocks", authMiddleware, adminMiddleware, createStock);
router.put("/stocks/:id", authMiddleware, adminMiddleware, updateStock);
router.delete("/stocks/:id", authMiddleware, adminMiddleware, deleteStock);


router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.get(
  "/stocks",
  authMiddleware,
  adminMiddleware,
  getStockAnalytics
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
module.exports = router;