// components/AvailableTests.tsx
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Test {
  type: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface AvailableTestsProps {
  availableTests: Test[];
  startTest: (testType: string) => void;
  openTestDetails: (testType: string) => void;
}

const AvailableTests: React.FC<AvailableTestsProps> = ({
  availableTests,
  startTest,
  openTestDetails,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {availableTests.map((test) => (
        <Card
          key={test.type}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg transform hover:scale-[1.02]"
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-white dark:text-white">{test.icon}</span>
              <span className="text-white dark:text-white">{test.name} Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 dark:text-white/90">{test.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              onClick={() => startTest(test.type)}
              variant="secondary"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm transition-colors"
            >
              Start Test
            </Button>
            <Button
              variant="outline"
              onClick={() => openTestDetails(test.type)}
              className="w-full sm:w-auto bg-white hover:bg-white/90 text-indigo-600 dark:text-indigo-500 border-transparent hover:border-transparent transition-colors"
            >
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AvailableTests;