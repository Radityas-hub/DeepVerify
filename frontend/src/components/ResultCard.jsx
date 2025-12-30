import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ResultCard = ({ result, imagePreview, onReset }) => {
  const cardRef = useRef(null);
  const scoreRef = useRef(null);
  const labelRef = useRef(null);

  const isReal = result.label === 'REAL_PHOTO';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      );

      // Label pop animation
      gsap.fromTo(labelRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(1.7)' }
      );

      // Animate confidence counter
      gsap.fromTo(scoreRef.current,
        { innerText: 0 },
        {
          innerText: result.confidence,
          duration: 1.5,
          delay: 0.4,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            if (scoreRef.current) {
              scoreRef.current.innerText = Math.round(this.targets()[0].innerText) + '%';
            }
          }
        }
      );

    }, cardRef);

    return () => ctx.revert();
  }, [result.confidence]);

  return (
    <div 
      ref={cardRef}
      className="flex flex-col items-center p-6 sm:p-10"
    >
      {/* Result Header */}
      <div 
        ref={labelRef}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 ${
          isReal 
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500' 
            : 'bg-red-500/10 border border-red-500/30 text-red-500'
        }`}
      >
        {isReal ? 'Real Photo Detected' : 'AI Generated Detected'}
      </div>

      {/* Image Preview with Result Overlay */}
      <div className="relative mb-6 rounded-xl overflow-hidden shadow-2xl group">
        <img 
          src={imagePreview} 
          alt="Analyzed" 
          className="w-72 h-72 object-cover"
        />
        
        {/* Result Overlay */}
        <div className={`absolute inset-0 ${
          isReal 
            ? 'bg-gradient-to-t from-emerald-500/40 to-transparent' 
            : 'bg-gradient-to-t from-red-500/40 to-transparent'
        }`}>
          {/* Icon */}
          <div className="absolute bottom-4 right-4">
            <div className={`w-12 h-12 rounded-full ${
              isReal ? 'bg-emerald-500' : 'bg-red-500'
            } flex items-center justify-center shadow-lg`}>
              <span className="material-symbols-outlined text-white text-2xl">
                {isReal ? 'verified' : 'auto_awesome'}
              </span>
            </div>
          </div>
        </div>

        {/* Border glow effect */}
        <div className={`absolute inset-0 border-4 rounded-xl ${
          isReal ? 'border-emerald-500/50' : 'border-red-500/50'
        }`}></div>
      </div>

      {/* Confidence Score */}
      <div className="text-center mb-6">
        <p className="text-slate-600 text-sm uppercase tracking-wider mb-1">
          Confidence Score
        </p>
        <p 
          ref={scoreRef}
          className={`text-5xl font-black ${
            isReal ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          0%
        </p>
      </div>

      {/* Analysis Time */}
      <p className="text-slate-500 text-xs mb-6">
        Analysis completed in {(result.analysisTime / 1000).toFixed(2)}s
      </p>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center gap-2"
      >
        <span className="material-symbols-outlined">refresh</span>
        Analyze Another Image
      </button>
    </div>
  );
};

export default ResultCard;
