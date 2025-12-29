import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      const shouldShow = window.pageYOffset > 300;
      setIsVisible(shouldShow);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Check on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Always render the button, just hide/show with CSS
  return (
    <button
      onClick={handleClick}
      type="button"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
        transition: 'all 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      aria-label="Scroll to top"
    >
      <span 
        className="material-symbols-outlined" 
        style={{ fontSize: '24px' }}
      >
        keyboard_arrow_up
      </span>
    </button>
  );
};

export default ScrollToTop;

