// components/TestInterface.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Timer } from 'lucide-react';
import { toast } from 'react-toastify';

// Sample Questions Data
const questions = {
  coding: [
    {
      question: "What is the output of `console.log(typeof null)` in JavaScript?",
      options: ["'object'", "'null'", "'undefined'", "'number'"],
      answer: "'object'",
    },
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["Laravel", "Django", "React", "Ruby on Rails"],
      answer: "React",
    },
    // Add more coding questions as needed
  ],
  design: [
    {
      question: "What does UI stand for?",
      options: ["User Interaction", "User Interface", "Uniform Interface", "Unified Interaction"],
      answer: "User Interface",
    },
    {
      question: "Which color is considered the most readable?",
      options: ["Red", "Blue", "Black", "Green"],
      answer: "Black",
    },
    // Add more design questions as needed
  ],
  marketing: [
    {
      question: "What does SEO stand for?",
      options: ["Search Engine Optimization", "Social Engagement Operation", "Sales Engine Optimization", "Search Engine Operation"],
      answer: "Search Engine Optimization",
    },
    {
      question: "Which metric measures the percentage of visitors who complete a desired action?",
      options: ["Conversion Rate", "Bounce Rate", "Click-Through Rate", "Engagement Rate"],
      answer: "Conversion Rate",
    },
    // Add more marketing questions as needed
  ],
};

const TestInterface = ({ testType, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes per test

  const currentQuestions = questions[testType] || [];

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Time's up! Submitting your test.", { autoClose: 3000 });
      submitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setUserAnswers([...userAnswers, option]);
    setCurrentStep(currentStep + 1);
  };

  const submitTest = () => {
    // For demonstration, we'll just show a toast and close the test
    toast.success("Test submitted successfully!", { autoClose: 3000 });
    onClose();
    // Here, you can handle saving the test results to a server or state management
  };

  if (currentStep >= currentQuestions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <Card className="w-full max-w-md p-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Test Completed</CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Thank you for completing the {testType} test!</p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const currentQuestion = currentQuestions[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-lg p-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            {testType.charAt(0).toUpperCase() + testType.slice(1)} Test
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-gray-500" />
            <span className="text-gray-500">
              {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
            </span>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <progress
              className="w-full h-2 bg-gray-200 rounded"
              value={currentStep}
              max={currentQuestions.length}
            ></progress>
            <p className="text-sm text-gray-600 mt-1">
              Question {currentStep + 1} of {currentQuestions.length}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">{currentQuestion.question}</h2>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestInterface;
