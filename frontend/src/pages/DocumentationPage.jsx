import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, Footer } from '../components';

gsap.registerPlugin(ScrollTrigger);

// How it works steps data
const howItWorksSteps = [
  {
    step: 1,
    title: 'Upload Image',
    description: 'Select an image from your device or drag and drop it into the upload area. We accept JPG, PNG, and WEBP formats up to 5MB.',
    icon: 'cloud_upload',
    badgeClass: 'bg-blue-600',
    iconBgClass: 'bg-blue-500/10',
    iconTextClass: 'text-blue-600'
  },
  {
    step: 2,
    title: 'Image Processing',
    description: 'Your image is preprocessed and normalized to ensure consistent analysis. This includes resizing, color normalization, and format optimization.',
    icon: 'tune',
    badgeClass: 'bg-blue-600',
    iconBgClass: 'bg-blue-500/10',
    iconTextClass: 'text-blue-600'
  },
  {
    step: 3,
    title: 'AI Analysis',
    description: 'Our deep learning model analyzes the image for pixel-level artifacts, pattern inconsistencies, and signatures typical of AI-generated content.',
    icon: 'psychology',
    badgeClass: 'bg-blue-600',
    iconBgClass: 'bg-blue-500/10',
    iconTextClass: 'text-blue-600'
  },
  {
    step: 4,
    title: 'Result Classification',
    description: 'The system outputs a classification (Real Photo or AI Generated) along with a confidence score indicating the certainty of the prediction.',
    icon: 'analytics',
    badgeClass: 'bg-blue-600',
    iconBgClass: 'bg-blue-500/10',
    iconTextClass: 'text-blue-600'
  }
];

// User guide steps
const userGuideSteps = [
  {
    title: 'Navigate to Upload Area',
    description: 'On the homepage, you\'ll find the upload section. Click the "Upload Image" button or drag your image directly onto the upload zone.',
    icon: 'touch_app'
  },
  {
    title: 'Wait for Analysis',
    description: 'Once uploaded, you\'ll see an animated loading state. The AI is analyzing your image - this typically takes 2-3 seconds.',
    icon: 'hourglass_empty'
  },
  {
    title: 'View Results',
    description: 'After analysis completes, you\'ll see the classification result with confidence score and detailed breakdown of the analysis.',
    icon: 'visibility'
  },
  {
    title: 'Analyze Another',
    description: 'Click "Analyze Another Image" to reset and verify additional images. Each analysis is independent.',
    icon: 'refresh'
  }
];

// FAQ data
const faqItems = [
  {
    question: 'Is DeepVerify 100% accurate?',
    answer: 'No AI system is 100% accurate. DeepVerify provides a confidence score with each analysis to indicate certainty. Our model achieves high accuracy on typical AI-generated vs. real photos, but edge cases may exist. Always use DeepVerify as one tool among several for verification.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'DeepVerify supports JPEG (.jpg, .jpeg), PNG (.png), and WebP (.webp) formats. The maximum file size is 5MB. For best results, use high-quality images without heavy compression.'
  },
  {
    question: 'Is my image stored after analysis?',
    answer: 'No. Your images are processed in memory and immediately discarded after analysis. We do not store, save, or retain any uploaded images. Your privacy is our priority.'
  },
  {
    question: 'How does DeepVerify detect AI-generated images?',
    answer: 'Our model analyzes pixel-level patterns, compression artifacts, color distribution, and consistency markers. AI-generated images often have subtle signatures invisible to the human eye but detectable by trained neural networks.'
  },
  {
    question: 'Can DeepVerify detect all types of AI-generated images?',
    answer: 'DeepVerify is optimized for common AI image generators (DALL-E, Midjourney, Stable Diffusion, etc.). As AI technology evolves, we continuously update our model. Some highly sophisticated or novel generation methods may be harder to detect.'
  }
];

// Accordion component for FAQ
const FAQAccordion = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);

  return (
    <div className="border border-blue-100 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-left text-slate-800">{question}</span>
        <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 py-4 bg-blue-50/50 text-slate-600 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const DocumentationPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const userGuideRef = useRef(null);
  const resultsRef = useRef(null);
  const apiRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.doc-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo('.doc-hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
      );

      // How it works steps
      gsap.fromTo('.how-step',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // User guide cards
      gsap.fromTo('.guide-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: userGuideRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Results section
      gsap.fromTo('.result-badge',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: resultsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // API section
      gsap.fromTo('.api-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: apiRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // FAQ section
      gsap.fromTo('.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-16 sm:py-24">
          <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="doc-hero-title text-4xl sm:text-5xl font-black tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
                Documentation
              </span>
            </h1>
            <p className="doc-hero-subtitle text-lg text-slate-600 max-w-2xl mx-auto">
              Learn how DeepVerify works and how to use it effectively for image verification.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A step-by-step breakdown of the DeepVerify analysis pipeline.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorksSteps.map((step, index) => (
                <div 
                  key={index}
                  className="how-step relative bg-white rounded-xl p-6 border border-blue-100 text-center shadow-sm"
                >
                  {/* Step number badge */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${step.badgeClass} text-white text-sm font-bold flex items-center justify-center shadow-lg`}>
                    {step.step}
                  </div>
                  
                  <div className={`w-14 h-14 mx-auto rounded-xl ${step.iconBgClass} flex items-center justify-center ${step.iconTextClass} mb-4 mt-2`}>
                    <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Guide Section */}
        <section ref={userGuideRef} className="py-16 sm:py-20 bg-blue-50/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                Using <span className="text-primary">DeepVerify</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A quick guide on how to use the platform.
              </p>
            </div>
            
            <div className="space-y-4">
              {userGuideSteps.map((step, index) => (
                <div 
                  key={index}
                  className="guide-card flex gap-4 items-start bg-white rounded-xl p-5 border border-blue-100 shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Result Explanation Section */}
        <section ref={resultsRef} className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                Understanding <span className="text-primary">Results</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                DeepVerify provides two possible classifications for uploaded images.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Real Photo Badge */}
              <div 
                className="result-badge relative rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/90"></div>
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/30">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 text-sm font-bold mb-4">
                    REAL PHOTO
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This classification indicates the image appears to be an authentic photograph taken with a camera, with no signs of AI generation detected.
                  </p>
                </div>
              </div>
              
              {/* AI Generated Badge */}
              <div 
                className="result-badge relative rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/90"></div>
                
                <div className="relative z-10 p-8 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 backdrop-blur-sm flex items-center justify-center text-red-400 mb-4 border border-red-500/30">
                    <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/40 text-red-400 text-sm font-bold mb-4">
                    AI GENERATED
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This classification indicates the image shows patterns consistent with AI image generators like DALL-E, Midjourney, or Stable Diffusion.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Confidence Score Explanation */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">percent</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">
                    Confidence Score
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Each result includes a confidence percentage (e.g., 92%) indicating how certain the model is about its classification. Higher scores mean greater confidence. Scores below 80% may indicate ambiguous cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Section (Coming Soon) */}
        <section ref={apiRef} className="py-16 sm:py-20 bg-blue-50/50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="api-content text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="material-symbols-outlined text-[16px]">construction</span>
                Coming Soon
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                API & Model <span className="text-primary">Integration</span>
              </h2>
              
              <div className="bg-white rounded-xl p-8 border border-blue-100 text-left shadow-sm">
                <p className="text-slate-600 mb-6">
                  We're working on providing programmatic access to DeepVerify for developers and researchers.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">api</span>
                    <span className="text-slate-800 font-medium">REST API Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">code</span>
                    <span className="text-slate-800 font-medium">SDK Libraries (Python, JavaScript)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">science</span>
                    <span className="text-slate-800 font-medium">Model Research Transparency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="text-slate-800 font-medium">Detailed API Documentation</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <p className="text-sm text-slate-500">
                    Interested in early access? Stay tuned for updates on our GitHub repository.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-800">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Common questions about DeepVerify and AI image detection.
              </p>
            </div>
            
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <FAQAccordion
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-800">
              Ready to Try It Out?
            </h2>
            <p className="text-slate-600 mb-8">
              Upload an image and see DeepVerify in action.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">upload</span>
              Start Analyzing
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentationPage;
