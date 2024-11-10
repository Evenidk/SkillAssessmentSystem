// components/ProctoredTestComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Timer, Flag } from "lucide-react";
import { toast } from "react-toastify";
import { questionSets } from "@/app/questions";
import { addTestScore } from "@/lib/api";
import { useAuth } from "@/app/context/authContext";
import SecurityMonitor from "./SecurityMonitor";
import CameraFeed from "./CameraFeed";
import { ViolationManager } from './ViolationManager';

interface ProctoredTestComponentProps {
  testType: string;
  onClose: () => void;
}

interface QuestionStatus {
  answered: boolean;
  flagged: boolean;
}

interface Violations {
  multipleFaces: number;
  tabSwitch: number;
  screenRecording: number;
}

const ProctoredTestComponent: React.FC<ProctoredTestComponentProps> = ({
  testType,
  onClose,
}) => {
  const { token } = useAuth();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState<number | null>(null);
  const [section, setSection] = useState("section1");
  const [isSaving, setIsSaving] = useState(false);
  const [cameraViolations, setCameraViolations] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState<{
    [key: number]: QuestionStatus;
  }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [violations, setViolations] = useState<Violations>({
    multipleFaces: 0,
    tabSwitch: 0,
    screenRecording: 0,
  });

  const warningLimit = 5;
  const maxCameraViolations = 5;
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

  const getQuestionNumber = (sectionName: string, index: number) => {
    return sectionName === "section2" ? index + 5 : index;
  };

  const handleQuestionJump = (sectionName: string, index: number) => {
    if (selectedOption) {
      const questionNumber = getQuestionNumber(section, currentStep);
      const updatedAnswers = [...userAnswers];
      updatedAnswers[questionNumber] = selectedOption;
      setUserAnswers(updatedAnswers);
    }
    setSection(sectionName);
    setCurrentStep(index);
    const targetQuestionNumber = getQuestionNumber(sectionName, index);
    setSelectedOption(userAnswers[targetQuestionNumber] || null);
  };

  const toggleFlagQuestion = (questionNumber: number) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionNumber)
        ? prev.filter((q) => q !== questionNumber)
        : [...prev, questionNumber]
    );
  };

  const isQuestionAnswered = (sectionName: string, index: number) => {
    const questionNumber = getQuestionNumber(sectionName, index);
    return userAnswers[questionNumber] !== undefined;
  };

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
    setCameraViolations((prev) => {
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

  const handleFaceDetectionViolation = () => {
    handleCameraViolation();
  };

  const handleMultipleFaces = () => {
    setViolations(prev => {
      const newCount = prev.multipleFaces + 1;
      if (newCount >= warningLimit) {
        toast.error("Multiple faces detected too many times. Test will be submitted.");
        submitTest();
      } else {
        toast.warning(`Multiple faces detected! Warning ${newCount}/${warningLimit}`);
      }
      return { ...prev, multipleFaces: newCount };
    });
  };

  const handleAnswer = () => {
    if (selectedOption) {
      const questionNumber = getQuestionNumber(section, currentStep);
      const updatedAnswers = [...userAnswers];
      updatedAnswers[questionNumber] = selectedOption;
      setUserAnswers(updatedAnswers);
      setSelectedOption(null);

      if (section === "section1" && currentStep + 1 === 5) {
        setSection("section2");
        setCurrentStep(0);
      } else if (
        section === "section2" &&
        currentStep + 1 >= questions.length
      ) {
        submitTest();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      toast.warning("Please select an option before proceeding.");
    }
  };

  const handleAutoSubmit = async () => {
    toast.error("Maximum violations reached. Test is being submitted.");
    await submitTest();
  };

  const submitTest = async () => {
    setIsSaving(true);
    setIsCameraActive(false);
    
    const allQuestions = [...questionSets[testType].section1, ...questionSets[testType].section2];
    const correctAnswers = allQuestions.filter(
      (q, index) => q.answer === userAnswers[index]
    ).length;
  
    setScore(correctAnswers);
  
    try {
      await addTestScore(token, { 
        testType, 
        score: correctAnswers,
        violations: {
          camera: cameraViolations,
          multipleFaces: violations.multipleFaces,
          tabSwitch: violations.tabSwitch,
          screenRecording: violations.screenRecording,
        },
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
                <div className="mb-4 text-sm text-gray-600">
                  <p>Violations Summary:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Camera Violations: {cameraViolations}</li>
                    <li>Multiple Faces: {violations.multipleFaces}</li>
                    <li>Tab Switches: {violations.tabSwitch}</li>
                    <li>Screen Recording Attempts: {violations.screenRecording}</li>
                  </ul>
                </div>
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
              Please enable fullscreen mode and allow camera access to continue
              with the test. You will receive a warning if you exit fullscreen
              mode or if your face is not visible.
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

  // Main test interface
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

      <ViolationManager
        onMaxViolationsReached={handleAutoSubmit}
      />

      {/* Camera Feed */}
      <div className="fixed top-24 right-2 z-[56]">
        <CameraFeed 
          onFaceDetectionViolation={handleFaceDetectionViolation}
          onMultipleFacesDetected={handleMultipleFaces}
          isActive={isCameraActive}
        />
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
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
          </div>
          <Button
            onClick={submitTest}
            className="bg-[#FA7070] hover:bg-red-600 text-white border-none ml-auto"
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* Main Content Area with Navigation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-64 bg-white shadow-lg overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>

            {/* Section 1 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Section 1
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {questionSets[testType].section1.map((_, index) => {
                  const questionNumber = getQuestionNumber("section1", index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump("section1", index)}
                      className={`
                        p-2 rounded-lg text-sm font-medium relative
                        ${
                          section === "section1" && currentStep === index
                            ? "bg-blue-500 text-white"
                            : isQuestionAnswered("section1", index)
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                        ${
                          flaggedQuestions.includes(questionNumber)
                            ? "ring-2 ring-yellow-400"
                            : ""
                        }
                      `}
                    >
                      {index + 1}
                      {flaggedQuestions.includes(questionNumber) && (
                        <Flag className="h-3 w-3 absolute top-0 right-0 text-yellow-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Section 2
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {questionSets[testType].section2.map((_, index) => {
                  const questionNumber = getQuestionNumber("section2", index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump("section2", index)}
                      className={`
                        p-2 rounded-lg text-sm font-medium relative
                        ${
                          section === "section2" && currentStep === index
                            ? "bg-blue-500 text-white"
                            : isQuestionAnswered("section2", index)
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                        ${
                          flaggedQuestions.includes(questionNumber)
                            ? "ring-2 ring-yellow-400"
                            : ""
                        }
                      `}
                    >
                      {index + 6}
                      {flaggedQuestions.includes(questionNumber) && (
                        <Flag className="h-3 w-3 absolute top-0 right-0 text-yellow-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Answered</span>
                  <span className="font-medium">
                    {userAnswers.filter((a) => a !== undefined).length}/10
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Flagged</span>
                  <span className="font-medium">{flaggedQuestions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining Time</span>
                  <span className="font-medium text-blue-600">
                    {Math.floor(timeLeft / 60)}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 ml-3">
            <div className="mb-10">
              {/* Question Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Question {getQuestionNumber(section, currentStep) + 1}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    of{" "}
                    {questionSets[testType].section1.length +
                      questionSets[testType].section2.length}{" "}
                    questions
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    toggleFlagQuestion(getQuestionNumber(section, currentStep))
                  }
                  className={`flex items-center space-x-2 ${
                    flaggedQuestions.includes(
                      getQuestionNumber(section, currentStep)
                    )
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  <span>
                    {flaggedQuestions.includes(
                      getQuestionNumber(section, currentStep)
                    )
                      ? "Unflag"
                      : "Flag"}
                  </span>
                </Button>
              </div>

              {/* Question Text */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="text-xl text-gray-800 leading-relaxed">
                  {questions[currentStep]?.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {questions[currentStep]?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-6 justify-start text-left text-lg transition-all duration-200 ${
                      selectedOption === option
                        ? "border-2 border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]"
                        : "hover:border-gray-300 hover:bg-gray-50 hover:transform hover:scale-[1.01]"
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`
                        w-8 h-8 rounded-full mr-4 flex items-center justify-center
                        ${
                          selectedOption === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setSelectedOption(null)}
                className="px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <X className="h-5 w-5 mr-2" />
                Clear Selection
              </Button>
              <Button
                onClick={handleAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {section === "section2" && currentStep + 1 === questions.length
                  ? "Submit Test"
                  : "Next Question"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProctoredTestComponent;