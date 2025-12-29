import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, AboutPage, DocumentationPage } from './pages';
import { ScrollToTop } from './components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
