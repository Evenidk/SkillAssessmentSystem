// components/CameraFeed.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as faceapi from '@vladmandic/face-api';

interface CameraFeedProps {
  onFaceDetectionViolation?: () => void;
  onMultipleFacesDetected?: () => void;
  isActive: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ 
  onFaceDetectionViolation,
  onMultipleFacesDetected,
  isActive 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const consecutiveNoFaceFrames = useRef(0);
  const consecutiveMultiFaceFrames = useRef(0);
  const animationFrameId = useRef<number>();
  const lastViolationTime = useRef<number>(0);
  
  // Constants
  const MAX_NO_FACE_FRAMES = 45; // Increased tolerance
  const MAX_MULTI_FACE_FRAMES = 30; // Multiple faces need to be detected consistently
  const VIOLATION_COOLDOWN = 5000; // 5 seconds between violations
  const CAMERA_WIDTH = 240;
  const CAMERA_HEIGHT = 240;

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: CAMERA_WIDTH,
            height: CAMERA_HEIGHT,
            facingMode: 'user',
            frameRate: { ideal: 30, max: 30 }
          } 
        });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error starting video:', error);
      toast.error('Unable to access camera');
    }
  };

  const handleViolation = (type: 'noFace' | 'multipleFaces') => {
    const currentTime = Date.now();
    if (currentTime - lastViolationTime.current < VIOLATION_COOLDOWN) {
      return; // Skip if within cooldown period
    }
    
    lastViolationTime.current = currentTime;
    
    if (type === 'noFace') {
      onFaceDetectionViolation?.();
      toast.warning('No face detected in camera view');
    } else {
      onMultipleFacesDetected?.();
      toast.warning('Multiple faces detected');
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        if (isActive) {
          await startCamera();
        }
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        toast.error('Failed to load face detection models');
      }
    };

    loadModels();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive]);

  const handleVideoPlay = () => {
    if (!videoRef.current || !canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const displaySize = { 
      width: CAMERA_WIDTH, 
      height: CAMERA_HEIGHT 
    };
    
    faceapi.matchDimensions(canvas, displaySize);

    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current || !isActive) return;

      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 160,
            scoreThreshold: 0.6 // Increased threshold for more accurate detection
          })
        );

        // Handle multiple faces
        if (detections.length > 1) {
          consecutiveMultiFaceFrames.current++;
          consecutiveNoFaceFrames.current = 0;
          
          if (consecutiveMultiFaceFrames.current >= MAX_MULTI_FACE_FRAMES) {
            handleViolation('multipleFaces');
            consecutiveMultiFaceFrames.current = 0;
          }
        }
        // Handle no face
        else if (detections.length === 0) {
          consecutiveNoFaceFrames.current++;
          consecutiveMultiFaceFrames.current = 0;
          
          if (consecutiveNoFaceFrames.current >= MAX_NO_FACE_FRAMES) {
            handleViolation('noFace');
            consecutiveNoFaceFrames.current = Math.floor(MAX_NO_FACE_FRAMES / 2); // Reset to half to maintain some memory
          }
        }
        // Handle single face (normal case)
        else {
          consecutiveNoFaceFrames.current = Math.max(0, consecutiveNoFaceFrames.current - 2); // Gradually reduce
          consecutiveMultiFaceFrames.current = 0;
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);

        if (isActive) {
          animationFrameId.current = requestAnimationFrame(detectFaces);
        }
      } catch (error) {
        console.error('Face detection error:', error);
        if (isActive) {
          animationFrameId.current = requestAnimationFrame(detectFaces);
        }
      }
    };

    detectFaces();
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden shadow-lg border-4 border-gray-600">
      {isModelLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-white text-sm">Loading camera...</div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onPlay={handleVideoPlay}
        className="absolute top-0 left-0 w-full h-full object-cover mirror"
        style={{ transform: 'scaleX(-1)' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
  );
};

export default CameraFeed;