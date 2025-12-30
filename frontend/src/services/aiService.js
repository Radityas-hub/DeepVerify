/**
 * AI SERVICE - DeepVerify
 * Service untuk analisis gambar menggunakan backend API
 */

import { getApiUrl, ENDPOINTS, REQUEST_TIMEOUT } from './apiConfig';

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

/**
 * Analisis gambar menggunakan backend API
 * @param {File} imageFile - File gambar yang diupload
 * @returns {Promise<Object>} - Hasil prediksi
 */
export const analyzeImage = async (imageFile) => {
  const startTime = Date.now();
  
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await fetchWithTimeout(
      getApiUrl(ENDPOINTS.PREDICT),
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }
    
    const data = await response.json();
    const analysisTime = Date.now() - startTime;
    
    return {
      label: data.prediction?.label || data.label,
      confidence: Math.round(data.prediction?.confidence || data.confidence),
      analysisTime: analysisTime,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.message || 'Gagal terhubung ke server. Pastikan backend sudah berjalan.'
    );
  }
};

/**
 * Validasi format dan ukuran file gambar
 * @param {File} file - File untuk divalidasi
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
 * Buat preview URL untuk gambar yang diupload
 */
export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Hapus preview URL untuk free memory
 */
export const revokeImagePreview = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};
