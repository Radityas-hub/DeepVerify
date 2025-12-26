import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnalyzingState = ({ imagePreview }) => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const scannerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the container entrance
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Animate neural network dots
      dotsRef.current.forEach((dot, index) => {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.5,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.15
        });
      });

      // Animate scanner line
      gsap.to(scannerRef.current, {
        y: '100%',
        duration: 1.5,
        repeat: -1,
        ease: 'power1.inOut',
        yoyo: true
      });

      // Animate text dots
      gsap.to(textRef.current, {
        opacity: 0.5,
        duration: 0.8,
        repeat: -1,
        yoyo: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center p-8 sm:p-12"
    >
      {/* Image Preview with Scanner Effect */}
      <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
        {/* Image */}
        <img 
          src={imagePreview} 
          alt="Analyzing" 
          className="w-64 h-64 object-cover opacity-80"
        />
        
        {/* Scanner Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/20">
          <div 
            ref={scannerRef}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(17,50,212,0.8)]"
          />
        </div>
        
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary"></div>
      </div>

      {/* Neural Network Animation */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            ref={el => dotsRef.current[index] = el}
            className="w-3 h-3 rounded-full bg-primary"
          />
        ))}
      </div>

      {/* Status Text */}
      <div className="text-center">
        <h3 
          ref={textRef}
          className="text-xl font-bold text-slate-900 dark:text-white mb-2"
        >
          Analyzing image patterns...
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Our neural network is examining pixel-level artifacts
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mt-6">
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-indigo-500 to-purple-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzingState;
