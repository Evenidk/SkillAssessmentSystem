"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/navigation";
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
  LineChart,
  Line,
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
import { Code, PenTool, Cpu, Book, Terminal, Brain, Globe } from "lucide-react";
import TestDetailsModal from "@/app/test_detail";
import ProctoredTestComponent from "@/components/ProctoredTestComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";
import { getUserTestScores } from "../lib/api"; // Make sure this import path is correct
// Add this with your other imports at the top
import TestScoresLineGraph from "../components/TestScoresLineGraph";
import Dashboard from "./Dashboard";
import AvailableTests from "./AvailableTests";
import TestResults from "./TestResults";

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
    type: "machineLearning",
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
  const { token } = useAuth();
  const router = useRouter();
  const [activeTest, setActiveTest] = useState(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [testDetailsOpen, setTestDetailsOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testScores, setTestScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedTestType, setSelectedTestType] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    avatar: "https://via.placeholder.com/150",
  });

  // Fetch test scores
  useEffect(() => {
    const fetchTestScores = async () => {
      if (!token) return;

      setIsLoading(true);
      try {
        const scores = await getUserTestScores(token);
        console.log("Fetched scores:", scores);

        if (Array.isArray(scores)) {
          setTestScores(scores);

          // Process scores for performance data
          const processedData = processTestScores(scores);
          setPerformanceData(processedData);
        } else {
          console.error("Invalid scores format:", scores);
          setTestScores([]);
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setError("Failed to fetch test scores");
        toast.error("Failed to fetch test scores");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestScores();
  }, [token]);

  // Process test scores for visualization
  const processTestScores = (scores) => {
    const processedData = scores.reduce((acc, score) => {
      const existingType = acc.find((item) => item.testType === score.testType);
      if (existingType) {
        existingType.attempts += 1;
        existingType.totalScore += score.score;
        existingType.averageScore = Math.round(
          existingType.totalScore / existingType.attempts
        );
        existingType.scores.push(score.score);
      } else {
        acc.push({
          testType: score.testType,
          attempts: 1,
          totalScore: score.score,
          averageScore: score.score,
          scores: [score.score],
        });
      }
      return acc;
    }, []);

    return processedData;
  };

  // Authentication redirect
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // Dark mode toggle
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

  // Render test scores visualization
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
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="testType" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="averageScore"
            stroke="#8884d8"
            name="Average Score"
          />
        </LineChart>
      </ResponsiveContainer>
    );
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
                  <Dashboard token={token} />
                </TabsContent>

                <TabsContent value="tests">
                  <AvailableTests
                    availableTests={availableTests}
                    startTest={startTest}
                    openTestDetails={openTestDetails}
                  />
                </TabsContent>

                <TabsContent value="results">
                  <TestResults
                    testScores={testScores}
                    selectedTestType={selectedTestType}
                    setSelectedTestType={setSelectedTestType}
                    isLoading={isLoading}
                    error={error}
                    darkMode={darkMode}
                    availableTests={availableTests}
                  />
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
