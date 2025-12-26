import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, AboutPage, DocumentationPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
