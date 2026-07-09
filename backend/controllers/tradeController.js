const User = require("../models/user");
const Stock = require("../models/stock");
const Transaction = require("../models/transaction");

// BUY STOCK
const buyStock = async (req, res) => {
  try {

    const userId = req.user.id;
    const { stockId, quantity } = req.body;

    const qty = Number(quantity);

    if (!stockId || !qty || qty <= 0 || isNaN(qty)) {
      return res.status(400).json({ message: "Invalid stockId or quantity" });
    }

    const user = await User.findById(userId);
    const stock = await Stock.findById(stockId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.quantityAvailable < qty) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const total = stock.price * qty;

    if (user.balance < total) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= total;
    stock.quantityAvailable -= qty;

    await stock.save();

    const existing = user.portfolio.find(
      (p) => p.stockId.toString() === stockId
    );

    if (existing) {
      existing.averagePrice =
        (existing.averagePrice * existing.quantity + stock.price * qty) /
        (existing.quantity + qty);

      existing.quantity += qty;
    } else {
      user.portfolio.push({
        stockId,
        quantity: qty,
        averagePrice: stock.price,
      });
    }

    await user.save();

    const transaction = await Transaction.create({
      userId,
      stockId,
      type: "BUY",
      quantity: qty,
      price: stock.price,
      total,
    });


    
    const latest = await Transaction.find()
  .sort({ createdAt: -1 })
  .limit(5);




    res.json({ message: "Stock bought successfully" });
  } catch (error) {
    console.error("BUY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// SELL STOCK
const sellStock = async (req, res) => {
  try {

    const userId = req.user.id;
    const { stockId, quantity } = req.body;

    const qty = Number(quantity);

    if (!stockId || !qty || qty <= 0 || isNaN(qty)) {
      return res.status(400).json({ message: "Invalid stockId or quantity" });
    }

    const user = await User.findById(userId);
    const stock = await Stock.findById(stockId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const holding = user.portfolio.find(
      (p) => p.stockId.toString() === stockId
    );

    if (!holding || holding.quantity < qty) {
      return res.status(400).json({ message: "Not enough stocks to sell" });
    }

    const total = stock.price * qty;

    holding.quantity -= qty;

    if (holding.quantity === 0) {
      user.portfolio = user.portfolio.filter(
        (p) => p.stockId.toString() !== stockId
      );
    }

    user.balance += total;

    await user.save();

    const transaction = await Transaction.create({
      userId,
      stockId,
      type: "SELL",
      quantity: qty,
      price: stock.price,
      total,
    });

   
    

    res.json({ message: "Stock sold successfully" });
  } catch (error) {
    console.error("SELL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { buyStock, sellStock };