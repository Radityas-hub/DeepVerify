/**
 * ============================================
 * API CONFIGURATION - DeepVerify
 * ============================================
 * 
 * Konfigurasi untuk menghubungkan dengan backend AI
 * 
 * INSTRUKSI:
 * 1. Setelah deploy model di server, ganti API_BASE_URL
 * 2. Set USE_MOCK_API = false untuk menggunakan API asli
 */

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

/**
 * Toggle antara Mock API dan Real API
 * Set ke `false` ketika backend sudah siap
 */
export const USE_MOCK_API = true;

/**
 * Base URL untuk backend API
 * 
 * Opsi deployment:
 * - Localhost: 'http://localhost:5000'
 * - Railway: 'https://your-app.railway.app'
 * - Render: 'https://your-app.onrender.com'
 * - Heroku: 'https://your-app.herokuapp.com'
 * - Google Cloud Run: 'https://your-service-xxxxx.run.app'
 * - AWS Lambda: 'https://xxxxx.execute-api.region.amazonaws.com'
 * - Hugging Face Spaces: 'https://your-username-your-space.hf.space'
 */
export const API_BASE_URL = 'http://localhost:5000';

/**
 * API Endpoints
 */
export const ENDPOINTS = {
  PREDICT: '/api/predict',
  HEALTH: '/api/health',
};

/**
 * Request timeout dalam milliseconds
 */
export const REQUEST_TIMEOUT = 30000; // 30 detik

/**
 * Mendapatkan full URL untuk endpoint
 */
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export default {
  USE_MOCK_API,
  API_BASE_URL,
  ENDPOINTS,
  REQUEST_TIMEOUT,
  getApiUrl,
};
