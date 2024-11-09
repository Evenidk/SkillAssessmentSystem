// components/CameraFeed.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs';

interface CameraFeedProps {
  onFaceDetectionViolation?: () => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onFaceDetectionViolation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        
        setIsModelLoading(true);
        const MODEL_URL = `${window.location.origin}/models`; // Ensures absolute URL based on your domain

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        setIsModelLoaded(true);
        setError('');
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Failed to load face detection models. Check console for details.');
        toast.error('Face detection model load error.');
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" }
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Failed to access camera.');
        toast.error('Camera access is required.');
      }
    };

    if (isModelLoaded) setupCamera();
  }, [isModelLoaded]);

  useEffect(() => {
    if (!isModelLoaded || !videoRef.current || !canvasRef.current) return;

    const detectFace = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: 0.5
      });

      try {
        const detections = await faceapi.detectAllFaces(videoRef.current, options);

        if (detections.length === 0) onFaceDetectionViolation?.();

        const canvas = canvasRef.current;
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        };

        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
      } catch (err) {
        console.error('Face detection error:', err);
        setError('Face detection error. Check console for details.');
        toast.error('Face detection error. Retry or refresh page.');
      }
    };

    const interval = setInterval(detectFace, 100);
    return () => clearInterval(interval);
  }, [isModelLoaded, onFaceDetectionViolation]);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {isModelLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-white">Loading face detection models...</div>
        </div>
      )}
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-[640px] h-[480px] object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default CameraFeed;
