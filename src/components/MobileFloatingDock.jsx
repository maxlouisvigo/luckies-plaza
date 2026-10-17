import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Download, ArrowUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export const MobileFloatingDock = ({ 
  activeSection = 'Cover', 
  lang = 'en', 
  onToggleLang, 
  t = portfolioData 
}) => {
  const [visible, setVisible] = useState(false);
  const profile = t?.profile || portfolioData.profile;

  useEffect(() => {
    const handleScroll = () => {
      // Show floating dock only after scrolling past the hero (250px)
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside 
      aria-label="Mobile Navigation Dock"
      className="md:hidden fixed bottom-5 inset-x-0 mx-auto w-[92%] max-w-sm z-40 transition-all duration-300 transform translate-y-0"
    >
      <div className="bg-[#3D1504]/90 backdrop-blur-xl border border-white/25 rounded-full px-3.5 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.45)] flex items-center justify-between gap-2 select-none">
        
        {/* Active Section Pill & Scroll-to-top */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95 shrink-0 max-w-[125px] truncate"
          title="Back to Top"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="truncate text-[11px] font-sans font-medium text-white/95">
            {activeSection}
          </span>
          <ArrowUp className="w-3 h-3 text-white/60 shrink-0 ml-0.5" />
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Dual Pill Language Toggle with Sliding Animation */}
          <div className="relative inline-flex items-center bg-black/40 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-inner">
            <button
              type="button"
              onClick={() => onToggleLang && onToggleLang('en')}
              className={`relative z-10 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors duration-200 select-none ${
                lang === 'en' ? 'text-[#3D1504] font-extrabold' : 'text-white/75 hover:text-white'
              }`}
              title="English"
            >
              {lang === 'en' && (
                <motion.div
                  layoutId="dock-activeLangPill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">EN</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleLang && onToggleLang('id')}
              className={`relative z-10 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors duration-200 select-none ${
                lang === 'id' ? 'text-[#3D1504] font-extrabold' : 'text-white/75 hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              {lang === 'id' && (
                <motion.div
                  layoutId="dock-activeLangPill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">ID</span>
            </button>
          </div>

          {/* Quick CV Download */}
          <a
            href={profile.contact.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all active:scale-95"
            title="Download CV (PDF)"
            aria-label="Download CV"
          >
            <Download className="w-3.5 h-3.5" />
          </a>

          {/* Action CTA based on language priority */}
          {lang === 'id' ? (
            <a
              href={profile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all active:scale-95"
              title="Chat WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Chat WA</span>
            </a>
          ) : (
            <a
              href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20via%20Portfolio`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white hover:bg-white/90 text-[#3D1504] font-bold text-xs shadow-md transition-all active:scale-95"
              title="Send Direct Email"
            >
              <Mail className="w-3.5 h-3.5 text-[#3D1504]" />
              <span>Email</span>
            </a>
          )}
        </div>

      </div>
    </aside>
  );
};
