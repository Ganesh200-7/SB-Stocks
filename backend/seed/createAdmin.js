require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin exists
    const adminExists = await User.findOne({ email: "admin@sbstocks.com" });
    
    if (adminExists) {
      console.log("✅ Admin already exists:", adminExists.email);
      process.exit();
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@sbstocks.com",
      password: hashedPassword,
      isAdmin: true,
      balance: 1000000,
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email: admin@sbstocks.com");
    console.log("🔐 Password: admin123");
    console.log("💰 Balance: ₹1,000,000");

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
