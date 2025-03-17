#!/usr/bin/env node

/**
 * Script to convert a Keras .h5 model to TensorFlow.js format
 * 
 * Prerequisites:
 * - TensorFlow.js: npm install @tensorflow/tfjs-node
 * - TensorFlow.js Converter: pip install tensorflowjs
 * 
 * Usage:
 * 1. Make sure you have the required packages installed
 * 2. Run: node convert_model.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');

// Configure these paths - adjust as needed
const inputModelPath = path.resolve(projectRoot, 'public/models/dog_breed_model/mobilnetV2-1000-images.h5');
const outputModelDir = path.resolve(projectRoot, 'public/models/dog_breed_model/tfjs');
const modelFormat = 'keras'; // or 'tf_saved_model' if using SavedModel format

console.log('======================================');
console.log('   TensorFlow.js Model Converter     ');
console.log('======================================');
console.log('Project root:', projectRoot);
console.log('Input model:', inputModelPath);
console.log('Output directory:', outputModelDir);

// Check if the input file exists
if (!fs.existsSync(inputModelPath)) {
  console.error(`\n❌ Input model not found: ${inputModelPath}`);
  console.log('\nAvailable models in the dog_breed_model directory:');
  
  const modelDir = path.dirname(inputModelPath);
  if (fs.existsSync(modelDir)) {
    const files = fs.readdirSync(modelDir);
    files.forEach(file => {
      const filePath = path.join(modelDir, file);
      const stats = fs.statSync(filePath);
      console.log(`- ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    });
  } else {
    console.log(`Directory ${modelDir} does not exist`);
  }
  
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputModelDir)) {
  fs.mkdirSync(outputModelDir, { recursive: true });
  console.log(`\n✅ Created output directory: ${outputModelDir}`);
}

// Command to convert the model
const command = `tensorflowjs_converter \\
  --input_format=${modelFormat} \\
  --output_format=tfjs_graph_model \\
  --signature_name=serving_default \\
  --save_weights_only=false \\
  --quantize_uint8=false \\
  --quantize_uint16=false \\
  --quantize_float16=false \\
  "${inputModelPath}" \\
  "${outputModelDir}"`;

console.log('\n📦 Converting model...');
console.log('Running command:');
console.log(command);

try {
  // Execute the conversion command
  execSync(command, { stdio: 'inherit' });
  console.log('\n✅ Model conversion successful!');
  console.log(`TensorFlow.js model saved to: ${outputModelDir}`);
  
  // Verify the output files
  console.log('\n📋 Checking generated files:');
  const outputFiles = fs.readdirSync(outputModelDir);
  outputFiles.forEach(file => {
    const filePath = path.join(outputModelDir, file);
    const stats = fs.statSync(filePath);
    console.log(`- ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  });
  
  // Check for model.json
  if (outputFiles.includes('model.json')) {
    console.log('\n✅ model.json found, reading contents...');
    try {
      const modelJson = require(path.join(outputModelDir, 'model.json'));
      console.log('Model format:', modelJson.format);
      console.log('Model version:', modelJson.modelTopology?.versions?.producer || 'unknown');
      console.log('Weights manifest entries:', modelJson.weightsManifest?.length || 0);
    } catch (e) {
      console.error('❌ Error parsing model.json:', e.message);
    }
  } else {
    console.error('❌ model.json not found in output directory!');
  }
  
  // Update instructions for the user
  console.log('\n🔧 Next steps:');
  console.log('1. Update the DOG_BREED_MODEL.modelPath in src/services/modelConverterService.ts to:');
  console.log(`   modelPath: '/models/dog_breed_model/tfjs/model.json',`);
  console.log('2. Make sure you have a breeds.json file in the dog_breed_model directory');
  console.log('3. Restart your application to load the new model');
  
} catch (error) {
  console.error('\n❌ Model conversion failed:', error.message);
  
  console.log('\n🔍 Troubleshooting:');
  console.log('1. Make sure you have installed tensorflowjs with:');
  console.log('   pip install tensorflowjs');
  console.log('2. Check that the input and output paths are correct');
  console.log('3. Try running the following command directly in your terminal:');
  
  // Simplified command for manual execution
  const manualCommand = `tensorflowjs_converter --input_format=${modelFormat} --output_format=tfjs_graph_model "${inputModelPath}" "${outputModelDir}"`;
  console.log(manualCommand);
  
  console.log('\n4. If issues persist, check TensorFlow.js converter documentation:');
  console.log('   https://github.com/tensorflow/tfjs/tree/master/tfjs-converter');
}

/**
 * Additional information about the conversion process:
 * 
 * The tensorflowjs_converter tool converts models from different formats to TensorFlow.js format.
 * 
 * Key parameters:
 * - input_format: Format of the input model (keras, tf_saved_model, etc.)
 * - output_format: Format of the output model (tfjs_graph_model is better for performance)
 * - signature_name: Name of the signature to load (default: serving_default)
 * - save_weights_only: Whether to save only the weights
 * - quantize_uint8: Whether to quantize weights to 8-bit unsigned integers
 * 
 * For more options, run: tensorflowjs_converter --help
 */ 