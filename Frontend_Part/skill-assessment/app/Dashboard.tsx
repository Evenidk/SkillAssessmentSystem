"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
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
      
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome to SkillProve AI
              </CardTitle>
              <CardDescription className="mt-2 text-lg">
                Your AI-powered skill assessment platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Get started by taking a test or reviewing your past results. Use
            this dashboard to track your skills and plan your next steps.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Your Performance Overview
              </CardTitle>
              <CardDescription>
                Comprehensive view of your skill progression
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg p-6 bg-muted/50">
            <div className="w-full h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dummyData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis 
                    dataKey="name"
                    tick={{ 
                      fill: 'currentColor',
                      fontSize: 14,
                      fontWeight: 500
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ 
                      fill: 'currentColor',
                      fontSize: 12
                    }}
                  />
                  <Radar
                    name="Skill Level"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
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

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {dummyData.map((skill) => (
                <div 
                  key={skill.name}
                  className="bg-card p-4 rounded-lg shadow-sm border"
                >
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {skill.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    {skill.score}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;