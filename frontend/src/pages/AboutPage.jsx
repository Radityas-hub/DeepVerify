import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, Footer } from '../components';

gsap.registerPlugin(ScrollTrigger);

// Why DeepVerify matters - feature cards data
const whyMattersCards = [
  {
    icon: 'trending_up',
    title: 'Rising AI-Generated Content',
    description: 'With AI image generators becoming more accessible, distinguishing real from fake has never been more critical.',
    color: 'indigo'
  },
  {
    icon: 'verified_user',
    title: 'Trust & Authenticity',
    description: 'Ensuring the authenticity of visual content is essential for maintaining trust in digital communication.',
    color: 'emerald'
  },
  {
    icon: 'share',
    title: 'Social Media & News Impact',
    description: 'Misinformation spreads rapidly. DeepVerify helps users verify images before sharing or believing them.',
    color: 'purple'
  },
  {
    icon: 'fingerprint',
    title: 'Digital Verification',
    description: 'As deepfakes evolve, robust verification tools become essential for journalists, researchers, and everyday users.',
    color: 'blue'
  }
];

// Technology timeline steps
const technologySteps = [
  {
    step: 1,
    title: 'Image Upload',
    description: 'User uploads an image through our secure interface. We support JPG, PNG, and WEBP formats.',
    icon: 'cloud_upload'
  },
  {
    step: 2,
    title: 'Preprocessing',
    description: 'The image is normalized and prepared for analysis, ensuring consistent input for our AI model.',
    icon: 'tune'
  },
  {
    step: 3,
    title: 'AI Analysis',
    description: 'Our neural network examines pixel patterns, artifacts, and consistency markers unique to AI-generated images.',
    icon: 'psychology'
  },
  {
    step: 4,
    title: 'Confidence-Based Result',
    description: 'Results are presented with a confidence score, providing transparency about the certainty of classification.',
    icon: 'analytics'
  }
];

const AboutPage = () => {
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const whyMattersRef = useRef(null);
  const technologyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo('.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
      );

      // What is section - scroll triggered
      gsap.fromTo('.what-is-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: whatIsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      gsap.fromTo('.what-is-image',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: whatIsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Why matters cards - stagger animation
      gsap.fromTo('.why-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: whyMattersRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Technology timeline
      gsap.fromTo('.tech-step',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: technologyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // CTA section
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 sm:py-28 overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-[16px]">info</span>
              About DeepVerify
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
                Fighting AI-Generated
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500 ai-text-glow">
                Image Misinformation
              </span>
            </h1>
            
            <p className="hero-subtitle max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
              DeepVerify is an AI-powered platform designed to help you distinguish between authentic photographs and AI-generated imagery.
            </p>
          </div>
        </section>

        {/* What is DeepVerify Section */}
        <section ref={whatIsRef} className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="what-is-content">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-800">
                  What is <span className="text-primary">DeepVerify</span>?
                </h2>
                <div className="space-y-4 text-slate-600">
                  <p className="text-lg leading-relaxed">
                    DeepVerify is an <strong className="text-slate-800">AI-powered image classification platform</strong> that analyzes images to determine whether they are authentic photographs or generated by artificial intelligence.
                  </p>
                  <p className="leading-relaxed">
                    Using advanced deep learning techniques, our system examines pixel-level patterns, artifacts, and consistency markers that are often invisible to the human eye but reveal the true origin of an image.
                  </p>
                  <p className="leading-relaxed">
                    Our mission is to <strong className="text-slate-800">reduce misinformation</strong>, combat deepfakes, and promote <strong className="text-slate-800">digital authenticity</strong> in an era where AI-generated content is becoming increasingly sophisticated.
                  </p>
                </div>
              </div>
              
              {/* Visual */}
              <div className="what-is-image relative">
                <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 border border-blue-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex flex-col items-center justify-center p-4 border border-emerald-500/30">
                      <span className="material-symbols-outlined text-emerald-500 text-4xl mb-2">photo_camera</span>
                      <span className="text-sm font-bold text-emerald-600">Real Photo</span>
                    </div>
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex flex-col items-center justify-center p-4 border border-red-500/30">
                      <span className="material-symbols-outlined text-red-500 text-4xl mb-2">auto_awesome</span>
                      <span className="text-sm font-bold text-red-600">AI Generated</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                    <span className="material-symbols-outlined animate-pulse">sync</span>
                    <span className="text-sm font-medium">AI Analysis</span>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DeepVerify Matters Section */}
        <section ref={whyMattersRef} className="py-16 sm:py-24 bg-blue-50/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800">
                Why DeepVerify <span className="text-primary">Matters</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                In a world where AI can create photorealistic images in seconds, having reliable verification tools is more important than ever.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyMattersCards.map((card, index) => (
                <div 
                  key={index}
                  className={`why-card group bg-white rounded-xl p-6 border border-blue-100 hover:border-${card.color}-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-${card.color}-500/10`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Overview Section */}
        <section ref={technologyRef} className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-800">
                How Our <span className="text-primary">Technology</span> Works
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A simplified overview of the DeepVerify analysis process.
              </p>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-indigo-500 to-purple-500 hidden sm:block"></div>
              
              <div className="space-y-8">
                {technologySteps.map((step, index) => (
                  <div key={index} className="tech-step relative flex gap-6 items-start">
                    {/* Step number */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25">
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary">{step.icon}</span>
                        <h3 className="text-lg font-bold text-slate-800">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <div className="max-w-3xl mx-auto px-4 text-center cta-content">
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-blue-100 shadow-xl">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">verified</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800">
                Ready to Verify an Image?
              </h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                Try DeepVerify now and see for yourself how our AI can help you distinguish real photographs from AI-generated content.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">upload</span>
                Try Image Verification
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
