const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    isAdmin: user.isAdmin,
  },
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPLOAD IMAGE
const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      message: "Uploaded",
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET LOGGED USER
const getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

module.exports = {
  registerUser,
  loginUser,
  uploadProfileImage,
  getMe,
};