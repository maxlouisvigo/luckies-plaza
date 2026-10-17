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

      {/* Rotating Studio Stamp / DKV Seal (Gives high-end hallmark touch on mobile & desktop) */}
      <div className="absolute top-20 right-4 sm:right-8 md:top-24 md:right-16 z-20 pointer-events-none select-none">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
          {/* Rotating Text Ring */}
          <svg 
            className="w-full h-full animate-spin-slow opacity-80" 
            viewBox="0 0 120 120"
          >
            <path
              id="stampCirclePath"
              d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
              fill="none"
            />
            <text className="fill-white font-mono text-[9px] uppercase tracking-[0.24em] font-bold">
              <textPath href="#stampCirclePath" startOffset="0%">
                ✦ LOUIS VIGO ✦ VISUAL SPECIALIST ✦ EST. 2026 ✦
              </textPath>
            </text>
          </svg>

          {/* Center Monogram / Star in Instrument Serif */}
          <div className="absolute inset-0 m-auto flex flex-col items-center justify-center">
            <span className="font-serif italic text-lg sm:text-xl font-normal text-brand-cream leading-none">
              LV
            </span>
            <span className="text-[8px] tracking-widest uppercase text-white/70 font-mono mt-0.5">
              DKV
            </span>
          </div>
        </div>
      </div>

      {/* Top Header: Full Name in Editorial Serif */}
      <div className="pt-16 md:pt-20 z-10">
        <p className="text-white/95 text-xl md:text-3xl font-serif tracking-wider font-normal">
          {profile.fullName}
        </p>
      </div>

      {/* Centerpiece: The Cross-Stitch "Portfolio" Artwork with Luminous Ambient Backlight */}
      <div className="relative my-auto py-8 z-10 w-full max-w-6xl px-4 flex items-center justify-center">
        {/* Soft Warm Ambient Glow */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-amber-400/25 via-brand-orange/30 to-amber-200/20 blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

        <img 
          src="/assets/extracted/intro/portfolio_title_transparent.png" 
          alt="Portfolio - Louis Vigo" 
          className="w-full h-auto max-h-[380px] sm:max-h-[440px] md:max-h-[500px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] transform hover:scale-[1.01] transition-transform duration-500 select-none"
        />
      </div>

      {/* Bottom Subtitle & Scroll CTA */}
      <div className="pb-8 z-10 flex flex-col items-center space-y-5">
        <p className="text-white/95 text-xl sm:text-2xl md:text-4xl font-serif italic tracking-wider font-light">
          {profile.subtagline}
        </p>

        <a 
          href="#about"
          className="group inline-flex items-center space-x-2 text-white/85 hover:text-white text-xs md:text-sm tracking-widest uppercase transition-all duration-300 pt-2 px-4 py-2 rounded-full hover:bg-white/10 active:scale-95"
        >
          <span>{cover?.scroll || 'Scroll to Explore'}</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
