// components/CameraFeed.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as faceapi from '@vladmandic/face-api';

interface CameraFeedProps {
  onFaceDetectionViolation?: () => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onFaceDetectionViolation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const consecutiveNoFaceFrames = useRef(0);
  const MAX_NO_FACE_FRAMES = 30;

  // Define smaller dimensions
  const CAMERA_WIDTH = 240;  // Half of the original size
  const CAMERA_HEIGHT = 240; // Half of the original size

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        startVideo();
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        toast.error('Failed to load face detection models');
      }
    };

    const startVideo = async () => {
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
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error starting video:', error);
        toast.error('Unable to access camera');
      }
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleVideoPlay = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const displaySize = { 
      width: CAMERA_WIDTH, 
      height: CAMERA_HEIGHT 
    };
    
    faceapi.matchDimensions(canvas, displaySize);

    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 160, // Reduced for better performance
            scoreThreshold: 0.5
          })
        );

        if (detections.length === 0) {
          consecutiveNoFaceFrames.current++;
          if (consecutiveNoFaceFrames.current >= MAX_NO_FACE_FRAMES) {
            onFaceDetectionViolation?.();
            consecutiveNoFaceFrames.current = 0;
          }
        } else {
          consecutiveNoFaceFrames.current = 0;
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);

        requestAnimationFrame(detectFaces);
      } catch (error) {
        console.error('Face detection error:', error);
        requestAnimationFrame(detectFaces);
      }
    };

    detectFaces();
  };

  return (
    <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden shadow-lg border-4 border-white-600">
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