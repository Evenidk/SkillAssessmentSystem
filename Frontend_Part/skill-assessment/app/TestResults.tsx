"use client";
import React from "react";
import { ErrorBoundary } from 'react-error-boundary';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TestScore {
  testType: string;
  score: number;
  date: string;
}

interface TestResultsProps {
  testScores: TestScore[];
  selectedTestType: string;
  setSelectedTestType: (type: string) => void;
  isLoading: boolean;
  error: string | null;
  availableTests: Array<{ type: string; name: string }>;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateString);
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString;
  }
};

const ErrorFallback = () => (
  <div className="text-center py-4 text-destructive">
    An error occurred while displaying the test results.
  </div>
);

const TestResults: React.FC<TestResultsProps> = (props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TestResultsContent {...props} />
    </ErrorBoundary>
  );
};

const TestResultsContent: React.FC<TestResultsProps> = ({
  testScores,
  selectedTestType,
  setSelectedTestType,
  isLoading,
  error,
  availableTests,
}) => {
  const processedData = React.useMemo(() => {
    if (!testScores.length) return [];
    
    return testScores
      .filter((score) => !selectedTestType || score.testType === selectedTestType)
      .map((score) => ({
        ...score,
        score: score.score * 10,
        date: formatDate(score.date),
        originalDate: score.date
      }))
      .sort((a, b) => new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime());
  }, [testScores, selectedTestType]);

  const renderTestScoresGraph = () => {
    if (isLoading) {
      return <div className="text-center py-4 text-muted-foreground">Loading test scores...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-destructive">{error}</div>;
    }

    if (!testScores.length) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No test scores available. Take a test to see your progress!
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={processedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="date" 
            stroke="currentColor"
            tick={{ fill: 'currentColor' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="currentColor"
            tick={{ fill: 'currentColor' }}
            label={{ 
              value: 'Score (%)', 
              angle: -90, 
              position: 'insideLeft',
              fill: 'currentColor'
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              color: 'hsl(var(--foreground))'
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            name="Score"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderStatistics = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardDescription className="animate-pulse bg-muted h-4 w-24" />
                <CardTitle className="animate-pulse bg-muted h-6 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
      );
    }

    if (error) return null;

    const filteredScores = testScores
      .filter((score) => score.testType === selectedTestType)
      .map((score) => score.score * 10);

    if (!filteredScores.length) return null;

    const average = filteredScores.reduce((a, b) => a + b, 0) / filteredScores.length;
    const highest = Math.max(...filteredScores);
    const latest = filteredScores[filteredScores.length - 1];
    const totalAttempts = filteredScores.length;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Average Score</CardDescription>
              <CardTitle>{average.toFixed(1)}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Highest Score</CardDescription>
              <CardTitle>{highest}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Latest Score</CardDescription>
              <CardTitle>{latest}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Attempts</CardDescription>
              <CardTitle>{totalAttempts}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
        <CardDescription>
          Track your progress over time for each test type
        </CardDescription>
        {testScores.length > 0 && (
          <div className="mt-4">
            <Select
              value={selectedTestType}
              onValueChange={setSelectedTestType}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="All Test Types" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  new Set(testScores.map(score => score.testType))
                ).map(type => {
                  const testInfo = availableTests.find(test => test.type === type);
                  return (
                    <SelectItem key={type} value={type}>
                      {testInfo?.name || type}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        {renderTestScoresGraph()}
      </CardContent>
      {testScores.length > 0 && selectedTestType && (
        <CardFooter className="border-t">
          {renderStatistics()}
        </CardFooter>
      )}
    </Card>
  );
};

export default TestResults;