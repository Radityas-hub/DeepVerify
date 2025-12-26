import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to('.scroll-to-top-btn', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to('.scroll-to-top-btn', {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top-btn fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 flex items-center justify-center transition-colors cursor-pointer hover:cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 24 24%22 fill=%22%231132d4%22><path d=%22M12 4l-8 8h5v8h6v-8h5z%22/></svg>'),_pointer]"
      style={{ opacity: 0, transform: 'scale(0.8)' }}
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined">keyboard_arrow_up</span>
    </button>
  );
};

export default ScrollToTop;

