"use client";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assessment categories data
const assessmentCategories = [
  {
    name: "Frontend Development",
    tests: [
      { 
        name: "HTML", 
        icon: "/icons/html.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your HTML5 knowledge including semantic elements, forms, and modern features."
      },
      { 
        name: "CSS", 
        icon: "/icons/css.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Evaluate your CSS skills including flexbox, grid, and animations."
      },
      { 
        name: "JavaScript", 
        icon: "/icons/javascript.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Comprehensive JavaScript assessment covering ES6+ features and core concepts."
      },
      { 
        name: "React", 
        icon: "/icons/react.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your React knowledge including hooks, state management, and best practices."
      },
    ]
  },
  {
    name: "Backend Development",
    tests: [
      { 
        name: "Node.js", 
        icon: "/icons/nodejs.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Assess your Node.js skills including async programming and server concepts."
      },
      { 
        name: "Express.js", 
        icon: "/icons/express.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your Express.js knowledge including routing, middleware, and API design."
      },
      { 
        name: "MongoDB", 
        icon: "/icons/mongodb.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Evaluate your MongoDB skills including CRUD operations and aggregation."
      },
      { 
        name: "SQL", 
        icon: "/icons/sql.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Comprehensive SQL assessment covering queries, joins, and database design."
      },
    ]
  },
  {
    name: "Programming Languages",
    tests: [
      { 
        name: "Python", 
        icon: "/icons/python.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your Python programming skills including OOP and standard library."
      },
      { 
        name: "Java", 
        icon: "/icons/java.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Java programming assessment covering core concepts and advanced features."
      },
      { 
        name: "C++", 
        icon: "/icons/cpp.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Evaluate your C++ knowledge including STL and memory management."
      },
      { 
        name: "C#", 
        icon: "/icons/csharp.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your C# programming skills including .NET framework concepts."
      },
    ]
  },
  {
    name: "Specialized Skills",
    tests: [
      { 
        name: "Machine Learning", 
        icon: "/icons/ml.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Comprehensive assessment of machine learning concepts and algorithms."
      },
      { 
        name: "Data Science", 
        icon: "/icons/data-science.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your data science skills including statistics and data analysis."
      },
      { 
        name: "Web Servers", 
        icon: "/icons/web-servers.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Evaluate your knowledge of web servers and deployment concepts."
      },
      { 
        name: "Aptitude", 
        icon: "/icons/aptitude.svg",
        duration: "10 minutes",
        questions: 10,
        description: "Test your logical reasoning and problem-solving abilities."
      },
    ]
  }
];

// Test Card Component
const TestCard = ({ test, index }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="bg-card p-4 rounded-lg shadow-md border hover:border-primary cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10">
              <img
                src={test.icon}
                alt={`${test.name} icon`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-medium">{test.name}</span>
          </div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">{test.name} Assessment</h4>
          <p className="text-sm text-muted-foreground">
            {test.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>⏱️ {test.duration}</span>
            <span>📝 {test.questions} questions</span>
          </div>
          <Button className="w-full" size="sm">
            Start Assessment
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsVideoVisible(true), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Welcome to SkillProve AI
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  Your AI-powered skill assessment platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Get started by taking a test or reviewing your past results. Use
                this dashboard to track your skills and plan your next steps.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={scrollToVideo}
                  className="bg-primary text-white hover:bg-primary/90 transition-all duration-300"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Assessment Categories Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="my-12"
      >
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Available Skill Assessments
        </h2>
        
        <div className="space-y-12">
          {assessmentCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-primary/80">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.tests.map((test, index) => (
                  <TestCard key={test.name} test={test} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Section */}
      <AnimatePresence>
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isVideoVisible ? { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15
            }
          } : {}}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">
                How to Get Maximum Benefit from Our Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="aspect-video rounded-lg overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={isVideoVisible ? { 
                  scale: 1,
                  transition: {
                    delay: 0.2,
                    duration: 0.5
                  }
                } : {}}
              >
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/path-to-your-thumbnail.jpg"
                >
                  <source src="/path-to-your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;