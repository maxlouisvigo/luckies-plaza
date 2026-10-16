import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';

export const LightboxModal = ({ 
  isOpen, 
  onClose, 
  slides = [], 
  currentIndex = 0, 
  onNavigate 
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate) onNavigate((currentIndex + 1) % slides.length);
      if (e.key === 'ArrowLeft' && onNavigate) onNavigate((currentIndex - 1 + slides.length) % slides.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, slides, onClose, onNavigate]);

  if (!isOpen || !slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 animate-fade-in">
      
      {/* Top Bar */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-white z-20">
        <div className="flex items-center space-x-3">
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-white/70">
            Slide {currentIndex + 1} of {slides.length}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-xs md:text-sm font-medium text-white/90 max-w-sm md:max-w-xl break-words">
            {currentSlide.caption || 'Project Showcase'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={currentSlide.src}
            download
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Download slide"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center p-2">
        <img
          src={currentSlide.src}
          alt={currentSlide.caption || 'Project visual'}
          className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all"
        />

        {/* Previous Button */}
        {slides.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + slides.length) % slides.length)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all transform hover:scale-110 shadow-lg border border-white/20"
            title="Previous (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {slides.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % slides.length)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all transform hover:scale-110 shadow-lg border border-white/20"
            title="Next (Right arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-2 px-4 z-20">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-brand-orange' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
};
