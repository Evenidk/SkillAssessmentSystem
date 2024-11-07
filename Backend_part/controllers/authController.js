// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Registration error:", error);  // Log error for debugging
      res.status(500).json({ error: "User registration failed" });  // Changed to 500 for internal server error
    }
  };
  
// User login
exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);  // Log error for debugging
    res.status(500).json({ error: "Login failed" });
  }
};


// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, role, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, role, avatar },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
      console.log("User ID from token:", req.user.userId);  // Debugging log
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ user });
    } catch (error) {
      console.error("Error fetching profile:", error);  // Added logging
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  };
