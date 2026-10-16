import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CoverSection = () => {
  return (
    <section 
      id="cover" 
      data-section="Cover"
      className="relative min-h-screen flex flex-col justify-between items-center px-6 py-12 md:py-16 text-center overflow-hidden bg-brand-orange"
    >
      {/* Background subtle cross-stitch texture */}
      <div className="absolute inset-0 stitch-bg opacity-40 pointer-events-none" />

      {/* Top Header: Full Name */}
      <div className="pt-16 md:pt-20 z-10 animate-fade-in">
        <p className="text-white/95 text-lg md:text-2xl font-serif tracking-wide font-normal">
          {portfolioData.profile.fullName}
        </p>
      </div>

      {/* Centerpiece: The Iconic Cross-Stitch Portfolio Graphic */}
      <div className="relative my-auto py-8 z-10 max-w-5xl w-full flex flex-col items-center justify-center">
        <div className="relative w-full px-4 group">
          <img 
            src="/assets/extracted/intro/portfolio_title_crop.png" 
            alt="Louis Vigo Portfolio 2026" 
            className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Bottom Subtitle & Scroll Invitation */}
      <div className="pb-8 z-10 flex flex-col items-center space-y-5">
        <p className="text-white/95 text-xl md:text-3xl font-serif italic tracking-wider font-light">
          {portfolioData.profile.subtagline}
        </p>

        <a 
          href="#about"
          className="group inline-flex items-center space-x-2 text-white/80 hover:text-white text-xs md:text-sm tracking-widest uppercase transition-all duration-300 pt-2"
        >
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
