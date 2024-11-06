"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Code,
  PenTool,
  Cpu,
  Book,
  Terminal,
  Brain,
  Globe,
} from "lucide-react";
import TestDetailsModal from "@/app/test_detail";
import ProctoredTestComponent from "@/components/ProctoredTestComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";

const availableTests = [
  {
    type: "html",
    name: "HTML",
    icon: <Globe className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your understanding of HTML structure and elements.",
  },
  {
    type: "css",
    name: "CSS",
    icon: <PenTool className="mr-2 h-5 w-5 text-white" />,
    description: "Test your skills in styling web pages with CSS.",
  },
  {
    type: "javascript",
    name: "JavaScript",
    icon: <Code className="mr-2 h-5 w-5 text-white" />,
    description: "Assess your knowledge of JavaScript programming.",
  },
  {
    type: "react",
    name: "React",
    icon: <Cpu className="mr-2 h-5 w-5 text-white" />,
    description: "Test your understanding of the React library.",
  },
  {
    type: "c++",
    name: "C++",
    icon: <Terminal className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your knowledge of C++ programming concepts.",
  },
  {
    type: "python",
    name: "Python",
    icon: <Brain className="mr-2 h-5 w-5 text-white" />,
    description: "Test your skills in Python programming.",
  },
  {
    type: "java",
    name: "Java",
    icon: <Book className="mr-2 h-5 w-5 text-white" />,
    description: "Assess your Java programming skills.",
  },
  {
    type: "machine-learning",
    name: "Machine Learning",
    icon: <Brain className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your understanding of machine learning concepts.",
  },
];

const mockData = [
  {
    name: "John Doe",
    html: 85,
    css: 70,
    javascript: 60,
    react: 75,
    cplusplus: 80,
    python: 65,
    java: 70,
    machineLearning: 85,
  },
];

const SkillAssessmentInterface = () => {
  const [activeTest, setActiveTest] = useState(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [testDetailsOpen, setTestDetailsOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const startTest = (testType) => {
    setActiveTest(testType);
    setTestInProgress(true);
    toast.info(`Starting ${testType} test...`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const closeTest = () => {
    setTestInProgress(false);
    setActiveTest(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(`Switched to ${!darkMode ? "Dark" : "Light"} Mode`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  };

  const openTestDetails = (testType) => {
    setSelectedTest(testType);
    setTestDetailsOpen(true);
    toast.info(`Viewing details for ${testType} test`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 to-indigo-100"
      }`}
    >
      <ToastContainer />
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
        availableTests={availableTests}
        startTest={startTest}
        onNavigate={setCurrentSection}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentSection === "profile" ? (
          <ProfilePage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            darkMode={darkMode}
          />
        ) : (
          <Tabs
            defaultValue="dashboard"
            className="space-y-4"
            onValueChange={setCurrentSection}
          >
            <TabsList
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-md flex flex-wrap`}
            >
              <TabsTrigger value="dashboard" className="w-full sm:w-auto">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="tests" className="w-full sm:w-auto">
                Available Tests
              </TabsTrigger>
              <TabsTrigger value="results" className="w-full sm:w-auto">
                Test Results
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="dashboard">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                      <CardHeader>
                        <CardTitle>Welcome to SkillProve AI</CardTitle>
                        <CardDescription>
                          Your AI-powered skill assessment platform
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Get started by taking a test or reviewing your past
                          results.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                      <CardHeader>
                        <CardTitle>Your Performance</CardTitle>
                        <CardDescription>
                          Track your skill progression over time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={mockData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="HTML"
                              dataKey="html"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="CSS"
                              dataKey="css"
                              stroke="#82ca9d"
                              fill="#82ca9d"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="JavaScript"
                              dataKey="javascript"
                              stroke="#ffc658"
                              fill="#ffc658"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="React"
                              dataKey="react"
                              stroke="#ff7300"
                              fill="#ff7300"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="C++"
                              dataKey="cplusplus"
                              stroke="#387908"
                              fill="#387908"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="Python"
                              dataKey="python"
                              stroke="#a83232"
                              fill="#a83232"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="Java"
                              dataKey="java"
                              stroke="#32a852"
                              fill="#32a852"
                              fillOpacity={0.6}
                            />
                            <Radar
                              name="Machine Learning"
                              dataKey="machineLearning"
                              stroke="#3232a8"
                              fill="#3232a8"
                              fillOpacity={0.6}
                            />
                            <Legend />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tests">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {availableTests.map((test) => (
                      <Card
                        key={test.type}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            {test.icon} {test.name} Test
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white">{test.description}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button
                            onClick={() => startTest(test.type)}
                            variant="default"
                            className="flex items-center justify-center"
                          >
                            Start Test
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => openTestDetails(test.type)}
                            className="flex items-center justify-center text-black"
                          >
                            Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="results">
                  <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Test Results</CardTitle>
                      <CardDescription>
                        Review your past test performances
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={mockData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="html" fill="#8884d8" />
                          <Bar dataKey="css" fill="#82ca9d" />
                          <Bar dataKey="javascript" fill="#ffc658" />
                          <Bar dataKey="react" fill="#ff7300" />
                          <Bar dataKey="cplusplus" fill="#387908" />
                          <Bar dataKey="python" fill="#a83232" />
                          <Bar dataKey="java" fill="#32a852" />
                          <Bar dataKey="machineLearning" fill="#3232a8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        )}
      </main>

      <AnimatePresence>
        {testInProgress && activeTest && (
          <ProctoredTestComponent testType={activeTest} onClose={closeTest} />
        )}
      </AnimatePresence>
      <TestDetailsModal
        isOpen={testDetailsOpen}
        onClose={() => setTestDetailsOpen(false)}
        testType={selectedTest}
      />
    </div>
  );
};

export default SkillAssessmentInterface;
