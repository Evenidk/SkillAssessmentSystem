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

interface TestDetail {
  duration: string;
  equipment: string;
  sampleQuestions: string[];
  preparationTips: string[];
}

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
    equipment: 'Computer with design software (e.g., Figma, Adobe XD, or Sketch), stable internet connection',
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

type Tab = 'overview' | 'equipment' | 'sample' | 'tips' | 'proctoring';

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
  const details = testDetails[testType];
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (!details) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[700px] bg-white rounded-lg shadow-lg border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800">
            {capitalizeFirstLetter(testType)} Test Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Prepare yourself for the {capitalizeFirstLetter(testType)} assessment. Review the information below to understand what to expect and how to prepare.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="flex gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger value="overview" className="px-4 py-2 rounded-lg font-medium">Overview</TabsTrigger>
            <TabsTrigger value="equipment" className="px-4 py-2 rounded-lg font-medium">Equipment</TabsTrigger>
            <TabsTrigger value="sample" className="px-4 py-2 rounded-lg font-medium">Sample</TabsTrigger>
            <TabsTrigger value="tips" className="px-4 py-2 rounded-lg font-medium">Tips</TabsTrigger>
            <TabsTrigger value="proctoring" className="px-4 py-2 rounded-lg font-medium">Proctoring</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TabsContent value="overview" className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold text-gray-700">Duration:</span>
                    <Badge variant="secondary" className="px-2 py-1 text-sm">{details.duration}</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    This test is designed to assess your {testType} skills through a series of practical tasks and questions. Make sure you're in a quiet environment and have allocated enough time to complete the test without interruptions.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Laptop className="w-6 h-6 text-green-500" />
                    <span className="font-semibold text-gray-700">Required Equipment:</span>
                  </div>
                  <p className="text-sm text-gray-700">{details.equipment}</p>
                </div>
              </TabsContent>

              <TabsContent value="sample" className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <List className="w-6 h-6 text-purple-500" />
                    <span className="font-semibold text-gray-700">Sample Questions:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 pl-4">
                    {details.sampleQuestions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="tips" className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    <span className="font-semibold text-gray-700">Preparation Tips:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 pl-4">
                    {details.preparationTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="proctoring" className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6 text-red-500" />
                    <span className="font-semibold text-gray-700">AI Proctoring:</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    This test uses AI-powered proctoring to ensure fairness and integrity. The system will:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 pl-4">
                    <li>Verify your identity using facial recognition</li>
                    <li>Monitor your screen for unauthorized resources</li>
                    <li>Detect suspicious behavior or movements</li>
                    <li>Ensure you remain in view of the camera throughout the test</li>
                  </ul>
                  <p className="text-sm text-gray-700">
                    All proctoring data is encrypted and used solely for test integrity purposes. It will be deleted after the test review period.
                  </p>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} className="px-4 py-2 text-gray-700 border-gray-300">Close</Button>
          <Button onClick={() => alert('Starting test...')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestDetailsModal;