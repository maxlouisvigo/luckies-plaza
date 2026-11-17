import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const EditorialHome = () => {
  return (
    <div className="relative min-h-[100dvh] bg-[#F05A22] text-white flex flex-col justify-between selection:bg-[#3D1504] selection:text-white subtle-grain overflow-x-hidden">
      {/* Ambient Vignette for Editorial Paper Depth */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.08) 0%, rgba(61, 21, 4, 0.4) 100%)'
        }}
      />

      {/* Top Utility Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3">
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.16em] text-white uppercase font-semibold select-none shrink-0"
        >
          <span className="px-2 py-1 rounded bg-[#3D1504]/30 border border-white/20 text-white font-bold">LV</span>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium tracking-[0.14em]">LOUIS VIGO</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white bg-[#3D1504]/35 px-3.5 py-1.5 rounded-full border border-white/20 select-none shadow-sm shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] sm:text-xs font-medium">Semarang, ID · Available Worldwide</span>
        </motion.div>
      </header>

      {/* Center Stage — Editorial Hero */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 my-auto py-8 sm:py-10 md:py-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* Eyebrow Label */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-white/90 mb-3 sm:mb-4 font-semibold">
            Visual Direction & Identity Systems
          </p>

          {/* Primary Display Name */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-4xl">
            Maximilianus Louis Vigo
          </h1>

          {/* Subheader / Role (Clean editorial without false-affordance pill) */}
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-white font-medium mt-4 sm:mt-5">
            Creative Director & Visual Specialist
          </p>

          {/* Editorial Philosophy Statement */}
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-white max-w-2xl mx-auto mt-5 sm:mt-7 leading-relaxed font-normal px-2 drop-shadow-sm">
            &ldquo;Focusing on timeless brand systems, editorial discipline, and thoughtful digital interfaces.&rdquo;
          </p>
        </motion.div>
      </main>

      {/* Bottom Utility Bar & Curated Index */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-5 border-t border-white/20 pt-5 sm:pt-6">
        {/* Navigation CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 w-full md:w-auto"
        >
          {/* Main CTA to Portfolio (Dark Umber Ink for AAA Contrast 16:1) */}
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 min-h-[46px] rounded-full bg-white text-[#3D1504] font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-[#FFF4EE] hover:text-[#260C02] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
          >
            <span>Selected Works (2026)</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#3D1504]" />
          </Link>

          {/* Direct Inquiry (Safe Mailto, Min 44px touch target) */}
          <a
            href="mailto:max.louisvigo@gmail.com?subject=Creative%20Inquiry%20%E2%80%94%20Louis%20Vigo"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 min-h-[46px] rounded-full bg-[#3D1504]/30 hover:bg-[#3D1504]/50 border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all duration-200 shadow-sm select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F05A22]"
            title="Send Email to Louis Vigo"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>Inquiries</span>
          </a>
        </motion.div>

        {/* Social Quick Links & Copyright (Min 44px Touch Area) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-white tracking-wider"
        >
          <a
            href="https://www.behance.net/gallery/256124861/Louis-Vigo-Portfolio-2026/modules/1493202679"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors duration-150 inline-flex items-center gap-1.5 min-h-[44px] px-1 font-semibold focus-visible:outline-none focus-visible:underline"
          >
            <span>Behance</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <span className="text-white/40">•</span>

          <a
            href="https://www.linkedin.com/in/louis-vigo-b75b5a262"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors duration-150 inline-flex items-center gap-1.5 min-h-[44px] px-1 font-semibold focus-visible:outline-none focus-visible:underline"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <span className="text-white/40 hidden sm:inline">•</span>

          <span className="text-white/80 hidden sm:inline text-xs font-medium">
            &copy; 2026 Louis Vigo
          </span>
        </motion.div>
      </footer>
    </div>
  );
};

export default EditorialHome;
