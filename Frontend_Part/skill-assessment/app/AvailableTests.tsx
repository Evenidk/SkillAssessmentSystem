// app/AvailableTests.tsx
"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Globe, PenTool, Code, Cpu, Terminal, Brain, Book, Server, Database, Monitor, BarChart, CheckSquare } from "lucide-react";

interface Test {
  type: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

// Generic test details that will be used for all tests
const genericTestDetails = {
  duration: "10 minutes",
  questions: 10,
  format: "Multiple Choice Questions",
  guidelines: [
    "Read each question carefully",
    "Time management is crucial",
    "All questions are mandatory",
    "No negative marking",
    "Results will be shown immediately"
  ],
  preparationTips: [
    "Review core concepts",
    "Practice sample questions",
    "Study related topics",
    "Take mock tests",
    "Focus on fundamentals"
  ]
};

// Your existing test data with icons from Lucide
export const availableTests = [
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
  {
    type: "nodejs",
    name: "Node.js",
    icon: <Server className="mr-2 h-5 w-5 text-white" />,
    description: "Assess your knowledge of Node.js runtime environment.",
  },
  {
    type: "mongodb",
    name: "MongoDB",
    icon: <Database className="mr-2 h-5 w-5 text-white" />,
    description: "Test your understanding of MongoDB database concepts.",
  },
  {
    type: "c",
    name: "C",
    icon: <Code className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your knowledge of C programming fundamentals.",
  },
  {
    type: "csharp",
    name: "C#",
    icon: <Monitor className="mr-2 h-5 w-5 text-white" />,
    description: "Assess your understanding of C# and .NET framework.",
  },
  {
    type: "sql",
    name: "SQL",
    icon: <Database className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your skills in SQL and database management.",
  },
  {
    type: "expressjs",
    name: "Express.js",
    icon: <Server className="mr-2 h-5 w-5 text-white" />,
    description: "Test your knowledge of Express.js for web development.",
  },
  {
    type: "webservers",
    name: "Web Servers",
    icon: <Globe className="mr-2 h-5 w-5 text-white" />,
    description: "Evaluate your understanding of web server fundamentals.",
  },
  {
    type: "datascience",
    name: "Data Science",
    icon: <BarChart className="mr-2 h-5 w-5 text-white" />,
    description: "Assess your knowledge of data science principles.",
  },
  {
    type: "aptitude",
    name: "Aptitude",
    icon: <CheckSquare className="mr-2 h-5 w-5 text-white" />,
    description: "Test your logical, numerical, and reasoning aptitude.",
  },
];

interface AvailableTestsProps {
  startTest: (testType: string) => void;
  openTestDetails: (testType: string) => void;
}

const AvailableTests: React.FC<AvailableTestsProps> = ({
  startTest,
  openTestDetails,
}) => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetails = (test: Test) => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableTests.map((test, index) => (
          <motion.div
            key={test.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HoverCard>
              <HoverCardTrigger>
                <Card className="bg-gradient-to-br from-primary/90 to-primary/60 dark:from-primary/80 dark:to-primary/50 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      {test.icon}
                      <span className="text-white font-bold">{test.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 line-clamp-2">{test.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => startTest(test.type)}
                      variant="secondary"
                      className="w-full sm:w-auto bg-foreground hover:bg-foreground/20 text-background border-white/10 backdrop-blur-sm"
                    >
                      Start Test
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleOpenDetails(test)}
                      className="w-full sm:w-auto bg-background/90 hover:bg-background text-primary hover:text-primary/90"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{test.name} Assessment Overview</h4>
                  <div className="text-sm space-y-1">
                    <p>⏱️ Duration: {genericTestDetails.duration}</p>
                    <p>📝 Questions: {genericTestDetails.questions}</p>
                    <p>🎯 Format: {genericTestDetails.format}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-2xl">
              {selectedTest?.icon}
              <span>{selectedTest?.name} Test Details</span>
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Test Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p>⏱️ Duration: {genericTestDetails.duration}</p>
                      <p>📝 Total Questions: {genericTestDetails.questions}</p>
                      <p>🎯 Format: {genericTestDetails.format}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Guidelines</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {genericTestDetails.guidelines.map((guideline, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {guideline}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Preparation Tips</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {genericTestDetails.preparationTips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => {
                    startTest(selectedTest?.type || '');
                    setIsDialogOpen(false);
                  }}
                  className="w-full"
                >
                  Start Test Now
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvailableTests;