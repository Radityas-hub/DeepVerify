/**
 * ============================================
 * MOCK AI SERVICE - DeepVerify
 * ============================================
 * 
 * This file contains mock AI prediction logic.
 * 
 * TODO: Replace this mock service with real AI inference API
 * when the backend model is ready.
 * 
 * Expected real implementation:
 * - Send image to backend API endpoint
 * - Backend processes image through trained CNN model
 * - Return classification result (REAL/AI) with confidence score
 */

/**
 * Simulates AI image analysis delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Resolves after delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random confidence score between min and max
 * @param {number} min - Minimum confidence (default: 85)
 * @param {number} max - Maximum confidence (default: 98)
 * @returns {number} - Random confidence percentage
 */
const generateConfidence = (min = 85, max = 98) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Mock AI prediction function
 * Simulates what the real AI model would return
 * 
 * @param {File} imageFile - The uploaded image file
 * @returns {Promise<Object>} - Prediction result
 * 
 * Result shape:
 * {
 *   label: 'REAL_PHOTO' | 'AI_GENERATED',
 *   confidence: number (0-100),
 *   analysisTime: number (ms),
 *   details: {
 *     artifactScore: number,
 *     consistencyScore: number,
 *     patternScore: number
 *   }
 * }
 */
export const analyzeImage = async (imageFile) => {
  // Simulate AI processing time (2-3 seconds)
  const processingTime = 2000 + Math.random() * 1000;
  await delay(processingTime);
  
  // ============================================
  // MOCK PREDICTION LOGIC
  // TODO: Replace with actual API call:
  // 
  // const formData = new FormData();
  // formData.append('image', imageFile);
  // const response = await fetch('/api/predict', {
  //   method: 'POST',
  //   body: formData
  // });
  // return await response.json();
  // ============================================
  
  // Random classification (50/50 chance)
  const isReal = Math.random() > 0.5;
  
  // Generate mock result
  const result = {
    label: isReal ? 'REAL_PHOTO' : 'AI_GENERATED',
    confidence: generateConfidence(),
    analysisTime: Math.round(processingTime),
    timestamp: new Date().toISOString(),
    details: {
      // Mock sub-scores for detailed analysis
      artifactScore: generateConfidence(70, 95),
      consistencyScore: generateConfidence(75, 98),
      patternScore: generateConfidence(80, 99),
    }
  };
  
  return result;
};

/**
 * Validates if the file is an acceptable image format
 * @param {File} file - The file to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please upload JPG, PNG, or WEBP images only.' 
    };
  }
  
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File too large. Maximum size is 5MB.' 
    };
  }
  
  return { valid: true };
};

/**
 * Creates a preview URL for the uploaded image
 * @param {File} file - The image file
 * @returns {string} - Object URL for preview
 */
export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a preview URL to free memory
 * @param {string} url - The object URL to revoke
 */
export const revokeImagePreview = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

export default {
  analyzeImage,
  validateImage,
  createImagePreview,
  revokeImagePreview
};
