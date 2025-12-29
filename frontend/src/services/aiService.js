/**
 * ============================================
 * AI SERVICE - DeepVerify
 * ============================================
 * 
 * Service utama untuk analisis gambar.
 * Otomatis switch antara Mock API dan Real API
 * berdasarkan konfigurasi di apiConfig.js
 */

import { USE_MOCK_API, getApiUrl, ENDPOINTS, REQUEST_TIMEOUT } from './apiConfig';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Simulates AI image analysis delay (untuk mock)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random confidence score (untuk mock)
 */
const generateConfidence = (min = 85, max = 98) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Fetch dengan timeout
 */
const fetchWithTimeout = async (url, options, timeout = REQUEST_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - server tidak merespon');
    }
    throw error;
  }
};

// ============================================
// MOCK API IMPLEMENTATION
// ============================================

/**
 * Mock prediction - untuk development/testing
 */
const mockAnalyzeImage = async (imageFile) => {
  const processingTime = 2000 + Math.random() * 1000;
  await delay(processingTime);
  
  const isReal = Math.random() > 0.5;
  
  return {
    label: isReal ? 'REAL_PHOTO' : 'AI_GENERATED',
    confidence: generateConfidence(),
    analysisTime: Math.round(processingTime),
    timestamp: new Date().toISOString(),
    details: {
      artifactScore: generateConfidence(70, 95),
      consistencyScore: generateConfidence(75, 98),
      patternScore: generateConfidence(80, 99),
    }
  };
};

// ============================================
// REAL API IMPLEMENTATION
// ============================================

/**
 * Real API call ke backend Python/Flask
 * 
 * Expected backend response format:
 * {
 *   "success": true,
 *   "prediction": {
 *     "label": "REAL_PHOTO" | "AI_GENERATED",
 *     "confidence": 92.5,
 *     "details": {
 *       "artifactScore": 85,
 *       "consistencyScore": 90,
 *       "patternScore": 88
 *     }
 *   }
 * }
 */
const realAnalyzeImage = async (imageFile) => {
  const startTime = Date.now();
  
  // Siapkan FormData untuk upload
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await fetchWithTimeout(
      getApiUrl(ENDPOINTS.PREDICT),
      {
        method: 'POST',
        body: formData,
        // Jangan set Content-Type header untuk FormData
        // Browser akan otomatis set dengan boundary yang benar
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }
    
    const data = await response.json();
    const analysisTime = Date.now() - startTime;
    
    // Normalize response ke format yang diharapkan frontend
    return {
      label: data.prediction?.label || data.label,
      confidence: Math.round(data.prediction?.confidence || data.confidence),
      analysisTime: analysisTime,
      timestamp: new Date().toISOString(),
      details: {
        artifactScore: data.prediction?.details?.artifactScore || data.details?.artifactScore || 0,
        consistencyScore: data.prediction?.details?.consistencyScore || data.details?.consistencyScore || 0,
        patternScore: data.prediction?.details?.patternScore || data.details?.patternScore || 0,
      }
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.message || 'Gagal terhubung ke server. Pastikan backend sudah berjalan.'
    );
  }
};

// ============================================
// MAIN EXPORT FUNCTIONS
// ============================================

/**
 * Analisis gambar - otomatis pilih mock/real berdasarkan config
 * 
 * @param {File} imageFile - File gambar yang diupload
 * @returns {Promise<Object>} - Hasil prediksi
 */
export const analyzeImage = async (imageFile) => {
  if (USE_MOCK_API) {
    console.log('🔧 Using MOCK API (development mode)');
    return mockAnalyzeImage(imageFile);
  } else {
    console.log('🚀 Using REAL API');
    return realAnalyzeImage(imageFile);
  }
};

/**
 * Cek kesehatan/status backend API
 */
export const checkApiHealth = async () => {
  if (USE_MOCK_API) {
    return { status: 'mock', healthy: true };
  }
  
  try {
    const response = await fetchWithTimeout(
      getApiUrl(ENDPOINTS.HEALTH),
      { method: 'GET' },
      5000 // 5 detik timeout untuk health check
    );
    
    if (response.ok) {
      return { status: 'online', healthy: true };
    }
    return { status: 'error', healthy: false };
  } catch (error) {
    return { status: 'offline', healthy: false, error: error.message };
  }
};

/**
 * Validates if the file is an acceptable image format
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
 */
export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a preview URL to free memory
 */
export const revokeImagePreview = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

export default {
  analyzeImage,
  checkApiHealth,
  validateImage,
  createImagePreview,
  revokeImagePreview,
};
