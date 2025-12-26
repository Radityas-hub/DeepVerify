const HeroSection = () => {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
        Powered by Neural Networks
      </div>
      
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-6 drop-shadow-sm">
        Is This Image <br className="hidden sm:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500 ai-text-glow">
          Real or AI Generated?
        </span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
        Upload an image and let our advanced convolutional neural network analyze pixel patterns to detect authenticity with 99% accuracy.
      </p>
    </section>
  );
};

export default HeroSection;
