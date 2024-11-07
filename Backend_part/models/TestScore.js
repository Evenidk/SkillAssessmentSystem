// models/TestScore.js
const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  testType: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestScore", testScoreSchema);
