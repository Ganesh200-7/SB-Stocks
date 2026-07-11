const Stock = require("../models/stock");

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({
      symbol: req.params.symbol,
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchStocks = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const stocks = await Stock.find({
      $or: [
        { symbol: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  searchStocks,
   getStockBySymbol,
};