"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  Camera, Code, PenTool, Megaphone, User, Settings, LogOut, 
  Moon, Sun, Info, Bell, CheckCircle, Timer, Menu, X as CloseIcon, Clock 
} from 'lucide-react';
import TestDetailsModal from "@/app/test_detail";
import TestInterface from "@/app/TestInterface";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define Available Tests
const availableTests = [
  {
    type: 'coding',
    name: 'Coding',
    icon: <Code className="mr-2 h-5 w-5 text-white" />,
    description: 'Assess your programming and algorithmic skills.',
  },
  {
    type: 'design',
    name: 'Design',
    icon: <PenTool className="mr-2 h-5 w-5 text-white" />,
    description: 'Evaluate your design thinking and creativity.',
  },
  {
    type: 'marketing',
    name: 'Marketing',
    icon: <Megaphone className="mr-2 h-5 w-5 text-white" />,
    description: 'Test your marketing strategies and communication skills.',
  },
  {
    type: 'communication',
    name: 'Communication',
    icon: <User className="mr-2 h-5 w-5 text-white" />,
    description: 'Evaluate your verbal and written communication skills.',
  },
  {
    type: 'problem-solving',
    name: 'Problem Solving',
    icon: <Settings className="mr-2 h-5 w-5 text-white" />,
    description: 'Assess your ability to solve complex problems efficiently.',
  },
  {
    type: 'leadership',
    name: 'Leadership',
    icon: <User className="mr-2 h-5 w-5 text-white" />,
    description: 'Evaluate your leadership and team management skills.',
  },
  {
    type: 'time-management',
    name: 'Time Management',
    icon: <Clock className="mr-2 h-5 w-5 text-white" />,
    description: 'Assess your ability to manage and prioritize tasks effectively.',
  },
  {
    type: 'creativity',
    name: 'Creativity',
    icon: <PenTool className="mr-2 h-5 w-5 text-white" />,
    description: 'Evaluate your creative thinking and innovation skills.',
  },
];

// Mock Data for Charts
const mockData = [
  { 
    name: 'John Doe', 
    coding: 85, 
    design: 70, 
    marketing: 60, 
    communication: 75, 
    problemSolving: 80, 
    leadership: 65, 
    timeManagement: 70, 
    creativity: 85 
  },
  { 
    name: 'Jane Smith', 
    coding: 75, 
    design: 90, 
    marketing: 80, 
    communication: 85, 
    problemSolving: 90, 
    leadership: 80, 
    timeManagement: 85, 
    creativity: 90 
  },
  { 
    name: 'Bob Johnson', 
    coding: 90, 
    design: 60, 
    marketing: 75, 
    communication: 70, 
    problemSolving: 80, 
    leadership: 70, 
    timeManagement: 75, 
    creativity: 80 
  },
];

const SkillAssessmentInterface = () => {
  const [activeTest, setActiveTest] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [testDetailsOpen, setTestDetailsOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    avatar: 'https://via.placeholder.com/150',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const startTest = (testType) => {
    setActiveTest(testType);
    toast.info(`Starting ${testType} test...`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(`Switched to ${!darkMode ? 'Dark' : 'Light'} Mode`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  };

  const openTestDetails = (testType) => {
    setSelectedTest(testType);
    setTestDetailsOpen(true);
    toast.info(`Viewing details for ${testType} test`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-indigo-100'}`}>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>SkillProve AI</span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button variant="ghost" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} relative`}>
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
              </Button>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                className="ml-4"
                aria-label="Toggle dark mode"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Switch>
            </div>
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <Button variant="ghost" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} md:hidden`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {availableTests.map((test) => (
                  <Button
                    key={test.type}
                    variant="ghost"
                    className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} w-full text-left flex items-center`}
                    onClick={() => {
                      startTest(test.type);
                      toggleMobileMenu();
                    }}
                  >
                    {test.icon}
                    {test.name} Test
                  </Button>
                ))}
                {/* Additional Mobile Menu Items if any */}
                <div className="flex items-center mt-2">
                  <Switch
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                    className="mr-2"
                    aria-label="Toggle dark mode"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Switch>
                  <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="dashboard" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md flex flex-wrap`}>
            <TabsTrigger value="dashboard" className="w-full sm:w-auto">Dashboard</TabsTrigger>
            <TabsTrigger value="tests" className="w-full sm:w-auto">Available Tests</TabsTrigger>
            <TabsTrigger value="results" className="w-full sm:w-auto">Test Results</TabsTrigger>
            <TabsTrigger value="profile" className="w-full sm:w-auto">Profile</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Dashboard Tab */}
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Welcome Card */}
                  <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Welcome to SkillProve AI</CardTitle>
                      <CardDescription>Your AI-powered skill assessment platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get started by taking a test or reviewing your past results.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Performance Chart */}
                  <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                    <CardHeader>
                      <CardTitle>Your Performance</CardTitle>
                      <CardDescription>Track your skill progression over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={mockData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Coding" dataKey="coding" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Radar name="Design" dataKey="design" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                          <Radar name="Marketing" dataKey="marketing" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                          <Radar name="Communication" dataKey="communication" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                          <Radar name="Problem Solving" dataKey="problemSolving" stroke="#387908" fill="#387908" fillOpacity={0.6} />
                          <Radar name="Leadership" dataKey="leadership" stroke="#a83232" fill="#a83232" fillOpacity={0.6} />
                          <Radar name="Time Management" dataKey="timeManagement" stroke="#32a852" fill="#32a852" fillOpacity={0.6} />
                          <Radar name="Creativity" dataKey="creativity" stroke="#3232a8" fill="#3232a8" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Available Tests Tab */}
              <TabsContent value="tests">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {availableTests.map((test) => (
                    <Card key={test.type} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {test.icon}
                          {test.name} Test
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white">
                          {test.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button onClick={() => startTest(test.type)} variant="default" className="flex items-center justify-center">
                          Start Test
                        </Button>
                        <Button variant="outline" onClick={() => openTestDetails(test.type)} className="flex items-center justify-center">
                          <Info className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Test Results Tab */}
              <TabsContent value="results">
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                  <CardHeader>
                    <CardTitle>Test Results</CardTitle>
                    <CardDescription>Review your past test performances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={mockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="coding" fill="#8884d8" />
                        <Bar dataKey="design" fill="#82ca9d" />
                        <Bar dataKey="marketing" fill="#ffc658" />
                        <Bar dataKey="communication" fill="#ff7300" />
                        <Bar dataKey="problemSolving" fill="#387908" />
                        <Bar dataKey="leadership" fill="#a83232" />
                        <Bar dataKey="timeManagement" fill="#32a852" />
                        <Bar dataKey="creativity" fill="#3232a8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Manage your personal information and settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                      <img src={userProfile.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-primary" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{userProfile.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{userProfile.email}</p>
                        <p className="text-gray-600 dark:text-gray-400">{userProfile.role}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <Input 
                          value={userProfile.name} 
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })} 
                          className="mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input 
                          value={userProfile.email} 
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })} 
                          className="mt-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <Input 
                          value={userProfile.role} 
                          onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })} 
                          className="mt-1 w-full"
                        />
                      </div>
                      <Button onClick={() => toast.success('Profile Updated!', { autoClose: 2000 })} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* Test Start Modal */}
      <AnimatePresence>
        {activeTest && (
          <TestInterface
            testType={activeTest}
            onClose={() => setActiveTest(null)}
          />
        )}
      </AnimatePresence>

      {/* Test Details Modal */}
      <TestDetailsModal
        isOpen={testDetailsOpen}
        onClose={() => setTestDetailsOpen(false)}
        testType={selectedTest}
      />
    </div>
  );
};

export default SkillAssessmentInterface;
