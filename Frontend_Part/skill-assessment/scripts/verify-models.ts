// scripts/verify-models.ts
import fs from 'fs';
import path from 'path';

const MODEL_DIR = path.join(process.cwd(), 'public', 'models');

const requiredModels = [
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-weights_manifest.json'
];

function verifyModels() {
  console.log('Checking models in:', MODEL_DIR);
  
  if (!fs.existsSync(MODEL_DIR)) {
    console.error('Models directory does not exist!');
    return false;
  }

  const missingModels = requiredModels.filter(model => 
    !fs.existsSync(path.join(MODEL_DIR, model))
  );

  if (missingModels.length > 0) {
    console.error('Missing model files:', missingModels);
    return false;
  }

  console.log('All model files present!');
  return true;
}

verifyModels();