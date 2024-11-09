// utils/verifyModels.ts
export const verifyModelFiles = async () => {
    const modelFiles = [
      '/models/tiny_face_detector_model-weights_manifest.json',
      '/models/tiny_face_detector_model-shard1',
      '/models/face_landmark_68_model-weights_manifest.json',
      '/models/face_landmark_68_model-shard1',
      '/models/face_recognition_model-weights_manifest.json',
      '/models/face_recognition_model-shard1'
    ];
  
    try {
      const results = await Promise.all(
        modelFiles.map(async (file) => {
          const response = await fetch(file);
          return {
            file,
            status: response.status,
            ok: response.ok
          };
        })
      );
  
      const failedFiles = results.filter(r => !r.ok);
      if (failedFiles.length > 0) {
        console.error('Failed to load some model files:', failedFiles);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error('Error verifying model files:', error);
      return false;
    }
  };