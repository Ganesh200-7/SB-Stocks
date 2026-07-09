require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");

const resetPortfolio = async () => {
  try {
    await connectDB();

    await User.updateMany(
      {},
      {
        $set: {
          portfolio: [],
          watchlist: [],
          balance: 100000, // optional: reset balance
        },
      }
    );

    console.log("✅ Portfolio cleared");
    console.log("✅ Watchlist cleared");
    console.log("✅ Balance reset");
    console.log("🎉 Users reset successfully!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetPortfolio();