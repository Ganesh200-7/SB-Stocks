const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Stock = require("../models/stock");

dotenv.config();

const generatePriceHistory = (basePrice) => {
  const history = [];
  let price = basePrice;
  
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.5) * 0.04 * price;
    price = Math.max(price + change, basePrice * 0.8); 
    history.push(Math.round(price * 100) / 100);
  }
  
  return history;
};

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 180, priceHistory: generatePriceHistory(180) },
  { symbol: "TSLA", name: "Tesla Inc.", price: 250, priceHistory: generatePriceHistory(250) },
  { symbol: "GOOGL", name: "Google", price: 140, priceHistory: generatePriceHistory(140) },
  { symbol: "AMZN", name: "Amazon", price: 170, priceHistory: generatePriceHistory(170) },
  { symbol: "MSFT", name: "Microsoft", price: 380, priceHistory: generatePriceHistory(380) },
  { symbol: "META", name: "Meta Platforms", price: 320, priceHistory: generatePriceHistory(320) },
  { symbol: "NVDA", name: "NVIDIA", price: 875, priceHistory: generatePriceHistory(875) },
  { symbol: "ADBE", name: "Adobe Inc.", price: 410, priceHistory: generatePriceHistory(410) },
  { symbol: "NFLX", name: "Netflix", price: 420, priceHistory: generatePriceHistory(420) },
  { symbol: "INTC", name: "Intel", price: 42, priceHistory: generatePriceHistory(42) },
];

const seedStocks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const stock of stocks) {
      await Stock.findOneAndUpdate(
        { symbol: stock.symbol },
        stock,
        { upsert: true, new: true }
      );
    }

    console.log("Stocks seeded successfully 🚀");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedStocks();