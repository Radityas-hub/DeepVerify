# DeepVerify Backend

Backend API untuk DeepVerify - AI Image Detection.

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
Letakkan file model hasil training di folder `backend/`:
- `model.h5` atau
- `model.keras` atau
- folder `saved_model/`

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
    "confidence": 92.5,
    "details": {
      "artifactScore": 85,
      "consistencyScore": 90,
      "patternScore": 88
    }
  }
}
```

## Deployment

### Railway (Recommended)
1. Push ke GitHub
2. Connect repo ke Railway
3. Set environment variables jika perlu
4. Deploy otomatis

### Render
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`

### Google Cloud Run
```bash
gcloud run deploy deepverify-api --source .
```
