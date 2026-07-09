const User = require("../models/User");

const getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("portfolio.stockId");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
user.portfolio = user.portfolio.filter(
  (item) => item.stockId !== null
);
    let totalInvested = 0;
    let currentValue = 0;

   user.portfolio.forEach((item) => {
  const stockPrice = item.stockId?.price || 0;

  totalInvested += item.averagePrice * item.quantity;
  currentValue += stockPrice * item.quantity;
});

    const profitLoss = currentValue - totalInvested;
    const profitLossPercentage =
  totalInvested > 0
    ? ((profitLoss / totalInvested) * 100).toFixed(2)
    : 0;

  res.json({
  balance: user.balance,
  portfolio: user.portfolio,
  totalInvested,
  currentValue,
  profitLoss,
  profitLossPercentage,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getPortfolio };