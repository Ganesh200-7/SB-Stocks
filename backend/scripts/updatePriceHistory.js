const mongoose = require("mongoose");
require("dotenv").config();

const Stock = require("../models/Stock");

mongoose.connect(process.env.MONGO_URI);

async function updateStocks() {
  try {
    await Stock.updateOne(
      { symbol: "AAPL" },
      {
        $set: {
          priceHistory: [650, 670, 690, 700, 710, 705, 700],
        },
      }
    );

    await Stock.updateOne(
      { symbol: "TSLA" },
      {
        $set: {
          priceHistory: [90, 95, 100, 98, 105, 103, 100],
        },
      }
    );

    await Stock.updateOne(
      { symbol: "GOOGL" },
      {
        $set: {
          priceHistory: [95, 96, 98, 100, 102, 101, 100],
        },
      }
    );

    await Stock.updateOne(
      { symbol: "AMZN" },
      {
        $set: {
          priceHistory: [150, 155, 160, 165, 170, 172, 170],
        },
      }
    );

    console.log("✅ Price history updated!");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

updateStocks();