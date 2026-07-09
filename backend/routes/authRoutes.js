const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  uploadProfileImage,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post(
  "/upload-profile",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;