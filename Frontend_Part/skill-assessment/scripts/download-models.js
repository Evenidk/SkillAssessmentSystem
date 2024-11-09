// scripts/download-models.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_URLS = {
  'tiny_face_detector_model-shard1': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/tiny_face_detector_model-shard1?raw=true',
  'tiny_face_detector_model-weights_manifest.json': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/tiny_face_detector_model-weights_manifest.json?raw=true',
  'face_landmark_68_model-shard1': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/face_landmark_68_model-shard1?raw=true',
  'face_landmark_68_model-weights_manifest.json': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/face_landmark_68_model-weights_manifest.json?raw=true',
  'face_recognition_model-shard1': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/face_recognition_model-shard1?raw=true',
  'face_recognition_model-weights_manifest.json': 'https://github.com/justadudewhohacks/face-api.js/blob/master/weights/face_recognition_model-weights_manifest.json?raw=true'
};

async function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, '../public/models', filename);
    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (redirectedResponse) => {
          redirectedResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Successfully downloaded ${filename}`);
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Successfully downloaded ${filename}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function downloadModels() {
  try {
    const modelDir = path.join(__dirname, '../public/models');
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir, { recursive: true });
    }

    for (const [filename, url] of Object.entries(MODEL_URLS)) {
      console.log(`Downloading ${filename}...`);
      await downloadFile(url, filename);
    }

    console.log('All models downloaded successfully!');
  } catch (error) {
    console.error('Error downloading models:', error);
    process.exit(1);
  }
}

downloadModels();