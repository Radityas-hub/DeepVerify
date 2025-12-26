import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Badge animation
      tl.fromTo(badgeRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 }
      );
      
      // Title animation
      tl.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.3'
      );
      
      // Subtitle (gradient text) animation
      tl.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
      
      // Description animation
      tl.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
      <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
        Powered by Neural Networks
      </div>
      
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-sm">
        <span ref={titleRef} className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          Is This Image
        </span>
        <span ref={subtitleRef} className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500 ai-text-glow">
          Real or AI Generated?
        </span>
      </h1>
      
      <p ref={descRef} className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
        Upload an image and let our advanced convolutional neural network analyze pixel patterns to detect authenticity with 99% accuracy.
      </p>
    </section>
  );
};

export default HeroSection;
