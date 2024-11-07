// controllers/testController.js
const User = require("../models/User");

exports.addTestScore = async (req, res) => {
  const { testType, score } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    user.testScores.push({ testType, score });
    await user.save();
    res.json({ message: "Test score added", testScores: user.testScores });
  } catch (error) {
    res.status(500).json({ error: "Failed to add test score" });
  }
};

exports.getUserTestScores = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("testScores");
    res.json({ testScores: user.testScores });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch test scores" });
  }
};

// Define and export getUserPerformanceData
exports.getUserPerformanceData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("testScores");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Aggregate performance data by test type
    const performanceData = user.testScores.reduce((acc, scoreEntry) => {
      if (!acc[scoreEntry.testType]) {
        acc[scoreEntry.testType] = { totalScore: 0, count: 0 };
      }
      acc[scoreEntry.testType].totalScore += scoreEntry.score;
      acc[scoreEntry.testType].count += 1;
      return acc;
    }, {});

    const formattedData = Object.entries(performanceData).map(([testType, data]) => ({
      testType,
      averageScore: data.totalScore / data.count,
    }));

    res.json({ performanceData: formattedData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch performance data" });
  }
};
