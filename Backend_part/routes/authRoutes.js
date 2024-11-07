// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser, updateProfile, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getUserProfile);  // Apply protect middleware here

module.exports = router;
