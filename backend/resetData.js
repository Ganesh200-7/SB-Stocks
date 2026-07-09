require("dotenv").config();

const connectDB = require("./config/db");

const Transaction = require("./models/transaction");

const resetDatabase = async () => {
  try {
    await connectDB();

    // 🧹 Delete ALL trading history (this fixes portfolio + charts + orders)
    await Transaction.deleteMany({});

    console.log("✅ Transactions cleared");
    console.log("✅ Portfolio cleared (derived from transactions)");
    console.log("🎉 Full trading reset completed!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetDatabase();