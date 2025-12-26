import { Navbar, HeroSection, UploadSection, FeaturesSection, Footer, ScrollToTop } from '../components';

const HomePage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-start relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none z-0"></div>
        
        <HeroSection />
        <UploadSection />
        <FeaturesSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
