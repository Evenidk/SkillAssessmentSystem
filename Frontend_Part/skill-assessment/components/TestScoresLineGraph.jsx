// components/TestScoresLineGraph.jsx
"use client";
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const TestScoresLineGraph = ({ testScores, darkMode, availableTests }) => {
  // Group scores by test type and sort by date
  const processTestScores = () => {
    const groupedScores = {};
    
    // Initialize with all test types
    availableTests.forEach(test => {
      groupedScores[test.type] = [];
    });

    // Group scores by test type
    testScores.forEach(score => {
      if (groupedScores[score.testType]) {
        groupedScores[score.testType].push({
          score: score.score,
          date: new Date(score.createdAt),
          attemptNumber: groupedScores[score.testType].length + 1
        });
      }
    });

    // Sort scores by date for each test type
    Object.keys(groupedScores).forEach(testType => {
      groupedScores[testType].sort((a, b) => a.date - b.date);
    });

    return groupedScores;
  };

  const groupedScores = processTestScores();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="attemptNumber"
          label={{ 
            value: 'Attempt Number', 
            position: 'bottom',
            style: { fill: darkMode ? '#fff' : '#000' }
          }}
        />
        <YAxis 
          domain={[0, 100]}
          label={{ 
            value: 'Score', 
            angle: -90, 
            position: 'insideLeft',
            style: { fill: darkMode ? '#fff' : '#000' }
          }}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className={`p-2 border rounded shadow ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                }`}>
                  <p className="font-bold">{`Attempt ${label}`}</p>
                  {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                      {`${entry.name}: ${entry.value}`}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        {availableTests.map((test, index) => {
          const testData = groupedScores[test.type] || [];
          return testData.length > 0 ? (
            <Line
              key={test.type}
              type="monotone"
              data={testData}
              dataKey="score"
              name={test.name}
              stroke={`hsl(${index * 45}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          ) : null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TestScoresLineGraph;