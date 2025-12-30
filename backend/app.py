"""
============================================
DeepVerify Backend API - Flask Server
============================================

INSTRUKSI PENGGUNAAN:
1. Install dependencies: pip install flask flask-cors tensorflow pillow numpy
2. Letakkan model.h5 atau model.keras di folder yang sama
3. Jalankan: python app.py
4. Server akan berjalan di http://localhost:5000

DEPLOYMENT OPTIONS:
- Railway.app (recommended - gratis)
- Render.com
- Google Cloud Run
- Heroku
- Hugging Face Spaces
"""

import os
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf

# ============================================
# CONFIGURATION
# ============================================

app = Flask(__name__)
CORS(app)  # Enable CORS untuk frontend React

# Path ke model - sesuaikan dengan nama file model kamu
MODEL_PATH = 'ai_vs_real_cnn.h5'  # Model CNN yang sudah di-train

# Image preprocessing settings - sesuaikan dengan training
IMG_SIZE = (224, 224)  # Ukuran input model (biasanya 224x224 untuk ResNet)
CLASSES = ['AI_GENERATED', 'REAL_PHOTO']  # Sesuaikan dengan class di training

# ============================================
# LOAD MODEL
# ============================================

model = None

def load_model():
    """Load trained model"""
    global model
    try:
        if MODEL_PATH.endswith('.h5') or MODEL_PATH.endswith('.keras'):
            model = tf.keras.models.load_model(MODEL_PATH)
        else:
            # Untuk SavedModel format
            model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
        print(f"   Input shape: {model.input_shape}")
        print(f"   Output shape: {model.output_shape}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        print("   Pastikan file model ada dan path-nya benar")

# ============================================
# IMAGE PREPROCESSING
# ============================================

def preprocess_image(image_file):
    """
    Preprocess image untuk prediksi
    Sesuaikan dengan preprocessing saat training!
    """
    # Baca image
    img = Image.open(image_file)
    
    # Convert ke RGB jika perlu (handle PNG dengan alpha channel)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize ke ukuran yang diharapkan model
    img = img.resize(IMG_SIZE)
    
    # Convert ke numpy array
    img_array = np.array(img)
    
    # Normalize (sesuaikan dengan preprocessing saat training)
    # Opsi 1: Normalize ke 0-1
    img_array = img_array / 255.0
    
    # Opsi 2: Jika pakai ImageNet preprocessing (untuk ResNet, VGG, dll)
    # img_array = tf.keras.applications.resnet50.preprocess_input(img_array)
    
    # Tambah batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

# ============================================
# API ENDPOINTS
# ============================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'online',
        'model_loaded': model is not None,
        'message': 'DeepVerify API is running'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint
    Expects: multipart/form-data with 'image' field
    """
    try:
        # Check jika model sudah loaded
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded. Please check server logs.'
            }), 500
        
        # Check jika ada file
        if 'image' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No image file provided'
            }), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Validate file type
        allowed_extensions = {'png', 'jpg', 'jpeg', 'webp'}
        ext = file.filename.rsplit('.', 1)[-1].lower()
        if ext not in allowed_extensions:
            return jsonify({
                'success': False,
                'error': f'Invalid file type: {ext}. Allowed: {allowed_extensions}'
            }), 400
        
        # Preprocess image
        img_array = preprocess_image(file)
        
        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        
        # ============================================
        # INTERPRET RESULTS
        # Sesuaikan dengan output model kamu!
        # ============================================
        
        # Untuk model dengan 2 output neurons (softmax)
        if predictions.shape[-1] == 2:
            ai_prob = float(predictions[0][0])
            real_prob = float(predictions[0][1])
            
            if real_prob > ai_prob:
                label = 'REAL_PHOTO'
                confidence = real_prob * 100
            else:
                label = 'AI_GENERATED'
                confidence = ai_prob * 100
        
        # Untuk model dengan 1 output neuron (sigmoid)
        else:
            prob = float(predictions[0][0])
            # Asumsi: 0 = AI_GENERATED, 1 = REAL_PHOTO
            # Sesuaikan dengan label encoding saat training!
            if prob > 0.5:
                label = 'REAL_PHOTO'
                confidence = prob * 100
            else:
                label = 'AI_GENERATED'
                confidence = (1 - prob) * 100
        
        return jsonify({
            'success': True,
            'prediction': {
                'label': label,
                'confidence': round(confidence, 2)
            }
        })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================
# MAIN
# ============================================

if __name__ == '__main__':
    print("=" * 50)
    print("DeepVerify Backend API")
    print("=" * 50)
    
    # Load model saat startup
    load_model()
    
    # Run server
    port = int(os.environ.get('PORT', 5000))
    print(f"\n🚀 Starting server on http://localhost:{port}")
    print(f"📡 API Endpoint: http://localhost:{port}/api/predict")
    print(f"❤️  Health Check: http://localhost:{port}/api/health")
    print("\n" + "=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=True)
