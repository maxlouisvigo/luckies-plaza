import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, MessageCircle, Mail, Menu, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export const Navbar = ({ activeSection, lang = 'en', onToggleLang, onOpenCV, t = portfolioData }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t?.nav?.about || 'About', href: '#about' },
    { label: t?.nav?.cv || 'Curriculum Vitae', href: '#cv' },
    { label: t?.nav?.works || 'Featured Works', href: '#works' },
    { label: t?.nav?.contact || 'Contact', href: '#contact' },
  ];

  const profile = t?.profile || portfolioData.profile;

  // Language toggle component
  const LanguageToggle = ({ className = '', idPrefix = 'desktop' }) => (
    <div className={`relative inline-flex items-center bg-black/25 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => onToggleLang && onToggleLang('en')}
        className={`relative z-10 px-2.5 py-1 text-xs font-bold rounded-full transition-colors duration-200 select-none ${
          lang === 'en'
            ? 'text-brand-orange font-extrabold'
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        {lang === 'en' && (
          <motion.div
            layoutId={`${idPrefix}-activeLangPill`}
            className="absolute inset-0 bg-white rounded-full shadow-md"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        type="button"
        onClick={() => onToggleLang && onToggleLang('id')}
        className={`relative z-10 px-2.5 py-1 text-xs font-bold rounded-full transition-colors duration-200 select-none ${
          lang === 'id'
            ? 'text-brand-orange font-extrabold'
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
        title="Bahasa Indonesia"
      >
        {lang === 'id' && (
          <motion.div
            layoutId={`${idPrefix}-activeLangPill`}
            className="absolute inset-0 bg-white rounded-full shadow-md"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">ID</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Top scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-brand-umber/40">
        <div 
          className="h-full bg-white transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F05A22]/95 backdrop-blur-md shadow-md py-3 border-b border-white/15' 
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Title: Section Indicator & Back to Home */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-white min-w-0">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-mono text-white transition-all duration-150 shadow-sm select-none shrink-0"
              title="Return to Home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide flex items-center min-w-0">
              <span className="hidden sm:inline">{(t?.nav?.viewPdf || 'Visual Portfolio').replace(/\s*—\s*$/, '')}</span>
              <span className="hidden sm:inline mx-1.5 sm:mx-2 text-white/50 font-light">/</span>
              <span className="font-light tracking-wider capitalize text-white/95 text-xs sm:text-sm truncate">
                {activeSection || 'Cover'}
              </span>
            </span>
          </div>

          {/* Right Header Navigation & Actions (Desktop lg+) */}
          <div className="hidden lg:flex items-center space-x-7">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/85 hover:text-white transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
              {/* Language Switcher Pill */}
              <LanguageToggle idPrefix="nav-desktop" />

              <button
                type="button"
                onClick={onOpenCV}
                className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 min-h-[36px] rounded-full bg-white/10 hover:bg-white text-white hover:text-[#3D1504] border border-white/30 transition-all duration-200 shadow-sm cursor-pointer"
                title="Preview & Download CV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t?.nav?.downloadCv || 'CV (PDF)'}</span>
              </button>

              <a
                href={lang === 'id' ? profile.contact.whatsappUrl : `mailto:${profile.contact.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                target={lang === 'id' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 min-h-[36px] rounded-full bg-[#3D1504] hover:bg-[#260C02] text-white transition-all duration-200 shadow-sm"
              >
                {lang === 'id' ? (
                  <>
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t?.nav?.letsTalk || "Ajak Ngobrol"}</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>{t?.nav?.letsTalk || "Let's Talk"}</span>
                  </>
                )}
              </a>

              <span className="text-white font-bold text-sm tracking-wide ml-1">
                {profile.displayName || 'Louis Vigo'}
              </span>
            </div>
          </div>

          {/* Mobile Right Controls: Language Pill + Hamburger Button */}
          <div className="lg:hidden flex items-center space-x-2 shrink-0">
            {/* Quick Language Switcher on Mobile Top Bar */}
            <LanguageToggle idPrefix="nav-mobile-top" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F05A22] border-b border-white/20 px-6 py-5 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-1 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center text-white hover:text-amber-200 transition-colors py-1.5 border-b border-white/10"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 flex flex-col space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenCV) onOpenCV();
                  }}
                  className="min-h-[46px] flex items-center justify-center space-x-2 px-4 rounded-lg bg-white text-[#3D1504] font-bold text-sm shadow cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t?.cv?.downloadButton || 'Lihat / Unduh CV (PDF)'}</span>
                </button>
                
                <a
                  href={lang === 'id' ? profile.contact.whatsappUrl : `mailto:${profile.contact.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                  target={lang === 'id' ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="min-h-[46px] flex items-center justify-center space-x-2 px-4 rounded-lg bg-[#3D1504] text-white font-bold text-sm shadow"
                >
                  {lang === 'id' ? (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      <span>{t?.contact?.chatWhatsapp || 'Chat via WhatsApp'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>{t?.contact?.sendEmail || 'Send Direct Email'}</span>
                    </>
                  )}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
