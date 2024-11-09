// utils/downloadModels.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const MODEL_DIR = path.join(process.cwd(), 'public', 'models');

const modelFiles = [
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-weights_manifest.json'
];

async function downloadModels() {
  if (!fs.existsSync(MODEL_DIR)) {
    fs.mkdirSync(MODEL_DIR, { recursive: true });
  }

  for (const file of modelFiles) {
    const url = BASE_URL + file;
    const filePath = path.join(MODEL_DIR, file);
    
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, response.data);
      console.log(`Downloaded: ${file}`);
    } catch (error) {
      console.error(`Error downloading ${file}:`, error);
    }
  }
}

downloadModels();