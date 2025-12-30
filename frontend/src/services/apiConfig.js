/**
 * API CONFIGURATION - DeepVerify
 * Konfigurasi untuk menghubungkan dengan backend AI
 */

// Backend API URL
export const API_BASE_URL = 'http://localhost:5000';

// API Endpoints
export const ENDPOINTS = {
  PREDICT: '/api/predict',
  HEALTH: '/api/health',
};

// Request timeout (30 detik)
export const REQUEST_TIMEOUT = 30000;

// Helper untuk mendapatkan full URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
