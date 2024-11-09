// components/SecurityMonitor.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SecurityMonitorProps {
  onMaxWarningsReached: () => void;
  warningLimit: number;
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({
  onMaxWarningsReached,
  warningLimit,
}) => {
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= warningLimit) {
            onMaxWarningsReached();
          } else {
            setShowWarning(true);
            toast.error(`Warning ${newCount}/${warningLimit}: Please maintain fullscreen mode.`);
          }
          return newCount;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, [warningLimit, onMaxWarningsReached]);

  const handleEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setShowWarning(false);
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
      toast.error("Failed to enter fullscreen mode.");
    }
  };

  if (!showWarning) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-red-600">Security Warning!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Warning {warningCount} of {warningLimit}: You have exited fullscreen mode.
            Your test will be automatically submitted after {warningLimit} warnings.
          </p>
          <Button 
            onClick={handleEnterFullscreen}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Return to Fullscreen
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SecurityMonitor;