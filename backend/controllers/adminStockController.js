const Stock = require("../models/stock");
exports.createStock = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ message: "Stock deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};