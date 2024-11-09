"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  // Dummy data with scores already multiplied by 10
  const dummyData = [
    { name: "JAVASCRIPT", score: 85 },
    { name: "PYTHON", score: 70 },
    { name: "REACT", score: 90 },
    { name: "NODE.JS", score: 75 },
    { name: "SQL", score: 80 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      
      {/* Welcome Card */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl mb-8 border-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Welcome to SkillProve AI
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                Your AI-powered skill assessment platform
              </CardDescription>
            </div>
            {/* You can add an icon or image here */}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Get started by taking a test or reviewing your past results. Use
            this dashboard to track your skills and plan your next steps.
          </p>
        </CardContent>
      </Card>

      {/* Performance Card */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                Your Performance Overview
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Comprehensive view of your skill progression
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="w-full h-[450px]"> {/* Increased height for better visibility */}
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dummyData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid gridType="polygon" stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="name"
                    tick={{ 
                      fill: '#64748b',
                      fontSize: 14,
                      fontWeight: 500
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ 
                      fill: '#64748b',
                      fontSize: 12
                    }}
                    stroke="#e2e8f0"
                  />
                  <Radar
                    name="Skill Level"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Summary */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {dummyData.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {skill.name}
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {skill.score}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* You could add more cards here for additional dashboard sections */}
    </div>
  );
};

export default Dashboard;