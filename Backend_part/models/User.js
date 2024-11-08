// models/User.js
const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
  testType: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Developer" },
  avatar: { type: String, default: "" },
  testScores: [testScoreSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);