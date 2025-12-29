import { Navbar, HeroSection, UploadSection, FeaturesSection, Footer } from '../components';

const HomePage = () => {
  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-start relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none z-0"></div>
        
        <HeroSection />
        <UploadSection />
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
