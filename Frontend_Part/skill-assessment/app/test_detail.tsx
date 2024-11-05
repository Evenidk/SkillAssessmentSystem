"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Laptop, List, Lightbulb, Camera } from 'lucide-react';

// Define the structure for each test type's details
interface TestDetail {
  duration: string;
  equipment: string;
  sampleQuestions: string[];
  preparationTips: string[];
}

// Define all available test details
const testDetails: Record<string, TestDetail> = {
  coding: {
    duration: '90 minutes',
    equipment: 'Computer with a modern web browser, stable internet connection',
    sampleQuestions: [
      'Implement a function to reverse a linked list',
      'Write a program to find the longest palindromic substring',
      'Design a class for a basic calculator with add, subtract, multiply, and divide operations',
    ],
    preparationTips: [
      'Review fundamental data structures and algorithms',
      'Practice coding problems on platforms like LeetCode or HackerRank',
      'Familiarize yourself with time and space complexity analysis',
    ],
  },
  design: {
    duration: '120 minutes',
    equipment:
      'Computer with design software (e.g., Figma, Adobe XD, or Sketch), stable internet connection',
    sampleQuestions: [
      'Create a mobile app interface for a fitness tracking application',
      'Design a landing page for a new eco-friendly product',
      'Develop a brand identity for a fictional tech startup',
    ],
    preparationTips: [
      'Study current design trends and best practices',
      'Practice creating wireframes and prototypes',
      'Familiarize yourself with design principles like color theory and typography',
    ],
  },
  marketing: {
    duration: '60 minutes',
    equipment: 'Computer with a modern web browser, stable internet connection',
    sampleQuestions: [
      'Develop a social media strategy for a new product launch',
      'Create a content marketing plan for a B2B SaaS company',
      'Analyze and propose improvements for a given email marketing campaign',
    ],
    preparationTips: [
      'Stay updated on current digital marketing trends',
      'Practice creating marketing plans and strategies',
      'Familiarize yourself with various marketing analytics tools and metrics',
    ],
  },
};

// Define the possible tab values
type Tab = 'overview' | 'equipment' | 'sample' | 'tips' | 'proctoring';

// Define the props for the TestDetailsModal component
interface TestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testType: keyof typeof testDetails;
}

const TestDetailsModal: React.FC<TestDetailsModalProps> = ({
  isOpen,
  onClose,
  testType
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Access the details based on the testType
  const details = testDetails[testType];

  // Define animation variants for the tabs
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Runtime check to ensure details are defined
  if (!details) {
    console.error(`Invalid testType provided: ${testType}`);
    return null; // Or render a fallback UI
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {capitalizeFirstLetter(testType)} Test Details
          </DialogTitle>
          <DialogDescription>
            Prepare yourself for the {capitalizeFirstLetter(testType)} assessment. Review the information below to understand what to expect and how to prepare.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-5 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="sample">Sample</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold">Duration:</span>
                    <Badge variant="secondary">{details.duration}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This test is designed to assess your {testType} skills through a series of practical tasks and questions.
                    Make sure you're in a quiet environment and have allocated enough time to complete the test without interruptions.
                  </p>
                </div>
              </TabsContent>

              {/* Equipment Tab Content */}
              <TabsContent value="equipment" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Laptop className="w-6 h-6 text-green-500" />
                    <span className="font-semibold">Required Equipment:</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {details.equipment}
                  </p>
                </div>
              </TabsContent>

              {/* Sample Questions Tab Content */}
              <TabsContent value="sample" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <List className="w-6 h-6 text-purple-500" />
                    <span className="font-semibold">Sample Questions:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    {details.sampleQuestions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* Preparation Tips Tab Content */}
              <TabsContent value="tips" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    <span className="font-semibold">Preparation Tips:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    {details.preparationTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* Proctoring Tab Content */}
              <TabsContent value="proctoring" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-6 h-6 text-red-500" />
                    <span className="font-semibold">AI Proctoring:</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This test uses AI-powered proctoring to ensure fairness and integrity. The system will:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Verify your identity using facial recognition</li>
                    <li>Monitor your screen for unauthorized resources</li>
                    <li>Detect suspicious behavior or movements</li>
                    <li>Ensure you remain in view of the camera throughout the test</li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All proctoring data is encrypted and used solely for test integrity purposes. It will be deleted after the test review period.
                  </p>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button
            onClick={() => {
              onClose();
              alert('Starting test...');
            }}
          >
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestDetailsModal;
