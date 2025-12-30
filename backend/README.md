# DeepVerify Backend

Backend API untuk DeepVerify - AI Image Detection menggunakan Flask + TensorFlow.

## Quick Start

### 1. Setup Environment
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Tambahkan Model
Letakkan file model CNN hasil training di folder `backend/`:
- `ai_vs_real_cnn.h5` (model yang sudah di-train)

### 4. Jalankan Server
```bash
python app.py
```

Server akan berjalan di `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Predict Image
```
POST /api/predict
Content-Type: multipart/form-data

Body:
- image: File (JPG, PNG, WEBP)
```

Response:
```json
{
  "success": true,
  "prediction": {
    "label": "REAL_PHOTO",
    "confidence": 92.5
  }
}
```

## Model Info

- **File**: `ai_vs_real_cnn.h5`
- **Input Shape**: (224, 224, 3) - RGB images
- **Output**: Binary classification (sigmoid)
- **Classes**: AI_GENERATED (0) / REAL_PHOTO (1)
