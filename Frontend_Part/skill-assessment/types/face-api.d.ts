// types/face-api.d.ts
declare module 'face-api.js' {
    interface IFaceDetection {}
    interface IFaceLandmarks {}
    interface WithFaceLandmarks<TSource> {}
    
    export const nets: {
      tinyFaceDetector: any;
      faceLandmark68Net: any;
      faceRecognitionNet: any;
    };
  
    export namespace draw {
      function drawDetections(canvas: any, detections: any): void;
      function drawFaceLandmarks(canvas: any, detections: any): void;
    }
  
    export function detectAllFaces(
      input: HTMLVideoElement | HTMLImageElement,
      options?: any
    ): {
      withFaceLandmarks(): Promise<WithFaceLandmarks<{ detection: IFaceDetection }>[]>;
    };
  
    export function matchDimensions(
      canvas: HTMLCanvasElement,
      dimensions: { width: number; height: number }
    ): void;
  
    export function resizeResults(
      detections: WithFaceLandmarks<{ detection: IFaceDetection }>[],
      dimensions: { width: number; height: number }
    ): WithFaceLandmarks<{ detection: IFaceDetection }>[];
  
    export class TinyFaceDetectorOptions {
      constructor(options?: { inputSize?: number; scoreThreshold?: number });
    }
  }