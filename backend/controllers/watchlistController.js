const User = require("../models/user");
const Stock = require("../models/stock");
const addToWatchlist = async (req, res) => {
  try {
    const { stockId } = req.body;
    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.watchlist = user.watchlist || [];
    if (user.watchlist.some(id => id.toString() === stockId.toString())) {
      return res.status(400).json({ message: "Stock already in watchlist" });
    }
    user.watchlist.push(stockId);
    await user.save();
    res.json({ message: "Stock added to watchlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");

    res.json(user.watchlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { stockId } = req.params;
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== stockId
    );
    await user.save();
    res.json({
      message: "Stock removed from watchlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};