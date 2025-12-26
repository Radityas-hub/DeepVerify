import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide down
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      
      // Logo fade in
      gsap.fromTo(logoRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
      
      // Nav links stagger
      gsap.fromTo(linksRef.current?.children || [],
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.4, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);
  
  return (
    <header ref={navRef} className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101322]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <Link ref={logoRef} to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="DeepVerify Logo" className="w-8 h-8 object-contain" />
            <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                DeepVerify
            </h2>
          </Link>
          
          {/* Nav Links */}
          <div ref={linksRef} className="flex items-center gap-6">
            <Link 
              className={`hidden sm:block text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
              }`}
              to="/"
            >
              Home
            </Link>
            <Link 
              className={`hidden sm:block text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
              }`}
              to="/about"
            >
              About the Project
            </Link>
            <Link 
              className={`hidden sm:block text-sm font-medium transition-colors ${
                isActive('/documentation')
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white'
              }`}
              to="/documentation"
            >
              Documentation
            </Link>
            <a 
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold rounded-lg transition-colors" 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
