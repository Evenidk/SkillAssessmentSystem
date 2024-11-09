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

const AvailableTests: React.FC<AvailableTestsProps> = ({ availableTests, startTest, openTestDetails }) => {
  return (
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
  );
};

export default AvailableTests;
