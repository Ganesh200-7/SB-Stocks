const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Stock = require("../models/Stock");
console.log("ADMIN CONTROLLER LOADED");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId", "name email")
      .populate("stockId", "name symbol price")
      .sort({ createdAt: -1 });

    const formatted = transactions.map((t) => ({
      _id: t._id,
      userName: t.userId?.name || "Unknown User",
      email: t.userId?.email || "",
      stockName: t.stockId?.name || "Unknown Stock",
      stockSymbol: t.stockId?.symbol || "",
      type: t.type,
      quantity: t.quantity,
      price: t.price,
      total: t.total,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Admin Orders Error:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.getStockAnalytics = async (req, res) => {
  try {
    const stocks = await Stock.find();
    console.log(`Found ${stocks.length} stocks`);

    const analytics = await Promise.all(
      stocks.map(async (stock) => {
        const transactions = await Transaction.find({
          stockId: stock._id,
        });

        const buyCount = transactions.filter(
          (t) => t.type === "BUY"
        ).length;

        const sellCount = transactions.filter(
          (t) => t.type === "SELL"
        ).length;

        const totalQuantity = transactions.reduce(
          (sum, t) => sum + t.quantity,
          0
        );

        const totalValue = transactions.reduce(
          (sum, t) => sum + t.total,
          0
        );
        
        console.log(`Stock: ${stock.name}, Transactions: ${transactions.length}, Qty: ${totalQuantity}`);
         
        return {
          _id: stock._id,
          symbol: stock.symbol,
          stockName: `${stock.symbol} - ${stock.name}`,
          buyCount,
          sellCount,
          totalQuantity: Math.max(totalQuantity, 0),
          totalValue: Math.max(totalValue, 0),
        };
      })
    );

    res.json(analytics);
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};