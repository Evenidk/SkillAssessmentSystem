// components/ProctoredTestComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Timer } from "lucide-react";
import { toast } from "react-toastify";
import { questionSets } from "@/app/questions";
import { addTestScore } from '@/lib/api';
import { useAuth } from '@/app/context/authContext';
import SecurityMonitor from "./SecurityMonitor";
import CameraFeed from "./CameraFeed";

interface ProctoredTestComponentProps {
  testType: string;
  onClose: () => void;
}

const ProctoredTestComponent: React.FC<ProctoredTestComponentProps> = ({ 
  testType, 
  onClose 
}) => {
  const { token } = useAuth();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState<number | null>(null);
  const [section, setSection] = useState("section1");
  const [isSaving, setIsSaving] = useState(false);
  const [cameraViolations, setCameraViolations] = useState(0);

  const warningLimit = 5;
  const maxCameraViolations = 3;
  const questions = questionSets[testType]?.[section] || [];

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Time's up! Submitting your test.");
      submitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const enterFullScreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      toast.error("Fullscreen is required for the test.");
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen:", err);
      });
    }
    setIsFullScreen(false);
  };

  const handleCameraViolation = () => {
    setCameraViolations(prev => {
      const newCount = prev + 1;
      if (newCount >= maxCameraViolations) {
        toast.error("Too many camera violations. Test will be submitted.");
        submitTest();
      } else {
        toast.warning(`Camera violation ${newCount}/${maxCameraViolations}`);
      }
      return newCount;
    });
  };

  const handleAnswer = () => {
    if (selectedOption) {
      const updatedAnswers = [...userAnswers, selectedOption];
      setUserAnswers(updatedAnswers);
      setSelectedOption(null);

      if (section === "section1" && currentStep + 1 === 5) {
        setSection("section2");
        setCurrentStep(0);
      } else if (section === "section2" && currentStep + 1 >= questions.length) {
        submitTest();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      toast.warning("Please select an option before proceeding.");
    }
  };

  const submitTest = async () => {
    setIsSaving(true);
    const allQuestions = [...questionSets[testType].section1, ...questionSets[testType].section2];
    const correctAnswers = allQuestions.filter(
      (q, index) => q.answer === userAnswers[index]
    ).length;

    setScore(correctAnswers);

    try {
      await addTestScore(token, { 
        testType, 
        score: correctAnswers,
        cameraViolations,
      });
      toast.success("Test submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit test");
    } finally {
      setIsSaving(false);
      exitFullScreen();
    }
  };

  const handleClose = () => {
    exitFullScreen();
    onClose();
  };

  const handleAutoSubmit = async () => {
    toast.error("Maximum warnings reached. Test is being submitted.");
    await submitTest();
  };

  // Score display screen
  if (score !== null) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      >
        <Card className="w-full max-w-md p-6">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Test Completed</CardTitle>
            <Button variant="ghost" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {isSaving ? (
              <p className="text-center">Saving your score...</p>
            ) : (
              <>
                <p className="mb-4 text-lg">Your Score: {score} out of 10</p>
                <p className="mb-4 text-sm text-gray-600">
                  Camera Violations: {cameraViolations}
                </p>
                <Button onClick={handleClose} className="w-full">
                  Close
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Fullscreen prompt
  if (!isFullScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]"
      >
        <Card className="w-full max-w-md p-6 text-center">
          <CardHeader>
            <CardTitle>Enable Fullscreen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600">
              Please enable fullscreen mode and allow camera access to continue with the test.
              You will receive a warning if you exit fullscreen mode or if your face is not visible.
            </p>
            <Button 
              onClick={enterFullScreen}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Enter Fullscreen
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Main test interface (shown when in fullscreen)
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-white z-[55] flex flex-col"
    >
      <SecurityMonitor
        onMaxWarningsReached={handleAutoSubmit}
        warningLimit={warningLimit}
      />

      {/* Camera Feed */}
      <div className="fixed top-4 right-4 z-[56]">
        <CameraFeed onFaceDetectionViolation={handleCameraViolation} />
      </div>

      {/* Header */}
      <div className="bg-[#6482AD] text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-xl font-bold">Test: {testType}</h1>
              <p className="text-sm opacity-90">Section: {section}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5" />
              <span className="text-lg font-medium">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Button 
            onClick={submitTest}
            className="bg-[#FA7070] hover:bg-red-600 text-white border-none mr-[340px]"
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Question {currentStep + 1} of {questions.length}
              </h2>
              <span className="text-sm text-gray-500">
                Progress: {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            <p className="text-lg mb-8">{questions[currentStep]?.question}</p>
            
            <div className="space-y-4">
              {questions[currentStep]?.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-6 justify-start text-left text-lg ${
                    selectedOption === option 
                      ? 'border-2 border-blue-500 bg-blue-50' 
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <span className="mr-4">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={() => setSelectedOption(null)}
              className="px-6"
            >
              Clear Selection
            </Button>
            <Button
              onClick={handleAnswer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              {section === "section2" && currentStep + 1 === questions.length 
                ? "Submit Test" 
                : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProctoredTestComponent;