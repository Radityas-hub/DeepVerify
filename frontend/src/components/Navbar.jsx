import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Animate menu height
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        menuRef.current.style.maxHeight = menuRef.current.scrollHeight + 'px';
        menuRef.current.style.opacity = '1';
      } else {
        menuRef.current.style.maxHeight = '0px';
        menuRef.current.style.opacity = '0';
      }
    }
  }, [isMenuOpen]);
  
  return (
    <header className="w-full border-b border-blue-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="DeepVerify Logo" className="w-8 h-8 object-contain" />
            <h2 className="text-primary text-lg font-bold tracking-tight">
                DeepVerify
            </h2>
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-primary font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              to="/"
            >
              Home
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-primary font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              to="/about"
            >
              About the Project
            </Link>
            <Link 
              className={`text-sm font-medium transition-colors ${
                isActive('/documentation')
                  ? 'text-primary font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              to="/documentation"
            >
              Documentation
            </Link>
            <a 
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md" 
              href="https://github.com/Radityas-hub/DeepVerify" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>GitHub Repo</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            <span 
              className={`material-symbols-outlined text-slate-700 transition-transform duration-300 block ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            >
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <div 
          ref={menuRef}
          className="md:hidden overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: '0px', opacity: '0' }}
        >
          <nav className="flex flex-col gap-1 py-4 border-t border-blue-100">
            <Link 
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'text-primary bg-blue-50 font-semibold translate-x-1'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-primary hover:translate-x-1'
              }`}
              to="/"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">home</span>
                Home
              </span>
            </Link>
            <Link 
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/about')
                  ? 'text-primary bg-blue-50 font-semibold translate-x-1'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-primary hover:translate-x-1'
              }`}
              to="/about"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">info</span>
                About the Project
              </span>
            </Link>
            <Link 
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/documentation')
                  ? 'text-primary bg-blue-50 font-semibold translate-x-1'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-primary hover:translate-x-1'
              }`}
              to="/documentation"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">description</span>
                Documentation
              </span>
            </Link>
            <a 
              className="mx-4 mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg" 
              href="https://github.com/Radityas-hub/DeepVerify" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>GitHub Repo</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
