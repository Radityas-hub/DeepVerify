# DeepVerify Frontend

React + Vite frontend application untuk DeepVerify.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 19** - UI Library
- **Vite 5** - Build Tool
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations
- **React Router** - Routing

## Folder Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── assets/       # Images, fonts, etc.
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Configuration

Untuk menghubungkan dengan backend, edit file `src/services/apiConfig.js`:

```javascript
// Set ke false untuk menggunakan Real API
export const USE_MOCK_API = false;

// Ganti dengan URL backend
export const API_BASE_URL = 'http://localhost:5000';
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
