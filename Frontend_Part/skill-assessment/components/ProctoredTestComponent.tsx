"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Timer } from "lucide-react";
import { toast } from "react-toastify";
import { questionSets } from "../app/questions";
import { addTestScore } from '@/lib/api';  // Add this import
import { useAuth } from '@/app/context/authContext';

const ProctoredTestComponent = ({ testType, onClose }) => {
  const { token } = useAuth(); // Add this line
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(null);
  const [section, setSection] = useState("section1");
  const [questionStatus, setQuestionStatus] = useState(Array(10).fill("default"));
  const [isSaving, setIsSaving] = useState(false); // Add this line
  const videoRef = useRef(null);

  const questions = questionSets[testType]?.[section] || [];

  useEffect(() => {
    const requestCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCameraAccess(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast.error("Camera access is required to start the test.");
        onClose();
      }
    };

    requestCameraAccess();
    return () => {
      stopCamera();
      exitFullScreen();
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Time's up! Submitting your test.");
      submitTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => {
          console.error("Failed to enter fullscreen:", err);
          toast.error("Fullscreen is required for the test.");
        });
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

  const handleAnswer = () => {
    if (selectedOption) {
      const updatedAnswers = [...userAnswers, selectedOption];
      setUserAnswers(updatedAnswers);

      const updatedStatus = [...questionStatus];
      updatedStatus[currentStep] = "answered";
      setQuestionStatus(updatedStatus);

      setSelectedOption(null);

      if (section === "section1" && currentStep + 1 === 5) {
        setSection("section2");
        setCurrentStep(0);
      } else if (section === "section2" && currentStep + 1 >= questions.length) {
        submitTest();
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      toast.warning("Please select an option before proceeding.");
    }
  };

  const handleRevisitLater = () => {
    const updatedStatus = [...questionStatus];
    updatedStatus[currentStep] = "revisit";
    setQuestionStatus(updatedStatus);
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
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
        testType: testType,
        score: correctAnswers
      });
      toast.success("Test score saved successfully!");
    } catch (error) {
      console.error("Failed to save test score:", error);
      toast.error("Failed to save test score");
    } finally {
      setIsSaving(false);
      exitFullScreen();
      stopCamera();
    }
  };

  const handleFinishTest = async () => {
    await submitTest();
  };

  const handleClose = () => {
    onClose();
    stopCamera();
    exitFullScreen();
  };

  if (score !== null) {
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
            <Button variant="ghost" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {isSaving ? (
              <p className="text-center">Saving your score...</p>
            ) : (
              <>
                <p className="mb-4">You scored {score} out of 10</p>
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

  if (!isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <Card className="w-full max-w-md p-6 text-center">
          <CardHeader>
            <CardTitle>Please Enable Fullscreen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600">
              To proceed with the test, please enable fullscreen mode for an immersive experience.
            </p>
            <Button onClick={enterFullScreen} className="text-white bg-blue-600 hover:bg-blue-700">
              Enable Fullscreen
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white">
        {hasCameraAccess && (
          <video
            ref={videoRef}
            autoPlay
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
      </div>

      <div className="fixed top-0 left-0 w-full bg-[#6482AD] text-white px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <span className="text-xl md:text-2xl font-bold">SkillProveAI</span>
          <div className="text-sm md:text-base">
            <div className="font-semibold">UserName</div>
            <div>Test Name: {testType.charAt(0).toUpperCase() + testType.slice(1)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-white" />
            <span className="text-sm md:text-base">
              {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
            </span>
          </div>
          <Button
            className="bg-[#FA7070] text-white px-4 py-1 rounded-md"
            onClick={handleFinishTest} 
          >
            Finish Test
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-16 md:mt-24">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">
            Question {currentStep + 1} of {questions.length}
          </h2>
          <Button variant="link" className="text-blue-600" onClick={handleRevisitLater}>Revisit Later</Button>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-4 mb-4 md:mb-0 md:mr-8 shadow-sm">
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded-md text-sm border-gray-300"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="section1">Section 1</option>
                <option value="section2">Section 2</option>
              </select>
            </div>
            <div className="mb-4">
              <span className="text-gray-600">Question Navigation</span>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full ${
                      index === currentStep ? "bg-blue-600 text-white" : questionStatus[index] === "answered"
                        ? "bg-green-600 text-white" : questionStatus[index] === "revisit"
                        ? "bg-purple-600 text-white" : questionStatus[index] === "unanswered"
                        ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-grow bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="text-xl font-medium mb-4">{currentQuestion.question}</div>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-4 border rounded-lg text-left ${
                    selectedOption === option ? "border-blue-600 bg-blue-50" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="ghost" className="text-blue-600" onClick={() => setSelectedOption(null)}>Clear Response</Button>
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-md" onClick={handleAnswer}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProctoredTestComponent;
