import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import AnalyzingState from './AnalyzingState';
import ResultCard from './ResultCard';
import { 
  analyzeImage, 
  validateImage, 
  createImagePreview, 
  revokeImagePreview 
} from '../services/mockAiService';


// State constants for clarity
const STATES = {
  IDLE: 'idle',
  ANALYZING: 'analyzing',
  RESULT: 'result'
};

const UploadSection = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [currentState, setCurrentState] = useState(STATES.IDLE);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Refs for animations and file input
  const containerRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  // ============================================
  // ANIMATIONS
  // ============================================
  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cleanup image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        revokeImagePreview(imagePreview);
      }
    };
  }, [imagePreview]);

  // ============================================
  // FILE HANDLING
  // ============================================
  
  /**
   * Processes the selected file
   * Validates, creates preview, and triggers analysis
   */
  const handleFile = useCallback(async (file) => {
    // Clear previous state
    setError(null);
    
    // Validate file
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // Create preview URL
    if (imagePreview) {
      revokeImagePreview(imagePreview);
    }
    const preview = createImagePreview(file);
    setImagePreview(preview);
    setSelectedImage(file);

    // Start analysis
    setCurrentState(STATES.ANALYZING);

    try {
      // ============================================
      // AI ANALYSIS
      // TODO: Replace mock service with real API
      // ============================================
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      setCurrentState(STATES.RESULT);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      setCurrentState(STATES.IDLE);
    }
  }, [imagePreview]);

  /**
   * Handles file input change event
   */
  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  /**
   * Opens file picker dialog
   */
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // ============================================
  // DRAG & DROP HANDLERS
  // ============================================
  
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  // ============================================
  // RESET HANDLER
  // ============================================
  
  const handleReset = useCallback(() => {
    // Animate out
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        // Reset state
        setCurrentState(STATES.IDLE);
        setSelectedImage(null);
        if (imagePreview) {
          revokeImagePreview(imagePreview);
        }
        setImagePreview(null);
        setAnalysisResult(null);
        setError(null);

        // Animate back in
        gsap.to(containerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    });
  }, [imagePreview]);

  // ============================================
  // RENDER STATES
  // ============================================

  /**
   * Renders the idle state - upload area
   */
  const renderIdleState = () => (
    <div 
      ref={uploadAreaRef}
      onClick={handleUploadClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`p-8 sm:p-12 flex flex-col items-center justify-center text-center upload-area transition-all duration-300 border-2 border-dashed m-2 rounded-lg cursor-pointer
        ${isDragging 
          ? 'border-primary bg-primary/10 scale-[1.02]' 
          : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#1a1f35]/50'
        }
      `}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="relative mb-6">
        {/* Icon Background Blob */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-xl transition-colors duration-300
          ${isDragging ? 'bg-primary/40' : 'bg-primary/20'}
        `}></div>
        
        {/* Main Icon */}
        <div className={`relative w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-primary border transition-all duration-300
          ${isDragging 
            ? 'bg-primary/10 border-primary scale-110' 
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }
        `}>
          <span className="material-symbols-outlined text-[40px]">
            {isDragging ? 'download' : 'add_photo_alternate'}
          </span>
        </div>
        
        {/* AI Scanner Badge */}
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg p-1.5 shadow-md flex items-center justify-center">
          <span className="material-symbols-outlined text-[16px] animate-pulse">qr_code_scanner</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {isDragging ? 'Drop your image here' : 'Drag & drop image or click to upload'}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-sm mx-auto">
        Supported formats: JPG, PNG, WEBP (Max 5MB). <br />We do not store your images permanently.
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <button 
        className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleUploadClick();
        }}
      >
        <span className="material-symbols-outlined">cloud_upload</span>
        Upload Image
      </button>
    </div>
  );

  /**
   * Renders the analyzing state - loading animation
   */
  const renderAnalyzingState = () => (
    <AnalyzingState imagePreview={imagePreview} />
  );

  /**
   * Renders the result state - classification result
   */
  const renderResultState = () => (
    <ResultCard 
      result={analysisResult} 
      imagePreview={imagePreview} 
      onReset={handleReset}
    />
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <section ref={containerRef} className="relative z-10 w-full max-w-3xl mx-auto px-4 pb-20">
      <div className="group relative w-full">
        {/* Glowing border effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-xl blur transition duration-1000
          ${currentState === STATES.RESULT && analysisResult?.label === 'REAL_PHOTO'
            ? 'from-emerald-500 to-green-600 opacity-30'
            : currentState === STATES.RESULT && analysisResult?.label === 'AI_GENERATED'
            ? 'from-red-500 to-orange-600 opacity-30'
            : 'from-primary to-purple-600 opacity-20 group-hover:opacity-40 group-hover:duration-200'
          }
        `}></div>
        
        {/* Card Container */}
        <div className="relative bg-white dark:bg-[#15192b] rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          {/* Dynamic Content Based on State */}
          {currentState === STATES.IDLE && renderIdleState()}
          {currentState === STATES.ANALYZING && renderAnalyzingState()}
          {currentState === STATES.RESULT && renderResultState()}
          
          {/* Progress / Stats Strip - Only show in idle state */}
          {currentState === STATES.IDLE && (
            <div className="bg-slate-50 dark:bg-[#12141f] border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                24M+ Images Analyzed
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                End-to-End Encrypted
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
