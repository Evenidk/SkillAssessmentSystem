// TestResults.tsx
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TestResultsProps {
  testScores: Array<any>;
  selectedTestType: string;
  setSelectedTestType: (type: string) => void;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
  availableTests: Array<{ type: string; name: string }>;
}

// Helper function for date formatting
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateString);
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString;
  }
};

const TestResults: React.FC<TestResultsProps> = ({
  testScores,
  selectedTestType,
  setSelectedTestType,
  isLoading,
  error,
  darkMode,
  availableTests,
}) => {
  const renderTestScoresGraph = () => {
    if (isLoading) {
      return <div className="text-center py-4">Loading test scores...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    if (!testScores.length) {
      return (
        <div className="text-center py-4">
          No test scores available. Take a test to see your progress!
        </div>
      );
    }

    const processedData = testScores
      .filter((score) => !selectedTestType || score.testType === selectedTestType)
      .map((score) => ({
        ...score,
        score: score.score * 10,
        date: formatDate(score.date),
        originalDate: score.date
      }))
      .sort((a, b) => new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime());

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: darkMode ? "#fff" : "#000" }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fill: darkMode ? "#fff" : "#000" }}
            label={{ 
              value: 'Score (%)', 
              angle: -90, 
              position: 'insideLeft',
              fill: darkMode ? "#fff" : "#000"
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#374151" : "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: darkMode ? "#fff" : "#000",
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            name="Score"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderStatistics = () => {
    const filteredScores = testScores
      .filter((score) => score.testType === selectedTestType)
      .map((score) => score.score * 10);

    if (!filteredScores.length) return null;

    const average = filteredScores.reduce((a, b) => a + b, 0) / filteredScores.length;
    const highest = Math.max(...filteredScores);
    const latest = filteredScores[filteredScores.length - 1];
    const totalAttempts = filteredScores.length;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
            <p className="text-2xl font-bold">{average.toFixed(1)}%</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Highest Score</p>
            <p className="text-2xl font-bold">{highest}%</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Latest Score</p>
            <p className="text-2xl font-bold">{latest}%</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Attempts</p>
            <p className="text-2xl font-bold">{totalAttempts}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Test Results</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Track your progress over time for each test type
        </CardDescription>
        {testScores.length > 0 && (
          <div className="mt-4">
            <select
              className="w-full md:w-64 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => setSelectedTestType(e.target.value)}
              value={selectedTestType}
            >
              <option value="">All Test Types</option>
              {[...new Set(testScores.map((score) => score.testType))].map((type) => (
                <option key={type} value={type}>
                  {availableTests.find((test) => test.type === type)?.name || type}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        {renderTestScoresGraph()}
      </CardContent>
      {testScores.length > 0 && selectedTestType && (
        <CardFooter className="border-t border-gray-200 dark:border-gray-700">
          {renderStatistics()}
        </CardFooter>
      )}
    </Card>
  );
};

export default TestResults;