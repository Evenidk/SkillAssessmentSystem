// scripts/test-models.ts
import { verifyModelFiles } from '../utils/verifyModels';

async function testModels() {
  console.log('Testing model file accessibility...');
  const result = await verifyModelFiles();
  
  if (result) {
    console.log('✅ All model files are accessible');
  } else {
    console.error('❌ Some model files are not accessible');
  }
}

testModels();