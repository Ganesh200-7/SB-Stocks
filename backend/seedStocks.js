const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Stock = require("./models/Stock");

const stocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 700,
    quantityAvailable: 1000,
    priceHistory: [650, 670, 680, 690, 700],
  },
  {
    symbol: "GOOGL",
    name: "Google",
    price: 100,
    quantityAvailable: 1000,
    priceHistory: [80, 85, 90, 95, 100],
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    price: 170,
    quantityAvailable: 1000,
    priceHistory: [150, 155, 160, 165, 170],
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: 200,
    quantityAvailable: 1000,
    priceHistory: [180, 185, 190, 195, 200],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 550,
    quantityAvailable: 1000,
    priceHistory: [500, 510, 520, 540, 550],
  },
  {
    symbol: "META",
    name: "Meta",
    price: 450,
    quantityAvailable: 1000,
    priceHistory: [400, 410, 420, 430, 450],
  },
  {
    symbol: "NFLX",
    name: "Netflix",
    price: 620,
    quantityAvailable: 1000,
    priceHistory: [560, 580, 590, 600, 620],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 980,
    quantityAvailable: 1000,
    priceHistory: [900, 920, 940, 960, 980],
  },
  {
    symbol: "AMD",
    name: "AMD",
    price: 240,
    quantityAvailable: 1000,
    priceHistory: [200, 210, 220, 230, 240],
  },
  {
    symbol: "INTC",
    name: "Intel",
    price: 140,
    quantityAvailable: 1000,
    priceHistory: [120, 125, 130, 135, 140],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Stock.deleteMany({});

    await Stock.insertMany(stocks);

    console.log("✅ 10 Stocks Inserted Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();