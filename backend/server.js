const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const adminRoutes = require("./routes/adminRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
dotenv.config();

const app = express();

connectDB().catch(err => {
  console.error("❌ MongoDB Connection Failed:", err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/transactions", transactionRoutes);
app.use("/transaction", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/trade", tradeRoutes);
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});
console.log("SERVER FILE LOADED");
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.get("/", (req, res) => {
  res.send("SB Stocks API is Running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});