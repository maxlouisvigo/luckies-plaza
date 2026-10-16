import React from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CoverSection = ({ t = portfolioData }) => {
  const profile = t?.profile || portfolioData.profile;
  const cover = t?.cover || portfolioData.cover;

  return (
    <section 
      id="cover" 
      data-section="Cover"
      className="relative min-h-screen flex flex-col justify-between items-center px-6 py-12 md:py-16 text-center bg-brand-orange text-white overflow-hidden"
    >
      {/* Background subtle cross-stitch texture */}
      <div className="absolute inset-0 stitch-bg opacity-35 pointer-events-none" />

      {/* Top Header: Full Name in Editorial Serif */}
      <div className="pt-16 md:pt-20 z-10">
        <p className="text-white/95 text-xl md:text-3xl font-serif tracking-wider font-normal">
          {profile.fullName}
        </p>
      </div>

      {/* Centerpiece: The ONE-PIECE Cross-Stitch "Portfolio" Artwork Directly on Canvas */}
      <div className="my-auto py-8 z-10 w-full max-w-6xl px-4 flex items-center justify-center">
        <img 
          src="/assets/extracted/intro/portfolio_title_transparent.png" 
          alt="Portfolio - Louis Vigo" 
          className="w-full h-auto max-h-[500px] object-contain drop-shadow-lg transform hover:scale-[1.01] transition-transform duration-500 select-none"
        />
      </div>

      {/* Bottom Subtitle & Scroll CTA */}
      <div className="pb-8 z-10 flex flex-col items-center space-y-5">
        <p className="text-white/95 text-2xl md:text-4xl font-serif italic tracking-wider font-light">
          {profile.subtagline}
        </p>

        <a 
          href="#about"
          className="group inline-flex items-center space-x-2 text-white/80 hover:text-white text-xs md:text-sm tracking-widest uppercase transition-all duration-300 pt-2"
        >
          <span>{cover?.scroll || 'Scroll to Explore'}</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
