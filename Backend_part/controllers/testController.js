// controllers/testController.js
const User = require("../models/User");

exports.addTestScore = async (req, res) => {
  const { testType, score } = req.body;
  try {
    console.log('Adding score for user:', req.user.userId);
    console.log('Score data:', { testType, score });

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    user.testScores.push({ 
      testType, 
      score,
      createdAt: new Date()
    });

    await user.save();

    res.json({ 
      success: true,
      message: "Test score added successfully",
      testScores: user.testScores 
    });
  } catch (error) {
    console.error('Error adding test score:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to add test score",
      message: error.message 
    });
  }
};

exports.getUserTestScores = async (req, res) => {
  try {
    console.log('Request user:', req.user); // Debug log
    console.log('Fetching scores for user:', req.user.userId);

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required"
      });
    }

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    console.log('Found user scores:', user.testScores); // Debug log

    res.json({
      success: true,
      testScores: user.testScores || []
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch test scores",
      message: error.message
    });
  }
};

exports.getUserPerformanceData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("testScores")
      .lean();

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    // Aggregate performance data by test type
    const performanceData = user.testScores.reduce((acc, score) => {
      if (!acc[score.testType]) {
        acc[score.testType] = { totalScore: 0, count: 0 };
      }
      acc[score.testType].totalScore += score.score;
      acc[score.testType].count += 1;
      return acc;
    }, {});

    const formattedData = Object.entries(performanceData).map(([testType, data]) => ({
      testType,
      averageScore: Math.round(data.totalScore / data.count * 100) / 100,
      totalAttempts: data.count
    }));

    res.json({ 
      success: true,
      performanceData: formattedData 
    });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch performance data",
      message: error.message 
    });
  }
};